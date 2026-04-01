import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { escapeString } from './utility.ts';
import { Writter } from './writter.ts';

export class WritterJS extends Writter {
  protected readonly fileExtension = 'js';

  protected renderModel(model: ModelClass): string {
    const typedef = model
      .allFields()
      .map((field) => ` * @property {${this.jsDocType(field)}} ${field.name}`)
      .join('\n');

    const assignments = model
      .allFields()
      .map(
        (field) =>
          `    this.${field.name} = data[\"${escapeString(field.sourceName)}\"]${field.nullable ? ' ?? null' : ''};`,
      )
      .join('\n');

    return [
      '/**',
      ` * @typedef {Object} ${model.name}`,
      typedef,
      ' */',
      `export class ${model.name} {`,
      `  /** @param {Partial<${model.name}> & Record<string, unknown>} [data={}] */`,
      '  constructor(data = {}) {',
      assignments,
      '  }',
      '}',
    ].join('\n');
  }

  private jsDocType(field: FieldModel): string {
    return this.formatType(
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
      (type) => `Array<${type}>`,
      (type) => `Object<string, ${type}>`,
      (type) => `(${type}|null)`,
    );
  }
}
