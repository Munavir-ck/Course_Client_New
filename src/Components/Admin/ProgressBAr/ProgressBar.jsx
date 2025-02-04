import React from 'react'

function ProgressBar({value}) {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full">
      <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: `${value}%` }} />
      <div className="absolute top-0 right-0 h-full">
        <span className="inline-block h-full text-xs font-semibold text-gray-600 align-middle">{value}</span>
      </div>
    </div>
  )
}

export default ProgressBar
