import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { Writter } from './writter.ts';

export class WritterDart extends Writter {
  protected readonly fileExtension = 'dart';

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field) => `  final ${this.dartType(field)} ${field.name};`)
      .join('\n');
    const constructorArgs = model
      .allFields()
      .map((field) => `    this.${field.name},`)
      .join('\n');
    const fromJson = model
      .allFields()
      .map((field) => `      ${field.name}: json['${field.sourceName}'],`)
      .join('\n');
    const toJson = model
      .allFields()
      .map((field) => `      '${field.sourceName}': ${field.name},`)
      .join('\n');

    return [
      `class ${model.name} {`,
      fields,
      '',
      `  const ${model.name}({`,
      constructorArgs,
      '  });',
      '',
      `  factory ${model.name}.fromJson(Map<String, dynamic> json) => ${model.name}(`,
      fromJson,
      '  );',
      '',
      '  Map<String, dynamic> toJson() => {',
      toJson,
      '  };',
      '}',
    ].join('\n');
  }

  private dartType(field: FieldModel): string {
    return this.formatType(
      field,
      (scalar) => {
        switch (scalar) {
          case 'bool':
            return 'bool';
          case 'int':
            return 'int';
          case 'double':
            return 'double';
          case 'String':
            return 'String';
          default:
            return 'Object?';
        }
      },
      (type) => type,
      (type) => `List<${type}>`,
      (type) => `Map<String, ${type}>`,
      (type) => type.endsWith('?') ? type : `${type}?`,
    );
  }
}
