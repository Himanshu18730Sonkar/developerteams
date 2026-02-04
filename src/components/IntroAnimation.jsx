import { useEffect, useRef, useState } from 'react';

export default function IntroAnimation({ onComplete }) {
  const stageRef = useRef(null);
  const ribbonsRef = useRef(null);
  const textRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);
  const textStr = "DEVELOPER BUDDY";

  useEffect(() => {
    // Prevent scrollbar from appearing/disappearing by using scrollbar-gutter
    document.documentElement.style.scrollbarGutter = 'stable';
    document.body.style.overflow = 'hidden';
    
    const setupText = () => {
      const textBox = textRef.current;
      if (!textBox) return;
      
      textBox.innerHTML = '';
      textStr.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${0.1 + (i * 0.08)}s`;
        textBox.appendChild(span);
      });
    };

    const createRibbons = () => {
      const ribbonsBox = ribbonsRef.current;
      if (!ribbonsBox) return;
      
      ribbonsBox.innerHTML = '';
      for (let i = 0; i < 60; i++) {
        const ribbon = document.createElement('div');
        ribbon.className = 'ribbon';
        const xPos = 150 + Math.random() * 500;
        const delay = Math.random() * 0.7;
        const color = xPos < 350 ? '#3D4049' : '#F88B2B';
        
        ribbon.style.left = `${xPos}px`;
        ribbon.style.setProperty('--color', color);
        ribbon.style.animationDelay = `${delay}s`;
        ribbon.style.width = `${1 + Math.random() * 3}px`;
        ribbonsBox.appendChild(ribbon);
      }
    };

    const triggerIntro = () => {
      const stage = stageRef.current;
      if (!stage) return;
      
      stage.classList.remove('active');
      void stage.offsetWidth;
      setupText();
      createRibbons();
      stage.classList.add('active');
    };

    // Trigger animation on mount
    triggerIntro();

    // Auto-hide after animation completes (6.1 seconds total)
    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 6100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
    };
  }, [onComplete]);

  return (
    <>
      {showIntro && (
        <div className="intro-animation-wrapper">
      <style>{`
        :root {
          --slate: #3D4049;
          --orange: #F88B2B;
          --bg: #050505;
        }

        .intro-animation-wrapper {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1200px;
        }

        .stage {
          position: relative;
          width: 800px;
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .brand-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          opacity: 1; 
        }

        .logo-final {
          width: 450px;
          height: auto;
          z-index: 10;
          opacity: 0;
        }

        .text-reveal {
          margin-top: -60px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: 0.15em;
          color: white;
          display: flex;
          gap: 4px;
        }

        .letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(15px) scale(0.7);
          filter: blur(8px);
        }

        .stage.active .brand-container {
          animation: 
              slowZoom 3.5s linear forwards 1.7s,
              flyOffFrontTop 1.1s cubic-bezier(0.7, 0, 0.84, 0) forwards 5s;
        }

        .stage.active .logo-final {
          animation: snapIn 0.5s cubic-bezier(0.15, 1, 0.3, 1) forwards 1.4s;
        }

        .stage.active .letter {
          animation: letterReveal 0.5s cubic-bezier(0.2, 0, 0.2, 1) forwards;
        }

        .ribbon-container {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .ribbon {
          position: absolute;
          width: 2px;
          height: 0%;
          background: linear-gradient(to bottom, transparent, var(--color), white, var(--color), transparent);
          filter: blur(1px);
          opacity: 0;
        }

        .stage.active .ribbon {
          animation: ribbonFlow 1.2s cubic-bezier(0.5, 0, 0.2, 1) forwards;
        }

        @keyframes ribbonFlow {
          0% { height: 0%; opacity: 0; transform: translateY(200px); }
          40% { height: 160%; opacity: 1; transform: translateY(0); }
          100% { height: 40%; opacity: 0; transform: translateY(-300px); }
        }

        @keyframes letterReveal {
          0% { opacity: 0; transform: translateY(15px) scale(0.5); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }

        @keyframes snapIn {
          0% { opacity: 0; transform: scale(0.75) translateZ(-250px); filter: blur(30px) brightness(3); }
          100% { opacity: 1; transform: scale(1) translateZ(0); filter: blur(0px) brightness(1); }
        }

        @keyframes slowZoom {
          0% { transform: scale(1) translateZ(0); }
          100% { transform: scale(1.15) translateZ(60px); }
        }

        @keyframes flyOffFrontTop {
          0% { 
              transform: scale(1.15) translateZ(60px) translateY(0); 
              filter: blur(0px); 
              opacity: 1; 
          }
          15% {
              transform: scale(1.1) translateZ(40px) translateY(10px);
              filter: blur(1px);
          }
          100% { 
              transform: scale(3.5) translateZ(800px) translateY(-1400px); 
              filter: blur(25px); 
              opacity: 0; 
          }
        }

        .burst {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(248,139,43,0.12) 0%, transparent 65%);
          opacity: 0;
        }

        .stage.active .burst {
          animation: burstFlash 0.9s ease-out forwards 1.3s;
        }

        @keyframes burstFlash {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(2.5); }
        }
      `}</style>

      <div className="stage active" ref={stageRef}>
        <div className="burst"></div>
        <div className="ribbon-container" ref={ribbonsRef}></div>

        <div className="brand-container">
          <div className="logo-final">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="100%" viewBox="0 0 512 336" xmlSpace="preserve">
              <path fill="var(--slate)" stroke="none" d="M185.000702,111.114738 C200.473923,111.377174 215.545654,110.001587 230.386429,112.640770 C254.201492,116.875877 269.067871,135.091309 269.392609,159.384140 C269.524658,169.263458 269.230103,179.044693 265.832825,188.439224 C258.999237,207.336136 242.702087,218.502838 219.903671,219.170837 C203.419205,219.653824 186.909622,219.237869 170.412186,219.354645 C166.970245,219.378998 165.706512,218.084335 165.712616,214.654236 C165.771393,181.657639 165.770218,148.660751 165.660156,115.664360 C165.647964,112.010231 167.301239,111.048416 170.503082,111.108147 C175.167419,111.195145 179.834778,111.121490 185.000702,111.114738 M209.491486,197.803223 C212.817657,197.771027 216.146011,197.804428 219.469620,197.694748 C230.994553,197.314453 239.804550,191.038300 243.732849,180.243698 C246.879990,171.595688 247.204941,162.691788 245.079803,153.798492 C242.231018,141.876907 234.776505,134.847229 222.435059,133.093460 C212.487259,131.679855 202.515289,132.698761 192.559784,132.405472 C189.962234,132.328964 189.070755,133.601410 189.077103,136.064865 C189.126846,155.358536 189.137238,174.652374 189.115158,193.946121 C189.112030,196.675110 190.307480,197.871750 193.026581,197.837463 C198.181885,197.772430 203.338531,197.813950 209.491486,197.803223 z"></path>
              <path fill="var(--orange)" stroke="none" d="M340.366394,168.658417 C352.063934,180.519302 350.841278,207.420212 328.252502,215.643906 C322.582397,217.708145 316.721191,219.143936 310.713623,219.203857 C292.560791,219.384918 274.405243,219.300674 256.250763,219.283752 C255.167419,219.282745 253.891663,219.662567 253.065552,218.430267 C253.015015,216.732254 254.483795,216.322586 255.526962,215.639099 C261.199219,211.922684 265.755737,207.069656 269.356903,201.414688 C271.103760,198.671585 273.105530,197.642563 276.285797,197.685104 C286.776855,197.825485 297.271179,197.704330 307.764099,197.734131 C310.980438,197.743256 314.037842,197.171341 316.982574,195.870499 C321.471252,193.887634 323.595703,190.222916 323.551514,185.576096 C323.508759,181.080750 321.125763,177.598007 316.966095,175.765732 C313.287506,174.145340 309.360687,173.638092 305.281921,173.718781 C296.696899,173.888626 288.106140,173.770416 279.225128,173.770416 C279.572113,167.438431 280.027008,161.997208 279.026947,156.566376 C278.488159,153.640533 280.877197,153.309174 282.876068,153.289337 C289.864288,153.220001 296.854401,153.304886 303.843445,153.368500 C308.504608,153.410934 312.931091,152.683853 315.806091,148.571274 C319.802124,142.855011 316.966492,135.630783 310.023804,133.497406 C306.144867,132.305481 302.136230,132.361603 298.133881,132.418182 C290.653625,132.523941 283.172729,132.595230 275.693176,132.736206 C273.977264,132.768539 272.201050,132.867493 271.204254,131.234695 C266.630127,123.742134 260.702881,117.564026 253.473083,113.176468 C253.494507,111.798088 254.036911,111.358765 254.714554,111.352661 C274.017242,111.178711 293.330597,110.215637 312.613647,111.747574 C316.914581,112.089256 321.113159,113.302589 325.117035,115.032387 C345.571594,123.869492 345.457123,150.401154 333.256744,160.421341 C332.765778,160.824570 332.377533,161.352814 331.728424,162.052338 C334.622955,164.246445 337.364960,166.324951 340.366394,168.658417 z"></path>
            </svg>
          </div>

          <div className="text-reveal" ref={textRef}></div>
        </div>
      </div>
        </div>
      )}
    </>
  );
}
