import express from "express";
import { apiRouter } from "./routers";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(PORT, "포르토 서버가 열렸어요 !");
});
