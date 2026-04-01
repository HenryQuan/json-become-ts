import { ModelClass } from './model.ts';
import { Writter } from './writter.ts';

export class WritterTS extends Writter {
  protected readonly fileExtension = 'ts';

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field) => {
        const type = this.formatType(
          field,
          (scalar) => {
            switch (scalar) {
              case 'bool':
                return 'boolean';
              case 'int':
              case 'double':
                return 'number';
              case 'String':
                return 'string';
              default:
                return 'unknown';
            }
          },
          (type) => type,
          (type) => `${type}[]`,
          (type) => `Record<string, ${type}>`,
          (type) => `${type} | null`,
        );
        const optional = field.nullable ? '?' : '';
        return `  ${field.name}${optional}: ${type};`;
      })
      .join('\n');

    return `export interface ${model.name} {\n${fields}\n}`;
  }
}
