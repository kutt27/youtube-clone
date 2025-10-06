'use client';

import { Fragment, useState } from "react";
import { uploadVideo } from "../firebase/functions";

export default function Upload() {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            await handleUpload(file);
        }
    }

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            await uploadVideo(file);
            alert(`Video uploaded successfully! Processing will begin shortly.`);
            // Reset the input
            const input = document.getElementById('upload') as HTMLInputElement;
            if (input) input.value = '';
        } catch (error) {
            console.error('Upload error:', error);
            alert(`Failed to upload video: ${error}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <Fragment>
            <input
                id="upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={uploading}
                style={{ display: 'none' }}
            />
            <label
                htmlFor="upload"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: uploading ? '#cccccc' : '#065fd4',
                    color: 'white',
                    borderRadius: '2px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                    if (!uploading) e.currentTarget.style.backgroundColor = '#0448a0';
                }}
                onMouseLeave={(e) => {
                    if (!uploading) e.currentTarget.style.backgroundColor = '#065fd4';
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                {uploading ? 'Uploading...' : 'Upload Video'}
            </label>
        </Fragment>
    )
}