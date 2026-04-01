import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { WritterDart } from './writter/writterDart.ts';
import { WritterJS } from './writter/writterJS.ts';
import { WritterKotlin } from './writter/writterKotlin.ts';
import { WritterProto } from './writter/writterProto.ts';
import { WritterPython } from './writter/writterPython.ts';
import { WritterRust } from './writter/writterRust.ts';
import { WritterSwift } from './writter/writterSwift.ts';
import { WritterTS } from './writter/writterTS.ts';
import { WritterXml } from './writter/writterXml.ts';
import { WritterYaml } from './writter/writterYaml.ts';
import { Writter } from './writter/writter.ts';
import { normalizeType, toSnakeCase } from './writter/utility.ts';

const WRITTERS = {
  dart: WritterDart,
  javascript: WritterJS,
  js: WritterJS,
  kotlin: WritterKotlin,
  protobuf: WritterProto,
  proto: WritterProto,
  python: WritterPython,
  rust: WritterRust,
  swift: WritterSwift,
  typescript: WritterTS,
  ts: WritterTS,
  xml: WritterXml,
  yaml: WritterYaml,
} as const;

type SupportedLanguage = keyof typeof WRITTERS;

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showUsage();
    return;
  }

  const inputPath = args[0];
  const options = parseOptions(args.slice(1), inputPath);
  const jsonString = readFileSync(resolve(inputPath), 'utf8');

  if (options.clean) {
    rmSync(options.output, { force: true, recursive: true });
  }

  for (const language of options.languages) {
    const WritterClass = WRITTERS[language];
    const writter = new WritterClass(jsonString, options.rootName, options.mapThreshold);
    if (!writter.isValid()) {
      throw new Error(`[${language}] ${writter.errorMessage}`);
    }

    const targetDir = resolve(options.output, normalizeLanguage(language));
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(resolve(targetDir, outputFileName(language, writter)), writter.toString(), 'utf8');
  }
}

function parseOptions(args: string[], inputPath: string) {
  const defaults = {
    languages: ['typescript'] as SupportedLanguage[],
    mapThreshold: 10,
    output: './generated',
    rootName: normalizeType(basename(inputPath).replace(/\.[^.]+$/, '')),
    clean: true,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    switch (arg) {
      case '--lang':
      case '--language':
        defaults.languages = next
          .split(',')
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean)
          .map((value) => ensureLanguage(value as SupportedLanguage));
        index += 1;
        break;
      case '--map-threshold':
        defaults.mapThreshold = Number(next);
        index += 1;
        break;
      case '--output':
      case '--outdir':
        defaults.output = next;
        index += 1;
        break;
      case '--root-name':
        defaults.rootName = normalizeType(next);
        index += 1;
        break;
      case '--no-clean':
        defaults.clean = false;
        break;
      default:
        break;
    }
  }

  return defaults;
}

function ensureLanguage(value: SupportedLanguage): SupportedLanguage {
  if (value in WRITTERS) {
    return value;
  }

  throw new Error(`Unsupported language: ${value}`);
}

function normalizeLanguage(value: SupportedLanguage): string {
  switch (value) {
    case 'js':
      return 'javascript';
    case 'proto':
      return 'protobuf';
    case 'ts':
      return 'typescript';
    default:
      return value;
  }
}

function outputFileName(language: SupportedLanguage, writter: Writter): string {
  switch (normalizeLanguage(language)) {
    case 'dart':
      return `${toSnakeCase(writter.fileName().replace(/\.dart$/, ''))}.dart`;
    case 'rust':
      return `${toSnakeCase(writter.fileName().replace(/\.rs$/, ''))}.rs`;
    case 'xml':
      return `${toSnakeCase(writter.fileName().replace(/\.xml$/, ''))}.xml`;
    case 'yaml':
      return `${toSnakeCase(writter.fileName().replace(/\.yaml$/, ''))}.yaml`;
    case 'protobuf':
      return `${toSnakeCase(writter.fileName().replace(/\.proto$/, ''))}.proto`;
    default:
      return writter.fileName();
  }
}

function showUsage(): void {
  console.log(`Usage:\n  bun run ./src/json-become-ts.ts <file_path> [--lang ts,swift,...] [--output ./generated]\n\nSupported targets:\n  ${[...new Set(Object.keys(WRITTERS))].join(', ')}`);
}

main();
