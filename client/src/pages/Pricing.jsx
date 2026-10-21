import React, { useState } from 'react'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [loadingPlan, setLoadingPlan] = useState(null)
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Standard Access",
      price: "₹0",
      credits: 100,
      description: "Introductory tier for familiarizing with the voice-driven interview simulation.",
      features: [
        "100 AI Interview Credits",
        "Standard Performance Diagnostics",
        "Live Audio Speech Synthesis",
        "Basic History Archive",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Focused Practice",
      price: "₹100",
      credits: 150,
      description: "Dedicated calibration for candidates targeting immediate recruitment cycles.",
      features: [
        "150 AI Interview Credits",
        "Granular Feedback & Evaluation",
        "Executive PDF Dossier Export",
        "Permanent Archive Retention",
      ],
    },
    {
      id: "pro",
      name: "Executive Tier",
      price: "₹500",
      credits: 650,
      description: "Unrestricted high-frequency simulations with priority LLM reasoning.",
      features: [
        "650 AI Interview Credits",
        "Deep System Architecture Inquiries",
        "Longitudinal Skill Trajectory",
        "Priority Model Latency",
      ],
      badge: "Recommended",
    },
  ]

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} — ${plan.credits} Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))
          alert("Credits successfully credited to your account.")
          navigate("/")
        },
        theme: {
          color: "#355743",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null)
    } catch (error) {
      console.log(error)
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-16 px-6 text-[#20231F]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E5DE]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-md bg-[#FFFFFF] border border-[#E7E5DE] hover:border-[#355743]/40 flex items-center justify-center text-[#696B65] hover:text-[#20231F] transition cursor-pointer"
              title="Return to Overview"
            >
              <FaArrowLeft size={12} />
            </button>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#355743] block">
                Membership & Credits
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231F]">
                Transparent Credit Allocation
              </h1>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id

            return (
              <div
                key={plan.id}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`bg-[#FFFFFF] border rounded-xl p-8 flex flex-col justify-between transition-all relative ${
                  isSelected
                    ? "border-[#355743] shadow-sm"
                    : "border-[#E7E5DE] hover:border-[#355743]/40"
                } ${plan.default ? "cursor-default" : "cursor-pointer"}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-6 right-6 bg-[#E9EFE8] text-[#294735] text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded">
                    {plan.badge}
                  </div>
                )}
                {plan.default && (
                  <div className="absolute top-6 right-6 bg-[#F0EFE9] text-[#696B65] text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">
                    Complimentary
                  </div>
                )}

                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#20231F] mb-1">
                    {plan.name}
                  </h3>
                  <div className="my-4">
                    <span className="font-serif-luxury text-4xl text-[#20231F]">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono text-[#696B65] ml-2">
                      / {plan.credits} Credits
                    </span>
                  </div>

                  <p className="text-xs text-[#696B65] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-[#E7E5DE]">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#20231F]">
                        <FaCheck size={11} className="text-[#355743] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E7E5DE]">
                  {!plan.default ? (
                    <button
                      disabled={loadingPlan === plan.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isSelected) {
                          setSelectedPlan(plan.id)
                        } else {
                          handlePayment(plan)
                        }
                      }}
                      className={`w-full py-3 rounded-md text-xs uppercase tracking-wider font-medium transition cursor-pointer ${
                        isSelected
                          ? "bg-[#355743] hover:bg-[#294735] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] border border-[#E7E5DE] text-[#20231F] hover:bg-[#F0EFE9]"
                      }`}
                    >
                      {loadingPlan === plan.id
                        ? "Initiating Gateway..."
                        : isSelected
                        ? "Proceed to Acquisition"
                        : "Select Allocation"}
                    </button>
                  ) : (
                    <div className="w-full py-3 text-center text-xs font-mono text-[#92938D] bg-[#F7F6F2] rounded-md border border-[#E7E5DE]">
                      Active Default Allocation
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Note strip */}
        <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E7E5DE] text-xs text-[#696B65] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Credits do not expire. Standard sessions consume approximately 30–50 credits per complete simulation.
          </p>
          <span className="font-mono text-[11px] text-[#355743] shrink-0">
            Encrypted Razorpay Checkout
          </span>
        </div>
      </div>
    </div>
  )
}

export default Pricing
