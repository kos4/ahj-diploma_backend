import fs from "node:fs";
import mimeTypes from "./mime_tipes.json" assert { type: "json" };

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
  let extFile;
  let name;

  if (file.originalFilename === 'blob') {
    const mimeType = file.mimetype.split('/');

    extFile = mimeType[1];

    switch (mimeType[0]) {
      case 'audio':
        name = 'Аудиозапись';
        break;
      case 'video':
        name = 'Видеозапись';
        break;
    }
  } else {
    extFile = ext(file.originalFilename);
    name = file.originalFilename;
  }

  const path = filesDir + '/' + file.newFilename + '.' + extFile;
  const type = getType(extFile);
  fs.copyFileSync(file.filepath, path);

  return {
    name,
    url: 'http://' + process.env.HOST + ':' + process.env.PORT + '/' + userId + '/' + file.newFilename + '.' + extFile,
    type,
  };
}

function getType(ext) {
  let mime = 'doc';
  const typesList = ['image', 'video', 'audio'];

  if (mimeTypes.extensions.hasOwnProperty(ext)) {
    const type = mimeTypes.extensions[ext].split('/')[0];

    if (typesList.includes(type)) {
      mime = type;
    }
  }

  return mime;
}