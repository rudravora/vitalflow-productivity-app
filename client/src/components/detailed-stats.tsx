import { TrendingUp } from "lucide-react";

interface DetailedStatsProps {
  tasksCompleted: number;
  focusTime: string;
  habitScore: number;
  avgEnergy: number;
}

export default function DetailedStats({ 
  tasksCompleted, 
  focusTime, 
  habitScore, 
  avgEnergy 
}: DetailedStatsProps) {
  const stats = [
    { value: tasksCompleted, label: "Tasks Done", change: "+15%" },
    { value: focusTime, label: "Focus Time", change: "+8%" },
    { value: `${habitScore}%`, label: "Habit Score", change: "+12%" },
    { value: avgEnergy, label: "Avg. Energy", change: "-3%" }
  ];

  return (
    <div className="glass-morphism rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-card-foreground mb-6 text-center" data-testid="text-detailed-stats-title">
        <TrendingUp className="inline-block w-5 h-5 mr-2 text-indigo-500" />
        Weekly Performance
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="text-center glass-morphism-light rounded-xl p-4 hover:scale-105 transition-transform"
            data-testid={`card-detailed-stat-${index}`}
          >
            <div className="text-2xl font-bold text-primary mb-1" data-testid={`text-detailed-stat-value-${index}`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground font-medium" data-testid={`text-detailed-stat-label-${index}`}>
              {stat.label}
            </div>
            <div className={`text-xs font-medium mt-1 ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`} data-testid={`text-detailed-stat-change-${index}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
