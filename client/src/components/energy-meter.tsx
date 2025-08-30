interface EnergyMeterProps {
  energyLevel: number;
  onEnergyChange: (level: number) => void;
}

export default function EnergyMeter({ energyLevel, onEnergyChange }: EnergyMeterProps) {
  const getEnergyGradient = (level: number) => {
    if (level <= 25) return "energy-gradient-low";
    if (level <= 50) return "energy-gradient-medium";
    if (level <= 75) return "energy-gradient-high";
    return "energy-gradient-peak";
  };

  const adjustEnergy = (change: number) => {
    const newLevel = Math.max(0, Math.min(100, energyLevel + change));
    onEnergyChange(newLevel);
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-4" data-testid="text-energy-title">
          Energy Level
        </h3>
        <div className="relative w-full max-w-md mx-auto">
          <div className="w-full h-6 bg-muted rounded-full overflow-hidden relative">
            <div 
              className={`h-full ${getEnergyGradient(energyLevel)} rounded-full relative progress-shimmer transition-all duration-500`}
              style={{ width: `${energyLevel}%` }}
              data-testid="element-energy-fill"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Exhausted</span>
            <span className="font-medium text-card-foreground" data-testid="text-energy-percentage">
              {energyLevel}%
            </span>
            <span>Peak Energy</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => adjustEnergy(-10)}
            className="glass-morphism-light px-4 py-2 rounded-full hover:scale-105 transition-transform"
            data-testid="button-energy-lower"
          >
            😴 Lower
          </button>
          <button
            onClick={() => adjustEnergy(10)}
            className="glass-morphism-light px-4 py-2 rounded-full hover:scale-105 transition-transform"
            data-testid="button-energy-higher"
          >
            ⚡ Higher
          </button>
        </div>
      </div>
    </div>
  );
}
