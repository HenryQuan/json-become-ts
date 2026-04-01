import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { Writter } from './writter.ts';

export class WritterRust extends Writter {
  protected readonly fileExtension = 'rs';

  protected override render(): string {
    const models = this.modelList().map((model) => this.renderModel(model)).join('\n\n');
    const uses = [
      'use serde::{Deserialize, Serialize};',
      this.modelList().some((model) => model.allFields().some((field) => field.container === 'map'))
        ? 'use std::collections::HashMap;'
        : '',
      this.isDynamicUsed() ? 'use serde_json::Value;' : '',
      '',
    ]
      .filter(Boolean)
      .join('\n');
    return `${uses}${models}\n`;
  }

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field) => {
        const rename = field.sourceName === field.name ? '' : `    #[serde(rename = \"${field.sourceName}\")]\n`;
        return `${rename}    pub ${field.name}: ${this.rustType(field)},`;
      })
      .join('\n');

    return ['#[derive(Debug, Clone, Serialize, Deserialize)]', `pub struct ${model.name} {`, fields, '}'].join('\n');
  }

  private rustType(field: FieldModel): string {
    return this.formatType(
      field,
      (scalar) => {
        switch (scalar) {
          case 'bool':
            return 'bool';
          case 'int':
            return 'i64';
          case 'double':
            return 'f64';
          case 'String':
            return 'String';
          default:
            return 'Value';
        }
      },
      (type) => type,
      (type) => `Vec<${type}>`,
      (type) => `HashMap<String, ${type}>`,
      (type) => `Option<${type}>`,
    );
  }
}
