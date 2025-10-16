"use client"

import Image from "next/image"
import { useVideoProgress } from "./video-provider"
import { Check, Sparkles, Zap, Users, Gift, Database } from "lucide-react"

export function Header() {
  const { watchedCount, allVideosWatched } = useVideoProgress()
  const totalVideos = 5
  const progressPercentage = (watchedCount / totalVideos) * 100
  const icons = [Sparkles, Zap, Users, Gift, Database]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToReward = () => {
    const rewardSection = document.getElementById("reward-section")
    if (rewardSection) {
      rewardSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-[#f7a022]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-3 group cursor-pointer flex-shrink-0">
            <Image
              src="/ajobthing-logo.png"
              alt="AJobThing Logo"
              width={120}
              height={42}
              className="transition-transform group-hover:scale-105"
            />
          </button>

          {/* Progress Tracker */}
          <div className="flex items-center gap-6 flex-1 justify-end">
                      <div className="hidden md:flex items-center gap-3">
                        {Array.from({ length: totalVideos }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                              i < watchedCount
                                ? "bg-gradient-to-br from-[#f7a022] to-[#ff8c00] text-white scale-110 shadow-lg shadow-[#f7a022]/50"
                                : "bg-white/10 text-white/50"
                            }`}>
                            {i < watchedCount ? <Check className="w-6 h-6" /> : i + 1}
                          </div>
                        ))}
                      </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-[#f7a022] uppercase tracking-wider">Your Reward Progress</p>
                <p className="text-xs text-white/60 -mt-0.5">{watchedCount} of {totalVideos} steps completed</p>
              </div>
              {allVideosWatched && (
                <button
                  onClick={scrollToReward}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f7a022] to-[#ff8c00] text-white text-sm font-bold rounded-full hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#f7a022]/50 animate-pulse"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Claim Your Reward!</span>
                  <span className="sm:hidden">Claim</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}