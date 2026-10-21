import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { BsArrowDown } from 'react-icons/bs'

function Step3Report({ report }) {
  const navigate = useNavigate()

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <p className="text-[#696B65] text-sm font-mono uppercase tracking-wider">
          Retrieving Performance Report...
        </p>
      </div>
    )
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence & Cadence", value: confidence },
    { label: "Communication & Articulation", value: communication },
    { label: "Technical Correctness", value: correctness },
  ]

  let performanceText = ""
  let shortTagline = ""

  if (finalScore >= 8) {
    performanceText = "Exceeds Standard Competency."
    shortTagline = "Structured answers, concise articulation, strong domain reasoning."
  } else if (finalScore >= 5) {
    performanceText = "Meets Core Baseline."
    shortTagline = "Sound conceptual foundation; improve precision and concise delivery."
  } else {
    performanceText = "Requires Deliberate Practice."
    shortTagline = "Focus on structured reasoning, voice clarity, and eliminating filler."
  }

  const score = finalScore
  const percentage = (score / 10) * 100

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4")
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    let currentY = 25

    // Title / Header
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.setTextColor(32, 35, 31)
    doc.text("InterviewIQ.AI — Executive Evaluation Dossier", margin, currentY)

    currentY += 4
    doc.setDrawColor(231, 229, 222)
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2)

    currentY += 12

    // Score Summary Box
    doc.setFillColor(247, 246, 242)
    doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, "F")

    doc.setFontSize(14)
    doc.setTextColor(41, 71, 53)
    doc.text(`Overall Evaluation Score: ${finalScore}/10`, margin + 8, currentY + 14)

    currentY += 30

    // Metric Breakdown
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(231, 229, 222)
    doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2)

    doc.setFontSize(10)
    doc.setTextColor(105, 107, 101)
    doc.text(`Confidence: ${confidence}/10`, margin + 8, currentY + 10)
    doc.text(`Communication: ${communication}/10`, margin + 65, currentY + 10)
    doc.text(`Technical Correctness: ${correctness}/10`, margin + 125, currentY + 10)

    currentY += 34

    // Professional Assessment
    let advice = ""
    if (finalScore >= 8) {
      advice = "Candidate demonstrated exceptional clarity and command. Continually anchor answers in verifiable architectural results."
    } else if (finalScore >= 5) {
      advice = "Demonstrates solid fundamentals. Focus on delivering concise thesis statements before diving into technical implementation."
    } else {
      advice = "Requires focused preparation. Formulate responses using the STAR methodology to keep answers tightly structured."
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(32, 35, 31)
    doc.text("Executive Diagnostic Notes", margin, currentY)

    currentY += 6
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(105, 107, 101)
    const splitAdvice = doc.splitTextToSize(advice, contentWidth)
    doc.text(splitAdvice, margin, currentY)

    currentY += 18

    // Question Table
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Inquiry", "Score", "Feedback Assessment"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 8.5,
        cellPadding: 4,
        valign: "top",
      },
      headStyles: {
        fillColor: [53, 87, 67],
        textColor: 255,
        halign: "left",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 18, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: {
        fillColor: [247, 246, 242],
      },
    })

    doc.save("InterviewIQ_Evaluation_Report.pdf")
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-10 px-4 sm:px-6 lg:px-12 text-[#20231F]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E5DE]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/history")}
              className="w-9 h-9 rounded-md bg-[#FFFFFF] border border-[#E7E5DE] hover:border-[#355743]/40 flex items-center justify-center text-[#696B65] hover:text-[#20231F] transition cursor-pointer"
              title="Return to History"
            >
              <FaArrowLeft size={12} />
            </button>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#355743] block">
                Executive Dossier
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
                Interview Performance Diagnostics
              </h1>
            </div>
          </div>

          <button
            onClick={downloadPDF}
            className="bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-6 py-3 rounded-md transition shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <span>Download PDF Dossier</span>
            <BsArrowDown size={12} />
          </button>
        </div>

        {/* Top Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Overall Performance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#92938D] block mb-4">
                Aggregate Score
              </span>
              <div className="flex items-center justify-center my-4">
                <div className="w-24 h-24">
                  <CircularProgressbar
                    value={percentage}
                    text={`${score}/10`}
                    styles={buildStyles({
                      textSize: "20px",
                      pathColor: "#355743",
                      textColor: "#20231F",
                      trailColor: "#E7E5DE",
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5DE] text-center">
              <p className="text-sm font-medium text-[#20231F]">{performanceText}</p>
              <p className="text-xs text-[#696B65] mt-1 leading-relaxed">{shortTagline}</p>
            </div>
          </motion.div>

          {/* Card 2: Skill Evaluation Bars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#92938D] block mb-6">
                Metric Evaluation
              </span>
              <div className="space-y-5">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#696B65]">{s.label}</span>
                      <span className="font-mono text-[#20231F] font-semibold">{s.value}/10</span>
                    </div>
                    <div className="bg-[#F0EFE9] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#355743] h-full rounded-full transition-all duration-500"
                        style={{ width: `${s.value * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5DE] text-xs text-[#92938D]">
              Normalized against candidate cohorts of comparable seniority.
            </div>
          </motion.div>

          {/* Card 3: Performance Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#92938D] block mb-4">
                Question Trajectory
              </span>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#E7E5DE" vertical={false} />
                    <XAxis dataKey="name" stroke="#92938D" fontSize={11} tickLine={false} />
                    <YAxis domain={[0, 10]} stroke="#92938D" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E7E5DE",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#355743"
                      fill="#E9EFE8"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5DE] text-xs text-[#92938D]">
              Inquiry-by-inquiry score stability.
            </div>
          </motion.div>
        </div>

        {/* Question Breakdown List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-6 sm:p-8"
        >
          <div className="pb-4 mb-6 border-b border-[#E7E5DE]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#92938D] block">
              Inquiry Breakdown
            </span>
            <h2 className="font-serif-luxury text-2xl text-[#20231F] mt-1">
              Detailed Question-by-Question Feedback
            </h2>
          </div>

          <div className="space-y-6">
            {questionWiseScore.map((q, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-[#F7F6F2] border border-[#E7E5DE] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[#355743] uppercase tracking-wider block">
                      Inquiry {i + 1}
                    </span>
                    <p className="font-serif-luxury text-lg text-[#20231F] leading-snug">
                      "{q.question || "Question not available"}"
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded bg-[#FFFFFF] border border-[#E7E5DE] font-mono text-xs font-semibold text-[#20231F] self-start">
                    {q.score ?? 0} / 10
                  </div>
                </div>

                <div className="p-4 rounded bg-[#FFFFFF] border border-[#E7E5DE]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#92938D] block mb-1">
                    AI Evaluation & Guidance
                  </span>
                  <p className="text-xs text-[#696B65] leading-relaxed">
                    {q.feedback && q.feedback.trim() !== ""
                      ? q.feedback
                      : "No feedback recorded for this inquiry."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Step3Report
