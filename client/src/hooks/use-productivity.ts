import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ProductivityTip, UserProgress, Habit } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Using a demo user ID for this implementation
const DEMO_USER_ID = "demo-user";

export function useProductivity() {
  const [currentTip, setCurrentTip] = useState<ProductivityTip | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user progress
  const { data: userProgress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress", DEMO_USER_ID],
    retry: false,
    refetchOnWindowFocus: false
  });

  // Get user habits
  const { data: habits = [], isLoading: habitsLoading } = useQuery<Habit[]>({
    queryKey: ["/api/habits", DEMO_USER_ID],
    retry: false,
    refetchOnWindowFocus: false
  });

  // Get all productivity tips
  const { data: allTips = [] } = useQuery<ProductivityTip[]>({
    queryKey: ["/api/tips"],
    retry: false,
    refetchOnWindowFocus: false
  });

  // Update user progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async (data: Partial<UserProgress>) => {
      const response = await apiRequest("PATCH", `/api/progress/${DEMO_USER_ID}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", DEMO_USER_ID] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive"
      });
    }
  });

  // Create habit mutation
  const createHabitMutation = useMutation({
    mutationFn: async (data: { name: string; target?: number }) => {
      const response = await apiRequest("POST", "/api/habits", {
        userId: DEMO_USER_ID,
        name: data.name,
        target: data.target || 7,
        progress: 0
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits", DEMO_USER_ID] });
      toast({
        title: "Success",
        description: "New habit created!"
      });
    },
    onError: () => {
      toast({
        title: "Error", 
        description: "Failed to create habit",
        variant: "destructive"
      });
    }
  });

  // Generate new tip based on current mood
  const generateNewTip = () => {
    if (!userProgress || allTips.length === 0) return;

    const moodTips = allTips.filter(tip => tip.mood === userProgress.currentMood);
    if (moodTips.length === 0) return;

    const randomTip = moodTips[Math.floor(Math.random() * moodTips.length)];
    setCurrentTip(randomTip);

    // Update tips learned count
    updateProgressMutation.mutate({
      tipsLearned: (userProgress.tipsLearned || 0) + 1,
      productivityScore: (userProgress.productivityScore || 0) + 10
    });

    // Grow garden
    const currentPlants = Array.isArray(userProgress.gardenPlants) ? userProgress.gardenPlants : ["🌱"];
    const newPlants = [...currentPlants];
    const plantOptions = ['🌱', '🌿', '🌸', '🌺', '🌻', '🌷', '🌹', '🌳'];
    const nextPlant = plantOptions[Math.min(newPlants.length, plantOptions.length - 1)];
    if (newPlants.length < 10) {
      newPlants.push(nextPlant);
    }

    updateProgressMutation.mutate({
      gardenPlants: newPlants
    });

    toast({
      title: "New tip generated!",
      description: "Your garden is growing! 🌱"
    });
  };

  // Spin tip roulette - random tip from any mood
  const spinTipRoulette = () => {
    if (allTips.length === 0) return;

    const randomTip = allTips[Math.floor(Math.random() * allTips.length)];
    setCurrentTip(randomTip);

    toast({
      title: "🎰 Roulette spin complete!",
      description: "New tip discovered!"
    });
  };

  // Update mood
  const updateMood = (mood: string) => {
    updateProgressMutation.mutate({ currentMood: mood });
  };

  // Update energy level
  const updateEnergyLevel = (level: number) => {
    updateProgressMutation.mutate({ energyLevel: level });
  };

  // Build micro-habit from current tip
  const buildMicroHabit = () => {
    if (!currentTip) return;

    const microHabits = [
      "Take 3 deep breaths before work",
      "Write one priority on sticky note",
      "Clear desk for 30 seconds", 
      "Set one-task focus timer",
      "Close unnecessary browser tabs"
    ];

    const randomHabit = microHabits[Math.floor(Math.random() * microHabits.length)];
    
    createHabitMutation.mutate({ name: randomHabit });

    if (userProgress) {
      updateProgressMutation.mutate({
        habitsBuilt: (userProgress.habitsBuilt || 0) + 1
      });
    }
  };

  // Initialize with a welcome tip if no current tip
  useEffect(() => {
    if (!currentTip && allTips.length > 0 && userProgress) {
      const focusedTips = allTips.filter(tip => tip.mood === 'focused');
      if (focusedTips.length > 0) {
        setCurrentTip(focusedTips[0]);
      }
    }
  }, [allTips, userProgress, currentTip]);

  return {
    userProgress,
    currentTip,
    habits,
    isLoading: progressLoading || habitsLoading,
    generateNewTip,
    spinTipRoulette,
    updateMood,
    updateEnergyLevel,
    buildMicroHabit,
    isUpdating: updateProgressMutation.isPending
  };
}
