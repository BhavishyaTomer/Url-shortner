import { createContext, useContext, useEffect } from "react";  
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./utils/apiAuth";
const UrlContext = createContext({});
const UrlProvider = ({ children }) => {
    const {data:user,loading,fn:fetchUser}=useFetch(getCurrentUser)
    console.log("user",user)
    const isAuthenticated = user?.role==="authenticated";
    useEffect(()=>{
       console.log("fetched user is being called")
        fetchUser();
    },[])
  return <UrlContext.Provider value={{data:user,fetchUser,loading,isAuthenticated}}>{children}</UrlContext.Provider>;
};
export const urlState = () => {
    return useContext(UrlContext);
};
export default UrlProvider