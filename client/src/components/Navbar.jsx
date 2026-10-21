import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from "motion/react"
import { HiOutlineLogout } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showAuth, setShowAuth] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      setShowCreditPopup(false)
      setShowUserPopup(false)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E7E5DE] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#294735] text-[#F7F6F2] flex items-center justify-center font-serif-luxury text-lg tracking-tight shadow-xs">
            IQ
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl text-[#20231F] tracking-tight leading-none">
              InterviewIQ<span className="text-[#355743] font-sans text-xs uppercase tracking-wider ml-1 px-1.5 py-0.5 bg-[#E9EFE8] rounded-sm font-medium">AI</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-[#696B65]">
          <button 
            onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return
              }
              navigate("/interview")
            }}
            className="hover:text-[#20231F] transition-colors cursor-pointer"
          >
            Practice Room
          </button>
          <button 
            onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return
              }
              navigate("/history")
            }}
            className="hover:text-[#20231F] transition-colors cursor-pointer"
          >
            History & Analytics
          </button>
          <button 
            onClick={() => navigate("/pricing")}
            className="hover:text-[#20231F] transition-colors cursor-pointer"
          >
            Credits & Plans
          </button>
        </nav>

        {/* Right Section: Credits & Account */}
        <div className="flex items-center gap-3">
          {/* Credit balance badge */}
          <div className="relative">
            <button 
              onClick={() => {
                if (!userData) {
                  setShowAuth(true)
                  return
                }
                setShowCreditPopup(!showCreditPopup)
                setShowUserPopup(false)
              }} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#E7E5DE] text-xs font-medium text-[#20231F] hover:border-[#355743]/40 transition cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#355743]"></span>
              <span className="font-mono text-[12px]">{userData?.credits ?? 0}</span>
              <span className="text-[#696B65] text-[11px] font-normal uppercase tracking-wider">Credits</span>
            </button>

            <AnimatePresence>
              {showCreditPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-5 shadow-lg z-50"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[#92938D] font-medium mb-1">
                    Credit Balance
                  </div>
                  <div className="text-2xl font-serif-luxury text-[#20231F] mb-2">
                    {userData?.credits ?? 0} <span className="text-sm font-sans text-[#696B65] font-normal">available</span>
                  </div>
                  <p className="text-xs text-[#696B65] leading-relaxed mb-4">
                    Each mock interview session consumes credits for dynamic questions, speech analysis, and executive reports.
                  </p>
                  <button 
                    onClick={() => {
                      setShowCreditPopup(false)
                      navigate("/pricing")
                    }} 
                    className="w-full bg-[#355743] hover:bg-[#294735] text-[#FFFFFF] py-2 rounded-lg text-xs font-medium tracking-wide transition cursor-pointer"
                  >
                    Purchase Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Account profile button */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true)
                  return
                }
                setShowUserPopup(!showUserPopup)
                setShowCreditPopup(false)
              }} 
              className="w-8 h-8 rounded-md border border-[#E7E5DE] bg-[#FFFFFF] hover:border-[#355743]/40 flex items-center justify-center text-xs font-medium text-[#20231F] transition cursor-pointer"
              title={userData ? userData.name : "Sign In"}
            >
              {userData ? userData.name.slice(0, 1).toUpperCase() : (
                <span className="text-xs text-[#696B65]">Sign In</span>
              )}
            </button>

            <AnimatePresence>
              {showUserPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-[#FFFFFF] border border-[#E7E5DE] rounded-xl p-3 shadow-lg z-50 text-xs"
                >
                  <div className="px-3 py-2 border-b border-[#E7E5DE] mb-1">
                    <p className="text-[11px] uppercase tracking-wider text-[#92938D]">Signed in as</p>
                    <p className="font-medium text-[#20231F] truncate text-sm mt-0.5">{userData?.name}</p>
                    <p className="text-[11px] text-[#696B65] truncate">{userData?.email}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setShowUserPopup(false)
                      navigate("/history")
                    }} 
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F7F6F2] text-[#20231F] transition cursor-pointer"
                  >
                    Interview Archive
                  </button>
                  <button 
                    onClick={() => {
                      setShowUserPopup(false)
                      navigate("/pricing")
                    }} 
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F7F6F2] text-[#20231F] transition cursor-pointer"
                  >
                    Pricing & Credits
                  </button>
                  <div className="my-1 border-t border-[#E7E5DE]"></div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F7F6F2] text-[#9E3E34] flex items-center gap-2 transition cursor-pointer"
                  >
                    <HiOutlineLogout size={14} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </header>
  )
}

export default Navbar
