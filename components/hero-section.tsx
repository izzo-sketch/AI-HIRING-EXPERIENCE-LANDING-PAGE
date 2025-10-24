"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVideoProgress } from "./video-provider"

interface VideoData {
  id: "video1" | "video2" | "video3" | "video4" | "video5"
  title: string
  description: string
  businessValue: string
  videoUrl: string
  posterUrl: string
}

const videos: VideoData[] = [
  {
    id: "video1",
    title: "AI Job Ads – From RM800 per ad",
    description:
      "AI now writes compelling job ads, screens candidates, and even conducts virtual live interviews. And uniquely with Ajobthing, our AI doesn't just wait — it proactively approaches qualified candidates who didn't apply.",
    businessValue:
      "Fill jobs faster with better-matched candidates, while keeping costs at the same level as traditional job ads.",
    videoUrl: "/AI-Job-Ad-compress.mp4",
    posterUrl: "/ai-job-ads.jpg",
  },
  {
    id: "video2",
    title: "AI Candidate Search – RM10–30 per resume",
    description:
      "In the past, recruiters had to manually search, message, and screen. Now, AI does 70% of the work: Finds candidates matching your criteria, reaches out automatically, checks interest, and runs initial screening questions.",
    businessValue: "Reduce reliance on large recruiter teams while still building a high-quality pipeline.",
    videoUrl: "/AI-Candidate-Search-compress.mp4",
    posterUrl: "/ai-candidate-search.jpg",
  },
  {
    id: "video3",
    title: "Smart Walk-In Interviews – From a few hundred ringgit",
    description:
      "For companies with outlets, factories, or branches, AI makes walk-ins smarter: Promotes your event across social media, manages candidate sign-ups, and gives HQ real-time analytics for every branch.",
    businessValue:
      "Hire frontline and operations staff at scale, while headquarters tracks performance without being onsite.",
    videoUrl: "/Smart-Walk-In-compress.mp4",
    posterUrl: "/smart-walkin.jpg",
  },
  {
    id: "video4",
    title: "AI Referral Programs – You set the reward (e.g., RM300 per hire)",
    description:
      "AI launches your referral program instantly, tracks referrals, manages resumes, and automates payouts.",
    businessValue:
      "Turn employees and networks into recruiters, lowering cost-per-hire while tapping into trusted recommendations.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    posterUrl: "/ai-referral.jpg",
  },
  {
    id: "video5",
    title: "My Talent Pool (AI ATS) – From a few hundred ringgit a month",
    description:
      "In the past, only large corporations could afford ATS systems. Now, Ajobthing makes them accessible at 1/10 the market price. Every resume from job ads, referrals, and walk-ins is stored in your private database.",
    businessValue:
      "Build a long-term hiring asset. When you need to hire, you don't start from zero — you simply reach into your own talent pool.",
    videoUrl: "/My-Talent-Pool-compress.mp4",
    posterUrl: "/talent-pool.jpg",
  },
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [watchProgress, setWatchProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [secondsWatched, setSecondsWatched] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const { progress, markVideoComplete, watchedCount } = useVideoProgress()

  const currentVideo = videos[currentIndex]
  const isCurrentVideoWatched = progress[currentVideo.id]

  const COMPLETION_THRESHOLD = 35 // seconds
  const secondsToGo = Math.max(0, COMPLETION_THRESHOLD - secondsWatched)
  const isNearCompletion = secondsWatched >= COMPLETION_THRESHOLD

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100
      setWatchProgress(progress)
      setCurrentTime(video.currentTime)
      setSecondsWatched(video.currentTime)

      if (video.currentTime >= COMPLETION_THRESHOLD && !isCurrentVideoWatched) {
        markVideoComplete(currentVideo.id)
      }
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [currentVideo.id, isCurrentVideoWatched, markVideoComplete])

  useEffect(() => {
    const resetVideo = async () => {
      if (videoRef.current) {
        if (playPromiseRef.current) {
          try {
            await playPromiseRef.current
          } catch (error) {}
          playPromiseRef.current = null
        }

        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
        setWatchProgress(0)
        setCurrentTime(0)
        setSecondsWatched(0)
      }
    }

    resetVideo()
  }, [currentIndex])

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        if (playPromiseRef.current) {
          try {
            await playPromiseRef.current
          } catch (error) {}
          playPromiseRef.current = null
        }
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          playPromiseRef.current = videoRef.current.play()
          await playPromiseRef.current
          playPromiseRef.current = null
          setIsPlaying(true)
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("[v0] Video play error:", error)
          }
          playPromiseRef.current = null
          setIsPlaying(false)
        }
      }
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden group"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <video
        key={currentVideo.videoUrl}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster={currentVideo.posterUrl}
      >
        <source src={currentVideo.videoUrl} type="video/mp4" />
      </video>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 ${
          showInfo ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40 transition-opacity duration-500 ${
          showInfo ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute top-[88px] left-0 right-0 h-1 bg-muted/30 z-20">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${watchProgress}%` }} />
      </div>

      {!isCurrentVideoWatched && isPlaying && (
        <div className="absolute top-24 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full backdrop-blur-md animate-pulse">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-semibold">
            {isNearCompletion ? "Almost done!" : `Watch ${Math.ceil(secondsToGo)} more seconds`}
          </span>
        </div>
      )}

      <div className="absolute top-24 right-6 z-20 flex items-center gap-3">
        <div className="px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/20">
          <span className="text-sm font-semibold text-foreground">
            {currentIndex + 1} / {videos.length}
          </span>
        </div>
        <div className="px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/40">
          <span className="text-sm font-semibold text-primary">
            {watchedCount} / {videos.length} Completed
          </span>
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 lg:p-20">
        <div
          className={`transition-all duration-500 mb-8 ${
            showInfo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full backdrop-blur-md">
              <span className="text-primary text-sm font-semibold uppercase tracking-wide">
                {currentVideo.id.replace("video", "Solution ")}
              </span>
            </div>
                {isCurrentVideoWatched && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full backdrop-blur-md">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-semibold">Watched</span>
                  </div>
                )}          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight max-w-4xl">
            <span className="block text-foreground">{currentVideo.title}</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-3xl text-pretty leading-relaxed">
            {currentVideo.description}
          </p>

          <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl backdrop-blur-sm max-w-3xl">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-primary mb-1">Business Value</p>
              <p className="text-sm text-foreground/90 leading-relaxed">{currentVideo.businessValue}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/50"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleMuteToggle}
              className="rounded-full w-12 h-12 bg-background/20 hover:bg-background/40 backdrop-blur-md border border-border/20"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-background/20 backdrop-blur-md rounded-full border border-border/20">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="hidden lg:block text-sm text-muted-foreground ml-2">
              {isPlaying ? "Now Playing" : "Paused"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={handlePrevious}
              className="rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md border-border/20"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="hidden md:inline">Previous</span>
            </Button>

            <Button
              size="lg"
              onClick={handleNext}
              className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative transition-all duration-300 ${
                index === currentIndex ? "w-8 h-2" : "w-2 h-2"
              } rounded-full ${
                progress[video.id]
                  ? "bg-green-500"
                  : index === currentIndex
                    ? "bg-primary"
                    : "bg-muted/50 hover:bg-muted"
              }`}
            >
              {progress[video.id] && (
                <CheckCircle2 className="absolute -top-1 -right-1 w-3 h-3 text-green-500 fill-green-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
