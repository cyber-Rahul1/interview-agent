import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react"
import {
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
  BsShieldCheck,
  BsCheck2
} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'
import hrImg from "../assets/HR.png"
import techImg from "../assets/tech.png"
import confidenceImg from "../assets/confi.png"
import creditImg from "../assets/credit.png"
import evalImg from "../assets/ai-ans.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"
import Footer from '../components/Footer'

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col text-[#20231F]">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="relative px-6 pt-20 pb-24 md:pt-28 md:pb-32 border-b border-[#E7E5DE]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-start max-w-3xl">
              {/* Refined Category Monogram */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E9EFE8] border border-[#355743]/15 text-[#294735] text-[11px] font-mono tracking-widest uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355743]"></span>
                Executive & Technical Preparation
              </div>

              {/* Editorial Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-[#20231F]"
              >
                Prepare with purpose. <br />
                <span className="italic text-[#355743]">Perform with confidence.</span>
              </motion.h1>

              {/* Supporting Editorial Paragraph */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg text-[#696B65] mt-8 max-w-2xl leading-relaxed"
              >
                Intelligent, voice-driven mock interviews tailored specifically to your resume, target role, and technical depth. Receive rigorous follow-up inquiries, live vocal cadence analysis, and objective feedback.
              </motion.p>

              {/* Primary / Secondary Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true)
                      return
                    }
                    navigate("/interview")
                  }}
                  className="bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-8 py-4 rounded-md shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Interview</span>
                  <BsArrowRight size={13} />
                </button>

                <button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true)
                      return
                    }
                    navigate("/history")
                  }}
                  className="bg-[#FFFFFF] hover:bg-[#F0EFE9] border border-[#E7E5DE] text-[#20231F] text-xs uppercase tracking-wider font-medium px-8 py-4 rounded-md transition cursor-pointer"
                >
                  View Performance Archive
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-14 pt-8 border-t border-[#E7E5DE] w-full grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#696B65]">
                <div className="flex items-center gap-2">
                  <BsCheck2 className="text-[#355743]" size={16} />
                  <span>Dynamic adaptive questioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsCheck2 className="text-[#355743]" size={16} />
                  <span>Resume & project extraction</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <BsShieldCheck className="text-[#355743]" size={16} />
                  <span>Confidential audio evaluation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Structured 3-Step Methodology Section */}
        <section className="px-6 py-20 border-b border-[#E7E5DE] bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#92938D] block mb-2">
                Methodology
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
                An engineered approach to interview mastery.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01 / PERSONALIZATION",
                  title: "Role & Experience Alignment",
                  desc: "Calibrate target seniority, technical domain, or leadership scope. Upload a resume to ground every question in your actual architectural deliverables."
                },
                {
                  step: "02 / PRACTICE",
                  title: "Adaptive Voice Simulation",
                  desc: "Participate in real-time spoken simulations where our cognitive interviewer listens, transcribes, and probes deeper based on your spoken answers."
                },
                {
                  step: "03 / IMPROVEMENT",
                  title: "Performance Dossier",
                  desc: "Acquire quantified scores across technical precision, communicative clarity, and confidence, complemented by downloadable executive PDF reviews."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-8 rounded-lg border border-[#E7E5DE] bg-[#F7F6F2] flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[11px] tracking-wider text-[#355743] font-medium block mb-4">
                      {item.step}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#20231F] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#696B65] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Capabilities (Clean Editorial Panels) */}
        <section className="px-6 py-20 border-b border-[#E7E5DE]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#92938D] block mb-2">
                  System Architecture
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
                  Comprehensive diagnostic capabilities.
                </h2>
              </div>
              <p className="text-xs text-[#696B65] max-w-sm">
                Every interview parameter is measured against enterprise recruitment rubrics and clear technical competencies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={16} />,
                  category: "Analytics",
                  title: "Granular Answer Evaluation",
                  desc: "Detailed scoring that segregates domain knowledge from vocal confidence and rhetorical structure, offering clear corrective guidance."
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={16} />,
                  category: "Context",
                  title: "Resume & Portfolio Ingestion",
                  desc: "Automatic parsing of past employment, tech stacks, and highlighted projects to craft pointed inquiries about your specific architectural choices."
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={16} />,
                  category: "Export",
                  title: "Downloadable PDF Dossier",
                  desc: "Generate print-ready evaluation summaries documenting performance curves, question-by-question metrics, and actionable growth strategies."
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={16} />,
                  category: "History",
                  title: "Longitudinal Progress Tracking",
                  desc: "Monitor your trajectory across iterative attempts to ensure steady reduction in filler cadence and higher correctness scores."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-8 flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                    <div className="w-full sm:w-1/2 flex items-center justify-center p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DE]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-auto max-h-48 object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F0EFE9] text-[#696B65] text-[10px] uppercase font-mono tracking-wider mb-3">
                        {item.icon}
                        <span>{item.category}</span>
                      </div>
                      <h3 className="font-serif-luxury text-2xl text-[#20231F] mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#696B65] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview Simulation Modes */}
        <section className="px-6 py-20 bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#92938D] block mb-2">
                Configurations
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
                Curated interview environments.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  img: techImg,
                  badge: "Domain Depth",
                  title: "Technical Mode",
                  desc: "Algorithmic problems, system architecture, database design, and real-world scalability trade-offs."
                },
                {
                  img: hrImg,
                  badge: "Behavioral",
                  title: "Executive & HR",
                  desc: "Situational judgment, leadership conflict resolution, stakeholder management, and team communication."
                },
                {
                  img: confidenceImg,
                  badge: "Cadence",
                  title: "Tone & Confidence",
                  desc: "Real-time speech velocity measurement, filler frequency detection, and composure assessments."
                },
                {
                  img: creditImg,
                  badge: "Access",
                  title: "Flexible Sessions",
                  desc: "Transparent session-based credits allowing on-demand full simulation runs at your discretion."
                }
              ].map((mode, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg border border-[#E7E5DE] bg-[#F7F6F2] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#355743] bg-[#E9EFE8] px-2 py-0.5 rounded-sm">
                        {mode.badge}
                      </span>
                      <img 
                        src={mode.img} 
                        alt={mode.title} 
                        className="w-10 h-10 object-contain mix-blend-multiply opacity-80"
                      />
                    </div>
                    <h3 className="font-serif-luxury text-xl text-[#20231F] mb-2">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-[#696B65] leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action Strip */}
            <div className="mt-16 p-10 rounded-xl bg-[#20231F] text-[#F7F6F2] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#92938D] block mb-1">
                  Ready to practice?
                </span>
                <h3 className="font-serif-luxury text-3xl">
                  Begin your confidential mock interview session now.
                </h3>
              </div>
              <button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return
                  }
                  navigate("/interview")
                }}
                className="bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-8 py-3.5 rounded-md transition cursor-pointer text-nowrap"
              >
                Configure Session
              </button>
            </div>
          </div>
        </section>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home
