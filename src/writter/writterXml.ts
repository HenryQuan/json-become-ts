import { escapeString, singularize, toSnakeCase } from './utility.ts';
import { Writter } from './writter.ts';

export class WritterXml extends Writter {
  protected readonly fileExtension = 'xml';

  protected override render(): string {
    const rootTag = toSnakeCase(this.rootModelName) || 'root';
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n${this.toXml(rootTag, this.jsonValue, 0)}\n`;
  }

  protected renderModel(): string {
    return '';
  }

  private toXml(tag: string, value: unknown, level: number): string {
    const prefix = '  '.repeat(level);
    const { name, attribute } = this.xmlTag(tag);

    if (Array.isArray(value)) {
      return value
        .map((item) => this.toXml(singularize(tag) || 'item', item, level))
        .join('\n');
    }

    if (value && typeof value === 'object') {
      const children = Object.entries(value as Record<string, unknown>)
        .map(([childTag, childValue]) => this.toXml(toSnakeCase(childTag) || 'value', childValue, level + 1))
        .join('\n');
      return `${prefix}<${name}${attribute}>\n${children}\n${prefix}</${name}>`;
    }

    const text = value === null ? '' : escapeString(String(value));
    return `${prefix}<${name}${attribute}>${text}</${name}>`;
  }

  private xmlTag(tag: string): { name: string; attribute: string } {
    if (/^[A-Za-z_][A-Za-z0-9_.-]*$/.test(tag)) {
      return { name: tag, attribute: '' };
    }

    return { name: 'entry', attribute: ` key="${escapeString(tag)}"` };
  }
}
