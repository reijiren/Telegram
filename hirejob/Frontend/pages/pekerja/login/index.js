import Banner from '../../../components/banner'
import styles from '../../../styles/Login.module.css'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Login() {
  useEffect(() => {
    localStorage.removeItem('resetid');
  })
  
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, form)
    .then((res) => {
      if(res.data.status === 'success'){
        if(res.data.data.data.user_type === 0){
          localStorage.setItem('userData', JSON.stringify(res.data.data.data));
          localStorage.setItem('token', res.data.data.token);
          router.push("/");
        }else{
          alert('Pengguna tidak terdaftar sebagai pekerja');
        }
      }else{
        alert('email atau password salah');
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }
  
  return (
    <div className={styles.container}>
      <div className='d-flex flex-row justify-content-center align-items-center h-100'>
        <div className={`${styles.banner}`}>
          <Banner />
        </div>
        <div className={styles.info}>
          <Image className={styles.mobileLogo} src="/Peworld logo (purple).png" height={20} width={70} alt="logo peworld" />
          <h1 className={styles.mobileHeader}>Login</h1>
          <p className={`${styles.mobileHeader} ${styles.par}`}>Lorom ipsum dolor si amet uegas anet.</p>
          <h1>Halo, Pewpeople</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
          <div className='mt-5'/>
          <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
            <label>Email</label>
            <input type="email" className='mb-3' placeholder="Masukan alamat email" onChange={(e) => setForm({...form, email: e.target.value})} required />
            <label>Kata Sandi</label>
            <input type="password" className='mb-3' placeholder="Masukan kata sandi" onChange={(e) => setForm({...form, password: e.target.value})} required />
            <Link href={"/reset-password"} className={styles.forgot}>Lupa kata sandi?</Link>
            <button type='submit' className={`btn btn-primary ${styles.submit}`}>Masuk</button>
            <p className='text-center'>Anda belum punya akun? <Link className={styles.register} href="/pekerja/register">Daftar disini</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
