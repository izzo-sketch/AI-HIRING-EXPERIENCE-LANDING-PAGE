"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVideoProgress } from "./video-provider"
import { useIsMobile } from "@/hooks/use-mobile"

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
    title: "AI Job Ad",
    description:
      "Hiring just got smarter — from compelling job ad creation to candidate screening, AJobThing accelerates every step of your recruitment.\n\nAnd unlike others, our AI doesn’t wait around — it hunts for qualified candidates who didn’t apply.",
    businessValue:
      "Fill jobs faster with better-matched candidates, while keeping costs at the same level as traditional job ads.",
    videoUrl: "/AI-Job-Ad-compress.mp4",
    posterUrl: "/ai-job-ads.jpg",
  },
  {
    id: "video2",
    title: "AI Candidate Search",
    description:
      "In the past, recruiters spent countless hours sourcing and screening.\n\nToday, AI does 70% of the heavy lifting — identifying the right candidates, contacting them automatically, confirming interest, and managing first-round screening.",
    businessValue: "Reduce reliance on large recruiter teams while still building a high-quality pipeline.",
    videoUrl: "/AI-Candidate-Search-compress.mp4",
    posterUrl: "/ai-candidate-search.jpg",
  },
  {
    id: "video3",
    title: "Smart Walk-In Interviews",
    description:
      "For companies with outlets, factories, or multiple branches, AI makes walk-in hiring smarter.\n\nIt promotes your walk-in event across social media, manages candidate sign-ups, and gives HQ real-time analytics for every location.",
    businessValue:
      "Hire frontline and operations staff at scale, while headquarters tracks performance without being onsite.",
    videoUrl: "/Smart-Walk-In-compress.mp4",
    posterUrl: "/smart-walkin.jpg",
  },
  {
    id: "video4",
    title: "AJobThing Care",
    description:
      "AJobThing Care provides a combination of performance protection, expert guidance, and exclusive support when you post job ads or use candidate search.",
    businessValue:
      "AJobThing Care provides a combination of performance protection, expert guidance and exclusive support when you post job ads or use candidate search.",
    videoUrl: "/AJobThing-Care-We-are-ready-to-listen.mp4",
    posterUrl: "/ai-referral.jpg",
  },
  {
    id: "video5",
    title: "My Talent Pool (AI ATS)",
    description:
      "AJobThing makes ATS capabilities accessible at just 1/10 of the usual cost, storing every resume from job ads, referrals, and walk-ins into your own private database.\n\nYou’re not just hiring — you’re building a long-term talent asset, so you never have to start from zero again.",
    businessValue:
      "Build a long-term hiring asset. When you need to hire, you don\'t start from zero — you simply reach into your own talent pool.",
    videoUrl: "/My-Talent-Pool-compress.mp4",
    posterUrl: "/talent-pool.jpg",
  },
]

export function HeroSection({ onFirstPlay }: { onFirstPlay: () => void }) {
  const isMobile = useIsMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
        const [isMuted, setIsMuted] = useState(true)
          const [showInfo, setShowInfo] = useState(true)
  
    useEffect(() => {
      if (isMobile) {
        setShowInfo(true)
      } else {
        setShowInfo(false)
      }
    }, [isMobile])
  const [watchProgress, setWatchProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [secondsWatched, setSecondsWatched] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const { progress, markVideoComplete, watchedCount } = useVideoProgress()
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  const [infoTimeout, setInfoTimeout] = useState<NodeJS.Timeout | null>(null)
  const [mouseMoveTimeout, setMouseMoveTimeout] = useState<NodeJS.Timeout | null>(null)
  const infoPopupTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseMove = () => {
    if (isMobile) return

    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout)
    }
    if (!isPlaying) {
      setShowInfo(true)
      const timer = setTimeout(() => {
        setShowInfo(false)
      }, 2500) // 2.5 seconds of inactivity
      setMouseMoveTimeout(timer)
    }
  }





  useEffect(() => {
    const setDynamicHeight = () => {
      document.documentElement.style.setProperty('--dynamic-height', `${window.innerHeight}px`);
    };

    setDynamicHeight();
    window.addEventListener('resize', setDynamicHeight);

    return () => {
      window.removeEventListener('resize', setDynamicHeight);
    };
  }, []);

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

      if (!isMobile && currentTime >= 35 && currentTime < 38) { // Show for 3 seconds around 35s mark
        setShowInfo(true)
        const timer = setTimeout(() => {
          if (!mouseMoveTimeout) { // Only hide if no mouse movement is detected
            setShowInfo(false)
          }
        }, 3000) // Show for 3 seconds
        return () => clearTimeout(timer)
      }
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [currentVideo.id, isCurrentVideoWatched, markVideoComplete, currentTime, mouseMoveTimeout, isMobile])

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
    console.log("handlePlayPause called. isPlaying:", isPlaying); // Added log
    if (!hasPlayedOnce) {
      setHasPlayedOnce(true)
      onFirstPlay()
    }

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
          console.log("Attempting to play video..."); // Added log
          playPromiseRef.current = videoRef.current.play()
          await playPromiseRef.current
          playPromiseRef.current = null
          setIsPlaying(true)
          console.log("Video played successfully. isPlaying set to true."); // Added log
          if (!isMobile) {
            setShowInfo(false)
          }
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("[v0] Video play error:", error)
          }
          playPromiseRef.current = null
          setIsPlaying(false)
          console.log("Video play failed. isPlaying set to false."); // Added log
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

  const renderVideoControls = (isMobile: boolean) => (
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

        {!isMobile && (
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-background/20 backdrop-blur-md rounded-full border border-border/20">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        )}

        {!isMobile && (
          <div className="hidden lg:block text-sm text-muted-foreground ml-2">
            {isPlaying ? "Now Playing" : "Paused"}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="lg"
          variant="outline"
          onClick={handlePrevious}
          className="rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md border border-border/20"
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
  )
// This is your line 311
  return (
    <div 
      className="relative w-full h-screen bg-black" // A container that fills the screen
      onMouseMove={handleMouseMove} // This attaches your mouse move logic
    >
      
      {/* --- Top Right Info (Video Count) --- */}
      <div className="absolute top-10 right-10 z-10 flex items-center gap-3 text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary">{watchedCount}/{videos.length} videos watched</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/20">
          <span className="text-sm font-semibold text-foreground">{currentIndex + 1}/{videos.length}</span>
        </div>
      </div>

      {/* --- Top Left Info (Timer / Watched) --- */}
      {isCurrentVideoWatched ? (
        <div className="absolute top-10 left-10 z-10 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check w-4 h-4 text-green-500"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
          <span class="text-green-500 text-sm font-semibold">Watched</span>
        </div>
      ) : (secondsToGo > 0 && (
        <div className="absolute top-10 left-10 z-10 inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full backdrop-blur-md animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-4 h-4 text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span class="text-primary text-sm font-semibold">Watch {Math.floor(secondsToGo)} more seconds</span>
        </div>
      ))}

      {/* --- The Video Player --- */}
      <video
        ref={videoRef}
        src={currentVideo.videoUrl}
        poster={currentVideo.posterUrl}
        muted={isMuted}
        playsInline // Important for iOS
        className="absolute top-0 left-0 w-full h-full object-cover" // Makes video fill the container
        onClick={handlePlayPause} // Added onClick handler
      />

      {showInfo && (
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 to-transparent p-10 pb-32 text-white"> {/* Adjusted bottom positioning and padding */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full backdrop-blur-md text-primary text-sm font-semibold uppercase tracking-wide">
              Solution {currentIndex + 1}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight max-w-4xl">{currentVideo.title}</h1> {/* Updated class names */}
          <h2 className="text-base md:text-lg text-gray-200 mb-4 max-w-3xl text-pretty leading-relaxed"> {/* Updated class names */}
            {currentVideo.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mt-2">{paragraph}</p>
            ))}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            {videos.map((video, index) => (
              <button
                key={video.id}
                className={`relative transition-all duration-300 rounded-full ${index === currentIndex ? "w-8" : "w-2"} h-2 ${progress[video.id] ? "bg-green-500" : "bg-muted/50 hover:bg-muted"}`}
              >
                {progress[video.id] && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check absolute -top-1 -right-1 w-3 h-3 text-green-500 fill-green-500"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- The Controls --- */}
      {/* This renders all the buttons from your 'renderVideoControls' function */}
      <div className="absolute bottom-10 left-10 right-10 z-10">
        {renderVideoControls(isMobile)}
      </div>

    </div>
  )

} // <-- THIS IS THE CLOSING BRACE YOU WERE MISSING
 