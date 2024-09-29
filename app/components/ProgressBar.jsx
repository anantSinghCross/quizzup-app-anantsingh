import React from 'react'

const ProgressBar = ({percentage}) => {
  return (
    <div class="flex items-center p-2 justify-center">
      <div class="w-full border rounded-lg shadow-inner bg-slate-50">
        <div style={{width: `${percentage}%`}} class="rounded-lg h-10 bg-gradient-to-t from-green-400 to-green-500 shadow-md shadow-green-400/60">
        </div>
      </div>
      <div class="bg-white relative w-24 h-16 border-2 border-green-400 rounded-full shadow-xl shadow-green-400/30 -left-3">
        <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl">{percentage}%</p>
      </div>
    </div>
  )
}

export default ProgressBar