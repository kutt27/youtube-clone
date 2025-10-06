# YouTube Clone

A full-stack YouTube clone built with Next.js, Firebase, and Google Cloud Platform.

## Features

- ✅ User authentication with Google Sign-In
- ✅ Video upload with signed URLs
- ✅ Automatic video processing (360p conversion)
- ✅ Video listing on home page
- ✅ Video playback page
- ✅ Responsive design

## Architecture

### Services

1. **yt-web-client** - Next.js frontend application
2. **yt-api-service** - Firebase Cloud Functions for API endpoints
3. **video-processing-service** - Express.js service for video processing

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Firebase Functions, Express.js
- **Database**: Cloud Firestore
- **Storage**: Google Cloud Storage
- **Video Processing**: FFmpeg
- **Authentication**: Firebase Auth

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Google Cloud SDK (gcloud) installed and authenticated
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project created

### 1. Firebase Setup

```bash
# Login to Firebase
firebase login

# Set your Firebase project
cd yt-api-service
firebase use <your-project-id>
```

### 2. Google Cloud Storage Setup

Create two storage buckets:
```bash
# Raw videos bucket (for uploads)
gsutil mb gs://amal-yt-raw-videos

# Processed videos bucket (for processed videos)
gsutil mb gs://amal-yt-processed-videos

# Make processed videos bucket public
gsutil iam ch allUsers:objectViewer gs://amal-yt-processed-videos
```

### 3. Install Dependencies

```bash
# Install web client dependencies
cd yt-web-client
npm install

# Install API service dependencies
cd ../yt-api-service/functions
npm install

# Install video processing service dependencies
cd ../../video-processing-service
npm install
```

### 4. Update Configuration

Update the following files with your project details:

**yt-web-client/app/firebase/firebase.ts**:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};
```

**yt-api-service/functions/src/index.ts** and **video-processing-service/src/storage.ts**:
- Update bucket names if you used different names

### 5. Deploy Firebase Functions

```bash
cd yt-api-service
firebase deploy --only functions
```

### 6. Run Locally

**Web Client**:
```bash
cd yt-web-client
npm run dev
```

**Video Processing Service** (for local testing):
```bash
cd video-processing-service
npm start
```

## Usage

1. **Sign In**: Click "Sign In" and authenticate with Google
2. **Upload Video**: Click the upload icon and select a video file
3. **Wait for Processing**: The video will be automatically processed to 360p
4. **View Videos**: All processed videos appear on the home page
5. **Watch Video**: Click any video to watch it

## Cost Optimization

This project is designed to minimize costs:

- ✅ Uses Cloud Storage instead of expensive video hosting
- ✅ Processes videos to 360p to reduce storage costs
- ✅ Uses Firebase free tier for authentication and Firestore
- ✅ Cloud Functions with minimal instances
- ✅ No Pub/Sub (uses simpler Cloud Storage triggers)

### Free Tier Limits

- **Firebase Auth**: Unlimited
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Cloud Storage**: 5GB storage, 1GB network egress/day
- **Cloud Functions**: 2M invocations/month, 400K GB-seconds/month

## Project Structure

```
youtube-clone/
├── yt-web-client/          # Next.js frontend
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── firebase/       # Firebase configuration
│   │   ├── navbar/         # Navigation components
│   │   └── watch/          # Video player page
│   └── public/             # Static assets
├── yt-api-service/         # Firebase Functions
│   └── functions/
│       └── src/
│           └── index.ts    # API endpoints
└── video-processing-service/  # Video processing
    └── src/
        ├── index.ts        # Express server
        ├── storage.ts      # GCS operations
        └── firestore.ts    # Firestore operations
```

## API Endpoints

### Firebase Functions

- `generateUploadUrl` - Generate signed URL for video upload
- `triggerVideoProcessing` - Initiate video processing
- `getVideos` - Fetch all processed videos
- `getVideo` - Fetch single video by ID
- `createUser` - Create user profile on signup

## Troubleshooting

### Videos not processing
- Check that the video-processing-service is running
- Verify Cloud Storage buckets exist and have correct permissions
- Check Firebase Functions logs: `firebase functions:log`

### Upload fails
- Verify signed URL generation is working
- Check bucket permissions
- Ensure file size is within limits

### Videos not appearing
- Wait a few minutes for processing to complete
- Check Firestore for video status
- Verify processed videos bucket is public

## License

MIT