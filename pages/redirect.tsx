import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Redirect() {
    const router = useRouter();

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            let cookie_data = parts.pop();
            if (cookie_data != null) {
                return cookie_data.split(';').shift();
            }
        }
    }

    useEffect(() => {
        let accessToken = getCookie('accessToken');
        let refreshToken = getCookie('refreshToken');
        let googleErrorMessage = getCookie('googleErrorMessage');
        if (accessToken != null) {
          localStorage.removeItem('googleErrorMessage');
          localStorage.setItem('accessToken', accessToken!);
          localStorage.setItem('refreshToken', refreshToken!);
          router.push('/');
          
        } else {
          localStorage.setItem('googleErrorMessage', googleErrorMessage!);
          router.push('/accounts/login/assessor')
        }
        
      }, [router]); 

    return (
        <div>Redirect</div>
    )
}
