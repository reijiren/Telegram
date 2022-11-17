import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { faArrowRight, faBars, faCameraRetro, faFaceSurprise, faPlus, faSmile } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import {reset, setChat} from "../redux/action/chat";

export default function ChatRoom() {
    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fileOpen, setFileOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const toggleFile = () => setFileOpen((prevState) => !prevState);

    const [socketIO, setSocketIO] = useState(null);
    const [msg, setMsg] = useState('');
    // const [listChat, setListChat] = useState([]);

    const data = useSelector((state) => state.user);
    const chat = useSelector((state) => state.chat);
    const listChat = chat.chat;
    const sender = data.user;
    const receiver = data.receiver[0];

    const date = new Date();
    const time = date.toString().slice(5);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_URL)
        socket.on('send-message-response', (res) => {
            // setListChat(res)
            dispatch(setChat(res));
        })
        setSocketIO(socket);
    }, [])

    useEffect(() => {
        if(socketIO){
            // setListChat([]);
            dispatch(reset());

            socketIO.emit('join-room', sender.id_user);

            const data = {
                sender: sender.id_user,
                receiver: receiver.id_user,
            }

            socketIO.emit('chat-history', data);
        }
    }, [receiver])

    const submitText = (e) => {
        e.preventDefault();

        const payload = {
            sender: sender.fullname,
            senderid: sender.id_user,
            senderimg: sender.image,
            receiver: receiver.fullname,
            receiverid: receiver.id_user,
            receiverimg: receiver.image,
            content: msg,
            date_time: time,
            type: 0,
        }

        // setListChat([payload, ...listChat])
        dispatch(setChat([payload, ...listChat]));

        const data = {
            sender: sender.id_user,
            receiver: receiver.id_user,
            message: msg,
            type: 0,
        }

        socketIO.emit('send-message', data);

        setMsg('');
    }

    return(
        <div className="chat-room bg-gray">
            {
                receiver ? (
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div className="bg-white d-flex flex-row receiver-header pointer justify-content-between align-items-center px-5">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${receiver.image}`} className="rounded-circle img-fit mr-2" width={45} height={45} alt="" />
                            <div className="d-flex flex-column receiver-name">
                                <div className="text-truncate">{receiver.fullname}</div>
                                <div className="chat-name text-gray">Online</div>
                            </div>
                            <Dropdown toggle={toggle} isOpen={dropdownOpen}>
                                <DropdownToggle><FontAwesomeIcon icon={faBars} /></DropdownToggle>
                                <DropdownMenu id="dropdown-nav" end>
                                    <DropdownItem id="dropdown-item">Contact info</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="chat-message h-100 px-2 d-flex flex-column-reverse">
                            {
                                listChat.map((e, i) => (
                                    <div key={i}>
                                        {
                                            e.senderid === sender.id_user ? (
                                                <div className="d-flex align-items-end">
                                                    <img className="rounded-circle" src={`${process.env.REACT_APP_BACKEND_URL}/${e.senderimg}`} width={40} height={40} alt="" />
                                                    <div className="chat-sender bg-blue text-white">
                                                        {e.content}
                                                    </div>
                                                    <div className="text-gray pb-1" id="chat-time">{e.date_time.slice(11, 16)}</div>
                                                </div>
                                            ) : (
                                                <div className="d-flex justify-content-end align-items-end">
                                                    <div className="text-gray pb-1" id="chat-time">{e.date_time.slice(11, 16)}</div>
                                                    {
                                                        e.type === 0 ? (
                                                            <div className="chat-receiver bg-white">
                                                                {e.content}
                                                            </div>
                                                        ) : (
                                                            <div className="chat-receiver bg-white">
                                                                <img src={`${process.env.REACT_APP_BACKEND_URL}/${e.content}`} width={60} height={60} alt="" />
                                                            </div>
                                                        )
                                                    }
                                                    <img className="rounded-circle" src={`${process.env.REACT_APP_BACKEND_URL}/${e.senderimg}`} width={40} height={40} alt="" />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <form onSubmit={(e) => submitText(e)}>
                            <div className="bg-white d-flex flex-row receiver-header align-items-center px-5">
                                <div className="bg-gray w-100 send-message d-flex justify-content-between align-items-center">
                                    <textarea onChange={(e) => setMsg(e.target.value)} value={msg} type="text" placeholder="Type your message..." className="mx-2 border-0 bg-gray overflow-auto" id="send-message" />
                                    <div className="d-flex">
                                        <button type="submit" className="btn "><FontAwesomeIcon icon={faArrowRight} /></button>
                                        <Dropdown toggle={toggleFile} isOpen={fileOpen}>
                                            <DropdownToggle><FontAwesomeIcon icon={faPlus} /></DropdownToggle>
                                            <DropdownMenu id="dropdown-nav">
                                                    <DropdownItem id="dropdown-item">
                                                        <input type="file" />
                                                    </DropdownItem>
                                                    <DropdownItem id="dropdown-item">
                                                        {/* <button type="submit" className="border-0 bg-blue text-white" form="send-image">Send Image</button> */}
                                                    </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <button type="button" className="btn "><FontAwesomeIcon icon={faFaceSurprise} /></button>
                                        <button type="button" className="btn "><FontAwesomeIcon icon={faCameraRetro} /></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">Please select a chat to start messaging</div>
                )
            }
        </div>
    )
}