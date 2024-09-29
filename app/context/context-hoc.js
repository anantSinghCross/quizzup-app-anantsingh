'use client'
import React, { useState } from 'react'
import { MainContext } from './context'

const withContext = (WrappedComponent) => {
  return function Wrapper (props) {
    
    const [question, setQuestion] = useState(null);
    const [result, setResult] = useState(null);

    const handleOnClick = async () => {
      
    }

    return (
      <MainContext.Provider value={{
        handleOnClick,
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