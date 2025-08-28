# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, React 19, and Tailwind CSS. Features a clean design, smooth animations, and Firebase integration for contact forms and authentication.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Custom CSS animations and transitions
- **Firebase Integration**: Contact forms, authentication, and real-time features
- **Performance Optimized**: Built with production-grade optimizations
- **Docker Ready**: Production-ready Docker configuration
- **SEO Friendly**: Optimized for search engines

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 3, Custom CSS animations
- **UI Components**: Radix UI, Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Docker, Multi-stage builds
- **Development**: ESLint, Prettier, Hot reloading

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── login/             # Login page
│   ├── products/          # Products page
│   ├── stats/             # Statistics page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── navigation.tsx    # Navigation component
│   └── FloatingContact.tsx # Floating contact button
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── styles/               # Additional styles
├── Dockerfile            # Production Docker configuration
├── .dockerignore         # Docker build exclusions
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Firebase project (for full functionality)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp firebase-config.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

For production deployment using Docker, see the comprehensive guide:

📖 **[Docker Production Guide](DOCKER_README.md)**

### Quick Docker Commands

```bash
# Build the image
./build-docker.sh

# Run the container
docker run -d --name portfolio-website -p 3000:3000 portfolio-website:latest
```

## 🔥 Firebase Setup

For Firebase configuration and setup instructions:

📖 **[Firebase Setup Guide](FIREBASE_SETUP.md)**

### Required Firebase Services

- **Authentication**: User login and registration
- **Firestore**: Database for dynamic content
- **Storage**: File uploads and media storage
- **Hosting**: Optional deployment option

## 📱 Available Pages

- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Personal information and skills
- **Products** (`/products`) - Portfolio projects and work
- **Blog** (`/blog`) - Articles and insights
- **Stats** (`/stats`) - Analytics and achievements
- **Login** (`/login`) - Authentication page

## 🎨 Customization

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Located in `app/globals.css`
- **Component Library**: Shadcn/ui components
- **Theme Support**: Dark/light mode ready

### Components

- **Navigation**: Responsive navigation menu
- **Contact Form**: Firebase-powered contact system
- **Animations**: Custom CSS animations and transitions
- **Responsive**: Mobile-first responsive design

## 🚀 Production Build

### Local Build

```bash
npm run build
npm start
```

### Docker Build

```bash
./build-docker.sh
```

## 📊 Performance

- **Lighthouse Score**: Optimized for performance
- **Bundle Size**: Minimal JavaScript bundle
- **Image Optimization**: Next.js image optimization
- **Caching**: Efficient caching strategies

## 🔒 Security

- **Environment Variables**: Secure configuration management
- **Firebase Security Rules**: Database and storage security
- **Input Validation**: Form validation with Zod
- **HTTPS Ready**: Production security best practices

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `./build-docker.sh` - Build Docker image

## 🌐 Deployment

### Docker (Recommended)

See [Docker Production Guide](DOCKER_README.md) for detailed instructions.

### Vercel

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the linked guides above
- **Issues**: Open an issue on GitHub
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)

## 🔗 Quick Links

- 📖 **[Docker Production Guide](DOCKER_README.md)** - Complete Docker deployment guide
- 🔥 **[Firebase Setup Guide](FIREBASE_SETUP.md)** - Firebase configuration and setup
- 🚀 **[Live Demo](https://your-domain.com)** - View the live website
- 📁 **[Source Code](https://github.com/yourusername/portfolio-website)** - GitHub repository

---

Built with ❤️ using Next.js, React, and Tailwind CSS
