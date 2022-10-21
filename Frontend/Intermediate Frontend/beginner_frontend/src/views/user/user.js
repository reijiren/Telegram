import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from "react-router-dom";
import { deleteUser, getUser } from "../../redux/action/user";

const User = () => {
    // const [queryParam] = useSearchParams();
    // const email = queryParam.get('email');
    const dispatch = useDispatch();

    const { email } = useParams();

    const token = localStorage.getItem("token");

    const user = useSelector((state) => {
        return state.user;
    })
    
    // mount
    useEffect(() => {
        dispatch(getUser(email, token));
    }, [])

    const onDelete = () => {
        console.log(email);

        const handleSuccess = (data) => {
            console.log(data.data);

            if(data.data.status !== "success"){
                alert(data.data.message);
            }else{
                alert('User telah dihapus');
            }
        }

        dispatch(deleteUser(email, token, handleSuccess));
    }

    return(
        <>
        <div style={{padding: '20px'}}>
        <h1>Account Information</h1>
            {
                user.isLoading ? (
                    <p>Loading</p>
                ) : user.isError ? (
                    <p>Error</p>
                ) : (
                    user.data.map((item) => (
                        <>
                        <p>Name          : {item.name}</p>
                        <p>E-mail        : {item.email}</p>
                        <p>Phone         : {item.phone}</p>
                        <p>Role          : {item.level}</p>
                        <p>Image         :</p>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/profile/${item.image}`} alt={`pic of ${item.name}`} width='100px' height='100px'/>
                        <p>Date Created  : {item.date_created}</p>
                        </>
                    ))
                )
            }
            <button type="submit" className="btn btn-success" onClick={() => onDelete()}>Delete Account</button>
        </div>
        </>
    )
}

export default User;