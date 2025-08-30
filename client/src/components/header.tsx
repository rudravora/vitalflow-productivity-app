import { Leaf, Star } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center text-white mb-8 relative">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 animate-glow" data-testid="text-app-title">
        🌱 ProductiviGrow
      </h1>
      <p className="text-lg sm:text-xl opacity-90 mb-6 font-medium" data-testid="text-app-tagline">
        Your Personal Productivity Ecosystem
      </p>
      
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-1/4 w-20 h-20 opacity-20 animate-float" style={{ animationDelay: '0s' }}>
        <Leaf className="text-4xl text-green-300 w-full h-full" />
      </div>
      <div className="absolute top-10 right-1/4 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <Star className="text-3xl text-yellow-300 w-full h-full" />
      </div>
    </header>
  );
}
