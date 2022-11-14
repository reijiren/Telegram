import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import Footer from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Navbar1(props) {
    const {children} = props;
    const router = useRouter();

    const [photo, setPhoto] = useState({
        isLoading: true,
        data: '',
    });

    useEffect(() => {
        const data = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('userData')) : null;

        if(data) setPhoto({...photo, isLoading: false, data: data.photo});
    }, [])

    return(
        <>
        <nav className="navbar navbar-light navbar-fixed-top px-5 py-0">
            <Link className="navbar-brand" href="/"><Image src="/Peworld logo (purple).png" width={100} height={30} alt="logo peworld" /></Link>
            <div className="d-flex flex-row justify-content-end">
            <ul className="navbar-nav flex-row mr-auto gap-4 align-items-center">
                <li className="nav-item">
                    <Link className="nav-link" href="."><FontAwesomeIcon icon={faBell} className={`${styles.notif} mx-2`} /></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="."><FontAwesomeIcon icon={faEnvelope} className={`${styles.notif} mx-2`} /></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/profile">
                        {
                            photo.isLoading ? (
                                <div className={`rounded-circle mx-2`} width={40} height={40}></div>
                            ) : (
                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${photo.data}`} className={`rounded-circle mx-2`} width={40} height={40} alt="user pic" />
                            )
                        }
                    </Link>
                </li>
            </ul>
        </div>
        </nav>
        <main>{children}</main>
        <Footer />
        </>
    )
}