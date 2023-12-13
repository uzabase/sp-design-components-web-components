const { readdir, stat, cp } = require("fs/promises");
const { join } = require("path");

async function readDirRecursively(dir) {
    const files = await readdir(dir);
    const allFileList = await Promise.all(files.map(async file => {
        const fileType = await stat(join(dir, file))
        const files = fileType.isDirectory() ? readDirRecursively(join(dir, file)) : [join(dir, file)]
        return files;
    }));
    return allFileList.flat();
}

async function main() {
    const files = await readDirRecursively("src");
    const cssFiles = files.filter(it => it.endsWith(".css"));
    cssFiles.forEach(async (filePath) => {
        await cp(filePath, filePath.replace("src", "dist"));
    });
}

main();
