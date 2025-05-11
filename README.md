
# 🧠 AI Manga-to-Anime Converter

> Transform static manga panels into fully animated anime-style scenes with AI-powered colorization, background generation, animation, and voiceover.

![MangaMotion](https://pplx-res.cloudinary.com/image/upload/v1746977755/gpt4o_images/oogvvra86qbvft3hyblm.png)

## 🚀 Overview

AI Manga-to-Anime Converter is a web application that lets you transform static manga panels into dynamic, colorful anime scenes. Using a combination of AI technologies, the application handles every step of the conversion process - from colorization to background generation, animation, voiceover, and final video composition.

## 📌 Features

- **🖼️ Panel Upload**: Upload your favorite manga panels in JPG or PNG format
- **🎨 AI Colorization**: Convert black & white manga to vibrant colored anime using PaintsChainer or Stable Diffusion
- **🌄 Background Generation**: Generate or enhance backgrounds with ControlNet technology
- **🌀 Animation**: Add motion to static images with pan & zoom effects or AI-based motion simulation
- **🗣️ Voiceover Generation**: Convert dialogue text to realistic speech with ElevenLabs
- **👄 Lip Synchronization**: (Optional) Animate character lip movements with D-ID technology
- **🎬 Video Composition**: Combine all elements into a final video with ffmpeg

## 🏗️ Project Structure

```
/
├─ public/
│  ├─ favicon.ico
│  ├─ placeholder.svg
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ ui/                         # shadcn/UI components
│  │  │  ├─ accordion.tsx
│  │  │  ├─ alert-dialog.tsx
│  │  │  ├─ alert.tsx
│  │  │  └─ ... (many more UI components)
│  │  ├─ AnimationOptions.tsx        # Animation selection component
│  │  ├─ BackgroundOptions.tsx       # Background generation options
│  │  ├─ ColorizedPreview.tsx        # Preview component for colorized manga
│  │  ├─ FileUpload.tsx              # File upload and processing component
│  │  ├─ Header.tsx                  # App header component
│  │  ├─ ProcessingPanel.tsx         # Processing status panel
│  │  ├─ ProcessingSteps.tsx         # Steps indicator component
│  │  ├─ VideoPreview.tsx            # Video preview component
│  │  └─ VoiceoverPanel.tsx          # Voice generation panel
│  ├─ hooks/
│  │  ├─ use-mobile.tsx              # Hook for mobile detection
│  │  ├─ use-toast.ts                # Toast notification hook
│  │  └─ useProcessing.ts            # Main processing workflow hook
│  ├─ lib/
│  │  └─ utils.ts                    # Utility functions
│  ├─ pages/
│  │  ├─ GalleryPage.tsx             # Gallery of processed videos
│  │  ├─ HomePage.tsx                # Landing page
│  │  ├─ Index.tsx                   # Index page
│  │  ├─ NotFound.tsx                # 404 page
│  │  └─ ProcessPage.tsx             # Main processing page
│  ├─ services/
│  │  ├─ processingService.ts        # Manga processing service
│  │  └─ uploadService.ts            # File upload service
│  ├─ App.tsx                        # Main App component
│  ├─ index.css                      # Global CSS
│  ├─ main.tsx                       # App entry point
│  └─ vite-env.d.ts                  # TypeScript declarations
├─ .gitignore                        # Git ignore file
├─ bun.lockb                         # Bun lock file
├─ components.json                   # shadcn/ui configuration
├─ eslint.config.js                  # ESLint configuration
├─ index.html                        # HTML entry point
├─ package-lock.json                 # npm lock file
├─ package.json                      # Package dependencies
├─ postcss.config.js                 # PostCSS configuration
├─ README.md                         # Project README
├─ tailwind.config.ts                # Tailwind CSS configuration
├─ tsconfig.app.json                 # TypeScript app configuration
├─ tsconfig.json                     # TypeScript configuration
├─ tsconfig.node.json                # TypeScript node configuration
└─ vite.config.ts                    # Vite configuration
```

## ⚙️ Tech Stack

| Layer        | Technologies                      |
|--------------|----------------------------------|
| Frontend     | React.js, Tailwind CSS, Vite     |
| UI Components| shadcn/ui, Lucide Icons          |
| Data Fetching| TanStack Query (React Query)     |
| Backend      | Python (FastAPI or Flask)        |
| AI Services  | PaintsChainer, ElevenLabs, SD    |
| Video Tools  | ffmpeg, Remotion                 |
| DevOps       | Docker, Celery + Redis           |

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+ (for backend)
- Docker (optional, for containerization)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/manga-to-anime-converter.git
cd manga-to-anime-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup (if applicable)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python app.py
```

## 🖼️ Screenshots

![Upload Process](https://files.oaiusercontent.com/file-58WTopGAzdwJCQ7PuwDeez?se=2025-05-11T21%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3DScreenshot%25202025-05-12%2520020053.png&sig=Nd3YcJBtUsVL073/qd6sL/Yme22tlJKAAljpr3KMXh8%3D)
![Processing](https://files09.oaiusercontent.com/file-Ma2a4YhNGYhJaSjpBpKCJw?se=2025-05-11T21%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3DScreenshot%25202025-05-12%2520020503.png&sig=y1o0bK3bo/W%2B1qXzBUQVuxVeY%2BjP4XsH/yWKW1pzdog%3D)
![Final Result](https://files.oaiusercontent.com/file-LmrCT9dVFjC5rE4f5J4XiL?se=2025-05-11T21%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3DScreenshot%25202025-05-12%2520020517.png&sig=0eojljHFjIg5K7/OInwg249ZiNLl5D32stmAMsR60jg%3D)

## 📢 API Integration

This project integrates with several AI APIs:

- **PaintsChainer/DeOldify**: For manga colorization
- **ControlNet via Replicate**: For background generation
- **RunwayML/Kaiber**: For motion simulation
- **ElevenLabs**: For voiceover generation
- **D-ID**: For lip synchronization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Yash Dharurkar [LINKEDIN](https://linkedin.com/in/yashdharurkar) - yashdharurkar@gmail.com

Project Link: [https://github.com/yourusername/manga-to-anime-converter](https://github.com/yourusername/manga-to-anime-converter)

---

Developed by Yash Dharurkar
