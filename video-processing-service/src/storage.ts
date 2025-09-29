import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

const storage = new Storage();

const rawVideoBucketName = 'amal-yt-raw-videos';
const processedVideoBucketName = 'amal-yt-processed-videos';

const localRawVideoPath = './raw-videos';
const localProcessedVideoPath = './processed-videos';

// creates the local directories for raw and processed videos
export function setupDirectories(){
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
}

/**
 * @param rawVideoName - the name of the raw video {@link localRawVideoPath}
 * @param processedVideoName - the name of the processed video {@link localProcessedVideoPath}
 * @returns - a promise that resolves when the video has been converted
 */



export function convertVideo(rawVideoName: string, processedVideoName: string){
    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360") // 360p
        .on("end", () => {
          console.log("Video processing completed successfully.");
          resolve();
        })
        .on("error", (err) => {
          console.log(err);
          reject(err);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`);
    })
}

/**
 * @param fileName - the name of the file to download from the  
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} directory
 * @returns - a promise that resolves when the file has been downloaded
 */
export async function downloadRawVideo(fileName: string){
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({destination: `${localRawVideoPath}/${fileName}`});
    console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`);
}

/**
 * @param fileName - the name of the file to upload from the 
 * {@link localProcessedVideoPath} directory into the {@link processedVideoBucketName} bucket   
 * @returns - a promise that resolves when the file has been uploaded
 */
export async function uploadProcessedVideo(fileName: string){
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName
    });
    console.log(
        `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`);
    await bucket.file(fileName).makePublic();
}

/**
 * @param fileName - the name of the file to delete from the {@link localRawVideoPath} directory
 * @returns - a promise that resolves when the file has been deleted        
 */

export function deleteRawVideo(fileName: string){
    return deleteFile(`${localRawVideoPath}/${fileName}`);
}

/**
 * @param fileName - the name of the file to delete from the {@link localProcessedVideoPath} directory
 * @returns - a promise that resolves when the file has been deleted
 */

export function deleteProcessedVideo(fileName: string){
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}

/**
 * @param filePath - the path of the file to delete
 * @returns - a promise that resolves when the file has been deleted
 */

function deleteFile(filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(filepath)){
            fs.unlink(filepath, (err) => {
                if(err){
                    console.log(`Failed to delete file at ${filepath}`, err);
                    reject(err);
                }
                else {
                    console.log(`File deleted at ${filepath}`);
                    resolve();
                }
            })
        }
        else {
            console.log(`File not found at ${filepath}, skipping the delete`);
            resolve();
        }
    })
}

/**
 * Ensures a directory exists, creating it if necessary
 * @param dirPath - the path of the directory to ensure
 */

function ensureDirectoryExistence(dirPath: string) {
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, {recursive: true}); // recursive: true will create all the necessary parent directories
        console.log(`Directory created at ${dirPath}`);
    }
}