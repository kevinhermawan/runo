# Runo

![License](https://img.shields.io/npm/l/runo) ![Monthly download](https://img.shields.io/npm/dm/runo)

Runo is a Command Line Interface (CLI) tool that simplifies the process of running command line scripts, similar to [npm scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts) but for any type of project.

## Features

- Improves script readability and maintainability
- Centralized script management with a single config file
- Automatically re-runs scripts with the file watching feature
- Supports projects of any language or technology stack, not limited to JavaScript

## Installation

You can install `runo` globally via npm:

```
npm install -g runo
```

Alternatively, you can use `npx` to run `runo` without installation:

```
npx runo <script> --config <config-file>
```

## Usage

```
runo <script> [options]
```

### Arguments

`script`: the script defined in the configuration file to be executed. The script names should match the keys in the "scripts" object of the configuration file. For example, in the following config file:

```json
{
  "scripts": {
    "dev": "rollup -c -w",
    "build": "rollup -c",
    "lint": "rome check ."
  }
}
```

The available script names would be "dev", "build", and "lint".

### Options

- `-v, --version`: display the version number.
- `-c, --config <config file>`: path to the configuration file (default: "runo.json").
- `-w, --watch <directories>`: directories to be watched, separated by commas.
- `-h, --help`: display the help information for the command.

### Example

To run the script named "build" defined in the "runo.json" file:

```
runo build
```

To run the script named "build" defined in a custom configuration file "config.json":

```
runo build -c config.json
```

To run the script named "build" and watch the "src" and "public" directories:

```
runo build -w src,public
```

## License

[MIT License](/LICENSE)
