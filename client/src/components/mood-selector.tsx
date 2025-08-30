interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

export default function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  const moods = [
    { id: "energetic", label: "😊 Energetic", value: "motivated" },
    { id: "tired", label: "😴 Tired", value: "stressed" },
    { id: "focused", label: "🎯 Focused", value: "focused" },
    { id: "overwhelmed", label: "😰 Overwhelmed", value: "overwhelmed" },
    { id: "creative", label: "🎨 Creative", value: "creative" }
  ];

  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-mood-title">
        How are you feeling today?
      </h2>
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodChange(mood.value)}
            className={`glass-morphism-light hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3 rounded-full font-medium text-sm sm:text-base border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              selectedMood === mood.value
                ? "border-primary bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
                : "border-transparent hover:border-primary/20"
            }`}
            data-testid={`button-mood-${mood.id}`}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}
