"use client";
import React from "react";

const Checkbox = ({ label = "", name = "", checked = false, id = "", onChange = () => {} }) => {

  return (
    <div onClick={onChange} className={`w-full p-5 rounded-lg ${checked ? `border-2 border-green-500` : `border-2 border-transparent bg-slate-100`}`}>
      <div className="flex gap-3">
        <div
          className={`relative h-6 w-6 rounded-full font-bold text-white ${
            checked ? `bg-green-500` : `bg-slate-50 border-2`
          }`}
        >
          {checked && <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">✓</p>}
        </div>
        <p>{label}</p>
      </div>
      <input
        className="hidden"
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default Checkbox;
