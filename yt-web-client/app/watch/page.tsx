'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Watch() {
  const searchParams = useSearchParams();
  const filename = searchParams.get('v');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const videoUrl = `https://storage.googleapis.com/amal-yt-processed-videos/${filename}`;

  useEffect(() => {
    if (!filename) {
      setError(true);
      setLoading(false);
    }
  }, [filename]);

  if (!filename) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="#909090">
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
        <h2 style={{ fontSize: '20px', color: '#0f0f0f' }}>Video not found</h2>
        <a href="/" style={{ color: '#065fd4', textDecoration: 'none' }}>Go back to home</a>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '24px'
    }}>
      {/* Video Player */}
      <div style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            zIndex: 1
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #065fd4',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}

        <video
          controls
          autoPlay
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '720px',
            display: 'block'
          }}
          onLoadedData={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {error && !loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: 'white',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
            <p>Failed to load video. It may still be processing.</p>
            <a href="/" style={{ color: '#3ea6ff', textDecoration: 'none' }}>Go back to home</a>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div style={{ marginTop: '20px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '28px',
          color: '#0f0f0f',
          marginBottom: '8px'
        }}>
          {filename?.split('.')[0] || 'Video'}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#606060'
        }}>
          <span>Video ID: {filename?.split('.')[0]}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
