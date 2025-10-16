"use client"

import type React from "react"
import { useVideoProgress } from "./video-provider"

interface VideoPlayerProps {
  videoId: "video1" | "video2" | "video3" | "video4" | "video5"
  title: string
  description: string
  videoUrl: string
  thumbnail: string
}

export function VideoPlayer({ videoId, title, description, videoUrl, thumbnail }: VideoPlayerProps) {
  const { markVideoComplete } = useVideoProgress()

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-balance">{title}</h3>
          <p className="text-muted-foreground text-pretty leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
