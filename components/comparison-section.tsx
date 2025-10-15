"use client"

import { Clock, Users, Target, TrendingUp, Brain, Zap, CheckCircle2, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "./scroll-reveal"

export function ComparisonSection() {
  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">The Transformation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              See the dramatic difference between traditional hiring methods and AI-powered solutions
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Comparison */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <ScrollReveal delay={100}>
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Time to Hire</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Traditional</span>
                  <span className="text-2xl font-bold text-destructive">45 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI-Powered</span>
                  <span className="text-2xl font-bold text-primary">12 days</span>
                </div>
                <div className="pt-2 text-sm font-medium text-primary">73% faster</div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Candidate Quality</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Traditional</span>
                  <span className="text-2xl font-bold text-destructive">62%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI-Powered</span>
                  <span className="text-2xl font-bold text-primary">94%</span>
                </div>
                <div className="pt-2 text-sm font-medium text-primary">52% improvement</div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Cost Reduction</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Traditional</span>
                  <span className="text-2xl font-bold text-destructive">$15K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI-Powered</span>
                  <span className="text-2xl font-bold text-primary">$4.5K</span>
                </div>
                <div className="pt-2 text-sm font-medium text-primary">70% savings</div>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        {/* Detailed Comparison */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Traditional Method */}
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">Traditional Hiring</h3>
              </div>

              <Card className="p-6 bg-card border-destructive/20">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Time-Consuming Process</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Manual resume screening takes hours per candidate. Scheduling interviews across multiple
                      stakeholders creates delays and bottlenecks.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-destructive/20">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Limited Candidate Pool</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reliance on job boards and referrals restricts access to passive candidates. Geographic
                      limitations reduce diversity and talent quality.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-destructive/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Unconscious Bias</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Human reviewers inadvertently favor candidates with similar backgrounds. Subjective assessments
                      lead to inconsistent hiring decisions.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-destructive/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">High Costs</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Recruiter fees, job board subscriptions, and lengthy hiring cycles drain resources. Poor hires
                      cost companies up to 30% of annual salary.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>

          {/* AI-Powered Method */}
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">AI-Powered Hiring</h3>
              </div>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Lightning-Fast Screening</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AI analyzes thousands of resumes in seconds, identifying top candidates instantly. Automated
                      scheduling eliminates coordination delays.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Talent Access</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AI sourcing reaches passive candidates across multiple platforms. Smart matching connects you with
                      hidden gems worldwide.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Objective Assessment</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Data-driven evaluation removes unconscious bias from hiring. Consistent criteria ensure fair
                      comparison across all candidates.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Massive ROI</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reduced time-to-hire and improved quality lower overall costs. Predictive analytics minimize bad
                      hires and turnover expenses.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
