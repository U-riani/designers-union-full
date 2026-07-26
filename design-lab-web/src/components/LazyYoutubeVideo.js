import React, { useState, useEffect } from "react";

const LazyYouTubeVideo = ({ youtubeObj }) => {
  const [isIframeLoaded, setIframeLoaded] = useState(false);
//   const [thumbnailUrl, setThumbnailUrl] = useState("");

//   const getVideoId = (url) => {
//     const regExp =
//       /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)?([\w-]{11})|(?:youtu\.be\/)([\w-]{11})/;
//     const match = url.match(regExp);
//     return match && (match[1] || match[2]);
//   };

//   const videoId = getVideoId(youtubeUrl);
// console.log('--', youtubeObj)

//   // Thumbnail URLs
//   const maxResUrl = `https://img.youtube.com/vi/${youtubeObj}/maxresdefault.jpg`;
//   const highQualityUrl = `https://img.youtube.com/vi/${youtubeObj}/hqdefault.jpg`;
//   const standardQualityUrl = `https://img.youtube.com/vi/${youtubeObj}/sddefault.jpg`;

//   useEffect(() => {
//     // if (videoId) setThumbnailUrl(maxResUrl);
//     if (!youtubeObj.videoId) return;

//     const fetchImage = async () => {
//       try {
//         const response = await fetch(maxResUrl);
//         console.log('-----', response)

//         if (response.ok) {
//           setThumbnailUrl(maxResUrl);
//         } else {
//           setThumbnailUrl(standardQualityUrl); // Fallback to high-quality thumbnail
//         }
//       } catch (err) {
//         console.error("Failed to fetch thumbnail:", err);
//         setThumbnailUrl(standardQualityUrl); // Final fallback
//       }

//     };
//     fetchImage();
//   }, [youtubeObj.videoId]);

//   const handleImageError = () => {
//     if (thumbnailUrl === maxResUrl) {
//       setThumbnailUrl(highQualityUrl);
//     } else if (thumbnailUrl === highQualityUrl) {
//       setThumbnailUrl(standardQualityUrl);
//     }
//   };

  return (
    <div
      className="lazy-youtube-video"
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        maxWidth: "100%",
        aspectRatio: "16 / 9",
      }}
    >
      {!isIframeLoaded ? (
        <div
          className="video-thumbnail"
          onClick={() => setIframeLoaded(true)}
          style={{
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            backgroundImage: `url(${youtubeObj.thumbnail})`,
          }}
        >
         
          <div
            className="play-button"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "3rem",
              color: "#fff",
              background: "rgba(0, 0, 0, 0.6)",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              paddingLeft: '8px',
              paddingTop: '8px',
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
            aria-label="Play video"
          >
            ▶
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeObj.videoId}?autoplay=1`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      )}
    </div>
  );
};

export default LazyYouTubeVideo;
