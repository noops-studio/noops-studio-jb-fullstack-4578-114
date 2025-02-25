import { createContext, PropsWithChildren, useState } from "react";

interface AuthContextInterface {
    jwt: string;
    newLogin: (jwt: string) => void; // Change from React.Dispatch
    logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function Auth(props: PropsWithChildren): JSX.Element {
    const JWT_KEY = 'jwt';
    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY) || '');

    function newLogin(jwt: string) {
        localStorage.setItem(JWT_KEY, jwt);
        setJwt(jwt);
    }

    function logout() {
        localStorage.removeItem(JWT_KEY);
        setJwt('');
    }

    const { children } = props;

    return (
        <AuthContext.Provider value={{ jwt, newLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}