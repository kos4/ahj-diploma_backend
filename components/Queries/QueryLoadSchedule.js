import fs from "fs";

export const QueryLoadSchedule = (ctx, userDir) => {
  const { userId } = JSON.parse(ctx.request.body);
  const path = `${userDir}/${userId}/schedule.json`;
  const result = {
    status: "error",
    message: 'Ошибка загрузки.',
  };

  if (fs.existsSync(path)) {
    const userSchedule = JSON.parse(fs.readFileSync(path, 'utf8'));
    const currentSchedule = userSchedule.filter(item => item.date >= Date.now());

    fs.writeFileSync(path, JSON.stringify(currentSchedule));
    result.status = 'success';
    result.schedule = currentSchedule;
    delete result.message;
  }

  ctx.response.body = JSON.stringify(result);
}