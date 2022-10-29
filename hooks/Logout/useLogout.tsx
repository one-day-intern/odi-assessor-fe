import { useAuthContext } from "@context/Authentication"
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { useRouter } from "next/router";

const useLogout = () => {
   const { dispatch }  = useAuthContext();
   const router = useRouter();

   const logout = () => {
        dispatch({
            type: AuthDispatchTypes.LOGOUT
        });

        router.push("/accounts/login/company")
   };
   
   return { logout }
}

export { useLogout }