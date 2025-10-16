"use client"

import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { RewardSection } from "@/components/reward-section"
import { VideoSection } from "@/components/video-section"
import { VideoProvider } from "@/components/video-provider"

export default function Home() {
  return (
    <VideoProvider>
      <Header />
      <main className="relative min-h-screen pt-[88px]">
        <HeroSection />
        {/* <OldWaySection /> */}
        {/* <ProblemsSection /> */}
        {/* <CostComparisonSection /> */}
        <VideoSection />
        {/* <RewardSection /> */}
      </main>
    </VideoProvider>
  )
}
