import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function Timer({ timeLeft, totalTime }) {
  const percentage = totalTime ? (timeLeft / totalTime) * 100 : 0
  const isUrgent = timeLeft <= 10

  return (
    <div className="w-16 h-16">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "26px",
          pathColor: isUrgent ? "#9E3E34" : "#355743",
          textColor: isUrgent ? "#9E3E34" : "#20231F",
          trailColor: "#E7E5DE",
          strokeLinecap: "round",
        })}
      />
    </div>
  )
}

export default Timer
