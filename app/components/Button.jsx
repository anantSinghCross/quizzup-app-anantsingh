"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const Button = ({ children, onClick, loadingText = 'Loading', loading, extraClasses, disabled }) => {
  const { pending } = useFormStatus();
  return (
    <div className={`self-stretch p-4 pt-9 ${extraClasses}`}>
      <button
        disabled={pending || loading || disabled}
        className="rounded-full w-full bg-rose-500 p-3 text-lg font-semibold text-white disabled:bg-rose-400 disabled:text-white/50 transition-all"
        onClick={onClick ? onClick : () => {}}
      >
        {
          pending || loading ?
          loadingText :
          children
        }
      </button>
    </div>
  );
};

export default Button;
