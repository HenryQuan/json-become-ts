import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { Writter } from './writter.ts';

const JSON_VALUE_SUPPORT = `
enum JSONValue: Codable {
  case string(String)
  case number(Double)
  case bool(Bool)
  case object([String: JSONValue])
  case array([JSONValue])
  case null

  init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()
    if container.decodeNil() {
      self = .null
    } else if let value = try? container.decode(Bool.self) {
      self = .bool(value)
    } else if let value = try? container.decode(Double.self) {
      self = .number(value)
    } else if let value = try? container.decode(String.self) {
      self = .string(value)
    } else if let value = try? container.decode([String: JSONValue].self) {
      self = .object(value)
    } else if let value = try? container.decode([JSONValue].self) {
      self = .array(value)
    } else {
      throw DecodingError.dataCorruptedError(in: container, debugDescription: "Unsupported JSON value")
    }
  }

  func encode(to encoder: Encoder) throws {
    var container = encoder.singleValueContainer()
    switch self {
    case .string(let value): try container.encode(value)
    case .number(let value): try container.encode(value)
    case .bool(let value): try container.encode(value)
    case .object(let value): try container.encode(value)
    case .array(let value): try container.encode(value)
    case .null: try container.encodeNil()
    }
  }
}
`.trim();

export class WritterSwift extends Writter {
  protected readonly fileExtension = 'swift';

  protected override render(): string {
    const support = this.isDynamicUsed() ? `\n${JSON_VALUE_SUPPORT}\n` : '';
    const models = this.modelList().map((model) => this.renderModel(model)).join('\n\n');
    return `import Foundation\n${support}\n${models}\n`;
  }

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field) => `    let ${field.name}: ${this.swiftType(field)}`)
      .join('\n');
    const codingKeys = model.allFields().some((field) => field.sourceName !== field.name)
      ? `\n\n    enum CodingKeys: String, CodingKey {\n${model
          .allFields()
          .map((field) =>
            field.sourceName === field.name
              ? `        case ${field.name}`
              : `        case ${field.name} = \"${field.sourceName}\"`,
          )
          .join('\n')}\n    }`
      : '';
    return `struct ${model.name}: Codable {\n${fields}${codingKeys}\n}`;
  }

  private swiftType(field: FieldModel): string {
    return this.formatType(
      field,
      (scalar) => {
        switch (scalar) {
          case 'bool':
            return 'Bool';
          case 'int':
            return 'Int';
          case 'double':
            return 'Double';
          case 'String':
            return 'String';
          default:
            return 'JSONValue';
        }
      },
      (type) => type,
      (type) => `[${type}]`,
      (type) => `[String: ${type}]`,
      (type) => `${type}?`,
    );
  }
}
