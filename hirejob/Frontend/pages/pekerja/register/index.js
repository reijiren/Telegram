import Banner from '../../../components/banner';
import styles from '../../../styles/Login.module.css';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPw: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if(form.password === form.confirmPw){
      const body = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        user_type: 0,
        password: form.password,
      }

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, body)
      .then((res) => {
        if(res.data.status === 'success'){
          alert('Register berhasil');
          router.push('/pekerja/login');
        }else{
          alert('Email sudah dipakai');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      })
    }else{
      alert('Password tidak sama');
    }
  }

  return (
    <div className={styles.container}>
      <div className='d-flex flex-row justify-content-center h-100'>
        <div className={`${styles.banner}`}>
          <Banner />
        </div>
        <div className={styles.info}>
          <Image className={styles.mobileLogo} src="/Peworld logo (purple).png" height={20} width={70} alt="logo peworld" />
          <h1 className={styles.mobileHeader}>Signup</h1>
          <p className={styles.mobileHeader}>Lorom ipsum dolor si amet uegas anet.</p>
          <h1 className='mt-4'>Halo, Pewpeople</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
          <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
            <label className='mt-2'>Nama</label>
            <input type="text" className='mb-3' placeholder="Masukan nama panjang" onChange={(e) => setForm({...form, name: e.target.value})} required />
            <label>Email</label>
            <input type="email" className='mb-3' placeholder="Masukan alamat email" onChange={(e) => setForm({...form, email: e.target.value})} required />
            <label>No handphone</label>
            <input type="text" className='mb-3' placeholder="Masukan no handphone" onChange={(e) => setForm({...form, phone: e.target.value})} required />
            <label>Kata Sandi</label>
            <input type="password" className='mb-3' placeholder="Masukan kata sandi" onChange={(e) => setForm({...form, password: e.target.value})} required />
            <label>Konfirmasi Kata Sandi</label>
            <input type="password" className='mb-3' placeholder="Masukan konfirmasi kata sandi" onChange={(e) => setForm({...form, confirmPw: e.target.value})} required />
            <button type='submit' className={`btn btn-primary ${styles.submit}`}>Daftar</button>
            <p className='text-center mb-3'>Anda sudah punya akun? <Link className={styles.register} href="/pekerja/login">Masuk disini</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
