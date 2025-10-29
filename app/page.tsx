"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { RewardSection } from "@/components/reward-section"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { VideoProvider } from "@/components/video-provider"
import { WelcomeModal } from "@/components/welcome-modal"

export default function Home() {

  const handleStart = () => {
    // No tooltip to open
  }

  const handleFirstPlay = () => {
    // No tooltip to close
  }

  return (
    <VideoProvider>
      <WelcomeModal onStart={handleStart} />
      <Header />
      <main className="relative min-h-screen pt-[88px]">
        <HeroSection onFirstPlay={handleFirstPlay} />        {/* <OldWaySection /> */}
        {/* <ProblemsSection /> */}
        {/* <CostComparisonSection /> */}
        <RewardSection className="mt-8 md:mt-16 lg:mt-24" />
        <LeaderboardSection />
      </main>
    </VideoProvider>
  )
}
