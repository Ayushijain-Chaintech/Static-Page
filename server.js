const express = require("express");
const { port } = require("./Config/connect");
const logger = require("./Utils/pino");
const { connect } = require("./Utils/mongodb");
const app = express();
const page = require("./routes/page");
const user = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  await connect();
})();

app.use("/api/user", user);
app.use("/api/page", page);

//=====================Error Handling Middleware========================//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  logger.info(`express server is running on ${port}`);
});
