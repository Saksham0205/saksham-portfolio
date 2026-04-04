"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Phone, PhoneOff, X } from "lucide-react"

function useRingtone() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playRing = useCallback(() => {
    try {
      if (!audioRef.current) {
        const audio = new Audio("/sounds/ringtone.wav")
        audio.loop = true
        audio.volume = 0.5
        audioRef.current = audio
      }
      // .play() returns a promise — browsers allow it after user gesture
      const playPromise = audioRef.current.play()
      if (playPromise) {
        playPromise.catch(() => {
          // Autoplay blocked — we'll retry on next user interaction
        })
      }
    } catch {
      // Audio not supported
    }
  }, [])

  const stopRing = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  return { playRing, stopRing }
}

const greetingMessages = [
  { text: "Hey there! 👋", delay: 0 },
  { text: "I'm Saksham, thanks for picking up!", delay: 800 },
  { text: "I'm a Full-Stack Developer & Founder who loves building scalable products.", delay: 1800 },
  { text: "Feel free to scroll through my portfolio, or hit me up at saksham252003@gmail.com", delay: 3000 },
  { text: "Let's build something amazing together! 🚀", delay: 4200 },
]

export function IncomingCall() {
  const [phase, setPhase] = useState<"waiting" | "ringing" | "answered" | "dismissed">("waiting")
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const { playRing, stopRing } = useRingtone()

  // Show call popup 3 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("ringing")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Play ringtone when ringing
  useEffect(() => {
    if (phase === "ringing") {
      playRing()
    }
    return () => {
      if (phase === "ringing") stopRing()
    }
  }, [phase, playRing, stopRing])

  // Animate greeting messages
  useEffect(() => {
    if (phase !== "answered") return

    const timers = greetingMessages.map((msg, i) =>
      setTimeout(() => setVisibleMessages(i + 1), msg.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [phase])

  const handlePickUp = () => {
    stopRing()
    setPhase("answered")
  }

  const handleDecline = () => {
    stopRing()
    setPhase("dismissed")
  }

  const handleClose = () => {
    setPhase("dismissed")
  }

  if (phase === "waiting" || phase === "dismissed") return null

  return (
    <>
      {/* Ringing popup — bottom sheet on mobile, side panel on desktop */}
      {phase === "ringing" && (
        <div className="fixed z-[201]
          bottom-0 left-0 right-0 animate-slide-in-bottom
          sm:bottom-auto sm:left-auto sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:animate-slide-in-right"
        >
          <div className="bg-[#111111] border border-[#1f1f1f]
            rounded-t-2xl p-5
            sm:rounded-t-none sm:rounded-l-2xl sm:p-6
            shadow-2xl shadow-[#00f5ff]/10 w-full sm:min-w-[280px] sm:w-auto"
          >
            {/* Caller info */}
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00f5ff]/10 border-2 border-[#00f5ff]/40 flex items-center justify-center animate-vibrate">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f5ff]" />
              </div>
              <div className="flex-1">
                <p className="text-[#00f5ff] text-xs sm:text-sm font-medium tracking-wider uppercase">Incoming Call</p>
                <p className="text-white text-base sm:text-lg font-bold">Saksham</p>
                <p className="text-[#888] text-xs">Portfolio Owner</p>
              </div>
              <button
                onClick={handleDecline}
                className="sm:hidden flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 text-red-400 p-3 rounded-xl transition-all active:scale-95"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePickUp}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                Pick Up
              </button>
              <button
                onClick={handleDecline}
                className="hidden sm:flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 text-red-400 p-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat/greeting box after answering */}
      {phase === "answered" && (
        <div
          className="fixed inset-0 z-[202] bg-black/60 backdrop-blur-sm grid place-items-center"
          style={{ padding: "16px" }}
          onClick={handleClose}
        >
          <div
            className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl shadow-[#00f5ff]/10 animate-scale-in"
            style={{ width: "100%", maxWidth: "28rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#00f5ff]/10 border-b border-[#1f1f1f] p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00f5ff]/20 border border-[#00f5ff]/40 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#00f5ff]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Saksham</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Connected
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-[#888] hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3 min-h-[180px] max-h-[60vh] overflow-y-auto">
              {greetingMessages.slice(0, visibleMessages).map((msg, i) => (
                <div key={i} className="flex justify-start animate-msg-in">
                  <div className="bg-[#1a1a2e] border border-[#00f5ff]/10 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-2.5 max-w-[90%]">
                    <p className="text-[#e5e5e5] text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              {visibleMessages >= greetingMessages.length && (
                <div className="flex justify-center pt-2 animate-msg-in">
                  <a
                    href="#contact"
                    onClick={handleClose}
                    className="bg-[#00f5ff] text-[#0a0a0a] font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-[#00f5ff]/80 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
                  >
                    Let&apos;s Connect →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
