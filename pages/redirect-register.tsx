import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

const ASSESSOR_REGISTER_URL = '/accounts/signup/assessor';


function RedirectAssessor() {
    const router = useRouter();

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      let accessToken = urlParams.get('accessToken');
      let refreshToken = urlParams.get('refreshToken');
      let googleErrorMessage = urlParams.get('errorMessage');
      let oneTimeCode = urlParams.get('code');
      
      if (accessToken != null) {
        localStorage.removeItem('googleErrorMessage');
        localStorage.setItem('accessToken', accessToken!);
        localStorage.setItem('refreshToken', refreshToken!);
        router.push('/');

      } else {
        localStorage.setItem('googleErrorMessage', googleErrorMessage!);
        router.push(ASSESSOR_REGISTER_URL + '?code=' + oneTimeCode);
      }
        
      }, [router]); 

    return (
        <div>Redirect</div>
    )
}

export default RedirectAssessor