import { SquareCheck, Check } from "lucide-react";
import { Habit } from "@shared/schema";

interface HabitTrackerProps {
  habits: Habit[];
}

export default function HabitTracker({ habits }: HabitTrackerProps) {
  const defaultHabits = [
    { name: "Morning meditation", progress: 85, target: 7 },
    { name: "Read 10 pages", progress: 60, target: 7 },
    { name: "Evening reflection", progress: 100, target: 7 }
  ];

  const habitsToShow = habits.length > 0 ? habits : defaultHabits;

  const getProgressPercentage = (habit: any) => {
    if ('progress' in habit && 'target' in habit) {
      return (habit.progress / habit.target) * 100;
    }
    return habit.progress || 0;
  };

  const getProgressDays = (habit: any) => {
    if ('progress' in habit && 'target' in habit) {
      return `${habit.progress}/${habit.target} days`;
    }
    return `${Math.floor(habit.progress / 100 * 7)}/7 days`;
  };

  const getGradientColor = (index: number) => {
    const colors = [
      "from-green-400 to-green-600",
      "from-blue-400 to-blue-600", 
      "from-purple-400 to-purple-600"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-card-foreground mb-6 text-center" data-testid="text-habit-tracker-title">
        <SquareCheck className="inline-block w-5 h-5 mr-2 text-blue-500" />
        Daily Micro-Habits
      </h3>
      <div className="space-y-4">
        {habitsToShow.map((habit, index) => (
          <div 
            key={index}
            className="glass-morphism-light rounded-xl p-4 hover:translate-x-1 transition-transform"
            data-testid={`element-habit-${index}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 bg-gradient-to-r ${getGradientColor(index)} rounded-full flex items-center justify-center`}>
                  <Check className="text-white w-3 h-3" />
                </div>
                <span className="font-medium text-card-foreground" data-testid={`text-habit-name-${index}`}>
                  {habit.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium" data-testid={`text-habit-progress-${index}`}>
                {getProgressDays(habit)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${getGradientColor(index)} h-full rounded-full transition-all duration-500 progress-shimmer`}
                style={{ width: `${getProgressPercentage(habit)}%` }}
                data-testid={`element-habit-progress-bar-${index}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
