export const InitServer = (server) => {
  const port = process.env.PORT || 8082;

  const bootstrap = async () => {
    try {
      server.listen(port, () =>
        console.log(`Server has been started on http://localhost:${port}`)
      );
    } catch (error) {
      console.error(error);
    }
  };

  bootstrap();
}
