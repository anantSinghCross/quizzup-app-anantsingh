import React from 'react'

const ScoreCard = ({score, isCorrect=false}) => {
  return (
    <div class={`flex items-center gap-3 rounded-lg p-5 ${isCorrect ? `bg-green-100`:`bg-red-100`}`}>
      <div class={`h-4 w-4 rounded-full ${isCorrect ? `bg-green-500`:`bg-red-500`} `}></div>
      <p class="font-bold">{score}</p>
      <p class="font-bold text-black/50">{isCorrect ? `Correct` : `Incorrect`}</p>
    </div>
  )
}

export default ScoreCard