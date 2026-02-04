import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import VideoSection from './components/VideoSection'
import ImageSection from './components/ImageSection'
import IntroAnimation from './components/IntroAnimation'
import ComponentsPage from './pages/ComponentsPage'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main className="w-full overflow-x-hidden">
              <HeroSlider />
              <VideoSection />
              <ImageSection />
            </main>
          }
        />
        <Route path="/components" element={<ComponentsPage />} />
      </Routes>
    </div>
  )
}

export default App
