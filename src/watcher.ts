import { green } from "colorette";
import { existsSync, watch } from "node:fs";

import { DIRECTORY_NOT_FOUND_ERROR } from "./errors";
import { runner } from "./runner";

type Args = {
  script: string;
  configFile: string;
  watchDirs: string[];
};

export function watcher({ script, configFile, watchDirs }: Args) {
  console.clear();

  console.log(green(`Watching file changes in (${watchDirs.join(", ")})...`));

  for (const dir of watchDirs) {
    if (existsSync(dir)) {
      watch(dir, { recursive: true }, () => runner({ script, configFile }));
    } else {
      DIRECTORY_NOT_FOUND_ERROR(dir);
    }
  }
}
