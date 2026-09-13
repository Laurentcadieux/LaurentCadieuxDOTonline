# Laurent Cadieux Personal Website

Professional portfolio website showcasing Laurent Cadieux's career in enterprise AI, automation, and infrastructure architecture.

## 🌐 Live Site

**www.laurentcadieux.online** - Public CV and portfolio with contact information

## 📋 Overview

This is a static personal website with an integrated voice-enabled AI assistant. The site presents Laurent's 25+ year career across UiPath, Technicolor, and enterprise infrastructure roles, with a focus on bilingual (FR/EN) leadership across Canadian Public Sector, SUMMIT, and FINS verticals.

### Key Features

- **Responsive Design**: Mobile-first, works on all screen sizes
- **Fast Loading**: Static Vite build, no heavy dependencies
- **Voice-Enabled AI Assistant**: Password-protected ElevenLabs voice conversation (LaurentContext)
- **Professional CV**: Downloadable PDF CV with career timeline
- **Accessibility**: WCAG 2.1 AA-compliant keyboard navigation and screen reader support

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 6** - Build tool and dev server
- **TypeScript 5.7** - Type safety
- **Lucide React** - Icon library
- **Plain CSS** - No heavy CSS frameworks

### Backend
- **Java 17** - Voice gateway server (simple HTTP server)
- **OpenJDK** - Runtime environment

### Deployment
- **Nginx** - Web server and reverse proxy
- **Ubuntu 22.04+** - Target server OS
- **SSL/TLS** - HTTPS via Certbot/Let's Encrypt

## 🚀 Quick Start

### For Visitors
Simply visit **www.laurentcadieux.online** to view the CV and portfolio. The voice assistant requires a password (configured server-side).

### For Developers

#### Prerequisites
- Node.js 20+
- Java 17+
- Git

#### Local Development
```bash
# Clone the repository
git clone git@github.com:Laurentcadieux/LaurentCadieuxDOTonline.git
cd LaurentCadieuxDOTonline

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### Voice Gateway (Local)
```bash
# Compile Java server
javac server/LaurentVoiceGateway.java

# Set environment variables
export ELEVENLABS_API_KEY="your_api_key"
export ELEVENLABS_AGENT_ID="your_agent_id"
export VOICE_ACCESS_SECRET="sherpa"  # or your preferred password
export PORT=8088

# Run the server
java -cp server LaurentVoiceGateway
```

## 📁 Project Structure

```
laurentcadieux.online/
├── src/
│   ├── main.tsx          # Main React component
│   └── styles.css        # Global styles and CSS variables
├── public/
│   ├── Laurent-Cadieux-CV-2026-August.pdf    # Downloadable CV
│   └── laurent-cadieux-linkedin.jpg          # Professional photo
├── server/
│   └── LaurentVoiceGateway.java              # Voice authentication backend
├── elevenlabs/
│   └── laurent-context-agent.json           # ElevenLabs agent configuration
├── DESIGN.md                                  # Design documentation and brand guidelines
├── DEPLOYMENT.md                              # Complete Ubuntu server deployment guide
├── package.json                               # Node.js dependencies and scripts
└── tsconfig.json                              # TypeScript configuration
```

## 📖 Documentation

- **[DESIGN.md](DESIGN.md)** - Design system, brand guidelines, visual language, and component architecture
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Step-by-step Ubuntu server setup, dependencies, Nginx configuration, SSL setup, and troubleshooting

## 🔑 Environment Variables

### Voice Gateway Backend
- `ELEVENLABS_API_KEY` - ElevenLabs API key for voice conversations
- `ELEVENLABS_AGENT_ID` - ElevenLabs agent ID for LaurentContext
- `VOICE_ACCESS_SECRET` - Password for unlocking the voice assistant (default: "sherpa")
- `PORT` - Voice gateway server port (default: 8088)

### Frontend
No environment variables required. The voice widget communicates with the backend via the `/api/voice/` endpoint.

## 🚢 Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete Ubuntu server setup instructions:

1. Install Node.js 20, Java 17, and Nginx
2. Clone the repository
3. Build the frontend (`npm run build`)
4. Compile and configure the Java voice gateway
5. Set up Nginx with SSL/TLS
6. Configure systemd service for the backend

**Estimated setup time**: 30-45 minutes on a fresh Ubuntu server.

## 🔧 Development Notes

### Adding Content
- CV content, experience, and skills are in `src/main.tsx`
- Static assets (PDF, images) go in `public/`
- Design tokens (colors, spacing) are CSS variables in `src/styles.css`

### Styling
- No CSS framework - uses plain CSS with custom properties
- Responsive breakpoints: mobile (360px+), tablet, desktop, wide desktop
- Dark mode: Not implemented (warm off-white base design)

### Voice Widget
- Uses `@elevenlabs/react` for voice conversations
- Password-protected via Java backend
- CORS configured for `https://www.laurentcadieux.online`

### Build Output
- `npm run build` creates a `dist/` folder with optimized static files
- Static files can be served by any web server (Nginx, Apache, etc.)
- No build-time API calls or external dependencies

## 🤖 For the Next Agent

This repository will be handed off to another agent. Key handover notes:

### Current State
- ✅ GitHub repository: https://github.com/Laurentcadieux/LaurentCadieuxDOTonline.git
- ✅ Complete deployment documentation in DEPLOYMENT.md
- ✅ Design documentation in DESIGN.md
- ✅ SSH key configured: `~/.ssh/laurentcadieux_online`
- ✅ All source code committed and pushed

### Immediate Tasks
1. Deploy to Ubuntu server using DEPLOYMENT.md
2. Configure ElevenLabs API credentials
3. Set up SSL certificate
4. Test voice widget functionality
5. Monitor and maintain

### Known Requirements
- ElevenLabs API key and agent ID needed for voice widget
- Domain: www.laurentcadieux.online
- SSL certificate required for HTTPS (voice widget requires secure context)
- Java backend must run on port 8088 (or configured via PORT env var)

### Maintenance
- Regular dependency updates (`npm update`, `apt update`)
- SSL certificate auto-renewal via Certbot
- Monitor logs: Nginx (`/var/log/nginx/`), Java backend (`journalctl -u laurent-voice-gateway`)
- Security patches and updates

## 📞 Contact

For questions about this repository or deployment, contact:
- **Email**: laurentcadieux@gmail.com
- **Phone**: +1 514-838-2236
- **LinkedIn**: https://www.linkedin.com/in/laurent-cadieux-99a5705a

## 📄 License

This is a personal website project. All rights reserved.

---

**Last Updated**: 2026-09-13
**Version**: 0.1.0
**Build Revision**: 20260814-1220