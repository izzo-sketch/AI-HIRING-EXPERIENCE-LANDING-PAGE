"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export function CostComparisonSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [scale, setScale] = useState(0.8)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const scrollProgress = 1 - rect.top / windowHeight
      const newScale = Math.max(0.8, Math.min(1.2, 0.8 + scrollProgress * 0.8))
      setScale(newScale)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-[#f7a022]/5 to-background py-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(247, 160, 34, 0.7), transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#f7a022]/40 to-[#ff6b35]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#f7a022]/30 to-[#ff8c42]/40 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#f7a022]/40 rounded-full animate-float"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 space-y-16">
        {/* Cost Comparison Graph */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="p-8 md:p-12 bg-background/80 backdrop-blur-sm border-2 border-[#f7a022]/30 rounded-3xl shadow-2xl min-h-[400px] flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Cost Comparison: <span className="text-[#f7a022]">Old Way vs AI Way</span>
            </h3>

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg md:text-xl font-semibold">Traditional Hiring (30 hires/year)</span>
                  <span className="text-2xl md:text-3xl font-bold text-red-500">RM30,000+</span>
                </div>
                <div className="relative h-16 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-2000 ease-out flex items-center justify-end pr-6"
                    style={{ width: isVisible ? "100%" : "0%" }}
                  >
                    <span className="text-white font-bold">Job ads + Recruiters + Headhunters</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg md:text-xl font-semibold">AI-Powered Hiring (30 hires/year)</span>
                  <span className="text-2xl md:text-3xl font-bold text-[#f7a022]">&lt; RM15,000</span>
                </div>
                <div className="relative h-16 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#f7a022] to-[#ff8c42] transition-all duration-2000 ease-out delay-500 flex items-center justify-end pr-6"
                    style={{ width: isVisible ? "50%" : "0%" }}
                  >
                    <span className="text-white font-bold">AI Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="animate-bounce">
            <svg className="w-12 h-12 text-[#f7a022]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="text-center transition-transform duration-300 ease-out w-full"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#f7a022]/30 blur-3xl rounded-full animate-pulse" />
              <div className="relative px-12 py-12 bg-gradient-to-br from-[#f7a022]/20 to-[#ff8c42]/20 border-4 border-[#f7a022] rounded-3xl backdrop-blur-sm max-w-6xl mx-auto">
                <h2 className="text-6xl md:text-8xl font-bold text-[#f7a022] mb-6 leading-tight">
                  You Save
                  <br />
                  50%+
                </h2>
                <p className="text-2xl md:text-3xl text-foreground font-semibold leading-relaxed">
                  While hiring <span className="text-[#f7a022]">faster</span> and more{" "}
                  <span className="text-[#f7a022]">effectively</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
