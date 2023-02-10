import { red } from "colorette";

export const ANY_ERROR = (message: string) => {
  console.error(red(message));

  process.exit(1);
};

export const CONFIG_FILE_NOT_JSON_ERROR = () => {
  console.error(red("The config file must be in the JSON file."));

  process.exit(1);
};

export const CONFIG_FILE_NOT_FOUND_ERROR = (file: string) => {
  console.error(
    red(`Missing config file. Please ensure that '${file}' file exists.`)
  );

  process.exit(1);
};

export const SCRIPT_NAME_NOT_FOUND_ERROR = (
  name: string,
  suggestion: string
) => {
  console.error(
    red(
      suggestion.length > 0
        ? `The script "${name}" could not be found in the config file. Did you mean "${suggestion}"?`
        : `The script "${name}" could not be found in the config file.`
    )
  );

  process.exit(1);
};

export const DIRECTORY_NOT_FOUND_ERROR = (name: string) => {
  console.error(
    red(
      `The directory '${name}' could not be found. Please make sure that there is no spelling or typing error.`
    )
  );

  process.exit(1);
};
