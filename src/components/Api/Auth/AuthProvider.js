import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {

        const prod_url = "https://api.tvsbox.click"
        const loca_url = "http://localhost:8080"
        const path = prod_url + "/api/v1/auth/me";
        const path2 = prod_url + "/api/v1/auth/refresh";
        //aa
        console.log(accessToken)

        if (accessToken) {
            axios.get(path, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                withCredentials: true
            })
                .then(response => {
                    setUserInfo(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios.post(path2, {}, {
                withCredentials: true
            })
                .then(response => {
                    const {accessToken} = response.data;
                    setAccessToken(accessToken);
                })
        }
    },  [accessToken]);
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
