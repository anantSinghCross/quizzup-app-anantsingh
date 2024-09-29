'use client'
import React, { useState } from 'react'
import { MainContext } from './context'

// An HOC, whwich wraps the root layout in Context provider

const withContext = (WrappedComponent) => {
  return function Wrapper (props) {
    
    const [question, setQuestion] = useState(null);
    const [result, setResult] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(null);

    return (
      <MainContext.Provider value={{
        totalQuestions, 
        setTotalQuestions,
        question,
        result,
        setResult,
        setQuestion
      }}>
        <WrappedComponent {...props} />
      </MainContext.Provider>
    )
  }
}

export default withContext