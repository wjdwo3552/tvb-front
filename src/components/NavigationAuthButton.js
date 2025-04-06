import React, {useEffect, useState} from "react";
import {useAuth} from "./Api/Auth/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

export default function NavigationAuthButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // 페이지 로드될 때 토큰 확인
        if (accessToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [accessToken]);

    return (
        <nav className="flex justify-end gap-4 p-4">
            {isLoggedIn ? (
                <>
                    <div className="relative rounded-2xl px-2 mr-2 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        <a href="#" className="font-semibold text-indigo-600">View Dashboard</a>
                    </div>
                    {/*<Link className="text-sm/6 font-semibold text-gray-900 mr-2" to="/login">*/}
                    {/*    Started In DashBoard*/}
                    {/*</Link>*/}

                    <Link className="text-sm/6 font-semibold text-gray-900" onClick={logout}>
                        Log out <span aria-hidden="true">&rarr;</span>
                    </Link>
                </>
            ) : (
                <Link className="text-sm/6 font-semibold text-gray-900" to="/login">
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link>
            )}
        </nav>
    );
}
