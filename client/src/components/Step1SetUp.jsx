import React, { useState } from 'react'
import { motion } from "motion/react"
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaArrowLeft,
  FaCheck
} from "react-icons/fa"
import { BsArrowRight } from "react-icons/bs"
import axios from "axios"
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Step1SetUp({ onStart }) {
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")
  const [mode, setMode] = useState("Technical")
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState("")
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return
    setAnalyzing(true)

    const formdata = new FormData()
    formdata.append("resume", resumeFile)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

      setRole(result.data.role || "")
      setExperience(result.data.experience || "")
      setProjects(result.data.projects || [])
      setSkills(result.data.skills || [])
      setResumeText(result.data.resumeText || "")
      setAnalysisDone(true)
      setAnalyzing(false)
    } catch (error) {
      console.log(error)
      setAnalyzing(false)
    }
  }

  const handleStart = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true }
      )
      if (userData) {
        dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
      }
      setLoading(false)
      onStart(result.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-12 px-6 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top return navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs text-[#696B65] hover:text-[#20231F] transition cursor-pointer"
          >
            <FaArrowLeft size={10} />
            <span>Return to Overview</span>
          </button>
          <div className="text-[11px] font-mono tracking-widest uppercase text-[#92938D]">
            Step 01 / Configuration
          </div>
        </div>

        {/* Main Configuration Surface */}
        <div className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl shadow-xs overflow-hidden">
          {/* Header */}
          <div className="px-8 py-8 border-b border-[#E7E5DE] bg-[#FFFFFF]">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#355743] block mb-1">
              Interview Parameter Calibration
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
              Configure your practice simulation.
            </h1>
            <p className="text-xs text-[#696B65] mt-2 max-w-2xl leading-relaxed">
              Define the seniority, specific job discipline, and interview format. Upload an optional resume to ensure technical questioning directly references your architectural background.
            </p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            {/* Row 1: Role & Experience */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#696B65] font-medium mb-2">
                  Target Position / Role <span className="text-[#9E3E34]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Senior Backend Engineer, Staff Architect"
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E7E5DE] rounded-lg text-sm text-[#20231F] placeholder:text-[#92938D] focus:border-[#355743] transition"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  />
                </div>
                <p className="text-[11px] text-[#92938D] mt-1.5">
                  Inquiries will calibrate to standard industry expectations for this title.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#696B65] font-medium mb-2">
                  Relevant Experience <span className="text-[#9E3E34]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 5+ years or Principal Level"
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E7E5DE] rounded-lg text-sm text-[#20231F] placeholder:text-[#92938D] focus:border-[#355743] transition"
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                  />
                </div>
                <p className="text-[11px] text-[#92938D] mt-1.5">
                  Establishes baseline complexity, problem scope, and leadership questions.
                </p>
              </div>
            </div>

            {/* Row 2: Mode Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#696B65] font-medium mb-2">
                Interview Domain & Mode
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMode("Technical")}
                  className={`p-4 rounded-lg border text-left transition cursor-pointer ${
                    mode === "Technical"
                      ? "border-[#355743] bg-[#E9EFE8]/50 text-[#20231F]"
                      : "border-[#E7E5DE] bg-[#FFFFFF] text-[#696B65] hover:border-[#355743]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif-luxury text-lg text-[#20231F]">Technical Specialization</span>
                    {mode === "Technical" && <FaCheck size={12} className="text-[#355743]" />}
                  </div>
                  <p className="text-xs text-[#696B65] leading-relaxed">
                    Evaluates algorithmic thinking, distributed systems, code quality, and engineering trade-offs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("HR")}
                  className={`p-4 rounded-lg border text-left transition cursor-pointer ${
                    mode === "HR"
                      ? "border-[#355743] bg-[#E9EFE8]/50 text-[#20231F]"
                      : "border-[#E7E5DE] bg-[#FFFFFF] text-[#696B65] hover:border-[#355743]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif-luxury text-lg text-[#20231F]">Executive & Behavioral</span>
                    {mode === "HR" && <FaCheck size={12} className="text-[#355743]" />}
                  </div>
                  <p className="text-xs text-[#696B65] leading-relaxed">
                    Focuses on leadership, stakeholder communication, conflict resolution, and behavioral frameworks.
                  </p>
                </button>
              </div>
            </div>

            {/* Row 3: Resume Ingestion */}
            <div className="pt-2 border-t border-[#E7E5DE]">
              <label className="block text-xs uppercase tracking-wider text-[#696B65] font-medium mb-2">
                Resume Context Ingestion <span className="text-[#92938D] font-normal lowercase">(optional)</span>
              </label>

              {!analysisDone ? (
                <div
                  onClick={() => document.getElementById("resumeUpload").click()}
                  className="border border-dashed border-[#E7E5DE] hover:border-[#355743] rounded-lg p-8 text-center cursor-pointer bg-[#F7F6F2]/50 hover:bg-[#FFFFFF] transition"
                >
                  <FaFileUpload className="text-2xl mx-auto text-[#696B65] mb-2" />
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resumeUpload"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                  />
                  <p className="text-xs text-[#20231F] font-medium">
                    {resumeFile ? resumeFile.name : "Select or drag a PDF resume"}
                  </p>
                  <p className="text-[11px] text-[#92938D] mt-1">
                    PDF format only. Extracts technologies and project history to generate bespoke questions.
                  </p>

                  {resumeFile && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUploadResume()
                      }}
                      className="mt-4 bg-[#20231F] hover:bg-[#355743] text-[#FFFFFF] text-xs px-4 py-2 rounded-md transition cursor-pointer"
                    >
                      {analyzing ? "Extracting competencies..." : "Analyze & Ingest Resume"}
                    </button>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#E9EFE8]/30 border border-[#355743]/20 rounded-lg p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#294735] uppercase tracking-wider">
                      Resume Extraction Successful
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAnalysisDone(false)
                        setResumeFile(null)
                      }}
                      className="text-[11px] text-[#696B65] underline hover:text-[#20231F]"
                    >
                      Replace File
                    </button>
                  </div>

                  {projects.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-[#20231F] mb-1">Identified Projects:</p>
                      <ul className="text-xs text-[#696B65] space-y-1 list-disc list-inside">
                        {projects.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skills.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-[#20231F] mb-1.5">Detected Skill Sets:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((s, i) => (
                          <span
                            key={i}
                            className="bg-[#FFFFFF] border border-[#E7E5DE] text-[#294735] px-2.5 py-0.5 rounded text-[11px] font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Launch Bar */}
            <div className="pt-6 border-t border-[#E7E5DE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#696B65]">
                <span>Credits remaining: </span>
                <span className="font-mono text-[#20231F] font-semibold">{userData?.credits ?? 0}</span>
              </div>

              <button
                onClick={handleStart}
                disabled={!role || !experience || loading}
                className="w-full sm:w-auto bg-[#355743] hover:bg-[#294735] disabled:bg-[#92938D] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-8 py-3.5 rounded-md transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>{loading ? "Generating Inquiries..." : "Begin Interview Session"}</span>
                <BsArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1SetUp
