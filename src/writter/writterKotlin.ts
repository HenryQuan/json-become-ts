import { ModelClass } from './model.ts';
import type { FieldModel } from './model.ts';
import { Writter } from './writter.ts';

export class WritterKotlin extends Writter {
  protected readonly fileExtension = 'kt';

  protected override render(): string {
    const needsSerialName = this.modelList().some((model) => model.allFields().some((field) => field.sourceName !== field.name));
    const needsJsonElement = this.isDynamicUsed();
    const imports = [
      'import kotlinx.serialization.Serializable',
      needsSerialName ? 'import kotlinx.serialization.SerialName' : '',
      needsJsonElement ? 'import kotlinx.serialization.json.JsonElement' : '',
    ]
      .filter(Boolean)
      .join('\n');
    const models = this.modelList().map((model) => this.renderModel(model)).join('\n\n');
    return `${imports}\n\n${models}\n`;
  }

  protected renderModel(model: ModelClass): string {
    const fields = model
      .allFields()
      .map((field) => {
        const annotation = field.sourceName === field.name ? '' : `    @SerialName(\"${field.sourceName}\")\n`;
        return `${annotation}    val ${field.name}: ${this.kotlinType(field)}`;
      })
      .join(',\n');

    return ['@Serializable', `data class ${model.name}(`, fields, ')'].join('\n');
  }

  private kotlinType(field: FieldModel): string {
    return this.formatType(
      field,
      (scalar) => {
        switch (scalar) {
          case 'bool':
            return 'Boolean';
          case 'int':
            return 'Long';
          case 'double':
            return 'Double';
          case 'String':
            return 'String';
          default:
            return 'JsonElement';
        }
      },
      (type) => type,
      (type) => `List<${type}>`,
      (type) => `Map<String, ${type}>`,
      (type) => `${type}?`,
    );
  }
}
