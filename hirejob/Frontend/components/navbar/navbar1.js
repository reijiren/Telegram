import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/Home.module.css';
import Footer from '../footer';

export default function Navbar1(props) {
    const {children} = props;

    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    })

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }

    return(
        <>
        <nav className="navbar navbar-light navbar-fixed-top px-5 py-0">
            <Link className="navbar-brand" href="/"><Image src="/Peworld logo (purple).png" width={100} height={30} alt="logo peworld" /></Link>
            <div className="d-flex flex-row justify-content-end">
            <ul className="navbar-nav flex-row mr-auto gap-2">
                {
                    token ? (
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" href="/profile"><button className={`btn btn-primary ${styles.daftar}`}>Profile</button></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="."><button className={`btn btn-primary ${styles.masuk}`} onClick={onLogout}>Logout</button></Link>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" href="/login"><button className={`btn btn-primary ${styles.masuk}`}>Masuk</button></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/login"><button className={`btn btn-primary ${styles.daftar}`}>Daftar</button></Link>
                        </li>
                        </>
                    )
                }
            </ul>
        </div>
        </nav>
        <main>{children}</main>
        <Footer />
        </>
    )
}