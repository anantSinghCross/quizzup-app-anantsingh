'use client'

import withContext from '@/app/context/context-hoc'
import React from 'react'

const BaseLayout = ({children}) => {
  return (
    <section className='flex h-screen items-center justify-center'>
      {children}
    </section>
  )
}

export default withContext(BaseLayout)