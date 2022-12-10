import { AssessorSignup } from '@components/features/AssessorSignup'
import { NextPage } from 'next'
import React from 'react'

const AssessorSignupPage: NextPage = () => {
  const googleLoginCallback = async () => {
    // Jo do something here
    console.log("Test")
  }
  return (
    <AssessorSignup googleLoginCallback={googleLoginCallback}/>
  )
}

export default AssessorSignupPage