import {checkDir, saveFiles} from "../../functions.js";

export const QuerySendFiles = (ctx, filesDir) => {
  try {
    const { userId, message } = ctx.request.body;
    filesDir += '/' + userId;
    const { files } = ctx.request.files;

    checkDir(filesDir);

    const filesMessage = saveFiles(files, filesDir, userId);
    const data = {
      status: 'ok',
      message,
      files: {}
    };

    filesMessage.forEach(file => {
      if (!data.files.hasOwnProperty(file.type)) {
        data.files[file.type] = [];
      }

      data.files[file.type].push(file);
    });

    ctx.response.body = JSON.stringify(data);
  } catch (error) {
    ctx.response.body = JSON.stringify({
      status: 'error',
      message: error,
    })
  }
}
