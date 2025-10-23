"use client"

import type React from "react"
import Image from "next/image"

import { useState, useRef, useEffect, useCallback } from "react"
import { useVideoProgress } from "./video-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Confetti from "./confetti"

export function RewardSection() {
  // This comment was added to test Git's change detection.
  const { allVideosWatched, watchedCount } = useVideoProgress()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isSectionInView, setIsSectionInView] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [hoveredMascot, setHoveredMascot] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting)
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
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

  const cardBgColor = "white"
  const cardBorderColor = "rgba(247, 160, 34, 0.3)"

  return (
    <section
      id="reward-section"
      ref={sectionRef}
      className="relative flex items-center justify-center py-16 px-6 overflow-hidden transition-all duration-500 bg-[#f7a022]"
      style={{ backgroundColor: '#f7a022' }}
    >

      <div
        className={`absolute -left-20 top-1/4 transition-all duration-1000 ${
          isSectionInView ? "translate-x-60" : ""
        }`}
        style={{ transform: `translateX(${scrollOffset * 0.1}px)` }}
      >
        <Image
          src="/ajobthing-mascot.png"
          alt="AJobThing Mascot"
          width={150}
          height={150}
          onMouseEnter={() => setHoveredMascot(0)}
          onMouseLeave={() => setHoveredMascot(null)}
          className={hoveredMascot === 0 ? "animate-jump" : ""}
        />
      </div>
      <div
        className={`absolute -right-40 top-1/2 transition-all duration-1000 delay-200 ${
          isSectionInView ? "-translate-x-60" : ""
        }`}
        style={{ transform: `translateX(-${scrollOffset * 0.15}px)` }}
      >
        <Image
          src="/ajobthing-mascot-one.png"
          alt="AJobThing Mascot One"
          width={180}
          height={180}
          onMouseEnter={() => setHoveredMascot(1)}
          onMouseLeave={() => setHoveredMascot(null)}
          className={hoveredMascot === 1 ? "animate-jump" : ""}
        />
      </div>
      <div
        className={`absolute -left-20 bottom-1/4 transition-all duration-1000 delay-400 ${
          isSectionInView ? "translate-x-80" : ""
        }`}
        style={{ transform: `translateX(${scrollOffset * 0.05}px)` }}
      >
        <Image
          src="/ajobthing-mascot-sing.png"
          alt="AJobThing Mascot Sing"
          width={130}
          height={130}
          onMouseEnter={() => setHoveredMascot(2)}
          onMouseLeave={() => setHoveredMascot(null)}
          className={hoveredMascot === 2 ? "animate-jump" : ""}
        />
      </div>
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {!allVideosWatched ? (
                        <div
                          className="backdrop-blur-sm rounded-3xl transition-all duration-700 overflow-hidden bg-white border-4 border-white shadow-lg"
                        >
                          <Image
                            src="/zus-banner-landing-page.jpg"
                            alt="ZUS Banner Landing Page"
                            width={600}
                            height={200}
                            className="w-full object-cover"
                          />
                          <div className="h-1 bg-gray-300 my-12 w-1/2 mx-auto" /> {/* Divider */}
                          <div className="text-center p-12">
                            <h2 className="text-5xl md:text-6xl font-black mb-4 text-balance" style={{ marginTop: '-20px' }}>
                              <span className="text-[#f7a022]">Unlock</span>{" "}
                              <span className="text-black">Your Daily Reward</span>
                            </h2>
                            <p
                              className="text-lg md:text-xl mb-8 max-w-md mx-auto text-black"
                            >
                              Watch all 5 remaining videos to claim Zus Coffee
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
                        </div>        ) : !isSubmitted ? (
          <div className="relative">
            <div className="absolute inset-0">
              <Confetti />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#f7a022] rounded-tl-3xl opacity-60" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#f7a022] rounded-br-3xl opacity-60" />
            </div>
            <div
              className="relative p-12 md:p-16 backdrop-blur-sm rounded-3xl shadow-lg shadow-[#f7a022]/20 transition-all duration-700 bg-white border-4 border-white"
            >
              <div className="flex justify-center mb-8">
                <Image
                  src="/ajobthing-mascot.png"
                  alt="AJobThing Mascot"
                  width={180}
                  height={180}
                  className="object-contain"n                />
              </div>
              <div className="text-center mb-12">
                <div className="inline-block mb-6 px-6 py-3 bg-[#f7a022]/10 border-2 border-[#f7a022]/30 rounded-full">
                  <span className="text-[#f7a022] text-sm font-bold tracking-wider uppercase">🎉 Congratulations!</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-6 text-balance leading-none">
                  <span className="text-[#f7a022]">You Won a</span>
                  <br />
                  <span className="text-black">Reward!</span>
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600"
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
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600"
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