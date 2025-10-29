
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
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg" style={{ "--accent": "#f7a022" }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#222222]">Let’s explore our AI Hiring Solutions!</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-lg text-[#222222]">
          Watch 5 videos and stand a chance to win a ZUS Coffee!
        </DialogDescription>
        <div className="flex justify-center pt-4">
          <Button onClick={handleStart} style={{ backgroundColor: "var(--accent)", color: "white" }}>
            Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
