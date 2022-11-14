import React, { useEffect, useState } from "react";
import Profile1 from "../../../components/profile/profile1";
import styles from '../../../styles/Profile.module.css';
import style2 from '../../../styles/Home.module.css';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { protectRoute } from "../../../HOC/protectedRoute";

export async function getServerSideProps(context) {
    try{
        const {id} = context.params;

        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}/user/experience/${id}`,
        })

        return{
            props:{
                data: response.data.data,
                err: false,
                errMessage: "",
            }
        }
    }catch(err){
        return{
            props:{
                data: [],
                err: true,
                errMessage: "Fetching data failed",
            }
        }
    }
}

const Pengalaman = (props) => {
    const router = useRouter();
    const {id} = router.query;
    const data = props.data;

    return(
        <div className={`${styles.pContainer}`}>
            <div className={`${styles.bgUser}`}><Image priority={1} src={'/bgPhoto.png'} fill alt="user background photo" /></div>
            <div className={`d-flex flex-row justify-content-center`}>
                <Profile1 />
                <div className={`${styles.content} bg-white rounded-2 my-4 mx-3 p-4 gap-2 shadow-sm d-flex flex-column`}>
                    <div className="d-flex flex-row gap-4">
                        <Link href={`/profile/portofolio/${id}`} style={{textDecoration: 'none'}}><div className={`${styles.porto}`}>Portofolio</div></Link>
                        <Link href={'.'} style={{textDecoration: 'none'}}><div className={`${styles.porto} ${styles.active}`}>Pengalaman Kerja ({data.length})</div></Link>
                    </div>
                    <div className="d-flex flex-column gap-3 my-3">
                        {
                            !data ? (
                                <div className="align-self-start font-weight-bold">Loading...</div>
                            ) : data.length === 0 ? (
                                <div className="align-self-start font-weight-bold">No job experience</div>
                            ) : data.map((e, i) => (
                                <div key={i} className="d-flex flex-row gap-3">
                                    <Image src={"/tokopedia.jpeg"} className={`rounded-2`} height={100} width={100} alt="user experience" />
                                    <div className="d-flex flex-column gap-1">
                                        <div className={`${style2.namaPekerja}`}>{e.job_title}</div>
                                        <div className={`${style2.jobTitle}`}>{e.company}</div>
                                        <div className={`${style2.jobType}`}>{e.date_in.slice(0, 10)} until {e.date_out.slice(0, 10)} {/*({e.date_out.slice(5, 7) - e.date_in.slice(5, 7)} months)*/}</div>
                                        <div className="my-2 text-break">{e.jobdesk || "no description"}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Pengalaman.navbar = 'N2';

export default protectRoute(Pengalaman);