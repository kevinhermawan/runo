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
    const scriptToRun = configJSON?.scripts?.[script];

    if (scriptToRun) {
      const command = scriptToRun.split(" ")[0];
      const args = scriptToRun.split(" ").slice(1);
      const child = spawn(command, args, { shell: true, stdio: "inherit" });

      child.on("error", (error) => {
        ANY_ERROR(error.message);
      });
    } else {
      SCRIPT_NAME_NOT_FOUND_ERROR(script);
    }
  } else {
    CONFIG_FILE_NOT_FOUND_ERROR(configFile);
  }
}
