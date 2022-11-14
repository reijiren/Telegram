import Banner from '../../components/banner'
import styles from '../../styles/Login.module.css'
import Link from "next/link";
import { useEffect } from 'react';

export default function LoginOption() {
  useEffect(() => {
    localStorage.removeItem('resetid');
  })
  
  return (
    <div className={styles.container}>
      <div className='d-flex flex-row justify-content-center align-items-center h-100'>
        <div className={`${styles.banner} ${styles.option}`}>
          <Banner />
        </div>
        <div className={`${styles.info} ${styles.infoOption}`}>
          <Link href="/pekerja/login"><button className={`btn btn-primary ${styles.pekerja} ${styles.btnPekerja}`}>Masuk sebagai pekerja</button></Link>
          <div className='d-flex flex-rows align-items-center'><hr /><p className={`d-block mx-2 ${styles.or}`}>atau</p><hr /></div>
          <Link href="/perekrut/login"><button className={`btn btn-primary ${styles.perekrut} ${styles.btnPerekrut}`}>Masuk sebagai perekrut</button></Link>
        </div>
      </div>
    </div>
  )
}