import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Footer() {
    return(
        <div className={`${styles.footer}`}>
            <Image src={'/Peworld logo (white).png'} width={150} height={40} alt="logo peworld" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
            <hr />
            <div className="d-flex flex-row justify-content-between">
                <div className="text-white">2020 Pewworld. All right reserved</div>
                <ul>
                    <li>Telepon</li>
                    <li>Email</li>
                </ul>
            </div>
        </div>
    )
}