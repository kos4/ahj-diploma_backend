import {checkDir, saveFiles} from "../../functions.js";

export const QuerySendFiles = (ctx, filesDir) => {
  try {
    const { userId, message } = ctx.request.body;
    filesDir += '/' + userId;
    const { files } = ctx.request.files;

    checkDir(filesDir);

    const filesMessage = saveFiles(files, filesDir, userId);
    let sendMessage = '';

    filesMessage.forEach(file => {
      sendMessage += `<a href="${file.url}" class="filesUploadList__item" download target="_blank">${file.name}</a>`;
    });

    sendMessage = message + `<div class="filesUploadList">${sendMessage}</div>`;
    ctx.response.body = JSON.stringify({
      status: 'ok',
      message: sendMessage,
    });
  } catch (error) {
    ctx.response.body = JSON.stringify({
      status: 'error',
      message: error,
    })
  }
}
