import { Sprout } from "lucide-react";

interface ProgressGardenProps {
  plants: string[];
  plantsThisWeek: number;
}

export default function ProgressGarden({ plants, plantsThisWeek }: ProgressGardenProps) {
  return (
    <div className="glass-morphism rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50 to-blue-50 opacity-30 pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center" data-testid="text-garden-title">
          <Sprout className="inline-block w-5 h-5 mr-2 text-green-500" />
          Progress Garden
        </h3>
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {plants.map((plant, index) => (
            <div 
              key={index}
              className="text-3xl sm:text-4xl animate-bounce-gentle hover:scale-110 transition-transform cursor-pointer" 
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`element-plant-${index}`}
            >
              {plant}
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm" data-testid="text-garden-stats">
          Complete tasks to grow your garden! <span className="font-medium">{plantsThisWeek} plants this week</span>
        </p>
      </div>
    </div>
  );
}
