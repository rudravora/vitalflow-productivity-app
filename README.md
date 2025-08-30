# ⚡ VitalFlow

**Your Personal Productivity Ecosystem**

VitalFlow is a gamified productivity application that adapts to your mood and energy levels to provide personalized tips, track habits, and visualize progress through an interactive garden system.

![VitalFlow Preview](https://img.shields.io/badge/VitalFlow-Productivity%20Ecosystem-blueviolet?style=for-the-badge)

## ✨ Features

- **🎭 Mood-Based Tips**: 15+ productivity tips tailored to 5 different moods (energetic, tired, focused, overwhelmed, creative)
- **⚡ Energy Tracking**: Interactive energy meter with visual feedback
- **🌱 Progress Garden**: Watch plants grow as you complete tasks and learn new tips
- **🏆 Achievement System**: Unlock badges and track your productivity journey
- **📊 Habit Tracking**: Build and monitor daily micro-habits
- **🎨 Glass Morphism UI**: Beautiful translucent design with smooth animations
- **📱 Responsive Design**: Works seamlessly on all device sizes
- **⚡ Real-time Updates**: Live progress tracking with optimistic UI updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vitalflow.git
   cd vitalflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **UI Library**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS with custom animations
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Database**: PostgreSQL with Drizzle ORM (configured for production)
- **Development Storage**: In-memory storage for quick setup

### Project Structure

```
vitalflow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Shadcn/ui components
│   │   │   ├── achievements.tsx
│   │   │   ├── energy-meter.tsx
│   │   │   ├── habit-tracker.tsx
│   │   │   ├── mood-selector.tsx
│   │   │   ├── progress-garden.tsx
│   │   │   └── ...
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   ├── pages/         # Page components
│   │   └── index.css      # Global styles
│   └── index.html
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema & TypeScript types
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎮 How It Works

1. **Select Your Mood**: Choose from 5 different mood states
2. **Get Personalized Tips**: Receive productivity advice tailored to your current state
3. **Track Your Energy**: Monitor and adjust your energy levels throughout the day
4. **Grow Your Garden**: Complete tasks to unlock new plants in your progress garden
5. **Earn Achievements**: Unlock badges as you build productive habits
6. **Build Habits**: Track daily micro-habits with visual progress bars

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema (requires DATABASE_URL)

### Environment Variables

For production with PostgreSQL:
```bash
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```

### Database Setup (Optional)

The app works out-of-the-box with in-memory storage. For persistent data:

1. Set up a PostgreSQL database (recommend [Neon](https://neon.tech) for serverless)
2. Add `DATABASE_URL` to your environment variables
3. Run `npm run db:push` to create tables

## 🎨 Customization

### Adding New Productivity Tips

Edit `server/storage.ts` to add new tips to the seed data:

```typescript
{
  mood: "focused",
  category: "Deep Work", 
  text: "Your custom productivity tip here",
  difficulty: "Beginner",
  timesSaved: "15 mins/day"
}
```

### Styling

- Colors and themes: `client/src/index.css`
- Component styling: `tailwind.config.ts`
- Animations: Custom CSS in `index.css`

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel/Netlify

The app is configured for easy deployment to modern hosting platforms. The build process creates a `dist` folder with both frontend and backend ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Replit](https://replit.com) for rapid development
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Animations powered by [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ⚡ by [Your Name]**

*Boost your productivity, one tip at a time!*