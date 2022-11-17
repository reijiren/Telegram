import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";

export default function Home() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    useEffect(() => {
        if(!user.user.id_user){
            navigate('/login');
        }
    }, [])
    
    return(
        <div className="bg-gray d-flex align-items-center home">
            <ChatList />
            <ChatRoom />
        </div>
    )
}