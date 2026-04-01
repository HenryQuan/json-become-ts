import { escapeString, quoteIfNeeded } from './utility.ts';
import { Writter } from './writter.ts';

export class WritterYaml extends Writter {
  protected readonly fileExtension = 'yaml';

  protected override render(): string {
    return `${this.toYaml(this.jsonValue, 0)}\n`;
  }

  protected renderModel(): string {
    return '';
  }

  private toYaml(value: unknown, level: number): string {
    const prefix = '  '.repeat(level);

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${prefix}[]`;
      }

      return value
        .map((item) => {
          if (this.isScalar(item)) {
            return `${prefix}- ${this.scalar(item)}`;
          }
          return `${prefix}-\n${this.toYaml(item, level + 1)}`;
        })
        .join('\n');
    }

    if (value && typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) {
        return `${prefix}{}`;
      }

      return entries
        .map(([key, entryValue]) => {
          if (this.isScalar(entryValue)) {
            return `${prefix}${quoteIfNeeded(key)}: ${this.scalar(entryValue)}`;
          }
          return `${prefix}${quoteIfNeeded(key)}:\n${this.toYaml(entryValue, level + 1)}`;
        })
        .join('\n');
    }

    return `${prefix}${this.scalar(value)}`;
  }

  private isScalar(value: unknown): boolean {
    return value === null || ['boolean', 'number', 'string'].includes(typeof value);
  }

  private scalar(value: unknown): string {
    if (value === null) {
      return 'null';
    }

    if (typeof value === 'string') {
      return `\"${escapeString(value)}\"`;
    }

    return String(value);
  }
}
