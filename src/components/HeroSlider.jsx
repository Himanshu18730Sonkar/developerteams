import { useEffect, useRef, useState } from 'react';
import slide1 from '../assets/developerphoto/slide1.png';
import slide2 from '../assets/developerphoto/slide2.png';
import slide3 from '../assets/developerphoto/slide3.png';
import slide4 from '../assets/developerphoto/slide4.png';
import slide5 from '../assets/developerphoto/slide5.png';
import slide6 from '../assets/developerphoto/teams.png';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isCursorIdle, setIsCursorIdle] = useState(false);
  const idleTimeoutRef = useRef(null);
  const throttleRef = useRef(false);

  const slides = [
    {
      id: 1,
      title: "Welcome to Developer Buddy",
      description: "",
      image: slide6
    },
    {
      id: 2,
      title: "Himanshu Sonkar -- Frontend Developer",
      description: "A Profession web developer experience in building complex application. Check my website- himanshudeveloper.vercel.app",
      image: slide5
    },
    {
      id: 3,
      title: "Sumit Kumar -- UI/UX designer",
      description: "A basic UI/UX designer and web developer. Learning web developemt and UI/UX design",
      image: slide4
    },
    {
      id: 4,
      title: "Prashant -- Abot, Makerboard coder",
      description: "A todays Abot, Makerboard coder and helping in assembling Makerboard and Abot ",
      image: slide3
    },
    {
      id: 5,
      title: "Arnav -- PPT designer",
      description: "Todays PPT designer and helper in giving attractive idea!",
      image: slide2
    },
    {
      id: 6,
      title: "Brajesh ",
      description: " Makerboard and Abot assembling helper and coder of Abot and Makerboard.",
      image: slide1
    },
    {
      id: 7,
      title: "This and this ",
      description: "Script writer and explainer of todays project",
      image: slide1
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseMove = () => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    
    setIsCursorIdle(false);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsCursorIdle(true);
    }, 10000);
    
    setTimeout(() => {
      throttleRef.current = false;
    }, 200);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    handleMouseMove();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsCursorIdle(false);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovering, slides.length]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
      id="team-intro"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      <div className="relative w-full h-full mx-auto pt-10 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-800 ${index === 0 ? 'flex flex-col items-center justify-center' : 'flex items-center justify-center'} ${
              index === currentSlide 
                ? 'opacity-100 transform scale-100 translate-x-0 z-10' 
                : index < currentSlide
                ? 'opacity-0 transform scale-90 -translate-x-full'
                : 'opacity-0 transform scale-90 translate-x-full'
            }`}
          >
            {index === 0 ? (
              <>
                {/* First slide - Text on top */}
                <div className="px-12 max-w-2xl relative z-20">
                  <div className="relative z-20 max-w-2xl text-center">
                    <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-xl">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-200 leading-relaxed drop-shadow-lg">
                      {slide.description}
                    </p>
                  </div>
                </div>

                {/* First slide - Image below */}
                <div className={`relative overflow-hidden rounded-lg shadow-lg flex-shrink-0 w-[700px] mt-4`}>
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-contain rounded-lg float-slow"
                  />
                
                </div>
              </>
            ) : (
              <>
                {/* Other slides - Image on left */}
                <div className={`relative overflow-hidden rounded-lg shadow-lg flex-shrink-0 ${slide.image === slide6 ? 'w-[350px]' : 'w-[200px]'}`}>
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-contain rounded-lg float-slower"
                  />
              
                </div>

                {/* Other slides - Text on right */}
                <div className="flex-1 flex items-start justify-center px-12 max-w-2xl relative z-20">
                  <div className="relative z-20 max-w-2xl">
                    <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-xl">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-200 leading-relaxed drop-shadow-lg">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 left-12 -translate-y-1/2 w-16 h-16 bg-[rgba(255,107,53,0.8)] border-2 border-[#ff6b35] rounded-full flex items-center justify-center z-30 transition-all duration-300 hover:bg-[rgba(255,107,53,1)] hover:scale-110 hover:shadow-xl hover:shadow-[rgba(255,107,53,0.8)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18L9 12L15 6"/>
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-12 -translate-y-1/2 w-16 h-16 bg-[rgba(255,107,53,0.8)] border-2 border-[#ff6b35] rounded-full flex items-center justify-center z-30 transition-all duration-300 hover:bg-[rgba(255,107,53,1)] hover:scale-110 hover:shadow-xl hover:shadow-[rgba(255,107,53,0.8)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 18L15 12L9 6"/>
          </svg>
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full border-2 border-[rgba(255,107,53,0.6)] transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#ff6b35] scale-125 shadow-lg shadow-[rgba(255,107,53,0.8)]' 
                  : 'bg-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,107,53,0.7)] hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
