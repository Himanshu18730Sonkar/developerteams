import { useState } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to Developer Buddy",
      description: "Empowering innovation through collaboration and cutting-edge technology solutions.",
      image: "/images/slide1.jpeg"
    },
    {
      id: 2,
      title: "Meet Our Amazing Team",
      description: "Passionate developers dedicated to creating exceptional digital experiences.",
      image: "/images/slide2.svg"
    },
    {
      id: 3,
      title: "Innovation at Its Best",
      description: "Building the future with modern frameworks and creative problem-solving.",
      image: "/images/slide3.svg"
    },
    {
      id: 4,
      title: "Collaborative Excellence",
      description: "Working together to turn visionary ideas into reality through teamwork.",
      image: "/images/slide4.svg"
    },
    {
      id: 5,
      title: "Quality & Performance",
      description: "Delivering high-performance solutions with attention to every detail.",
      image: "/images/slide5.svg"
    },
    {
      id: 6,
      title: "Your Success, Our Mission",
      description: "Committed to excellence in every project we undertake together.",
      image: "/images/slide6.svg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black" id="team-intro">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-800 ${
              index === currentSlide 
                ? 'opacity-100 transform scale-100 translate-x-0 z-10' 
                : index < currentSlide
                ? 'opacity-0 transform scale-90 -translate-x-full'
                : 'opacity-0 transform scale-90 translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-transparent to-[#1a1a1a] opacity-80"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-30 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,107,53,0.4)] via-transparent to-[rgba(255,140,66,0.3)]"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 max-w-5xl px-8">
              <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-xl">
                {slide.title}
              </h1>
              <p className="text-2xl text-gray-100 leading-relaxed drop-shadow-lg">
                {slide.description}
              </p>
            </div>
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
