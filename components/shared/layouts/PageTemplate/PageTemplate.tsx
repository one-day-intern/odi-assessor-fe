import React from 'react'
import { Navbar } from '../Navbar'

const PageTemplate = ({ children } : HOCProps) => {
  return (
    <>
        <Navbar/>
        { children }
    </>
  )
}

export default PageTemplate