import React from 'react'
import { Video } from '../firebase/functions'
import Link from 'next/link'

export default function VideoCard({ filename, id, title, description, status }: Video) {
  const videoUrl = `https://storage.googleapis.com/amal-yt-processed-videos/${filename}`;

  return (
    <Link
      href={`/watch?v=${filename}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div style={{
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          backgroundColor: '#000',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {status === 'processed' ? (
            <video
              src={videoUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              muted
              onMouseEnter={(e) => {
                const video = e.currentTarget;
                video.currentTime = 2; // Start at 2 seconds for preview
              }}
            />
          ) : (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#909090">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
          )}

          {/* Processing badge */}
          {status === 'processing' && (
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Processing...
            </div>
          )}
        </div>

        {/* Video Info */}
        <div style={{ marginTop: '12px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '20px',
            color: '#0f0f0f',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {title || 'Untitled Video'}
          </h3>

          {description && (
            <p style={{
              fontSize: '12px',
              lineHeight: '18px',
              color: '#606060',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

