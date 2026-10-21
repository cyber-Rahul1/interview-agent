import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from 'axios'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Auth({ isModel = false }) {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }

  return (
    <div className={`w-full ${isModel ? "py-2" : "min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6 py-20"}`}>
      <motion.div 
        initial={{ opacity: 0, y: 16 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
        className={`w-full ${isModel ? "max-w-md p-8 rounded-xl" : "max-w-md p-10 rounded-xl"} bg-[#FFFFFF] border border-[#E7E5DE] shadow-sm`}
      >
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-7 h-7 rounded-md bg-[#294735] text-[#F7F6F2] flex items-center justify-center font-serif-luxury text-sm">
            IQ
          </div>
          <span className="font-serif-luxury text-lg text-[#20231F]">InterviewIQ.AI</span>
        </div>

        <div className="mb-6">
          <span className="text-[11px] font-mono tracking-widest text-[#355743] uppercase block mb-1">
            Access Portal
          </span>
          <h1 className="font-serif-luxury text-2xl text-[#20231F] leading-snug">
            Sign in to your practice room.
          </h1>
          <p className="text-[#696B65] text-xs leading-relaxed mt-2">
            Continue with verified authentication to generate personalized questions, record responses, and review executive performance diagnostics.
          </p>
        </div>

        <div className="py-2 border-t border-b border-[#E7E5DE] my-6">
          <div className="flex items-center justify-between text-[11px] text-[#696B65] py-1">
            <span>Adaptive Role Questions</span>
            <span className="text-[#355743] font-medium">Included</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#696B65] py-1">
            <span>Live Voice Synthesis & Follow-ups</span>
            <span className="text-[#355743] font-medium">Included</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#696B65] py-1">
            <span>Archival Analytics & PDF Dossier</span>
            <span className="text-[#355743] font-medium">Included</span>
          </div>
        </div>

        <motion.button 
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.95 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#FFFFFF] border border-[#E7E5DE] hover:border-[#355743]/50 text-[#20231F] text-xs font-medium rounded-lg shadow-2xs transition cursor-pointer"
        >
          <FcGoogle size={18} />
          <span>Continue with Google Workspace</span>
        </motion.button>

        <p className="text-[10px] text-[#92938D] text-center mt-5 leading-normal">
          By signing in, you agree to our standard terms of professional evaluation and confidential data processing.
        </p>
      </motion.div>
    </div>
  )
}

export default Auth
