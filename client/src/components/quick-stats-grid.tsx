import { CheckCircle, Flame, Sprout, Brain } from "lucide-react";

interface QuickStatsGridProps {
  tasksCompleted: number;
  streakDays: number;
  gardenLevel: number;
  focusScore: number;
}

export default function QuickStatsGrid({ 
  tasksCompleted, 
  streakDays, 
  gardenLevel, 
  focusScore 
}: QuickStatsGridProps) {
  const stats = [
    {
      value: tasksCompleted,
      label: "Tasks Completed",
      icon: CheckCircle,
      trend: "+12% this week",
      color: "text-primary"
    },
    {
      value: streakDays,
      label: "Day Streak",
      icon: Flame,
      trend: "Personal best!",
      color: "text-orange-500"
    },
    {
      value: `🌱`,
      label: "Garden Level",
      icon: Sprout,
      trend: "3 plants this week",
      color: "text-green-500"
    },
    {
      value: `${focusScore}%`,
      label: "Focus Score",
      icon: Brain,
      trend: "+5% improvement",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="glass-morphism rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          data-testid={`card-stat-${index}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`} data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </div>
            </div>
            <div className={`text-2xl ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-green-600 font-medium" data-testid={`text-stat-trend-${index}`}>
              {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
