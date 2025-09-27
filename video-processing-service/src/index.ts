import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  // get path of the input video file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Input and output file paths are required.");
    return;
  }

  
});

const port = process.env.PORT || 3000; // create a env file for port number in deployment
app.listen(port, () => {
  console.log(`Video Processing service listening at http://localhost:${port}`);
});
