import { createContext, PropsWithChildren, useState } from "react";


interface AuthContextInterface {
    jwt: string;
    newLogin: React.Dispatch<React.SetStateAction<string>>;
    
}

export const AuthContext = createContext<AuthContextInterface | null>(null);


export default function Auth(props:PropsWithChildren): JSX.Element {

    const JWT_KEY = 'jwt';

    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY) ||'');

function newLogin(jwt: string) {
    localStorage.setItem(JWT_KEY, jwt);
    setJwt(jwt);
}

const {children} = props;

    return(
        <AuthContext.Provider value={{jwt, newLogin}}>
            {children}
        </AuthContext.Provider>
    )
}