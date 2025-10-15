"use client"

import { useEffect, useRef, useState } from "react"

export function ProblemsSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastStepChangeRef = useRef<number>(0)
  const totalSteps = 4 // 4 problems, one at a time

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100

      const now = Date.now()
      const timeSinceLastChange = now - lastStepChangeRef.current

      if (isInView && currentStep === totalSteps - 1 && e.deltaY > 0) {
        return
      }

      if (
        isInView &&
        timeSinceLastChange > 500 &&
        ((e.deltaY > 0 && currentStep < totalSteps - 1) || (e.deltaY < 0 && currentStep > 0))
      ) {
        e.preventDefault()

        lastStepChangeRef.current = now

        if (e.deltaY > 0 && currentStep < totalSteps - 1) {
          setCurrentStep((prev) => prev + 1)
        } else if (e.deltaY < 0 && currentStep > 0) {
          setCurrentStep((prev) => prev - 1)
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [currentStep])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            setCurrentStep(0)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const problems = [
    {
      number: "01",
      title: "Slow & Manual",
      description: "Weeks to post ads, screen resumes, and schedule interviews",
      image: "/problem-slow-manual-black.jpg", // Updated to black background version
    },
    {
      number: "02",
      title: "High Cost, Low ROI",
      description: "Paying thousands with no guarantee of finding the right person",
      image: "/problem-high-cost-black.jpg", // Updated to black background version
    },
    {
      number: "03",
      title: "Limited Reach",
      description: "Missing out on passive talent who aren't actively looking",
      image: "/problem-limited-reach-black.jpg", // Updated to black background version
    },
    {
      number: "04",
      title: "Inconsistent Quality",
      description: "Human bias and fatigue affect screening decisions",
      image: "/problem-inconsistent-quality-black.jpg", // Updated to black background version
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-background via-[#f7a022]/5 to-background"
      style={{ height: `${totalSteps * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-red-500/30 to-[#f7a022]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#f7a022]/20 to-red-500/30 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                currentStep === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7a022]/20 to-red-500/20 rounded-full blur-3xl" />
                  <img
                    src={problem.image || "/placeholder.svg"}
                    alt={problem.title}
                    className="relative w-full h-auto drop-shadow-2xl"
                  />
                </div>

                <div className="text-center md:text-left">
                  <div className="inline-block mb-6 px-8 py-4 bg-red-500/10 border-2 border-red-500/30 rounded-full backdrop-blur-sm">
                    <span className="text-red-500 text-xl font-bold tracking-wider">PROBLEM {problem.number}</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-tight text-[#f7a022]">
                    {problem.title}
                  </h2>
                  <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {currentStep < totalSteps - 1 ? "Scroll to see next problem" : "Scroll to continue"}
          </p>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep ? "bg-red-500 w-8" : "bg-muted w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
