import express from "express";
import { setupDirectories, convertVideo, deleteRawVideo, deleteProcessedVideo, downloadRawVideo, uploadProcessedVideo } from "./storage";

setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
  // Get the bucket and filename from the cloud pub/sub message
  let data;
  try{
    const message = Buffer.from(req.body.message.data, "base64").toString("utf-8");
    data = JSON.parse(message);
    if(!data.name){
        throw new Error("No file name found in pub/sub message");
    }
  }
  catch(err){
    console.error(err);
    return res.status(400).send('Bad request: missing filename');
  }
  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;
  
  // Download the raw video from cloud storage 
  await downloadRawVideo(inputFileName);

  // Convert the raw video to 360p
  try{
    await convertVideo(inputFileName, outputFileName);
  } catch (err){
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }

  // Upload the processed video to cloud storage
  await uploadProcessedVideo(outputFileName);

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
  ]);

  return res.status(200).send("Processing finished successfully");
});

const port = process.env.PORT || 3000; // create a env file for port number in deployment
app.listen(port, () => {
  console.log(`Video Processing service listening at http://localhost:${port}`);
});
