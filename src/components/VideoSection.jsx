import { useState, useEffect, useRef } from 'react';
import videoFile from '../assets/abotvideo.webm';

const VideoSection = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const previewVideoRef = useRef(null);
  const lastMouseXRef = useRef(null);
  const accumulatedDeltaRef = useRef(0);
  const isHoverScrubRef = useRef(false);

  const FRAMES_PER_STEP = 5;
  const PIXELS_PER_STEP = 5;
  const FALLBACK_FPS = 30;

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && videoRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
          setScrollProgress(progress);
          
          if (videoRef.current.duration) {
            videoRef.current.currentTime = videoRef.current.duration * progress;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreview = () => {
    setShowPreview(true);
    if (previewVideoRef.current) {
      previewVideoRef.current.play();
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
  };


  const handlePreviewMouseDown = (event) => {
    isHoverScrubRef.current = true;
    lastMouseXRef.current = event.clientX;
    accumulatedDeltaRef.current = 0;

    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
  };

  const handlePreviewMouseUp = () => {
    isHoverScrubRef.current = false;
    lastMouseXRef.current = null;
    accumulatedDeltaRef.current = 0;

    if (previewVideoRef.current) {
      previewVideoRef.current.play();
    }
  };

  const handlePreviewMouseLeave = () => {
    if (!isHoverScrubRef.current) {
      return;
    }

    isHoverScrubRef.current = false;
    lastMouseXRef.current = null;
    accumulatedDeltaRef.current = 0;

    if (previewVideoRef.current) {
      previewVideoRef.current.play();
    }
  };

  const handlePreviewMouseMove = (event) => {
    if (!isHoverScrubRef.current || !previewVideoRef.current) {
      return;
    }

    const currentX = event.clientX;
    if (lastMouseXRef.current === null) {
      lastMouseXRef.current = currentX;
      return;
    }

    const deltaX = currentX - lastMouseXRef.current;
    lastMouseXRef.current = currentX;
    accumulatedDeltaRef.current += deltaX;

    const steps = Math.trunc(accumulatedDeltaRef.current / PIXELS_PER_STEP);
    if (steps === 0) {
      return;
    }

    accumulatedDeltaRef.current -= steps * PIXELS_PER_STEP;

    const video = previewVideoRef.current;
    const fps = Number.isFinite(video.getVideoPlaybackQuality?.().totalVideoFrames)
      ? Math.max(FALLBACK_FPS, FALLBACK_FPS)
      : FALLBACK_FPS;
    const stepSeconds = (FRAMES_PER_STEP / fps) * steps;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;

    const nextTime = Math.min(Math.max(video.currentTime + stepSeconds, 0), duration || 0);
    video.currentTime = nextTime;
  };

  const stepPreviewFrames = (direction) => {
    if (!previewVideoRef.current) {
      return;
    }

    const video = previewVideoRef.current;
    video.pause();
    const fps = FALLBACK_FPS;
    const stepSeconds = (FRAMES_PER_STEP / fps) * direction;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const startTime = video.currentTime;
    const targetTime = Math.min(Math.max(startTime + stepSeconds, 0), duration || 0);
    const animationDuration = 150;
    const startStamp = performance.now();

    const tick = (now) => {
      const elapsed = now - startStamp;
      const progress = Math.min(elapsed / animationDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      video.currentTime = startTime + (targetTime - startTime) * eased;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <section className="relative min-h-screen px-8 py-24 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] overflow-hidden" ref={sectionRef} id="about">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-5 z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoFile} type="video/webm" />
      </video>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="px-8">
          <h2 className="text-5xl font-bold text-white mb-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] bg-clip-text text-transparent">
            Experience Innovation
          </h2>
          <p className="text-xl text-gray-300 leading-8 mb-6 text-justify">
            Discover our cutting-edge solutions through this immersive visual journey. 
            Our team combines creativity with technology to deliver exceptional results 
            that exceed expectations and drive success.
          </p>
          <p className="text-xl text-gray-300 leading-8 mb-8 text-justify">
            Scroll to explore the 3D effect as the video transforms frame by frame, 
            revealing the depth of our work and attention to detail in every project we undertake.
          </p>
          <button 
            onClick={handlePreview}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] border-2 border-[#ff6b35] rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(255,107,53,0.6)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3L19 12L5 21V3Z"/>
            </svg>
            Preview Video
          </button>
        </div>

        <div className="relative">
          <div 
            className="relative w-full aspect-video border-4 border-[#ff6b35] rounded-3xl overflow-hidden shadow-2xl shadow-[rgba(255,107,53,0.4)] transition-transform duration-100"
            style={{
              transform: `perspective(1000px) rotateY(${scrollProgress * 15 - 7.5}deg) scale(${0.9 + scrollProgress * 0.1})`,
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            >
              <source src={videoFile} type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,107,53,0.1)] via-transparent to-[rgba(255,140,66,0.1)] pointer-events-none"></div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[#ff6b35] font-bold mb-4">Scroll to explore</p>
            <div className="w-full h-2 bg-[rgba(255,107,53,0.2)] rounded-full overflow-hidden border border-[rgba(255,107,53,0.3)]">
              <div 
                className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] transition-all duration-100 shadow-lg shadow-[rgba(255,107,53,0.8)]"
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handlePreviewMouseDown}
            onMouseUp={handlePreviewMouseUp}
            onMouseLeave={handlePreviewMouseLeave}
            onMouseMove={handlePreviewMouseMove}
          >
            <button 
              onClick={closePreview}
              className="absolute -top-14 right-0 w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-[#ff8c42] hover:rotate-90"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6L18 18"/>
              </svg>
            </button>
            <video
              ref={previewVideoRef}
              className="w-full h-full rounded-xl shadow-2xl"
              controls
              autoPlay
              loop
            >
              <source src={videoFile} type="video/webm" />
            </video>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => stepPreviewFrames(-1)}
                className="px-5 py-2 rounded-full bg-[#1a1a1a] text-white border border-[#ff6b35] hover:bg-[#ff6b35] transition-colors"
              >
                -5 Frames
              </button>
              <button
                type="button"
                onClick={() => stepPreviewFrames(1)}
                className="px-5 py-2 rounded-full bg-[#1a1a1a] text-white border border-[#ff6b35] hover:bg-[#ff6b35] transition-colors"
              >
                +5 Frames
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
