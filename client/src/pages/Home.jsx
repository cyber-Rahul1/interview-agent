import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion, useScroll, useTransform } from "motion/react"
import {
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
  BsShieldCheck,
  BsCheck2,
  BsArrowUpRight
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

  // Scroll driven animation triggers
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.92])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -20])

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col text-[#191B18] selection:bg-[#E3EDE2] selection:text-[#193224]">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Section with Scroll Dynamics */}
        <motion.section 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative px-6 pt-20 pb-24 md:pt-28 md:pb-32 border-b border-[#E4E1D8] overflow-hidden"
        >
          {/* Subtle warm background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-b from-[#E7EFE6]/60 via-[#F3EFE6]/40 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col items-start max-w-3xl">
              {/* Refined Category Monogram */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#E3EDE2] border border-[#244633]/20 text-[#193224] text-[11px] font-mono tracking-widest uppercase mb-8 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#244633] animate-pulse"></span>
                Executive & Technical Preparation
              </motion.div>

              {/* Editorial Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-[#191B18]"
              >
                Prepare with purpose. <br />
                <span className="italic text-[#244633] underline decoration-[#244633]/20 decoration-1 underline-offset-8">Perform with confidence.</span>
              </motion.h1>

              {/* Supporting Editorial Paragraph */}
              <motion.p 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-[#585A54] mt-8 max-w-2xl leading-relaxed"
              >
                Intelligent, voice-driven mock interviews tailored specifically to your resume, target role, and technical depth. Receive rigorous follow-up inquiries, live vocal cadence analysis, and objective feedback.
              </motion.p>

              {/* Primary / Secondary Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 mt-10"
              >
                <button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true)
                      return
                    }
                    navigate("/interview")
                  }}
                  className="bg-[#244633] hover:bg-[#193224] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
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
                  className="bg-[#FFFFFF] hover:bg-[#F2F0EB] border border-[#E4E1D8] hover:border-[#D5D1C5] text-[#191B18] text-xs uppercase tracking-wider font-medium px-8 py-4 rounded-lg shadow-2xs transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  View Performance Archive
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.32 }}
                className="mt-14 pt-8 border-t border-[#E4E1D8] w-full grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#585A54]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E3EDE2] text-[#244633] flex items-center justify-center shrink-0">
                    <BsCheck2 size={13} />
                  </span>
                  <span>Dynamic adaptive questioning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E3EDE2] text-[#244633] flex items-center justify-center shrink-0">
                    <BsCheck2 size={13} />
                  </span>
                  <span>Resume & project extraction</span>
                </div>
                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <span className="w-5 h-5 rounded-full bg-[#E3EDE2] text-[#244633] flex items-center justify-center shrink-0">
                    <BsShieldCheck size={13} />
                  </span>
                  <span>Confidential audio evaluation</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Structured 3-Step Methodology Section */}
        <section className="px-6 py-24 border-b border-[#E4E1D8] bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#858780] block mb-2">
                Methodology
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#191B18]">
                An engineered approach to interview mastery.
              </h2>
            </motion.div>

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
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 rounded-xl border border-[#E4E1D8] bg-[#F8F7F4] flex flex-col justify-between luxury-card group"
                >
                  <div>
                    <span className="font-mono text-[11px] tracking-wider text-[#244633] font-semibold block mb-4">
                      {item.step}
                    </span>
                    <h3 className="font-serif-luxury text-2xl text-[#191B18] mb-3 group-hover:text-[#244633] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#585A54] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#E4E1D8]/60 flex items-center justify-between text-[11px] font-mono text-[#858780]">
                    <span>Phase 0{index + 1}</span>
                    <BsArrowRight className="text-[#244633] group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Capabilities (Clean Editorial Panels) */}
        <section className="px-6 py-24 border-b border-[#E4E1D8]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
            >
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#858780] block mb-2">
                  System Architecture
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#191B18]">
                  Comprehensive diagnostic capabilities.
                </h2>
              </div>
              <p className="text-xs text-[#585A54] max-w-sm">
                Every interview parameter is measured against enterprise recruitment rubrics and clear technical competencies.
              </p>
            </motion.div>

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
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#FFFFFF] border border-[#E4E1D8] rounded-xl p-8 flex flex-col justify-between luxury-card"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-4">
                    <div className="w-full sm:w-1/2 flex items-center justify-center p-5 bg-[#F8F7F4] rounded-lg border border-[#E4E1D8]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-auto max-h-48 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-102" 
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E3EDE2] text-[#244633] text-[10px] uppercase font-mono tracking-wider mb-3">
                        {item.icon}
                        <span>{item.category}</span>
                      </div>
                      <h3 className="font-serif-luxury text-2xl text-[#191B18] mb-2.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#585A54] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview Simulation Modes */}
        <section className="px-6 py-24 bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#858780] block mb-2">
                Configurations
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#191B18]">
                Curated interview environments.
              </h2>
            </motion.div>

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
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-xl border border-[#E4E1D8] bg-[#F8F7F4] flex flex-col justify-between luxury-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#244633] bg-[#E3EDE2] px-2.5 py-1 rounded-sm font-medium">
                        {mode.badge}
                      </span>
                      <img 
                        src={mode.img} 
                        alt={mode.title} 
                        className="w-11 h-11 object-contain mix-blend-multiply opacity-90"
                      />
                    </div>
                    <h3 className="font-serif-luxury text-xl text-[#191B18] mb-2">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-[#585A54] leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Call to Action Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 p-10 sm:p-12 rounded-2xl bg-[#191B18] text-[#F8F7F4] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-lg"
            >
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#858780] block mb-2">
                  Ready to practice?
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FFFFFF]">
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
                className="bg-[#244633] hover:bg-[#193224] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-8 py-4 rounded-lg transition-all duration-200 cursor-pointer text-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Configure Session
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home
