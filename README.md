
# 🧠 AI Manga-to-Anime Converter

> Transform static manga panels into fully animated anime-style scenes with AI-powered colorization, background generation, animation, and voiceover.

![MangaMotion](https://via.placeholder.com/1000x300?text=Manga+to+Anime+AI+Pipeline)

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
src/
├── components/           # React components
│   ├── ui/               # shadcn/UI components
│   ├── FileUpload.tsx    # File upload component
│   ├── ProcessingSteps.tsx # Processing progress indicator
│   └── ...
├── hooks/                # Custom React hooks
│   ├── useProcessing.ts  # Processing workflow hook
│   └── ...
├── pages/                # Page components
│   ├── HomePage.tsx      # Landing page
│   ├── ProcessPage.tsx   # Main processing page
│   └── GalleryPage.tsx   # Processed videos gallery
├── services/             # API and processing services
│   └── processingService.ts # Manga processing service
└── ...
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

![Upload Process](https://via.placeholder.com/600x400?text=Upload+Screen)
![Processing](https://via.placeholder.com/600x400?text=Processing+Screen)
![Final Result](https://via.placeholder.com/600x400?text=Final+Result)

## 📢 API Integration

This project integrates with several AI APIs:

- **PaintsChainer/DeOldify**: For manga colorization
- **ControlNet via Replicate**: For background generation
- **RunwayML/Kaiber**: For motion simulation
- **ElevenLabs**: For voiceover generation
- **D-ID**: For lip synchronization

## 🛠️ Environment Variables

Create a `.env` file in the project root:

```
VITE_PAINTSCHAINER_API_KEY=your_paintschainer_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key
VITE_DID_API_KEY=your_did_key
VITE_REPLICATE_API_TOKEN=your_replicate_token
```

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

Your Name - [@Yash Dharurkar](www.linkedin.com/in/yashdharurkar) - yashdharurkar@gmail.com

Project Link: [https://github.com/yourusername/manga-to-anime-converter](https://github.com/yourusername/manga-to-anime-converter)

---

Developed by Yash Dharurkar
