import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { login } from "../redux/action/user";
import { reset } from "../redux/action/chat";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const handleSuccess = (data) => {
            if(data.data.status === 'success'){
                dispatch(reset());
                localStorage.setItem('token', data.data.token);
                navigate('/');
            }else{
                alert(data.data.message);
            }
        }

        dispatch(login(form, handleSuccess))
    }

    return(
        <div className="bg-gray d-flex justify-content-center align-items-center w-100 h-100">
            <form onSubmit={onSubmit}>
                <div className="login-container bg-white d-flex flex-column">
                    <h4 className="text-center text-blue mb-3"><b>Login</b></h4>
                    <div className="mb-3">Hi, Welcome back!</div>
                    <label className="text-gray mt-2">Email</label>
                    <input type='email' className="login-input px-1" placeholder="enter your email" onChange={(e) => setForm({...form, email: e.target.value})} required />
                    <label className="text-gray mt-4">Password</label>
                    <input type='password' className="login-input px-1" placeholder="enter your password" onChange={(e) => setForm({...form, password: e.target.value})} required />
                    <div className="text-blue text-right my-3"><Link to='/reset-password'>Forgot password?</Link></div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className="d-flex flex-row align-items-center my-3">
                        <hr/><div className="mx-3 text-gray">Login&nbsp;with</div><hr/>
                    </div>
                    <button type="submit" className="btn btn-secondary"><FontAwesomeIcon icon={faGoogle} className='mr-2' />Google</button>
                    <div className="text-center my-3">Don&apos;t have an account? <Link to={'/register'}>Sign Up</Link></div>
                </div>
            </form>
        </div>
    )
}