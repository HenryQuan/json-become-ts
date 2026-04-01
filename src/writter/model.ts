export const PRIMITIVE_TYPES = ['bool', 'double', 'dynamic', 'int', 'String'] as const;

export type PrimitiveType = (typeof PRIMITIVE_TYPES)[number];
export type FieldContainer = 'single' | 'array' | 'map';

export interface FieldModel {
  sourceName: string;
  name: string;
  type: string;
  container: FieldContainer;
  nullable: boolean;
}

export class ModelClass {
  readonly sourceName: string;
  readonly name: string;
  readonly fields = new Map<string, FieldModel>();

  constructor(sourceName: string, name: string) {
    this.sourceName = sourceName;
    this.name = name;
  }

  add(field: FieldModel): void {
    const existing = this.fields.get(field.name);
    if (!existing) {
      this.fields.set(field.name, field);
      return;
    }

    existing.nullable = existing.nullable || field.nullable;
    existing.container = existing.container === field.container ? existing.container : 'single';
    existing.type = mergeTypes(existing.type, field.type);
  }

  allFields(): FieldModel[] {
    return [...this.fields.values()];
  }
}

export function isPrimitiveType(type: string): type is PrimitiveType {
  return PRIMITIVE_TYPES.includes(type as PrimitiveType);
}

function mergeTypes(left: string, right: string): string {
  if (left === right) {
    return left;
  }

  if (left === 'dynamic' || right === 'dynamic') {
    return 'dynamic';
  }

  if ((left === 'int' && right === 'double') || (left === 'double' && right === 'int')) {
    return 'double';
  }

  return 'dynamic';
}
