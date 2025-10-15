"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface VideoProgress {
  video1: boolean
  video2: boolean
  video3: boolean
  video4: boolean
  video5: boolean
}

interface VideoContextType {
  progress: VideoProgress
  markVideoComplete: (videoId: keyof VideoProgress) => void
  allVideosWatched: boolean
  watchedCount: number
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<VideoProgress>({
    video1: false,
    video2: false,
    video3: false,
    video4: false,
    video5: false,
  })

  const markVideoComplete = useCallback((videoId: keyof VideoProgress) => {
    setProgress((prev) => ({ ...prev, [videoId]: true }))
  }, [])

  const watchedCount = Object.values(progress).filter(Boolean).length
  const allVideosWatched = watchedCount === 5

  return (
    <VideoContext.Provider value={{ progress, markVideoComplete, allVideosWatched, watchedCount }}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideoProgress() {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideoProgress must be used within VideoProvider")
  }
  return context
}
