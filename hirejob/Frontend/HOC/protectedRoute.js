import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar1 from "../components/navbar/navbar1";
import Navbar2 from "../components/navbar/navbar2";

const layouts = {
    N1: Navbar1,
    N2: Navbar2,
}

const noLayouts = ({children}) => {
    return (<>{children}</>)
}

export function protectRoute(Component){
    return (props) => {
        const router = useRouter();

        const Layout = layouts[Component.navbar] || noLayouts;
        
        useEffect(() => {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData'));
            if(!token || !userData){
                alert('Harap login terlebih dahulu');
                router.push('/login');
            }
        }, [])
        return (<Layout><Component {...props} /></Layout>)
    }
}