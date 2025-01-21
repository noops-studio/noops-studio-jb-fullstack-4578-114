import axios from "axios";
import { useContext, useMemo } from "react";
import { AuthContext } from "../components/auth/Auth";

export default function useService<T>(ServiceClass: new (axiosInstance: any) => T): T {
  const { jwt } = useContext(AuthContext)!;

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_REST_SERVER_URL,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }, [jwt]);

  return useMemo(() => new ServiceClass(axiosInstance), [ServiceClass, axiosInstance]);
}
