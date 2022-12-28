import Login from '@components/features/Login/Login'
import { NextPage } from 'next'
import React from 'react'

const ASSESSOR_LOGIN_URL =  "/users/login/assessor-company/"

const AssessorLoginPage: NextPage = () => {
  return (
    <Login loginUrl={ASSESSOR_LOGIN_URL}/>
  )
}

export default AssessorLoginPage