import { ProductivityTip } from "@shared/schema";

interface PersonalizedTipProps {
  currentTip: ProductivityTip | null;
}

export default function PersonalizedTip({ currentTip }: PersonalizedTipProps) {
  if (!currentTip) {
    return (
      <div className="mb-8">
        <div className="glass-morphism-light rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <span className="inline-block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎯 Welcome
            </span>
            <p className="text-lg sm:text-xl font-medium text-card-foreground leading-relaxed mb-4" data-testid="text-tip-content">
              Welcome to your productivity journey! Select your mood and energy level to get personalized tips that adapt to your current state.
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Getting Started
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="glass-morphism-light rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <div className="relative z-10">
          <span 
            className="inline-block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4"
            data-testid="text-tip-category"
          >
            {currentTip.category}
          </span>
          <p className="text-lg sm:text-xl font-medium text-card-foreground leading-relaxed mb-4" data-testid="text-tip-content">
            {currentTip.text}
          </p>
          <span 
            className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            data-testid="text-tip-difficulty"
          >
            {currentTip.difficulty}
          </span>
          {currentTip.timesSaved && (
            <div className="mt-2">
              <span className="text-sm text-muted-foreground" data-testid="text-tip-time-saved">
                ⏰ Saves: {currentTip.timesSaved}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
