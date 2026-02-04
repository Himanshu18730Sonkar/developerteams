# Developer Buddy - Project Showcase Website

A modern, interactive website showcasing your team with stunning animations and an orange theme.

## Features

### 1. **Navigation Bar**
- Logo and "Developer Buddy" branding on the left
- Navigation links (Team Intro, About, Makerboard) on the right
- 2px orange border with glow effects
- Sticky positioning for easy navigation

### 2. **Hero Slider Section**
- 6 interactive slides with previous/next controls
- Each slide contains:
  - Background image
  - Animated title
  - Description text
- Attractive orange-themed gradients and animations
- Dot indicators for easy navigation

### 3. **Video Section**
- Content on the left (heading & description)
- Video on the right with:
  - Looping background video
  - Preview button for full-screen view
  - **Frame-by-frame scroll animation** for 3D effect
  - Progress bar showing scroll progress
- Orange-themed styling throughout

### 4. **Image Section** (Reversed Layout)
- Image on the left with floating badges
- Content on the right with:
  - Statistics grid
  - Call-to-action button
- Smooth scroll animations
- Decorative elements with orange theme

## Setup Instructions

### 1. Add Your Images

Place your images in the `public/images/` folder:

- **Logo**: `public/images/logo.png` (recommended size: 50x50px or larger square)
- **Slider Images**:
  - `public/images/slide1.jpg`
  - `public/images/slide2.jpg`
  - `public/images/slide3.jpg`
  - `public/images/slide4.jpg`
  - `public/images/slide5.jpg`
  - `public/images/slide6.jpg`
  (recommended size: 1920x1080px for best quality)
- **Team Showcase**: `public/images/team-showcase.jpg` (recommended size: 800x1000px portrait)

### 2. Add Videos (Optional)

If you want to use the video section, place your videos in the `public/videos/` folder:

- **Main Demo Video**: `public/videos/demo.mp4`
- **Background Loop**: `public/videos/background-loop.mp4`

If you don't have videos yet, the website will still work (videos will be hidden until files are added).

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Customization

### Change Colors

The orange theme is defined in CSS variables in `src/index.css`:

```css
--primary-orange: #ff6b35;
--secondary-orange: #ff8c42;
```

### Edit Slider Content

Open `src/components/HeroSlider.jsx` and modify the `slides` array to change titles and descriptions.

### Edit Section Content

- Video Section: Edit `src/components/VideoSection.jsx`
- Image Section: Edit `src/components/ImageSection.jsx`
- Navbar: Edit `src/components/Navbar.jsx`

## Technologies Used

- **React 19** - UI Framework
- **Vite** - Build Tool
- **CSS3** - Animations & Styling
- **Intersection Observer API** - Scroll animations
- **Custom Scroll Animations** - Frame-by-frame video control

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance Tips

1. Optimize images before uploading (use WebP format for better compression)
2. Keep videos under 10MB for faster loading
3. Use lazy loading for images below the fold

## License

MIT License - Feel free to use for your projects!

---

**Enjoy your stunning project showcase website! 🚀**
