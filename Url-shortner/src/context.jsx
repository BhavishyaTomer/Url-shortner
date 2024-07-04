import { createContext, useContext, useEffect } from "react";  
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./utils/apiAuth";
const UrlContext = createContext({});
const UrlProvider = ({ children }) => {
    const {data:user,loading,fn:fetchUser}=useFetch(getCurrentUser())
    const isAuthenticated = user?.role==="authenticated";
    useEffect(()=>{
        fetchUser();
    },[])
  return <UrlContext.Provider value={{data:user,loading,fetchUser,isAuthenticated}}>{children}</UrlContext.Provider>;
};
export const urlState = () => {
    return useContext(UrlContext);
};
export default UrlProvider