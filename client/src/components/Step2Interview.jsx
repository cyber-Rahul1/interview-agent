import React, { useState, useRef, useEffect } from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion, AnimatePresence } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight, BsCheckCircleFill } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData
  const [isIntroPhase, setIsIntroPhase] = useState(true)

  const [isMicOn, setIsMicOn] = useState(true)
  const recognitionRef = useRef(null)
  const [isAIPlaying, setIsAIPlaying] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  )
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voiceGender, setVoiceGender] = useState("female")
  const [subtitle, setSubtitle] = useState("")

  const videoRef = useRef(null)
  const baseAnswerRef = useRef("")
  const answerRef = useRef("")
  const isMicOnRef = useRef(isMicOn)
  const isAIPlayingRef = useRef(isAIPlaying)

  useEffect(() => {
    answerRef.current = answer
  }, [answer])

  useEffect(() => {
    isMicOnRef.current = isMicOn
  }, [isMicOn])

  useEffect(() => {
    isAIPlayingRef.current = isAIPlaying
  }, [isAIPlaying])

  const currentQuestion = questions[currentIndex]

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return

      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("female")
      )

      if (femaleVoice) {
        setSelectedVoice(femaleVoice)
        setVoiceGender("female")
        return
      }

      const maleVoice = voices.find(v =>
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark") ||
        v.name.toLowerCase().includes("male")
      )

      if (maleVoice) {
        setSelectedVoice(maleVoice)
        setVoiceGender("male")
        return
      }

      setSelectedVoice(voices[0])
      setVoiceGender("female")
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo

  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve()
        return
      }

      window.speechSynthesis.cancel()

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ")

      const utterance = new SpeechSynthesisUtterance(humanText)
      utterance.voice = selectedVoice
      utterance.rate = 0.92
      utterance.pitch = 1.05
      utterance.volume = 1

      utterance.onstart = () => {
        setIsAIPlaying(true)
        stopMic()
        videoRef.current?.play()
      }

      utterance.onend = () => {
        videoRef.current?.pause()
        if (videoRef.current) {
          videoRef.current.currentTime = 0
        }
        setIsAIPlaying(false)

        if (isMicOn) {
          startMic()
        }
        setTimeout(() => {
          setSubtitle("")
          resolve()
        }, 300)
      }

      setSubtitle(text)
      window.speechSynthesis.speak(utterance)
    })
  }

  useEffect(() => {
    if (!selectedVoice) return

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        )
        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        )
        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800))

        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.")
        }

        await speakText(currentQuestion.question)

        if (isMicOn) {
          startMic()
        }
      }
    }

    runIntro()
  }, [selectedVoice, isIntroPhase, currentIndex])

  useEffect(() => {
    if (isIntroPhase) return
    if (!currentQuestion) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60)
    }
  }, [currentIndex])

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = "en-US"
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event) => {
      let sessionTranscript = ""
      for (let i = 0; i < event.results.length; i++) {
        sessionTranscript += event.results[i][0].transcript + " "
      }

      const base = baseAnswerRef.current ? baseAnswerRef.current.trim() : ""
      const current = sessionTranscript.trim()
      setAnswer(base ? `${base} ${current}` : current)
    }

    recognition.onend = () => {
      baseAnswerRef.current = answerRef.current
      if (isMicOnRef.current && !isAIPlayingRef.current) {
        try {
          recognition.start()
        } catch { }
      }
    }

    recognition.onerror = (e) => {
      if (e.error === "no-speech") return
      console.log("Speech recognition error:", e.error)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.onresult = null
      recognition.onend = null
      recognition.onerror = null
      try {
        recognition.stop()
        recognition.abort()
      } catch { }
    }
  }, [])

  const startMic = () => {
    if (recognitionRef.current && !isAIPlayingRef.current) {
      baseAnswerRef.current = answerRef.current
      try {
        recognitionRef.current.start()
      } catch { }
    }
  }

  const stopMic = () => {
    if (recognitionRef.current) {
      baseAnswerRef.current = answerRef.current
      try {
        recognitionRef.current.stop()
      } catch { }
    }
  }

  const toggleMic = () => {
    if (isMicOn) {
      stopMic()
    } else {
      startMic()
    }
    setIsMicOn(!isMicOn)
  }

  const submitAnswer = async () => {
    if (isSubmitting) return
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: currentQuestion.timeLimit - timeLeft,
      }, { withCredentials: true })

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    baseAnswerRef.current = ""
    setAnswer("")
    setFeedback("")

    if (currentIndex + 1 >= questions.length) {
      finishInterview()
      return
    }

    await speakText("Alright, let's move to the next question.")
    setCurrentIndex(currentIndex + 1)
    setTimeout(() => {
      if (isMicOn) startMic()
    }, 500)
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isIntroPhase) return
    if (!currentQuestion) return

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        recognitionRef.current.abort()
      }
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-6 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl shadow-xs overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Column: Visual AI Interviewer & Metrics */}
        <aside className="w-full lg:w-[360px] bg-[#FFFFFF] p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E7E5DE]">
          <div className="space-y-6">
            {/* Top Status Banner */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#92938D]">
                Interview Room
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isAIPlaying ? "bg-[#355743] animate-pulse" : "bg-[#92938D]"}`}></span>
                <span className="text-xs font-mono text-[#20231F]">
                  {isAIPlaying ? "AI Inquiring" : isMicOn ? "Listening" : "Ready"}
                </span>
              </div>
            </div>

            {/* AI Avatar Video Canvas */}
            <div className="w-full rounded-lg overflow-hidden border border-[#E7E5DE] bg-[#F7F6F2] aspect-4/3 relative">
              <video
                src={videoSource}
                key={videoSource}
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              {isAIPlaying && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#20231F]/80 text-[#F7F6F2] text-[10px] font-mono tracking-wider">
                  Live Voice Active
                </div>
              )}
            </div>

            {/* Subtitle / Caption Stream */}
            <AnimatePresence>
              {subtitle && (
                <motion.div 
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#F0EFE9] border border-[#E7E5DE] rounded-lg p-3 text-xs text-[#20231F] leading-relaxed italic"
                >
                  "{subtitle}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Time & Question Progress Module */}
          <div className="mt-8 pt-6 border-t border-[#E7E5DE] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#92938D]">Time Remaining</div>
                <div className="text-xs text-[#696B65] mt-0.5">Automated submission upon expiry</div>
              </div>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E7E5DE] text-center">
              <div className="p-3 rounded-lg bg-[#F7F6F2] border border-[#E7E5DE]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#92938D]">Current</div>
                <div className="font-serif-luxury text-2xl text-[#20231F] mt-0.5">
                  {currentIndex + 1}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#F7F6F2] border border-[#E7E5DE]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#92938D]">Total</div>
                <div className="font-serif-luxury text-2xl text-[#20231F] mt-0.5">
                  {questions.length}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Question Text & Response Area */}
        <section className="flex-1 p-6 lg:p-10 flex flex-col justify-between bg-[#FFFFFF]">
          <div>
            {/* Phase header */}
            <div className="mb-6 pb-4 border-b border-[#E7E5DE] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#355743] block">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <h2 className="font-serif-luxury text-2xl text-[#20231F] mt-1">
                  {isIntroPhase ? "Candidate Introduction" : "Technical & Behavioral Inquiry"}
                </h2>
              </div>
              {currentQuestion?.timeLimit && (
                <span className="text-xs font-mono text-[#696B65] bg-[#F7F6F2] px-2.5 py-1 rounded border border-[#E7E5DE]">
                  {currentQuestion.timeLimit}s limit
                </span>
              )}
            </div>

            {/* Central Prominent Question Display */}
            {!isIntroPhase && currentQuestion && (
              <div className="mb-6 p-6 rounded-lg bg-[#F7F6F2] border border-[#E7E5DE]">
                <p className="font-serif-luxury text-xl sm:text-2xl text-[#20231F] leading-snug">
                  "{currentQuestion.question}"
                </p>
              </div>
            )}

            {/* Interactive Response Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#696B65]">
                <label className="font-medium uppercase tracking-wider text-[11px]">Your Transcript / Response</label>
                <span className="text-[11px] text-[#92938D]">
                  {isMicOn ? "Speech-to-text enabled" : "Mic paused, typing enabled"}
                </span>
              </div>
              <textarea
                placeholder="Speak naturally into your microphone, or type your response directly..."
                onChange={(e) => {
                  setAnswer(e.target.value)
                  baseAnswerRef.current = e.target.value
                }}
                value={answer}
                rows={8}
                className="w-full bg-[#FFFFFF] border border-[#E7E5DE] p-4 rounded-lg text-sm text-[#20231F] placeholder:text-[#92938D] focus:border-[#355743] resize-none leading-relaxed transition"
              />
            </div>
          </div>

          {/* Action Footer: Feedback or Submit / Mic Controls */}
          <div className="mt-8 pt-6 border-t border-[#E7E5DE]">
            {!feedback ? (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`w-11 h-11 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                    isMicOn
                      ? "bg-[#FFFFFF] border-[#355743] text-[#355743] hover:bg-[#E9EFE8]"
                      : "bg-[#F7F6F2] border-[#E7E5DE] text-[#92938D] hover:text-[#20231F]"
                  }`}
                  title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                >
                  {isMicOn ? <FaMicrophone size={16} /> : <FaMicrophoneSlash size={16} />}
                </button>

                <button
                  type="button"
                  onClick={submitAnswer}
                  disabled={isSubmitting || !answer.trim()}
                  className="flex-1 bg-[#355743] hover:bg-[#294735] disabled:bg-[#92938D] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium py-3 px-6 rounded-md shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Evaluating response..." : "Submit Answer"}</span>
                  <BsArrowRight size={13} />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#E9EFE8]/50 border border-[#355743]/20 p-5 rounded-lg space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#294735] uppercase tracking-wider mb-1">
                    <BsCheckCircleFill size={14} className="text-[#355743]" />
                    <span>Evaluator Feedback</span>
                  </div>
                  <p className="text-xs text-[#20231F] leading-relaxed">
                    {feedback}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium py-3 px-6 rounded-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Next Question</span>
                  <BsArrowRight size={13} />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Step2Interview
