import { jwtDecode } from "jwt-decode";
import { useContext, useMemo } from "react";
import { AuthContext } from "../components/auth/Auth";
import User from "../models/users/Users";

export default function useUsername() {
    const { jwt } = useContext(AuthContext)!;
    // const {name} = jwtDecode<User>(jwt);
  
  const name = useMemo(() => {
    const {name} = jwtDecode<User>(jwt);
    return name;
  }, [jwt]);
    
        return name;
}
