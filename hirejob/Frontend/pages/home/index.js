import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCaretDown, faLocation, faLocationCrosshairs, faMagnifyingGlass, faMapLocation, faMapMarked, faMapMarker, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
  } from "reactstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { protectRoute } from '../../HOC/protectedRoute';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const s = router.query.s;
  const p = router.query.p;

  const [form, setForm] = useState({
    search: s,
    page: 1,
    limit: 5,
  });

  const [user, setUser] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    // axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search`, form)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/worker`)
    .then((res) => {
        setUser({
            ...user,
            isLoading: false,
            data: res.data.data,
        })
    })
    .catch((err) => {
        console.error(err);
        alert(err);
    })
  }, [router.isReady])

  const onSubmit = (e) => {
    e.preventDefault();

    router.push(`/home?p=${form.page}&s=${form.search}`);
  }

  return (
    <div className={styles.container}>
        <div className={`${styles.topHeader} d-flex bg-purple px-5 align-items-center text-white`}>
            <h1>Top Jobs</h1>
        </div>
        <div className={`${styles.search} p-5`}>
            <div className={`${styles.searchBar} d-flex flex-row justify-content-around align-items-center rounded-2 border bg-white mx-5`}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input type={"search"} className={`border-0 mx-2 px-2`} style={{width:'700px', height: '40px', fontSize: '22px'}} placeholder={'Search for any skill'} onChange={(e) => setForm({...form, search: e.target.value})} />
                </form>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '22px', color: '#9EA0A5'}} />
                <div style={{height: '90%', width: '2px', backgroundColor: '#9EA0A5', margin: '0 1rem'}} />
                <UncontrolledDropdown>
                    <DropdownToggle
                    id="dropdownMenuButton"
                    type="button"
                    className='bg-transparent border-0'
                    style={{color: '#9EA0A5', fontSize: '20px'}}
                    >
                        <FontAwesomeIcon icon={faCaretDown} className={'mx-1'} />Sort
                    </DropdownToggle>

                    <DropdownMenu aria-labelledby="dropdownMenuButton">
                    <DropdownItem href="." onClick={(e) => e.preventDefault()}>
                        Nama
                    </DropdownItem>

                    <DropdownItem href="." onClick={(e) => e.preventDefault()}>
                        Skill
                    </DropdownItem>

                    <DropdownItem href="." onClick={(e) => e.preventDefault()}>
                        Lokasi
                    </DropdownItem>

                    <DropdownItem href="." onClick={(e) => e.preventDefault()}>
                        Freelance
                    </DropdownItem>

                    <DropdownItem href="." onClick={(e) => e.preventDefault()}>
                        Fulltime
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <button className={`btn mx-2 px-2 bg-purple text-white rounded-1`} style={{fontSize: '20px', height: '50px', width: '100px'}}>Search</button>
            </div>
        </div>
        <div className={`${styles.searchPekerja} p-5`}>
            {
                user.isLoading ? (
                    <div>Loading...</div>
                ) : user.data.map((e, i) => (
                <div key={i} className={`${styles.cardPekerja} d-flex flex-row align-items-center rounded-2 border bg-white mx-5 my-1`}>
                    <Image className='mx-3 rounded-circle' src={`${process.env.NEXT_PUBLIC_API_URL}/${e.photo}`} priority={i} width={150} height={150} alt="user pic" />
                    <div className={`${styles.infoPekerja} d-flex flex-column align-items-start mx-2 gap-2`}>
                        <div className={`${styles.namaPekerja}`}>{e.name}</div>
                        <div className={`${styles.jobType}`}>{e.job_title || "Freelance"}</div>
                        <div className='d-flex flex-row gap-2 align-items-center'><FontAwesomeIcon icon={faMapMarkerAlt} style={{color: '#9EA0A5'}} /><div className={`${styles.jobPekerja}`}>{e.city || "none"}</div></div>
                        <div className='d-flex flex-row flex-wrap align-items-center gap-3'>
                            {
                                e.skill ? e.skill.split(',').map((e, i) => (
                                    <div key={i} className='btn bg-orange text-white text-truncate'>{e}</div>
                                )) : (
                                    <div className='m-3'></div>
                                )
                            }
                        </div>
                    </div>
                    <Link href={`/profile/portofolio/${e.id}`}><button className={`btn ${styles.daftar} ${styles.detailBtn}  text-truncate`}>Lihat Profile</button></Link>
                </div>
                ))
            }
        </div>
        <div className={`${styles.paged} d-flex flex-row justify-content-center gap-3`}>
            <button className={`${styles.pageBox} d-flex align-items-center justify-content-center rounded-1 shadow-sm`} disabled={form.page <= 1}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <div className={`${styles.pageBox} ${styles.active} d-flex align-items-center justify-content-center rounded-1 shadow-sm`}>1</div>
            <div className={`${styles.pageBox} d-flex align-items-center justify-content-center rounded-1 shadow-sm`}>2</div>
            <div className={`${styles.pageBox} d-flex align-items-center justify-content-center rounded-1 shadow-sm`}>3</div>
            <button className={`${styles.pageBox} d-flex align-items-center justify-content-center rounded-1 shadow-sm`}><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
    </div>
  )
}

Home.navbar = 'N2';

export default protectRoute(Home);