const IDENTIFIER_SPLIT = /[^a-zA-Z0-9]+/g;

export function upperFirst(value: string): string {
  if (value.length === 0) {
    return value;
  }

  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

export function lowerFirst(value: string): string {
  if (value.length === 0) {
    return value;
  }

  return `${value[0].toLowerCase()}${value.slice(1)}`;
}

export function singularize(value: string): string {
  if (value.endsWith('ies') && value.length > 3) {
    return `${value.slice(0, -3)}y`;
  }

  if (value.endsWith('ses') || value.endsWith('xes')) {
    return value.slice(0, -2);
  }

  if (value.endsWith('s') && value.length > 1) {
    return value.slice(0, -1);
  }

  return value;
}

export function normalizeType(value: string): string {
  const parts = value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(IDENTIFIER_SPLIT)
    .filter(Boolean)
    .map((part) => upperFirst(part));
  const joined = parts.join('') || 'GeneratedModel';
  return /^[0-9]/.test(joined) ? `K${joined}` : joined;
}

export function normalizeProperty(value: string): string {
  return lowerFirst(normalizeType(value));
}

export function toSnakeCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(IDENTIFIER_SPLIT, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

export function escapeString(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');
}

export function indent(value: string, level = 1, unit = '  '): string {
  const prefix = unit.repeat(level);
  return value
    .split('\n')
    .map((line) => (line.length === 0 ? line : `${prefix}${line}`))
    .join('\n');
}

export function quoteIfNeeded(value: string): string {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value) ? value : `\"${escapeString(value)}\"`;
}
