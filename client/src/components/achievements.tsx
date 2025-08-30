import { Trophy } from "lucide-react";

interface AchievementsProps {
  achievements: string[];
  unlockedCount: number;
  totalCount: number;
}

export default function Achievements({ achievements, unlockedCount, totalCount }: AchievementsProps) {
  const allAchievements = ["🏆", "⭐", "🔥", "💎", "🎯"];
  
  return (
    <div className="glass-morphism rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-yellow-50 to-orange-50 opacity-30 pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center" data-testid="text-achievements-title">
          <Trophy className="inline-block w-5 h-5 mr-2 text-yellow-500" />
          Achievements
        </h3>
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {allAchievements.map((achievement, index) => {
            const isUnlocked = index < unlockedCount;
            return (
              <div 
                key={index}
                className={`glass-morphism-light p-3 rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm ${
                  isUnlocked ? "animate-unlock" : "opacity-40"
                }`}
                data-testid={`element-achievement-${index}`}
              >
                {achievement}
              </div>
            );
          })}
        </div>
        <p className="text-center text-muted-foreground text-sm" data-testid="text-achievements-stats">
          <span className="font-medium">{unlockedCount} of {totalCount}</span> achievements unlocked
        </p>
      </div>
    </div>
  );
}
