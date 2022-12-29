import { AssessorSignup } from '@components/features/AssessorSignup'
import { NextPage } from 'next'
import React from 'react'

const REGISTER_CALLBACK_URI_ASSESSOR = process.env.NEXT_PUBLIC_BACKEND_URL! + process.env.NEXT_PUBLIC_GOOGLE_REGISTER_CALLBACK_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

const AssessorSignupPage: NextPage = () => {
  const googleLoginCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let one_time_code = urlParams.get('code');
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + REGISTER_CALLBACK_URI_ASSESSOR + '&prompt=consent&response_type=code&client_id=' + CLIENT_ID + '&state=' + one_time_code + '&scope=email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read&access_type=offline';
  }
  return (
    <AssessorSignup googleLoginCallback={googleLoginCallback}/>
  )
}

export default AssessorSignupPage