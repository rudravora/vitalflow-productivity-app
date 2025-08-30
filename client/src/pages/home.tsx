import { useState } from "react";
import Header from "@/components/header";
import QuickStatsGrid from "@/components/quick-stats-grid";
import MoodSelector from "@/components/mood-selector";
import EnergyMeter from "@/components/energy-meter";
import PersonalizedTip from "@/components/personalized-tip";
import ActionButtons from "@/components/action-buttons";
import ProgressGarden from "@/components/progress-garden";
import Achievements from "@/components/achievements";
import HabitTracker from "@/components/habit-tracker";
import DetailedStats from "@/components/detailed-stats";
import { useProductivity } from "@/hooks/use-productivity";

export default function Home() {
  const {
    userProgress,
    currentTip,
    habits,
    generateNewTip,
    updateMood,
    updateEnergyLevel,
    spinTipRoulette,
    isLoading
  } = useProductivity();

  const [selectedMood, setSelectedMood] = useState(userProgress?.currentMood || "focused");
  const [energyLevel, setEnergyLevel] = useState(userProgress?.energyLevel || 75);

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
    updateMood(mood);
  };

  const handleEnergyChange = (level: number) => {
    setEnergyLevel(level);
    updateEnergyLevel(level);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading your productivity ecosystem...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header />
        
        <QuickStatsGrid 
          tasksCompleted={47}
          streakDays={userProgress?.streakDays || 1}
          gardenLevel={Math.floor((userProgress?.tipsLearned || 0) / 5) + 1}
          focusScore={85}
        />

        <div className="glass-morphism rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 relative overflow-hidden">
          <MoodSelector
            selectedMood={selectedMood}
            onMoodChange={handleMoodChange}
          />

          <EnergyMeter
            energyLevel={energyLevel}
            onEnergyChange={handleEnergyChange}
          />

          <PersonalizedTip currentTip={currentTip} />

          <ActionButtons
            onGenerateNewTip={generateNewTip}
            onTipRoulette={spinTipRoulette}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProgressGarden 
            plants={userProgress?.gardenPlants || ["🌱"]}
            plantsThisWeek={3}
          />
          
          <Achievements 
            achievements={userProgress?.achievements || ["🌱"]}
            unlockedCount={3}
            totalCount={5}
          />
        </div>

        <HabitTracker habits={habits} />

        <DetailedStats 
          tasksCompleted={124}
          focusTime="32h"
          habitScore={89}
          avgEnergy={7.8}
        />
      </div>
    </div>
  );
}
