"use client"

import type React from "react"
import Image from "next/image"

import { useState, useRef, useEffect } from "react"
import { useVideoProgress } from "./video-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Confetti from "./confetti"

export function RewardSection() {
  const { allVideosWatched, watchedCount } = useVideoProgress()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)

    toast({
      title: "Success!",
      description: "You won a reward from us! Our AM will contact you shortly.",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const cardBgColor = `rgba(255, 255, 255, ${scrollProgress * 0.95})`
  const cardBorderColor = `rgba(247, 160, 34, ${0.3 + scrollProgress * 0.7})`
  const bgGradient = `linear-gradient(135deg, 
    rgba(247, 160, 34, ${scrollProgress * 0.15}), 
    rgba(255, 140, 66, ${scrollProgress * 0.1}))`

  return (
    <section
      id="reward-section"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 bg-gradient-to-br from-background via-[#f7a022]/5 to-background overflow-hidden transition-all duration-500"
      style={{
        background: bgGradient,
      }}
    >
      <div className="absolute inset-0 opacity-70 transition-all duration-200 pointer-events-none" />
      <div className="absolute inset-0 opacity-50 transition-all duration-300 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-20 left-10 w-40 h-40 bg-[#f7a022]/50 rounded-full blur-3xl transition-all duration-700"
          style={{
            transform: `scale(${1 + scrollProgress * 0.5}) translateY(${scrollProgress * -50}px)`,
          }}
        />
        <div
          className="absolute bottom-40 right-20 w-56 h-56 bg-[#ff8c42]/40 rounded-full blur-3xl transition-all duration-700"
          style={{
            transform: `scale(${1 + scrollProgress * 0.5}) translateY(${scrollProgress * 50}px)`,
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#f7a022]/35 rounded-full blur-2xl transition-all duration-700"
          style={{
            transform: `scale(${1 + scrollProgress * 0.3}) translateX(${scrollProgress * 30}px)`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {!allVideosWatched ? (
          <div
            className="text-center p-16 backdrop-blur-sm rounded-3xl transition-all duration-700"
            style={{
              backgroundColor: cardBgColor,
              borderWidth: "2px",
              borderColor: cardBorderColor,
            }}
          >
            <div className="flex justify-center mb-8">
              <div className="animate-bounce">
                <Image
                  src="/ajobthing-mascot.png"
                  alt="AJobThing Mascot"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-balance">
              <span className="text-[#f7a022]">Unlock</span>{" "}
              <span style={{ color: `rgba(0, 0, 0, ${scrollProgress})` }}>Your Reward</span>
            </h2>
            <p
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              style={{ color: `rgba(100, 100, 100, ${0.6 + scrollProgress * 0.4})` }}
            >
              Watch all {5 - watchedCount} remaining video{5 - watchedCount !== 1 ? "s" : ""} to claim your exclusive AI
              hiring guide
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i < watchedCount ? "bg-[#f7a022] scale-125" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-lg text-[#f7a022] font-semibold">{watchedCount} of 5 completed</p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-6 py-3 bg-[#f7a022]/10 hover:bg-[#f7a022]/20 border-2 border-[#f7a022]/30 hover:border-[#f7a022] rounded-full transition-all duration-300 hover:scale-105"
              >
                <span className="text-[#f7a022] font-semibold">Watch Videos</span>
                <svg
                  className="w-5 h-5 text-[#f7a022] transition-transform group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        ) : !isSubmitted ? (
          <div className="relative">
            <Confetti />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#f7a022] rounded-tl-3xl opacity-60" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#f7a022] rounded-br-3xl opacity-60" />

            <div
              className="relative p-12 md:p-16 backdrop-blur-sm rounded-3xl shadow-2xl shadow-[#f7a022]/20 transition-all duration-700"
              style={{
                backgroundColor: cardBgColor,
                borderWidth: "2px",
                borderColor: cardBorderColor,
              }}
            >
              <div className="flex justify-center mb-8">
                <Image
                  src="/ajobthing-mascot.png"
                  alt="AJobThing Mascot"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div className="text-center mb-12">
                <div className="inline-block mb-6 px-6 py-3 bg-[#f7a022]/10 border-2 border-[#f7a022]/30 rounded-full">
                  <span className="text-[#f7a022] text-sm font-bold tracking-wider uppercase">🎉 Congratulations!</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-6 text-balance leading-none">
                  <span className="text-[#f7a022]">You Won a</span>
                  <br />
                  <span style={{ color: `rgba(0, 0, 0, ${scrollProgress})` }}>Reward!</span>
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                  style={{ color: `rgba(100, 100, 100, ${0.6 + scrollProgress * 0.4})` }}
                >
                  You've completed all videos! Fill in your details below and our Account Manager will contact you
                  shortly with your reward.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-14 text-lg text-black bg-white/80 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-[#f7a022] focus:border-[#f7a022] hover:bg-white hover:border-[#f7a022]/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-base font-semibold">
                      Contact Number *
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      placeholder="+60 12-345 6789"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="h-14 text-lg text-black bg-white/80 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-[#f7a022] focus:border-[#f7a022] hover:bg-white hover:border-[#f7a022]/50"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-16 text-xl font-bold bg-[#f7a022] hover:bg-[#f7a022]/90 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#f7a022]/40 relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        Processing...
                      </>
                    ) : (
                      <>🎁 Claim My Reward Now</>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  By submitting, you agree to be contacted by our Account Manager regarding your reward.
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div
            className="text-center p-16 backdrop-blur-sm rounded-3xl shadow-2xl shadow-[#f7a022]/20 transition-all duration-700"
            style={{
              backgroundColor: cardBgColor,
              borderWidth: "2px",
              borderColor: cardBorderColor,
            }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-[#f7a022]/20 flex items-center justify-center border-4 border-[#f7a022]">
                <div className="text-5xl">✓</div>
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-balance">
              <span className="text-[#f7a022]">Thank You!</span>
            </h2>
            <p
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: `rgba(100, 100, 100, ${0.6 + scrollProgress * 0.4})` }}
            >
              <span className="font-bold text-[#f7a022]">Congratulations, {formData.name}!</span>
              <br />
              You won a reward from us. Our Account Manager will contact you shortly at{" "}
              <span className="font-bold text-[#f7a022]">{formData.contact}</span>
            </p>
            <div className="max-w-xl mx-auto p-8 bg-[#f7a022]/5 rounded-2xl border border-[#f7a022]/20">
              <h3 className="text-2xl font-bold mb-6 text-[#f7a022]">What's Next?</h3>
              <ul className="text-left space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-[#f7a022] text-2xl">✓</span>
                  <span>Our Account Manager will reach out to you within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f7a022] text-2xl">✓</span>
                  <span>You'll receive details about your exclusive reward</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f7a022] text-2xl">✓</span>
                  <span>Get personalized guidance on implementing AI hiring solutions</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
