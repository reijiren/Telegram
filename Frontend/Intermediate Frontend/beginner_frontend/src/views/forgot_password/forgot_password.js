import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import LoginLogo from "../../component/LoginLogo";
import { getDetailUser } from "../../redux/action/user";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if(form.email == ""){
            alert("Email harus diisi");
        }else{
            const handleSuccess = (data) => {
                console.log(data.data);

                if(data.data.status !== "success"){
                    alert(data.data.message);
                }else if(data.data.data == ""){
                    alert("Email tidak terdaftar");
                }else{
                    localStorage.setItem("email", JSON.stringify(data.data.data[0].email));
                    return navigate("/codereset")
                }
            }

            dispatch(getDetailUser(form.email, handleSuccess));
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <LoginLogo />
                <div className="input-container col-lg-6 col-md-6">
                    <div className="col-md-9 col-sm-12 form-box">
                        <div className="heading mb-3">Forgot Password?</div>
                        <div className="heading-2 mb-5">We just need your registered e-mail address
                            to send your password resend</div>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className=" row gap-2">
                                <div>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="text" placeholder="examplexxx@gmail.com" onChange={(e) => setForm({...form, email: e.target.value})} required />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary w100">Send E-mail</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;