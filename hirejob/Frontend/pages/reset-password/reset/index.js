import Banner from '../../../components/banner';
import styles from '../../../styles/Login.module.css';
import Image from 'next/image';
import {useRouter} from 'next/router';
import { useState } from 'react';
import axios from 'axios';


export default function Reset() {
  const router = useRouter();

  const id = typeof window !== 'undefined' && (localStorage.getItem('resetid') || router.push('/reset-password'));

  const [form, setForm] = useState({
    password: '',
    confirmP: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if(form.password === form.confirmP){
      const data = {
        password: form.password,
      }

      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${id}`, data)
      .then((res) => {
        alert('Password telah diubah');
        router.push('/login');
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      })
    }else{
      alert('Password tidak sama');
    }
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
          <p className={`${styles.mobileHeader} ${styles.par}`}>You need to change your password to activate your account.</p>
          <h1>Reset Password</h1>
          <p>Enter your user account&apos;s verified email address and we will send you a password reset link.</p>
          <div className='mt-5'/>
          <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
            <label>Kata Sandi</label>
            <input type="password" className='mb-3' placeholder="Masukan kata sandi baru" onChange={(e) => setForm({...form, password: e.target.value})} required />
            <label>Konfirmasi Kata Sandi</label>
            <input type="password" className='mb-3' placeholder="Masukan konfirmasi kata sandi baru" onChange={(e) => setForm({...form, confirmP: e.target.value})} required />
            <button type='submit' className={`btn btn-primary ${styles.submit}`}>Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}