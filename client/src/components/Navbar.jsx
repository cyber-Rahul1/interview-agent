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
    <header className="sticky top-0 z-40 w-full bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E4E1D8] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#193224] text-[#F8F7F4] flex items-center justify-center font-serif-luxury text-lg tracking-tight shadow-2xs group-hover:bg-[#244633] transition-colors">
            IQ
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl text-[#191B18] tracking-tight leading-none">
              InterviewIQ<span className="text-[#244633] font-sans text-xs uppercase tracking-wider ml-1.5 px-2 py-0.5 bg-[#E3EDE2] rounded-sm font-semibold">AI</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-[#585A54]">
          <button 
            onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return
              }
              navigate("/interview")
            }}
            className="hover:text-[#191B18] transition-colors cursor-pointer"
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
            className="hover:text-[#191B18] transition-colors cursor-pointer"
          >
            History & Analytics
          </button>
          <button 
            onClick={() => navigate("/pricing")}
            className="hover:text-[#191B18] transition-colors cursor-pointer"
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#E4E1D8] text-xs font-medium text-[#191B18] hover:border-[#244633]/40 shadow-2xs transition cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#244633]"></span>
              <span className="font-mono text-[12px] font-semibold">{userData?.credits ?? 0}</span>
              <span className="text-[#585A54] text-[11px] font-normal uppercase tracking-wider">Credits</span>
            </button>

            <AnimatePresence>
              {showCreditPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-[#FFFFFF] border border-[#E4E1D8] rounded-xl p-5 shadow-xl z-50"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[#858780] font-medium mb-1">
                    Credit Balance
                  </div>
                  <div className="text-2xl font-serif-luxury text-[#191B18] mb-2">
                    {userData?.credits ?? 0} <span className="text-sm font-sans text-[#585A54] font-normal">available</span>
                  </div>
                  <p className="text-xs text-[#585A54] leading-relaxed mb-4">
                    Each mock interview session consumes credits for dynamic questions, speech analysis, and executive reports.
                  </p>
                  <button 
                    onClick={() => {
                      setShowCreditPopup(false)
                      navigate("/pricing")
                    }} 
                    className="w-full bg-[#244633] hover:bg-[#193224] text-[#FFFFFF] py-2 rounded-lg text-xs font-medium tracking-wide transition cursor-pointer shadow-xs"
                  >
                    Purchase Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Account profile button / Sign In CTA */}
          <div className="relative">
            {userData ? (
              <button
                onClick={() => {
                  setShowUserPopup(!showUserPopup)
                  setShowCreditPopup(false)
                }} 
                className="w-8 h-8 rounded-full border border-[#244633]/30 bg-[#E3EDE2] text-[#193224] hover:bg-[#244633] hover:text-[#FFFFFF] flex items-center justify-center text-xs font-semibold tracking-wide transition cursor-pointer shadow-2xs"
                title={userData.name}
              >
                {userData.name.slice(0, 1).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="px-4 py-1.5 rounded-md bg-[#244633] hover:bg-[#193224] text-[#FFFFFF] text-xs font-medium uppercase tracking-wider transition cursor-pointer shadow-2xs whitespace-nowrap hover:shadow-xs"
              >
                Sign In
              </button>
            )}

            <AnimatePresence>
              {showUserPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-[#FFFFFF] border border-[#E4E1D8] rounded-xl p-3 shadow-xl z-50 text-xs"
                >
                  <div className="px-3 py-2 border-b border-[#E4E1D8] mb-1">
                    <p className="text-[11px] uppercase tracking-wider text-[#858780]">Signed in as</p>
                    <p className="font-medium text-[#191B18] truncate text-sm mt-0.5">{userData?.name}</p>
                    <p className="text-[11px] text-[#585A54] truncate">{userData?.email}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setShowUserPopup(false)
                      navigate("/history")
                    }} 
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F8F7F4] text-[#191B18] transition cursor-pointer"
                  >
                    Interview Archive
                  </button>
                  <button 
                    onClick={() => {
                      setShowUserPopup(false)
                      navigate("/pricing")
                    }} 
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F8F7F4] text-[#191B18] transition cursor-pointer"
                  >
                    Pricing & Credits
                  </button>
                  <div className="my-1 border-t border-[#E4E1D8]"></div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F8F7F4] text-[#9E3E34] flex items-center gap-2 transition cursor-pointer"
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
