"use client"

import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { EmblaCarouselType } from "embla-carousel"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"

const winners = [
  { day: "Monday", date: "2025-10-20", name: "John Doe" },
  { day: "Tuesday", date: "2025-10-21", name: "Jane Smith" },
  { day: "Wednesday", date: "2025-10-22", name: "Peter Jones" },
  { day: "Thursday", date: "2025-10-23", name: "Mary Williams" },
  { day: "Friday", date: "2025-10-24", name: "David Brown" },
  { day: "Saturday", date: "2025-10-25", name: "Michael Miller" },
  { day: "Sunday", date: "2025-10-26", name: "Sarah Wilson" },
]

const formatWinnerName = (name: string) => {
  const parts = name.split(" ")
  return parts
    .map((part) => `${part.charAt(0)}${"*".repeat(part.length - 1)}`)
    .join(" ")
}

export function LeaderboardSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      startIndex: winners.length - 2, // Start with "yesterday's" winner
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredWinner, setHoveredWinner] = useState<number | null>(null)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const updateCarousel = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", updateCarousel)
      updateCarousel()
    }
  }, [emblaApi, updateCarousel])

  return (
    <>
      <style jsx>{`
        .embla {
          overflow: hidden;
          position: relative;
        }
        .embla__container {
          display: flex;
          align-items: center; /* Vertically center slides */
        }
        .embla__slide {
          flex: 0 0 33.33%;
          min-width: 0;
          position: relative;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .embla__slide__content {
          transform: scale(0.7);
          opacity: 0.4;
          transition: transform 0.5s ease, opacity 0.5s ease;
          cursor: pointer;
        }
        .embla__slide--selected .embla__slide__content {
          transform: scale(1);
          opacity: 1;
        }
        .embla__button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            background: rgba(0,0,0,0.5);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .embla__button--prev {
            left: 10px;
        }
        .embla__button--next {
            right: 10px;
        }
      `}</style>
              <section
                id="leaderboard-section"
                className="relative flex items-center justify-center py-12 px-6 bg-gradient-to-br from-background via-[#f7a022]/5 to-background overflow-hidden transition-all duration-500"
              >        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-balance">
              <span className="text-[#f7a022]">Daily</span>{" "}
              <span>Winner List</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto">
              Congratulations to our Daily Winner.
            </p>
          </div>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {winners.map((winner, index) => (
                <div
                  className={`embla__slide ${
                    index === selectedIndex ? "embla__slide--selected" : ""
                  }`}
                  key={index}
                  onMouseEnter={() => setHoveredWinner(index)}
                  onMouseLeave={() => setHoveredWinner(null)}
                >
                  <div className="p-4 rounded-lg text-center embla__slide__content">
                    <div className="flex justify-center mb-4">
                        <Trophy size={index === selectedIndex ? 64 : 48} className="text-[#f7a022]" />
                    </div>
                    <div className="text-lg font-bold text-[#f7a022]">
                      {winner.day}
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {winner.date}
                    </div>
                    <div className="text-2xl font-semibold">
                      {hoveredWinner === index
                        ? winner.name
                        : formatWinnerName(winner.name)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="embla__button embla__button--prev" onClick={scrollPrev}>
                <ChevronLeft size={32} />
            </button>
            <button className="embla__button embla__button--next" onClick={scrollNext}>
                <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
