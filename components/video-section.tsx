"use client"

import { VideoPlayer } from "./video-player"
import { ScrollReveal } from "./scroll-reveal"
import { Sparkles, Zap, Users, Gift, Database } from "lucide-react"

export function VideoSection() {
  const videos = [
    {
      id: "video1" as const,
      icon: Sparkles,
      title: "AI Job Ads",
      subtitle: "From RM800",
      description:
        "AI writes compelling job ads, screens candidates, and conducts virtual interviews—while proactively approaching qualified candidates",
      videoUrl: "https://www.youtube.com/embed/BxNdFKCbwJM",
      thumbnail: "/ai-job-ads.jpg",
      color: "from-purple-500 to-pink-500",
      benefits: ["Auto-screen candidates", "Virtual interviews", "Proactive outreach"],
    },
    {
      id: "video2" as const,
      icon: Zap,
      title: "AI Candidate Search",
      subtitle: "RM10-30 per resume",
      description:
        "AI automates 70% of recruiting work—finding candidates, reaching out, checking interest, and running initial screening",
      videoUrl: "https://www.youtube.com/embed/dOQzH_1uCjU",
      thumbnail: "/ai-candidate-search.jpg",
      color: "from-cyan-500 to-blue-500",
      benefits: ["70% automation", "Smart matching", "Auto screening"],
    },
    {
      id: "video3" as const,
      icon: Users,
      title: "Smart Walk-In Interviews",
      subtitle: "Few hundred RM/event",
      description:
        "AI promotes events across social media, manages sign-ups, and gives HQ real-time analytics for every branch",
      videoUrl: "https://www.youtube.com/embed/-N-QdMgww0c",
      thumbnail: "/smart-walkin.jpg",
      color: "from-green-500 to-emerald-500",
      benefits: ["Social promotion", "Auto sign-ups", "Real-time analytics"],
    },
    {
      id: "video4" as const,
      icon: Gift,
      title: "AI Referral Programs",
      subtitle: "You set the reward",
      description:
        "AI launches your referral program instantly, tracks referrals, manages resumes, and automates payouts",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnail: "/ai-referral.jpg",
      color: "from-orange-500 to-red-500",
      benefits: ["Instant launch", "Auto tracking", "Automated payouts"],
    },
    {
      id: "video5" as const,
      icon: Database,
      title: "My Talent Pool (AI ATS)",
      subtitle: "Few hundred RM/month",
      description:
        "Build your private talent database with auto-updating resumes. Access 5,000 to 300,000+ profiles instantly when you need to hire",
      videoUrl: "https://www.youtube.com/embed/bHzR0dYEdRA",
      thumbnail: "/talent-pool.jpg",
      color: "from-violet-500 to-purple-500",
      benefits: ["Private database", "Auto-updates", "Instant access"],
    },
  ]

  return (
    <section className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-24">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary text-sm font-medium">THE AI TRANSFORMATION</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              5 AI Solutions That
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Change Everything
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Watch each video to discover how AI makes hiring faster, smarter, and more cost-effective
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-32">
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 100}>
              <div className="relative">
                {/* Video number indicator */}
                <div className="absolute -left-4 top-0 md:-left-12">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${video.color} flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-2xl`}
                  >
                    {index + 1}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Content side */}
                  <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"} space-y-6`}>
                    <div
                      className={`inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r ${video.color} rounded-full`}
                    >
                      <video.icon className="w-5 h-5 text-white" />
                      <span className="text-white font-bold text-sm">{video.subtitle}</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{video.title}</h3>

                    <p className="text-lg text-muted-foreground leading-relaxed">{video.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-3">
                      {video.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium"
                        >
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video side */}
                  <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                    <VideoPlayer
                      videoId={video.id}
                      title={video.title}
                      description={video.description}
                      videoUrl={video.videoUrl}
                      thumbnail={video.thumbnail}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Cost comparison visual */}
        <ScrollReveal delay={500}>
          <div className="mt-32 p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-3xl">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Cost Comparison</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-destructive/10 border border-destructive/20 rounded-2xl">
                <h4 className="text-2xl font-bold mb-6 text-destructive">The Old Way</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Job Ad: RM600–RM900</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Candidate Search: RM10–30 + RM5,000 recruiter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Headhunter: RM14k–RM20k per hire</span>
                  </li>
                </ul>
                <p className="mt-6 text-3xl font-bold text-destructive">RM30,000+</p>
                <p className="text-sm text-muted-foreground">for 30 hires/year</p>
              </div>

              <div className="p-8 bg-primary/10 border border-primary/20 rounded-2xl">
                <h4 className="text-2xl font-bold mb-6 text-primary">The AI Way</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>AI Job Ad: From RM800</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>AI Search: RM10–30 (70% automated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Smart Walk-In + Referral + ATS: Few hundred RM</span>
                  </li>
                </ul>
                <p className="mt-6 text-3xl font-bold text-primary">&lt; RM15,000</p>
                <p className="text-sm text-muted-foreground">for 30 hires/year</p>
              </div>
            </div>
            <p className="text-center mt-8 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Save 50%+ while hiring faster
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
