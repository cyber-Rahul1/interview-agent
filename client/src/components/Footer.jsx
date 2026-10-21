import React from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="w-full bg-[#F7F6F2] border-t border-[#E7E5DE] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-[#E7E5DE]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded bg-[#294735] text-[#F7F6F2] flex items-center justify-center font-serif-luxury text-xs">
                IQ
              </div>
              <span className="font-serif-luxury text-lg text-[#20231F]">
                InterviewIQ.AI
              </span>
            </div>
            <p className="text-xs text-[#696B65] max-w-md leading-relaxed">
              An understated, precision instrument for executive and technical interview readiness. Built with adaptive voice cognition.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs text-[#696B65]">
            <button 
              onClick={() => navigate("/interview")} 
              className="hover:text-[#20231F] transition cursor-pointer flex items-center gap-1"
            >
              Start Session <BsArrowUpRight size={10} />
            </button>
            <button 
              onClick={() => navigate("/history")} 
              className="hover:text-[#20231F] transition cursor-pointer"
            >
              Performance Archive
            </button>
            <button 
              onClick={() => navigate("/pricing")} 
              className="hover:text-[#20231F] transition cursor-pointer"
            >
              Credits & Plans
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#92938D] gap-4">
          <p>© {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Confidential & Secure</span>
            <span>Real-time Speech Synthesis</span>
            <span>Adaptive LLM Evaluation</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
