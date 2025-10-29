
"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TutorialTooltipProps {
  isOpen: boolean;
}

export function TutorialTooltip({ isOpen }: TutorialTooltipProps) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0} container={document.body}>
      <Tooltip open={isOpen}>
        <TooltipTrigger>
          <span className="sr-only">Tooltip Trigger</span>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-4 rounded-lg">
          <p className="text-lg font-semibold mb-2">Click to watch</p>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
