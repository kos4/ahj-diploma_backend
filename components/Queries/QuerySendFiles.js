export const QuerySendFiles = (ctx, userDir) => {
  console.log(ctx.request.files);

  /*let fileName;

  try {
    const public = path.join(__dirname, '/public');

    const { file } = ctx.request.files;

    const subfolder = uuid.v4();

    const uploadFolder = public + '/' + subfolder;

    fs.mkdirSync(uploadFolder)
    fs.copyFileSync(file.path, uploadFolder + '/' + file.name);

    fileName = '/' + subfolder + '/' + file.name;
  } catch (error) {
    ctx.response.status = 500;

    return;
  }

  ctx.response.body = fileName;*/
}