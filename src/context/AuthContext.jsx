import { createContext, useContext, useEffect, useState } from "react";
import { googleLogin, googleLoout, onUserState } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();
    const [init, setInit] = useState(true);

    useEffect(() => {
        // onUserState가 리스너 등록 함수이고, 리턴값이 해제 함수라고 가정
        const unsubscribe = onUserState(async (newUser) => {
            setUser(newUser);
            setInit(false);
        });

        return () => unsubscribe && unsubscribe(); // clean-up 함수
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleLogin, googleLoout, uid: user?.uid, init }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
