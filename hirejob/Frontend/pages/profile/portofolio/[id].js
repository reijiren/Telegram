import React, { useEffect, useState } from "react";
import Profile1 from "../../../components/profile/profile1";
import styles from '../../../styles/Profile.module.css';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { protectRoute } from "../../../HOC/protectedRoute";

// export async function getServerSideProps(context) {
//     try{
//         const {id} = context.params;

//         const response = await axios({
//             method: 'GET',
//             url: `${process.env.NEXT_PUBLIC_API_URL}/user/portofolio/${id}`,
//         })

//         return{
//             props:{
//                 data: response.data.data,
//                 err: false,
//                 errMessage: "",
//             }
//         }
//     }catch(err){
//         return{
//             props:{
//                 data: [],
//                 err: true,
//                 errMessage: "Fetching data failed",
//             }
//         }
//     }
// }

export async function getStaticProps(context){
    try{
        const { id } = context.params;
        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}/user/portofolio/${id}`
        })
        
        return{
            props: {
                data: response.data.data,
            },
            revalidate: 10,
        }
    }catch(err){
        return{
            props: {
                data: null,
            }
        }
    }
}

export async function getStaticPaths() {
    const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/worker`,
    })

    const paths = response.data.data.map((e, i) => {
        return {params: { id: e.id.toString() }}
    })
    return{
        paths,
        fallback: false,
    }
}

const Portofolio = (props) => {
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
                        <Link href={'.'} style={{textDecoration: 'none'}}><div className={`${styles.porto} ${styles.active}`}>Portofolio ({data.length})</div></Link>
                        <Link href={`/profile/pengalaman/${id}`} style={{textDecoration: 'none'}}><div className={`${styles.porto}`}>Pengalaman Kerja</div></Link>
                    </div>
                    <div className="d-flex flex-row flex-wrap gap-3 my-3">
                        {
                            !data ? (
                                <div className="align-self-center font-weight-bold">Loading...</div>
                            ) : data.length === 0 ? (
                                <div className="align-self-center font-weight-bold">No portofolio</div>
                            ) : data.map((e, i) => (
                                <div key={i} className="d-flex flex-column gap-3 justify-content-center align-items-center" style={{width: "210px"}}>
                                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${e.image}`} className={`rounded-2`} height={100} width={200} alt="user porto" />
                                    <p className="text-center text-break">{e.app_title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Portofolio.navbar = 'N2';

export default protectRoute(Portofolio);