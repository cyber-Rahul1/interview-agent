import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa"
import Auth from '../pages/Auth'

function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (userData) {
      onClose()
    }
  }, [userData, onClose])

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#20231F]/30 backdrop-blur-xs px-4">
      <div className="relative w-full max-w-md">
        <button 
          onClick={onClose} 
          aria-label="Close modal"
          className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E7E5DE] text-[#696B65] hover:text-[#20231F] flex items-center justify-center transition cursor-pointer"
        >
          <FaTimes size={12} />
        </button>
        <Auth isModel={true} />
      </div>
    </div>
  )
}

export default AuthModel
