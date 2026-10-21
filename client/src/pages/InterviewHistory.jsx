import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'

function InterviewHistory() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
        setInterviews(result.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getMyInterviews()
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-12 px-6 text-[#20231F]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E5DE]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-md bg-[#FFFFFF] border border-[#E7E5DE] hover:border-[#355743]/40 flex items-center justify-center text-[#696B65] hover:text-[#20231F] transition cursor-pointer"
              title="Return to Home"
            >
              <FaArrowLeft size={12} />
            </button>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#355743] block">
                Historical Dossier
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
                Interview Archive & Trajectory
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate("/interview")}
            className="bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-md transition shadow-xs hidden sm:flex items-center gap-2 cursor-pointer"
          >
            <span>New Session</span>
            <BsArrowRight size={12} />
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="bg-[#FFFFFF] p-12 rounded-xl border border-[#E7E5DE] text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-[#92938D]">
              Loading Archive Records...
            </p>
          </div>
        ) : interviews.length === 0 ? (
          <div className="bg-[#FFFFFF] p-12 rounded-xl border border-[#E7E5DE] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#E9EFE8] text-[#355743] flex items-center justify-center mx-auto text-lg font-serif-luxury">
              IQ
            </div>
            <h2 className="font-serif-luxury text-2xl text-[#20231F]">
              No archived interviews found.
            </h2>
            <p className="text-xs text-[#696B65] max-w-sm mx-auto leading-relaxed">
              Complete your first mock interview simulation to review executive analytics, score graphs, and actionable feedback.
            </p>
            <button
              onClick={() => navigate("/interview")}
              className="bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium px-6 py-3 rounded-md transition cursor-pointer inline-flex items-center gap-2 mt-2"
            >
              <span>Initiate First Session</span>
              <BsArrowRight size={12} />
            </button>
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl overflow-hidden divide-y divide-[#E7E5DE]">
            {interviews.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/report/${item._id}`)}
                className="p-6 hover:bg-[#F7F6F2] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-xl text-[#20231F] group-hover:text-[#355743] transition-colors">
                      {item.role || "General Interview"}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0EFE9] text-[#696B65]">
                      {item.mode || "Technical"}
                    </span>
                  </div>
                  <p className="text-xs text-[#696B65]">
                    {item.experience || "Not specified"} • Recorded on{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-6 sm:self-center self-start">
                  <div className="text-left sm:text-right">
                    <div className="font-serif-luxury text-2xl text-[#20231F]">
                      {item.finalScore ? `${item.finalScore}/10` : "—"}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#92938D]">
                      Overall Score
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider ${
                      item.status === "completed"
                        ? "bg-[#E9EFE8] text-[#294735]"
                        : "bg-[#F0EFE9] text-[#94682A]"
                    }`}
                  >
                    {item.status || "Incomplete"}
                  </span>

                  <BsArrowRight
                    size={14}
                    className="text-[#92938D] group-hover:text-[#20231F] group-hover:translate-x-1 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewHistory
