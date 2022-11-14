import Banner from '../../components/banner';
import styles from '../../styles/Login.module.css';
import Image from 'next/image';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reset() {
  useEffect(() => {
    localStorage.removeItem('resetid');
  })
  
  const router = useRouter();

  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/${email}`)
    .then((res) => {
      if(res.data.data.length !== 0){
        localStorage.setItem('resetid', res.data.data[0].id);
        router.push(`/reset-password/reset`);
      }else{
        alert('Email tidak terdaftar');
      }
    })
    .catch((err) => {
      console.error(err);
      alert(err);
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
          <h1 className={styles.mobileHeader}>Reset Password</h1>
          <p className={`${styles.mobileHeader} ${styles.par}`}>Enter your password user account’s verified email and we will send you a password reset link.</p>
          <h1>Reset Password</h1>
          <p>Enter your user account&apos;s verified email address and we will send you a password reset link.</p>
          <div className='mt-5'/>
          <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
            <label>Email</label>
            <input type="email" className='mb-3' placeholder="Masukan alamat email" onChange={(e) => setEmail(e.target.value)} />
            <button type='submit' className={`btn btn-primary ${styles.submit}`}>Send password reset email</button>
          </form>
        </div>
      </div>
    </div>
  )
}
