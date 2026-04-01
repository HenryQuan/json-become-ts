import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { Writter } from './writter.ts';

export class WritterSwift extends Writter {
  protected readonly fileExtension = 'swift';

  protected override render(): string {
    const support = this.isDynamicUsed()
      ? `\nenum JSONValue: Codable {\n  case string(String)\n  case number(Double)\n  case bool(Bool)\n  case object([String: JSONValue])\n  case array([JSONValue])\n  case null\n\n  init(from decoder: Decoder) throws {\n    let container = try decoder.singleValueContainer()\n    if container.decodeNil() {\n      self = .null\n    } else if let value = try? container.decode(Bool.self) {\n      self = .bool(value)\n    } else if let value = try? container.decode(Double.self) {\n      self = .number(value)\n    } else if let value = try? container.decode(String.self) {\n      self = .string(value)\n    } else if let value = try? container.decode([String: JSONValue].self) {\n      self = .object(value)\n    } else if let value = try? container.decode([JSONValue].self) {\n      self = .array(value)\n    } else {\n      throw DecodingError.dataCorruptedError(in: container, debugDescription: \"Unsupported JSON value\")\n    }\n  }\n\n  func encode(to encoder: Encoder) throws {\n    var container = encoder.singleValueContainer()\n    switch self {\n    case .string(let value): try container.encode(value)\n    case .number(let value): try container.encode(value)\n    case .bool(let value): try container.encode(value)\n    case .object(let value): try container.encode(value)\n    case .array(let value): try container.encode(value)\n    case .null: try container.encodeNil()\n    }\n  }\n}\n`
      : '';
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
