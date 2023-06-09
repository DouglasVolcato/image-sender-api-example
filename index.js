const express = require("express");
const app = express();
const cors = require("cors");
const { image } = require("./src/base64-image");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const imageData = image.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Buffer.from(imageData, "base64");

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", `attachment; filename=image.jpg`);
    res.send(binaryData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
