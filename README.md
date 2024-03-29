# JSON: Become TS
Work in progress JSON to TypeScript converter.

## About
It was called `json2ts` but others have used this name so I changed it to `JSON: Become TS`. Yes, the naming is inspired by a certain game. 

It is another tool that I need for [WoWs Info](https://github.com/HenryQuan/WoWs-Info-Re). Other tools I found only generate everything in a single file and that's not what I want. Therefore, `JSON: Become TS` will help you to create files and directories automatically.

### Dart support
Dart support has been added but it might need some manual adjustments due to the type `number` can be both `int` and `double`.

### Features
- Support `number`, `string`, `boolean`
- Support `array` and auto detect `map`
- Remove illegal characters

The next step is to support optional types. It might be possible with the help of [obj-join](https://github.com/HenryQuan/obj-join). After that, I will add the option to generate classes instead of interfaces. 

## Example
- Check the [example](https://github.com/HenryQuan/json-become-ts/tree/master/src/example) folder to see what it does
- Check the [modules](https://github.com/HenryQuan/json-become-ts/tree/master/src/example/modules) folder for dart

### Special thanks
Checkout [this website](https://next.json-generator.com/) for generating random json.

For legacy JS code, check them [here](https://github.com/HenryQuan/json-become-ts/tree/aeda8cbfdea101b1464e6ce987c3918346f04e51).
