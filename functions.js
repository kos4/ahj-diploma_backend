import fs from "node:fs";

export const checkDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function ext(name) {
  return name.match(/\.([^.]+)$|$/)[1]
}

export function saveFiles(files, filesDir, userId) {
  const result = [];

  if (Array.isArray(files)) {
    files.forEach(file => {
      result.push(saveFile(file, filesDir, userId));
    });
  } else {
    result.push(saveFile(files, filesDir, userId));
  }

  return result;
}

function saveFile(file, filesDir, userId) {
  const path = filesDir + '/' + file.newFilename + '.' + ext(file.originalFilename);
  fs.copyFileSync(file.filepath, path);

  return {
    name: file.originalFilename,
    url: 'http://' + process.env.HOST + ':' + process.env.PORT + '/' + userId + '/' + file.newFilename + '.' + ext(file.originalFilename),
  };
}