import fs from "fs-extra";
import path from "path";

const directoryPath = path.join(process.cwd(), "apps");

export function existingBrands() {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        return console.error("Unable to scan directory:", err);
      }

      // Filter out only directories
      return files
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
      // const folders = files.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
      // brands = folders;
    })
    .map((dirent) => dirent.name);
}
