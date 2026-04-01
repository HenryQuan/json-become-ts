import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { Writter } from './writter.ts';

export class WritterPython extends Writter {
  protected readonly fileExtension = 'py';

  protected override render(): string {
    const models = this.modelList().map((model) => this.renderModel(model)).join('\n\n');
    return ['from __future__ import annotations', '', 'from dataclasses import dataclass', 'from typing import Any', '', models, ''].join('\n');
  }

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field) => `    ${field.name}: ${this.pythonType(field)}`)
      .join('\n');
    return `@dataclass(slots=True)\nclass ${model.name}:\n${fields || '    pass'}`;
  }

  private pythonType(field: FieldModel): string {
    return this.formatType(
      field,
      (scalar) => {
        switch (scalar) {
          case 'bool':
            return 'bool';
          case 'int':
            return 'int';
          case 'double':
            return 'float';
          case 'String':
            return 'str';
          default:
            return 'Any';
        }
      },
      (type) => type,
      (type) => `list[${type}]`,
      (type) => `dict[str, ${type}]`,
      (type) => `${type} | None`,
    );
  }
}
