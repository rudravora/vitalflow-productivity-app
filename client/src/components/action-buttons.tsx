import { Lightbulb, Shuffle } from "lucide-react";

interface ActionButtonsProps {
  onGenerateNewTip: () => void;
  onTipRoulette: () => void;
}

export default function ActionButtons({ onGenerateNewTip, onTipRoulette }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 flex-wrap mb-8">
      <button 
        onClick={onGenerateNewTip}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        data-testid="button-generate-tip"
      >
        <Lightbulb className="inline-block w-4 h-4 mr-2" />
        New Tip
      </button>
      <button 
        onClick={onTipRoulette}
        className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-400 hover:to-violet-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50"
        data-testid="button-tip-roulette"
      >
        <Shuffle className="inline-block w-4 h-4 mr-2" />
        Tip Roulette
      </button>
    </div>
  );
}
