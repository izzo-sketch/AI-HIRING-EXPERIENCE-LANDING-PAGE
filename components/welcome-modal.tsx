
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface WelcomeModalProps {
  onStart: () => void;
}

export function WelcomeModal({ onStart }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Temporarily always open for testing
    // const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal")
    // if (!hasSeenModal) {
    //   const timer = setTimeout(() => {
    //     setIsOpen(true)
    //     localStorage.setItem("hasSeenWelcomeModal", "true")
    //   }, 1000)
    //   return () => clearTimeout(timer)
    // }
  }, [])

  const handleStart = () => {
    setIsOpen(false)
    onStart()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg z-[9999]" style={{ "--accent": "#f7a022" }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#222222]">Let’s explore our AI Hiring Solutions!</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-lg text-[#222222]">
          Watch 4 videos and stand a chance to win a ZUS Coffee!
        </DialogDescription>
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleStart}
            className="bg-[#f7a022] text-white hover:bg-[#f7a022]/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#f7a022]/40 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <span className="relative">Start</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
