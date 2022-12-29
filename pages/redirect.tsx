import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

const ASSESSOR_LOGIN_URL = '/accounts/login/assessor';


export default function Redirect() {
    const router = useRouter();

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      let accessToken = urlParams.get('accessToken');
      let refreshToken = urlParams.get('refreshToken');
      let googleErrorMessage = urlParams.get('errorMessage');
      
      if (accessToken != null) {
        localStorage.removeItem('googleErrorMessage');
        localStorage.setItem('accessToken', accessToken!);
        localStorage.setItem('refreshToken', refreshToken!);
        router.push('/');

      } else {
        localStorage.setItem('googleErrorMessage', googleErrorMessage!);
        router.push(ASSESSOR_LOGIN_URL);
      }
        
      }, [router]); 

    return (
        <div>Redirect</div>
    )
}
