"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Check } from "lucide-react"
import { useVideoProgress } from "./video-provider"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoId: "video1" | "video2" | "video3" | "video4" | "video5"
  title: string
  description: string
  videoUrl: string
  thumbnail: string
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function VideoPlayer({ videoId, title, description, videoUrl, thumbnail }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [watchedPercentage, setWatchedPercentage] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [countdown, setCountdown] = useState(35)

  const { progress, markVideoComplete } = useVideoProgress()
  const isComplete = progress[videoId]
  const timeToComplete = 35

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isClient) return

    const updateTime = () => {
      const newCurrentTime = video.currentTime
      setCurrentTime(newCurrentTime)

      const remaining = Math.max(0, timeToComplete - newCurrentTime)
      setCountdown(remaining)

      const percentage = Math.min(100, (newCurrentTime / timeToComplete) * 100)
      setWatchedPercentage(percentage)

      if (newCurrentTime >= timeToComplete && !isComplete) {
        markVideoComplete(videoId)
      }
    }

    const updateDuration = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateTime)
        video.removeEventListener("loadedmetadata", updateDuration)
      }
    }
  }, [videoId, isComplete, markVideoComplete, timeToComplete, isClient])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
      setHasStarted(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  if (!isClient) {
    return (
      <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-balance">{title}</h3>
            <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Watch Progress</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `0%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            poster={thumbnail}
            className="w-full h-full object-cover"
            onClick={togglePlay}
            onEnded={() => {
              setIsPlaying(false)
              if (videoRef.current && videoRef.current.currentTime >= timeToComplete && !isComplete) {
                markVideoComplete(videoId)
              }
            }}
          />

          {isPlaying && !isComplete && countdown > 0 && (
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-10">
              Time to complete: {formatTime(countdown)}
            </div>
          )}

          {/* Play overlay */}
          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Button
                size="lg"
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
          )}

          {/* Controls */}
          {hasStarted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <Button size="icon" variant="ghost" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Completion badge */}
          {isComplete && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium z-10">
              <Check className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-balance">{title}</h3>
          <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{description}</p>

          {/* Watch progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Watch Progress</span>
              <span className="font-medium">{Math.round(watchedPercentage)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${watchedPercentage}%` }}
              />
            </div>
            {watchedPercentage > 80 && watchedPercentage < 100 && !isComplete && (
              <p className="text-sm text-primary font-medium">Almost there! Keep watching to complete.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
