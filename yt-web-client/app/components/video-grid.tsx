"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getVideos, Video } from "../firebase/functions";
import styles from "./video-grid.module.css";

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const fetchedVideos = await getVideos();
        setVideos(fetchedVideos);
        setError(null);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <h2>No videos yet</h2>
          <p>Upload your first video to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/watch?v=${video.id}`}
            className={styles.videoCard}
          >
            <div className={styles.thumbnail}>
              <video
                src={video.url}
                className={styles.thumbnailVideo}
                muted
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className={styles.duration}>Video</div>
            </div>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>
                {video.title || "Untitled Video"}
              </h3>
              <p className={styles.videoMeta}>
                {video.description || "No description"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

