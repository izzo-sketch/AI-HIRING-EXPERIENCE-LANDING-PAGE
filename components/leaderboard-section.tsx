"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, ExternalLink } from "lucide-react"

export function LeaderboardSection() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="leaderboard-section"
      onMouseMove={handleMouseMove}
      className="relative group flex items-center justify-center py-20 md:py-28 px-6 bg-black overflow-hidden"
    >
      {/* AI Grid Background on Hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247, 160, 34, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(247, 160, 34, 0.4) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />
      
      {/* Mouse-following Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(247, 160, 34, 0.2), transparent 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Trophy className="w-20 h-20 text-primary drop-shadow-[0_0_15px_rgba(247,160,34,0.5)]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-balance">
            <span className="text-[#f7a022]">Daily</span>{" "}
            <span>Winner List</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-md mx-auto text-muted-foreground">
            Congratulations to our Daily Winner.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:scale-105 transition-transform animate-pulse-glow"
          >
            <a href="https://epca.in/ajt-wa-channel" target="_blank" rel="noopener noreferrer">
              Check Result in Group
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
