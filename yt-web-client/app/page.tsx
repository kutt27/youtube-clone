import { getVideos } from './firebase/functions'
import VideoCard from './videocard/videocard'

export default async function Home() {
  const videos = await getVideos();

  return (
    <main style={{
      padding: '24px',
      maxWidth: '1800px',
      margin: '0 auto'
    }}>
      {videos.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center'
        }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="#909090" style={{ marginBottom: '24px' }}>
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
          </svg>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f0f0f' }}>
            No videos yet
          </h2>
          <p style={{ fontSize: '14px', color: '#606060' }}>
            Upload your first video to get started!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%'
        }}>
          {videos.map((video) => (
            <VideoCard
              key={video.id || video.filename}
              {...video}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export const revalidate = 0;