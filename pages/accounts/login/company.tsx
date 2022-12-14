import Login from '@components/features/Login/Login'
import { NextPage } from 'next'
import React from 'react'

const COMPANY_LOGIN_URL =  "/users/login/assessor-company/"

const CompanyLoginPage: NextPage = () => {
  return (
    <Login loginUrl={COMPANY_LOGIN_URL}/>
  )
}

export default CompanyLoginPage