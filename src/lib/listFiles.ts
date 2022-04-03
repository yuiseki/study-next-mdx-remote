import fs from "fs";
import path from "path";

export const listFiles = (dir: string): string[] =>
  fs
    .readdirSync(path.resolve(dir), { withFileTypes: true })
    .flatMap((dirent) =>
      dirent.isFile()
        ? [`${dir}/${dirent.name}`]
        : listFiles(`${dir}/${dirent.name}`)
    );
