import fs from "fs";
import path, { dirname } from "path";

export const listDirs = (dir: string): string[] =>
  fs
    .readdirSync(path.resolve(dir), { withFileTypes: true })
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => {
      return `${dir}/${dirent.name}`;
    });
