import React, { useEffect, useState } from "react";
import Profile2 from "../../components/profile/profile2";
import styles from '../../styles/Profile.module.css';
import style2 from '../../styles/Home.module.css';
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { protectRoute } from "../../HOC/protectedRoute";

const Profile = () => {
    const router = useRouter();
    const data = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('userData')) : null;

    const [user, setUser] = useState({
        isLoading: true,
        data: [],
    });

    const [form, setForm] = useState({
        name: null,
        company_name: null,
        company_field: null,
        position: null,
        job_title: null,
        job_type: null,
        photo: null,
        city: null,
        instagram: null,
        github: null,
        gitlab: null,
        linkedin: null,
        description: null,
        skill: null,
        title: null,
        company: null,
        date_in: null,
        date_out: null,
        jobdesk: null,
        app_title: null,
        image: null,
        link: null,
        type: null,
    })

    const [skill, setSkill] = useState('');

    const [edit, setEdit] = useState(false);

    const toggleEdit = () => {
        const btEdit = document.getElementById('btEdit') || null;
        const btSubmit = document.getElementById('btSubmit') || null;
        const btCancel = document.getElementById('btCancel') || null;
        const btDelete = document.getElementById('btDelete') || null;
        const inputName = document.getElementById('inputName') || null;
        const inputCName = document.getElementById('inputCName') || null;
        const inputCField = document.getElementById('inputCField') || null;
        const inputPos = document.getElementById('inputPos') || null;
        const inputJob = document.getElementById('inputJob') || null;
        const inputJobType = document.getElementById('inputJobType') || null;
        const inputCity = document.getElementById('inputCity') || null;
        const inputIg = document.getElementById('inputIg') || null;
        const inputGithub = document.getElementById('inputGithub') || null;
        const inputGitlab = document.getElementById('inputGitlab') || null;
        const inputLinkedin = document.getElementById('inputLinkedin') || null;
        const inputDesc = document.getElementById('inputDesc') || null;
        const inputPhoto = document.getElementById('inputPhoto') || null;
        
        if(!edit){
            btEdit.hidden = true;
            btDelete.hidden = true;
            btSubmit.hidden = false;
            btCancel.hidden = false;

            inputName.disabled = false;
            inputCName && (inputCName.disabled = false);
            inputCField && (inputCField.disabled = false);
            inputPos && (inputPos.disabled = false);
            inputJob.disabled = false;
            inputJobType && (inputJobType.disabled = false);
            inputCity.disabled = false;
            inputIg.disabled = false;
            inputGithub.disabled = false;
            inputGitlab.disabled = false;
            inputLinkedin.disabled = false;
            inputDesc.disabled = false;
            inputPhoto.disabled = false;

            setEdit(true);
        }else{
            btEdit.hidden = false;
            btDelete.hidden = false;
            btSubmit.hidden = true;
            btCancel.hidden = true;

            inputName.disabled = true;
            inputCName && (inputCName.disabled = true);
            inputCField && (inputCField.disabled = true);
            inputPos && (inputPos.disabled = true);
            inputJob.disabled = true;
            inputJobType && (inputJobType.disabled = true);
            inputCity.disabled = true;
            inputIg.disabled = true;
            inputGithub.disabled = true;
            inputGitlab.disabled = true;
            inputLinkedin.disabled = true;
            inputDesc.disabled = true;
            inputPhoto.disabled = true;

            setEdit(false);
        }
    }

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${data.user_type === 0 ? 'worker' : 'recruiter'}/${data.id}`)
        .then((res) => {
            setUser({...user, isLoading: false, data: res.data.data[0]});
            setSkill(res.data.data[0].skill);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [router.isReady])

    const addSkill = (e) => {
        e.preventDefault();

        const data = {
            skill: (skill ? skill + ', ' : '') + form.skill,
        }

        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/worker/update/${user.data.id}`, data)
        .then((res) => {
            alert(res.data.message);
            router.reload();
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        })
    }

    const addExp = (e) => {
        e.preventDefault();

        const data = {
            id_user: user.data.id,
            title: form.title,
            company: form.company,
            date_in: form.date_in,
            date_out: form.date_out,
            jobdesk: form.jobdesk,
        }

        console.log(data)

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/experience`, data)
        .then((res) => {
            alert(res.data.message);
            router.reload();
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        })
    }

    const addPorto = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('id_user', user.data.id);
        data.append('app_title', form.app_title);
        data.append('image', form.image);
        data.append('link', form.link);
        data.append('type', form.type);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, data)
        .then((res) => {
            alert(res.data.message);
            router.reload();
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        })
    }

    const changeImg = async() => {
        console.log(form.photo)
        let data = new FormData();
        data.append('photo', form.photo);

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/photo/${user.data.id}`, data)
        .then((res) => {
            console.log(res)
            // alert(res.data.message);
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(form.photo) changeImg();

        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${data.user_type === 0 ? 'worker' : 'recruiter'}/update/${user.data.id}`, form)
        .then((res) => {
            alert(res.data.message);
            router.reload();
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        })
    }

    const onDelete = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${user.data.id}`)
        .then((res) => {
            alert(res.data.message);
            router.push('/login');
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        })
    }

    return(
        <div className={`${styles.pContainer}`}>
            <div className={`${styles.bgUser}`}><Image priority={1} src={'/bgPhoto.png'} fill alt="user background photo" /></div>
            <div className={`d-flex flex-row justify-content-center`}>
                <div className="d-flex flex-column gap-2 mb-2">
                    <Profile2 />
                    <button id="btEdit" className={`${style2.daftar} shadow-sm rounded-2`} onClick={() => toggleEdit()}>Edit</button>
                    <button id="btDelete" className={`${style2.daftar} bg-danger shadow-sm rounded-2`} onClick={() => onDelete()}>Delete Account</button>
                    <button id="btSubmit" type="submit" form="form-data" className={`${style2.daftar} shadow-sm rounded-2`} onClick={() => toggleEdit()} hidden>Simpan</button>
                    <button id="btCancel" className={`${style2.masuk} shadow-sm rounded-2`} onClick={() => toggleEdit()} hidden>Batal</button>
                </div>
                {
                    user.isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="d-flex flex-column">
                            <div className={`${styles.content} bg-white rounded-2 my-4 mx-3 p-4 gap-2 shadow-sm d-flex flex-column`}>
                                <div className={`${style2.namaPekerja} mx-2 mt-2`}>Data Diri</div>
                                <hr />
                                <form onSubmit={(e) => onSubmit(e)} id="form-data">
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Nama lengkap</label>
                                        <input type={'text'} placeholder={'Masukan nama lengkap'} className={`rounded-2 p-2`} defaultValue={user.data.name} id="inputName" onChange={(e) => setForm({...form, name: e.target.value})} disabled required />
                                    </div>
                                    {
                                        user.data.user_type === 1 && (
                                            <>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Nama Perusahaan</label>
                                                <input type={'text'} placeholder={'Masukan nama perusahaan'} className={`rounded-2 p-2`} defaultValue={user.data.company_name} id="inputCName" onChange={(e) => setForm({...form, company_name: e.target.value})} disabled />
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Bidang Perusahaan</label>
                                                <input type={'text'} placeholder={'Masukan bidang perusahaan'} className={`rounded-2 p-2`} defaultValue={user.data.company_field} id="inputCField" onChange={(e) => setForm({...form, company_field: e.target.value})} disabled />
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Jabatan</label>
                                                <input type={'text'} placeholder={'Masukan jabatan'} className={`rounded-2 p-2`} defaultValue={user.data.position} id="inputPos" onChange={(e) => setForm({...form, position: e.target.value})} disabled />
                                            </div>
                                            </>
                                        )
                                    }
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Pekerjaan</label>
                                        <input type={'text'} placeholder={'Masukan pekerjaan'} className={`rounded-2 p-2`} defaultValue={user.data.job_title} id="inputJob" onChange={(e) => setForm({...form, job_title: e.target.value})} disabled />
                                    </div>
                                    {
                                        user.data.user_type === 0 && (
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Jenis pekerjaan</label>
                                                <input type={'text'} placeholder={'Masukan jenis pekerjaan'} className={`rounded-2 p-2`} defaultValue={user.data.job_type} id="inputJobType" onChange={(e) => setForm({...form, job_type: e.target.value})} disabled />
                                            </div>
                                        )
                                    }
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Domisili</label>
                                        <input type={'text'} placeholder={'Masukan domisili'} className={`rounded-2 p-2`} defaultValue={user.data.city} id="inputCity" onChange={(e) => setForm({...form, city: e.target.value})} disabled />
                                    </div>
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Instagram</label>
                                        <input type={'text'} placeholder={'Masukan akun instagram'} className={`rounded-2 p-2`} defaultValue={user.data.instagram} id="inputIg" onChange={(e) => setForm({...form, instagram: e.target.value})} disabled />
                                    </div>
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Github</label>
                                        <input type={'text'} placeholder={'Masukan akun github'} className={`rounded-2 p-2`} defaultValue={user.data.github} id="inputGithub" onChange={(e) => setForm({...form, github: e.target.value})} disabled />
                                    </div>
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Gitlab</label>
                                        <input type={'text'} placeholder={'Masukan akun gitlab'} className={`rounded-2 p-2`} defaultValue={user.data.gitlab} id="inputGitlab" onChange={(e) => setForm({...form, gitlab: e.target.value})} disabled />
                                    </div>
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Linkedin</label>
                                        <input type={'text'} placeholder={'Masukan akun linkedin'} className={`rounded-2 p-2`} defaultValue={user.data.linkedin} id="inputLinkedin" onChange={(e) => setForm({...form, linkedin: e.target.value})} disabled />
                                    </div>
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Deskripsi singkat</label>
                                        <textarea placeholder="Tuliskan deskripsi singkat" className={`rounded-2 p-2`} style={{height: '100px'}} defaultValue={user.data.description} id="inputDesc" onChange={(e) => setForm({...form, description: e.target.value})} disabled />
                                    </div>
                                    <div className="form d-flex flex-column gap-2 my-2">
                                        <label className="mx-2 text-gray">Upload foto</label>
                                        <input type={'file'} className={`rounded-2 p-2`} id="inputPhoto" onChange={(e) => setForm({...form, photo: e.target.files[0]})} disabled />
                                    </div>
                                </form>
                            </div>
                            {
                                user.data.user_type === 0 && (
                                    <>
                                    <div className={`${styles.content} bg-white rounded-2 my-4 mx-3 p-4 gap-2 shadow-sm d-flex flex-column`}>
                                        <div className={`${style2.namaPekerja} mx-2 mt-2`}>Skill</div>
                                        <hr />
                                        <form onSubmit={(e) => addSkill(e)} id="skill">
                                            <div className="form d-flex flex-row justify-content-between align-items-center gap-2 my-2">
                                                <input type={'text'} placeholder={'Masukkan skill'} className={`${styles.skill} rounded-2 px-2`} onChange={(e) => setForm({...form, skill: e.target.value})} />
                                                <button type="submit" className={`btn bg-orange text-white rounded-2`} form="skill">Simpan</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className={`${styles.content} bg-white rounded-2 my-4 mx-3 p-4 gap-2 shadow-sm d-flex flex-column`}>
                                        <div className={`${style2.namaPekerja} mx-2 mt-2`}>Pengalaman Kerja</div>
                                        <hr />
                                        <form onSubmit={(e) => addExp(e)} id="pengalaman">
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Posisi</label>
                                                <input type={'text'} placeholder={'Masukan posisi'} className={`rounded-2 p-2`} onChange={(e) => setForm({...form, title: e.target.value})} />
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Nama Perusahaan</label>
                                                <input type={'text'} placeholder={'Masukan nama perusahaan'} className={`rounded-2 p-2`} onChange={(e) => setForm({...form, company: e.target.value})} />
                                            </div>
                                            <div className="d-flex flex-row my-2 gap-3 justify-content-between">
                                                <div className="form d-flex flex-column gap-2">
                                                    <label className="mx-2 text-gray">Mulai pada</label>
                                                    <input type={'date'} defaultValue={'2018-01-01'} className={`rounded-2 p-2`} style={{width: '250px'}} onChange={(e) => setForm({...form, date_in: e.target.value})} />
                                                </div>
                                                <div className="form d-flex flex-column gap-2">
                                                    <label className="mx-2 text-gray">Berakhir pada</label>
                                                    <input type={'date'} defaultValue={'2022-01-01'} className={`rounded-2 p-2`} style={{width: '250px'}} onChange={(e) => setForm({...form, date_out: e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Deskripsi singkat</label>
                                                <textarea placeholder="Deskripsikan pekerjaan anda" className={`rounded-2 p-2`} style={{height: '100px'}} onChange={(e) => setForm({...form, jobdesk: e.target.value})} />
                                            </div>
                                            <hr />
                                            <button type="submit" className={`${styles.submit} p-2 text-orange shadow-sm bg-white w-100`} form="pengalaman">Tambah pengalaman kerja</button>
                                        </form>
                                    </div>
                                    <div className={`${styles.content} bg-white rounded-2 my-4 mx-3 p-4 gap-2 shadow-sm d-flex flex-column`}>
                                        <div className={`${style2.namaPekerja} mx-2 mt-2`}>Portofolio</div>
                                        <hr />
                                        <form onSubmit={(e) => addPorto(e)} id="portofolio">
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Nama aplikasi</label>
                                                <input type={'text'} placeholder={'Masukan nama aplikasi'} className={`rounded-2 p-2`} onChange={(e) => setForm({...form, app_title: e.target.value})} />
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Link repository</label>
                                                <input type={'text'} placeholder={'Masukan link repository'} className={`rounded-2 p-2`} onChange={(e) => setForm({...form, link: e.target.value})} />
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Type Portofolio</label>
                                                <div className="d-flex flex-row gap-2">
                                                    <div className="d-flex flex-row align-items-center radioActive border border-dark p-2">
                                                        <input className="m-2" type={'radio'} id={'mobile'} name={'web'} value={'0'} onChange={(e) => setForm({...form, type: e.target.value})} />
                                                        <label htmlFor="mobile">Aplikasi mobile</label>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center radioActive border border-dark p-2">
                                                        <input className="m-2" type={'radio'} id={'web'} name={'web'} value={'1'} onChange={(e) => setForm({...form, type: e.target.value})} />
                                                        <label htmlFor="web">Aplikasi web</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form d-flex flex-column gap-2 my-2">
                                                <label className="mx-2 text-gray">Upload gambar</label>
                                                <input type={'file'} className={`rounded-2 p-2`} onChange={(e) => setForm({...form, image: e.target.files[0]})} />
                                            </div>
                                            <hr />
                                            <button type="submit" className={`${styles.submit} p-2 text-orange shadow-sm bg-white`} form="portofolio">Tambah portofolio</button>
                                        </form>
                                    </div>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Profile.navbar = 'N2';

export default protectRoute(Profile);