"use client"

import { useEffect, useRef, useState } from "react"

export function SavingsSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-[#f7a022]/5 to-background overflow-hidden py-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#f7a022]/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#ff8c42]/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Main savings card with horizontal reveal */}
        <div
          className={`transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
          }`}
        >
          <div className="relative p-16 md:p-24 bg-gradient-to-br from-[#f7a022]/20 via-[#ff8c42]/15 to-[#f7a022]/10 backdrop-blur-sm border-4 border-[#f7a022] rounded-3xl shadow-2xl shadow-[#f7a022]/30 overflow-hidden">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7a022]/40 to-transparent rounded-3xl blur-2xl animate-pulse" />

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#f7a022] rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#f7a022] rounded-br-3xl" />

            <div className="relative z-10 text-center">
              <p className="text-3xl md:text-4xl text-muted-foreground mb-6 font-medium">You Save</p>
              <p className="text-9xl md:text-[12rem] font-black text-[#f7a022] mb-8 drop-shadow-2xl leading-none">
                50%+
              </p>
              <p className="text-2xl md:text-4xl text-foreground font-bold max-w-3xl mx-auto leading-relaxed">
                While hiring <span className="text-[#f7a022]">faster</span> and more{" "}
                <span className="text-[#f7a022]">effectively</span>
              </p>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#f7a022]/40 rounded-full blur-2xl animate-float" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#ff8c42]/30 rounded-full blur-2xl animate-float-delayed" />
          </div>
        </div>

        {/* Pain points section */}
        <div
          className={`mt-20 transition-all duration-1500 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            The Problems Were <span className="text-[#f7a022]">Clear</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Slow hiring process taking weeks or months",
              "No guarantee of finding the right candidate",
              "High costs with unpredictable results",
              "Manual screening of irrelevant applications",
            ].map((pain, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-8 bg-background/80 backdrop-blur-sm border-2 border-[#f7a022]/30 rounded-2xl hover:border-[#f7a022] hover:shadow-lg hover:shadow-[#f7a022]/20 transition-all duration-300 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="w-4 h-4 bg-[#f7a022] rounded-full flex-shrink-0 animate-pulse" />
                <p className="text-lg text-foreground font-medium">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
