import React from 'react';

const ZetaLogo = ({width = 89, height = 27, className = 'w-10 h-10', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    className={className}>
  <path d="M20 25 C 40 20, 60 20, 80 25 L 30 75"
        stroke="#8A2BE2"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round" />
  <path d="M70 25 L 20 75 C 40 80, 60 80, 80 75"
        stroke="#4682B4"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round" />
</svg>
  )
}
export default ZetaLogo