"use client"

import { useVideoProgress } from "./video-provider"
import { Check, Sparkles } from "lucide-react"

export function ProgressTracker() {
  const { watchedCount, allVideosWatched } = useVideoProgress()
  const totalVideos = 5
  const progressPercentage = (watchedCount / totalVideos) * 100

  const scrollToReward = () => {
    const rewardSection = document.getElementById("reward-section")
    if (rewardSection) {
      rewardSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-foreground">Your Progress</div>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalVideos }).map((_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < watchedCount
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/50"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < watchedCount ? <Check className="w-5 h-5" /> : i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">
              {watchedCount} of {totalVideos} videos completed to claim your reward
            </span>
            {allVideosWatched && (
              <button
                onClick={scrollToReward}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold rounded-full hover:scale-105 transition-transform cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Reward Unlocked!
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
