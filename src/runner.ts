import { closest } from "fastest-levenshtein";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

import {
  ANY_ERROR,
  CONFIG_FILE_NOT_FOUND_ERROR,
  CONFIG_FILE_NOT_JSON_ERROR,
  SCRIPT_NAME_NOT_FOUND_ERROR,
} from "./errors";

type Args = {
  script: string;
  configFile: string;
};

export function runner({ script, configFile }: Args) {
  if (configFile.split(".").pop() !== "json") {
    CONFIG_FILE_NOT_JSON_ERROR();
  }

  if (existsSync(configFile)) {
    const configString = readFileSync(configFile, "utf-8");
    const configJSON = JSON.parse(configString);
    const scripts = configJSON?.scripts;
    const scriptToRun = scripts?.[script];

    if (scriptToRun) {
      const cmd = scriptToRun.split(" ")[0];
      const args = scriptToRun.split(" ").slice(1);
      const child = spawn(cmd, args, { shell: true, stdio: "inherit" });

      child.on("error", (error) => {
        ANY_ERROR(error.message);
      });
    } else {
      SCRIPT_NAME_NOT_FOUND_ERROR(
        script,
        closest(script, Object.keys(scripts)),
      );
    }
  } else {
    CONFIG_FILE_NOT_FOUND_ERROR(configFile);
  }
}
