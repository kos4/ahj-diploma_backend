export const InitServer = (server) => {
const port = process.env.PORT;

  server.listen(port, (err) => {
    if (err) {
      console.log(err);

      return;
    }

    console.log('Server is listening to ' + port);
  });
}
