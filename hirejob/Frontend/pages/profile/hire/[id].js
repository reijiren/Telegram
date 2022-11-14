import React, { useEffect, useState } from "react";
import Profile3 from "../../../components/profile/profile3";
import styles from '../../../styles/Profile.module.css';
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { protectRoute } from "../../../HOC/protectedRoute";

export async function getServerSideProps(context) {
    try{
        const {id} = context.params;

        const response = await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_URL}/user/worker/${id}`,
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

const Hire = (props) => {
    const router = useRouter();
    const data = props.data;

    return(
        <div className={`${styles.pContainer}`}>
            <div className={`${styles.bgUser}`}><Image priority={1} src={'/bgPhoto.png'} fill alt="user background photo" /></div>
            <div className={`d-flex flex-row justify-content-center`}>
                <Profile3 />
                <div className={`${styles.content} bg-white rounded-2 my-4 mx-3 p-4 gap-2 shadow-sm d-flex flex-column`}>
                {
                    !data ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                        <h1>Hubungi {data[0].name}</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                        <div className="form d-flex flex-column gap-2 my-2">
                            <label className="mx-2 text-gray">Tujuan tentang pesan ini</label>
                            <input list="tujuan" id="tujuan" name="tujuan" placeholder={'Pilih tujuan'} className={`rounded-2 p-2`} />
                        </div>
                        <div className="form d-flex flex-column gap-2 my-2">
                            <label className="mx-2 text-gray">Nama lengkap</label>
                            <input type={'text'} placeholder={'Masukan nama lengkap'} className={`rounded-2 p-2`} />
                        </div>
                        <div className="form d-flex flex-column gap-2 my-2">
                            <label className="mx-2 text-gray">Email</label>
                            <input type={'email'} placeholder={'Masukan email'} className={`rounded-2 p-2`} />
                        </div>
                        <div className="form d-flex flex-column gap-2 my-2">
                            <label className="mx-2 text-gray">No Handphone</label>
                            <input type={'text'} placeholder={'Masukan no handphone'} className={`rounded-2 p-2`} />
                        </div>
                        <div className="form d-flex flex-column gap-2 my-2">
                            <label className="mx-2 text-gray">Deskripsi</label>
                            <textarea placeholder="Deskripsikan/jelaskan lebih detail " className={`rounded-2 p-2`} style={{height: '100px'}} />
                        </div>
                        <button type="submit" className={`${styles.submit} p-2 text-white shadow-sm bg-orange`}>Hire</button>
                        </>
                    )
                }
                </div>
            </div>
        </div>
    )
}

Hire.navbar = 'N2';

export default protectRoute(Hire);