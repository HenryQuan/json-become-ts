import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { toSnakeCase } from './utility.ts';
import { Writter } from './writter.ts';

export class WritterProto extends Writter {
  protected readonly fileExtension = 'proto';

  protected override render(): string {
    const models = this.modelList().map((model) => this.renderModel(model)).join('\n\n');
    return `syntax = \"proto3\";\n\npackage generated;\n\n${models}\n`;
  }

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field, index) => `  ${this.protoType(field)} ${toSnakeCase(field.name) || 'field'} = ${index + 1};`)
      .join('\n');
    return `message ${model.name} {\n${fields}\n}`;
  }

  private protoType(field: FieldModel): string {
    const base = this.formatType(
      { ...field, nullable: false },
      (scalar) => {
        switch (scalar) {
          case 'bool':
            return 'bool';
          case 'int':
            return 'int64';
          case 'double':
            return 'double';
          case 'String':
            return 'string';
          default:
            return 'string';
        }
      },
      (type) => type,
      (type) => `repeated ${type}`,
      (type) => `map<string, ${type}>`,
      (type) => type,
    );

    return base;
  }
}
