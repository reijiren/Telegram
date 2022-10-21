import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoginLogo from "../../component/LoginLogo";
import { changePass } from "../../redux/action/user";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        pw: '',
        pwconfirm: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        const email = JSON.parse(localStorage.getItem('email'));

        if(form.pw == '' || form.pwconfirm == ''){
            alert('Data harus lengkap');
        }else if(form.pw !== form.pwconfirm){
            alert('Password tidak sama');
        }else{
            const body = {
                email: email,
                pw: form.pw,
            }

            const handleSuccess = (data) => {
                console.log(data.data);
                alert('Password telah diubah')
                return navigate("/login");
            }

            dispatch(changePass(body, handleSuccess));
        }
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <LoginLogo />
                <div className="input-container col-lg-6 col-md-6">
                    <div className="col-md-9 col-sm-12 form-box">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className=" row gap-2">
                                <div>
                                    <label htmlFor="password">New Password</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="password" placeholder="New Password" onChange={(e) => setForm({...form, pw: e.target.value})} required/>
                                </div>
                                <div>
                                    <label htmlFor="password">Confirm New Password</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="password" placeholder="Confirm New Password" onChange={(e) => setForm({...form, pwconfirm: e.target.value})} required/>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex">
                                    <div className="d-flex custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="cb1" required />
                                        <label className="custom-control-label" htmlFor="cb1">I agree to terms & conditions</label>
                                    </div>
                                </div>
                                
                                <div>
                                    <button type="submit" className="btn btn-primary w100">Reset Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;