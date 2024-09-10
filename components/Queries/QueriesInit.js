import cors from "cors";
import bodyParser from "body-parser";

export const QueriesInit = (app) => {
  app.use(cors());
  app.use(
    bodyParser.json({
      type(req) {
        return true;
      },
    })
  );
  app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });
}