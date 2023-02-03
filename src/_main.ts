import { Command } from "commander";

import { description, name, version } from "../package.json";
import { runner } from "./runner";
import { watcher } from "./watcher";

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version, "-v, --version", "display the version number")
  .helpOption("-h, --help", "display the help information for the command");

program
  .argument("<script>", "the script defined in the config file to be executed")
  .option("-c, --config <config file>", "path to the config file", "runo.json")
  .option(
    "-w, --watch <directories>",
    "directories to be watched, separated by commas",
  )
  .action((script, { config, watch }) => {
    if (watch) {
      const watchDirs = (watch as string)?.split(",");

      watcher({ script, configFile: config, watchDirs });
    } else {
      runner({ script, configFile: config });
    }
  });

program.parse(process.argv);
