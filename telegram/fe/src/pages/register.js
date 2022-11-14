import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

export default function Register() {
    return(
        <div className="bg-gray d-flex justify-content-center align-items-center w-100 h-100">
            <div className="login-container bg-white d-flex flex-column">
                <div className="d-flex flex-row justify-content-between align-items-center mb-3">
                    <Link to={'/login'} className="text-blue"><FontAwesomeIcon icon={faAngleLeft} /></Link>
                    <h4 className="text-blue m-0"><b>Register</b></h4>
                    <div></div>
                </div>
                <div className="mb-3">Let&apos;s create your account!</div>
                <label className="text-gray mt-2">Name</label>
                <input type='text' className="login-input px-1 mb-3" placeholder="enter your name" required />
                <label className="text-gray mt-2">Email</label>
                <input type='email' className="login-input px-1 mb-3" placeholder="enter your email" required />
                <label className="text-gray mt-2">Password</label>
                <input type='password' className="login-input px-1 mb-3" placeholder="enter your password" required />
                <button type="submit" className="btn btn-primary mt-2">Register</button>
                <div className="d-flex flex-row align-items-center my-3">
                    <hr/><div className="mx-3 text-gray">Register&nbsp;with</div><hr/>
                </div>
                <button type="submit" className="btn btn-secondary"><FontAwesomeIcon icon={faGoogle} className='mr-2' />Google</button>
            </div>
        </div>
    )
}