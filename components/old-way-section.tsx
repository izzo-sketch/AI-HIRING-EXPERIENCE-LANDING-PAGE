"use client"

import { useEffect, useRef, useState } from "react"

export function OldWaySection() {
  const [currentStep, setCurrentStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastStepChangeRef = useRef<number>(0)
  const totalSteps = 4 // Only 4 steps: title + 3 hiring methods

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

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

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#f7a022]/15 via-background to-[#f7a022]/10"
      style={{ height: `${totalSteps * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#f7a022]/30 to-[#ff6b35]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#f7a022]/20 to-[#ff8c42]/30 rounded-full blur-3xl" />
        </div>

        {/* 3D Background shapes with parallax */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="/3d-abstract-curved-shapes-in-orange-gradient--smoo.jpg"
            alt=""
            className="absolute top-20 right-20 w-64 h-64 animate-float"
            style={{ transform: `translateY(${currentStep * -10}px)` }}
          />
          <img
            src="/3d-layered-circular-rings-in-coral-orange--floatin.jpg"
            alt=""
            className="absolute bottom-32 left-32 w-48 h-48 animate-float-delayed"
            style={{ transform: `translateY(${currentStep * 15}px)` }}
          />
          <img
            src="/3d-smooth-curved-tube-shape-in-orange--floating-el.jpg"
            alt=""
            className="absolute top-1/3 left-10 w-32 h-32 animate-float"
            style={{ transform: `translateY(${currentStep * -8}px)` }}
          />
          <img
            src="/3d-twisted-ribbon-shape-in-coral-orange-gradient--.jpg"
            alt=""
            className="absolute bottom-1/4 right-10 w-40 h-40 animate-float-delayed"
            style={{ transform: `translateY(${currentStep * 12}px)` }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          {/* Step 0: Title */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              currentStep >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block mb-4 px-6 py-3 bg-[#f7a022]/10 border-2 border-[#f7a022]/30 rounded-full backdrop-blur-sm">
              <span className="text-[#f7a022] text-sm font-bold tracking-wider uppercase">The Old Way</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Traditional Hiring
              <span className="block text-[#f7a022] mt-2">Was Expensive & Slow</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Before AI, companies relied on three main methods — each with significant costs and no guarantees
            </p>
          </div>

          {/* Step 1-3: Cost cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Job Ads */}
            <div
              className={`transition-all duration-1000 delay-100 ${
                currentStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <div className="relative group h-full">
                <div className="relative mb-6">
                  <img
                    src="/3d-stack-of-paper-documents-floating--orange-gradi.jpg"
                    alt="Job Ads"
                    className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f7a022]/20 to-transparent rounded-3xl blur-2xl" />
                </div>
                <div className="text-center p-6 bg-background/50 backdrop-blur-sm border-2 border-[#f7a022]/20 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Job Ads</h3>
                  <p className="text-4xl font-bold text-[#f7a022] mb-4">RM600-900</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Per ad, no guarantee of quality candidates. Like buying a blind box.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Candidate Search */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                currentStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <div className="relative group h-full">
                <div className="relative mb-6">
                  <img
                    src="/3d-pile-of-resumes-and-cvs-scattered--orange-coral.jpg"
                    alt="Candidate Search"
                    className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f7a022]/20 to-transparent rounded-3xl blur-2xl" />
                </div>
                <div className="text-center p-6 bg-background/50 backdrop-blur-sm border-2 border-[#f7a022]/20 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Candidate Search</h3>
                  <p className="text-4xl font-bold text-[#f7a022] mb-4">RM10-30</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Per resume + RM5,000 recruiter salary/month. Manual and time-consuming.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Headhunters */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                currentStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <div className="relative group h-full">
                <div className="relative mb-6">
                  <img
                    src="/3d-money-bills-and-coins-floating-upward--expensiv.jpg"
                    alt="Headhunters"
                    className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f7a022]/20 to-transparent rounded-3xl blur-2xl" />
                </div>
                <div className="text-center p-6 bg-background/50 backdrop-blur-sm border-2 border-[#f7a022]/20 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Headhunters</h3>
                  <p className="text-4xl font-bold text-[#f7a022] mb-4">RM14k-20k</p>
                  <p className="text-muted-foreground leading-relaxed">
                    15-20% of annual salary per hire. Extremely expensive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {currentStep < totalSteps - 1 ? "Scroll to reveal more" : "Scroll to continue"}
          </p>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= currentStep ? "bg-[#f7a022] w-8" : "bg-muted w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
