import { isPrimitiveType, ModelClass } from './model.ts';
import type { FieldModel, PrimitiveType } from './model.ts';
import { normalizeProperty, normalizeType } from './utility.ts';

export abstract class Writter {
  protected readonly models = new Map<string, ModelClass>();
  protected readonly rootModelName: string;
  protected readonly jsonValue: unknown;
  protected readonly mapThreshold: number;
  private readonly errorText: string;

  constructor(jsonInput: string, rootName: string, mapThreshold = 10) {
    this.rootModelName = normalizeType(rootName);
    this.mapThreshold = mapThreshold;
    let parsed: unknown = null;
    let message = '';

    try {
      parsed = JSON.parse(jsonInput);
      this.convert(parsed, this.rootModelName);
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }

    this.jsonValue = parsed;
    this.errorText = message;
  }

  get errorMessage(): string {
    return this.errorText;
  }

  isValid(): boolean {
    return this.errorText.length === 0;
  }

  fileName(): string {
    return `${this.rootModelName}.${this.fileExtension}`;
  }

  toString(): string {
    if (!this.isValid()) {
      return 'null';
    }

    return this.render();
  }

  protected render(): string {
    return [...this.models.values()]
      .map((model) => this.renderModel(model))
      .filter(Boolean)
      .join('\n\n')
      .trimEnd()
      .concat('\n');
  }

  protected abstract readonly fileExtension: string;
  protected abstract renderModel(model: ModelClass): string;

  protected scalarTypeOf(value: unknown): PrimitiveType {
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'int' : 'double';
    }

    if (typeof value === 'string') {
      return 'String';
    }

    if (typeof value === 'boolean') {
      return 'bool';
    }

    return 'dynamic';
  }

  protected isDynamicUsed(): boolean {
    return [...this.models.values()].some((model) =>
      model.allFields().some((field) => field.type === 'dynamic'),
    );
  }

  protected modelList(): ModelClass[] {
    return [...this.models.values()];
  }

  protected fieldType(field: FieldModel): string {
    return field.type;
  }

  private convert(value: unknown, className: string): void {
    if (Array.isArray(value)) {
      const sample = this.mergeArrayValues(value);
      if (sample !== undefined) {
        this.convert(sample, className);
      } else {
        const name = normalizeProperty(className);
        this.addField(className, {
          sourceName: name,
          name,
          type: 'dynamic',
          container: 'array',
          nullable: true,
        });
      }
      return;
    }

    if (!this.isPlainObject(value)) {
      return;
    }

    const object = value as Record<string, unknown>;
    this.ensureModel(className);

    for (const [sourceName, sourceValue] of Object.entries(object)) {
      const fieldName = normalizeProperty(sourceName);
      const nestedTypeName = normalizeType(sourceName);

      if (Array.isArray(sourceValue)) {
        const sample = this.mergeArrayValues(sourceValue);
        if (sample === undefined) {
          this.addField(className, {
            sourceName,
            name: fieldName,
            type: 'dynamic',
            container: 'array',
            nullable: true,
          });
        } else if (this.isPlainObject(sample)) {
          this.addField(className, {
            sourceName,
            name: fieldName,
            type: nestedTypeName,
            container: 'array',
            nullable: false,
          });
          this.convert(sample, nestedTypeName);
        } else {
          this.addField(className, {
            sourceName,
            name: fieldName,
            type: this.scalarTypeOf(sample),
            container: 'array',
            nullable: sample === null,
          });
        }
        continue;
      }

      if (this.isPlainObject(sourceValue)) {
        const objectValue = sourceValue as Record<string, unknown>;
        if (this.isMapLike(objectValue)) {
          const sample = this.mergeMapValues(objectValue);
          if (this.isPlainObject(sample)) {
            this.addField(className, {
              sourceName,
              name: fieldName,
              type: nestedTypeName,
              container: 'map',
              nullable: false,
            });
            this.convert(sample, nestedTypeName);
          } else {
            this.addField(className, {
              sourceName,
              name: fieldName,
              type: this.scalarTypeOf(sample),
              container: 'map',
              nullable: sample === null,
            });
          }
        } else {
          this.addField(className, {
            sourceName,
            name: fieldName,
            type: nestedTypeName,
            container: 'single',
            nullable: false,
          });
          this.convert(objectValue, nestedTypeName);
        }
        continue;
      }

      this.addField(className, {
        sourceName,
        name: fieldName,
        type: this.scalarTypeOf(sourceValue),
        container: 'single',
        nullable: sourceValue === null,
      });
    }
  }

  private ensureModel(className: string): ModelClass {
    const normalizedName = normalizeType(className);
    const existing = this.models.get(normalizedName);
    if (existing) {
      return existing;
    }

    const created = new ModelClass(className, normalizedName);
    this.models.set(normalizedName, created);
    return created;
  }

  private addField(className: string, field: FieldModel): void {
    this.ensureModel(className).add(field);
  }

  private isMapLike(value: Record<string, unknown>): boolean {
    const entries = Object.entries(value);
    if (entries.length <= this.mapThreshold) {
      return false;
    }

    const [first] = entries;
    const expectedSignature = this.signatureOf(first?.[1]);
    return entries.every(([, child]) => this.signatureOf(child) === expectedSignature);
  }

  private signatureOf(value: unknown): string {
    if (Array.isArray(value)) {
      const sample = this.mergeArrayValues(value);
      return `array:${this.signatureOf(sample)}`;
    }

    if (this.isPlainObject(value)) {
      const object = value as Record<string, unknown>;
      const parts = Object.keys(object)
        .sort()
        .map((key) => `${normalizeProperty(key)}:${this.signatureOf(object[key])}`);
      return `object:{${parts.join(',')}}`;
    }

    if (typeof value === 'number') {
      return 'number';
    }

    return this.scalarTypeOf(value);
  }

  private mergeArrayValues(values: unknown[]): unknown {
    const meaningful = values.filter((value) => value !== undefined);
    if (meaningful.length === 0) {
      return undefined;
    }

    return meaningful.reduce((current, next) => this.mergeValues(current, next));
  }

  private mergeMapValues(value: Record<string, unknown>): unknown {
    return this.mergeArrayValues(Object.values(value));
  }

  private mergeValues(current: unknown, next: unknown): unknown {
    if (current === null || current === undefined) {
      return next;
    }

    if (next === null || next === undefined) {
      return current;
    }

    if (Array.isArray(current) && Array.isArray(next)) {
      return this.mergeArrayValues([...current, ...next]);
    }

    if (this.isPlainObject(current) && this.isPlainObject(next)) {
      const merged: Record<string, unknown> = { ...(current as Record<string, unknown>) };
      for (const [key, value] of Object.entries(next as Record<string, unknown>)) {
        merged[key] = key in merged ? this.mergeValues(merged[key], value) : value;
      }
      return merged;
    }

    if (typeof current === 'number' && typeof next === 'number') {
      return Number.isInteger(current) && Number.isInteger(next) ? current : 0.1;
    }

    return current;
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  protected formatType(
    field: FieldModel,
    scalarFormatter: (type: PrimitiveType) => string,
    objectFormatter: (type: string) => string = (type) => type,
    arrayFormatter: (type: string) => string = (type) => `${type}[]`,
    mapFormatter: (type: string) => string = (type) => `Record<string, ${type}>`,
    nullableFormatter: (type: string) => string = (type) => `${type} | null`,
  ): string {
    const base = isPrimitiveType(field.type) ? scalarFormatter(field.type) : objectFormatter(field.type);
    const wrapped =
      field.container === 'array'
        ? arrayFormatter(base)
        : field.container === 'map'
          ? mapFormatter(base)
          : base;
    return field.nullable ? nullableFormatter(wrapped) : wrapped;
  }
}
