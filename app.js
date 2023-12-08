import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(PORT, "포르토 서버가 열렸어요 !");
});
