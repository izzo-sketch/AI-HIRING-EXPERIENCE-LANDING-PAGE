"use client"

import type React from "react"
import Image from "next/image"

import { useState, useRef, useEffect, useCallback } from "react"
import { useVideoProgress } from "./video-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2 } from "lucide-react"
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
    companyName: "",
    companyEmail: "",
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

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyN_KfC7QdMzoByNXmgmNpVyrqekBKGoDtvbL5XJ5z91wkg1Kb2aNsNXOJy93ngX4kIZw/exec";

    const data = new FormData();
    data.append('Name', formData.name);
    data.append('Contact', formData.contact);
    data.append('CompanyName', formData.companyName);
    data.append('CompanyEmail', formData.companyEmail);

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "You won a reward from us! Our AM will contact you shortly.",
        });
      } else {
        const errorData = await response.json().catch(() => null); // See if Google Scripts sends a JSON error
        console.error("Submission failed server-side:", errorData);
        throw new Error('Failed to submit to Google Sheet.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          src="/jobie-one.png"
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
          src="/jobie-sing.png"
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
                  className="object-contain animate-jump"                />
              </div>
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-7xl font-black mb-6 text-balance leading-none">
                  <span className="text-[#f7a022]">🏆 You’ve Completed All Videos!</span>
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600"
                >
                  You now stand a chance to win a ZUS Coffee voucher 🎁
                  <br />
                  Fill in your details below to enter the draw.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold text-black">
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
                    <Label htmlFor="contact" className="text-base font-semibold text-black">
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

                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-base font-semibold text-black">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="AJobThing Sdn Bhd"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="h-14 text-lg text-black bg-white/80 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-[#f7a022] focus:border-[#f7a022] hover:bg-white hover:border-[#f7a022]/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail" className="text-base font-semibold text-black">
                      Company Email *
                    </Label>
                    <Input
                      id="companyEmail"
                      name="companyEmail"
                      type="email"
                      placeholder="hr@ajobthing.com"
                      value={formData.companyEmail}
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
                <CheckCircle2 className="w-12 h-12 text-primary fill-current" />
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-balance">
              <span className="text-[#f7a022]">Submission Received!</span>
            </h2>
            <p
              className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed text-gray-600"
            >
              <span className="font-semibold">Thanks for joining! 🎉</span>
            </p>
            <div className="max-w-xl mx-auto p-6 bg-[#f7a022]/10 rounded-xl border border-[#f7a022]/20 mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Stay tuned — We will announce the daily winner in our WhatsApp group.
                <br />
                Join here: <a href="https://epca.in/ajt-wa-channel" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">https://epca.in/ajt-wa-channel</a>
              </p>
            </div>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600 mt-8">
              If you have any questions, feel free to contact your Account Manager for more details.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}