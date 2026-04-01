# JSON: Become TS

A Bun-powered TypeScript rewrite of JSON: Become TS that keeps the original `src/writter` layout and generates output files for modern targets.

## Supported targets

- TypeScript
- JavaScript
- Python
- Rust
- Swift (`Codable`)
- Kotlin (`kotlinx.serialization`)
- Dart
- XML
- YAML
- Protobuf (`proto3`)

## Usage

```bash
bun run ./src/json-become-ts.ts ./src/example/json/modules.json \
  --lang typescript,javascript,python,rust,swift,kotlin,dart,xml,yaml,protobuf \
  --output ./generated
```

Generated files are written to `./generated/<target>/` so they can be downloaded, archived, or committed as needed.

## Scripts

- `bun run build`
- `bun run test`
- `bun run all`

## Notes

- The Flutter GUI remains in `GUI/`.
- The CLI defaults to TypeScript output when no `--lang` flag is provided.
- Map detection still follows the original threshold-based approach and can be tuned with `--map-threshold`.
