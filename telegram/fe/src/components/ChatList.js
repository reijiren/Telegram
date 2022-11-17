import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAngleLeft, faBookmark, faCog, faMagnifyingGlass, faPhone, faQuestionCircle, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { allChat, reset } from "../redux/action/chat";
import { findUser, selectReceiver } from "../redux/action/user";
import Profile from "./Profile";

export default function ChatList() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [profile, setProfile] = useState(false);

    const toggleProfile = () => {
        setProfile((prevstate) => !prevstate);
    }

    const dispatch = useDispatch();
    const data = useSelector((state) => state.user);
    const user = data.user;

    const [listChat, setListChat] = useState([]);
    const [listContact, setListContact] = useState([]);
    const [searchContact, setSearchContact] = useState('');
    const [search, setSearch] = useState(false);

    const select = (e) => {
        dispatch(reset());
        dispatch(selectReceiver(e.userid || e.id_user))
    }

    const onSearchContact = (e) => {
        e.preventDefault();

        if(searchContact === ''){
            setSearch(false);
        }else{
            setSearch(true);

            const body = {
                name: searchContact,
                id: user.id_user
            }

            const handleSuccess = (data) => {
                setListContact(data.data);
            }
            dispatch(findUser(body, handleSuccess));
        }
    }

    useEffect(() => {
        if(user){
            const handleSuccess = (data) => {
                setListChat(data.data)
            }
            dispatch(allChat(user.id_user, handleSuccess))
        }
    }, [])

    return (
        <div>
            <div className="chat-list bg-white px-3 pb-2 pt-3" style={{display: profile && 'none'}}>
                <div className="d-flex flex-row justify-content-between align-items-center text-blue">
                    <h3><b>Telegram</b></h3>
                    <Dropdown toggle={toggle} isOpen={dropdownOpen}>
                        <DropdownToggle><FontAwesomeIcon icon={faAlignLeft} /></DropdownToggle>
                        <DropdownMenu id="dropdown-nav" end>
                            <DropdownItem id="dropdown-item" onClick={toggleProfile}><FontAwesomeIcon icon={faCog} />Settings</DropdownItem>
                            <DropdownItem id="dropdown-item"><FontAwesomeIcon icon={faUser} />Contacts</DropdownItem>
                            <DropdownItem id="dropdown-item"><FontAwesomeIcon icon={faPhone} />Calls</DropdownItem>
                            <DropdownItem id="dropdown-item"><FontAwesomeIcon icon={faBookmark} />Save Messages</DropdownItem>
                            <DropdownItem id="dropdown-item"><FontAwesomeIcon icon={faUserPlus} />Invite Friends</DropdownItem>
                            <DropdownItem id="dropdown-item"><FontAwesomeIcon icon={faQuestionCircle} />Telegram FAQ</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <form onSubmit={(e) => onSearchContact(e)}>
                    <div className="d-flex align-items-center bg-gray search-contact rounded-2 w-100 px-3 py-2 my-3">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" onChange={(e) => setSearchContact(e.target.value)} placeholder="Search or start a new chat" className="mx-2 border-0 bg-gray" id="search-contact" />
                    </div>
                </form>
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <button className="border-0 bg-white target" id="chat-type">All</button>
                    <button className="border-0 bg-white target" id="chat-type">Important</button>
                    <button className="border-0 bg-white target" id="chat-type">Unread</button>
                </div>
                <div className="bg-white chat-contact">
                    {
                        search ? 
                        listContact.length === 0 ? (
                            <div className="text-center">No user found</div>
                        ) :
                        listContact.map((e, i) => (
                            <div key={i} onClick={() => select(e)} className="d-flex flex-row align-items-center py-1 px-1" id="chat">
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/${e.image}`} className="rounded-circle img-fit mr-3" width={50} height={50} alt="" />
                                <div className="d-flex flex-column justify-content-between chat-info">
                                    <div className="chat-name mb-1">{e.fullname}</div>
                                </div>
                            </div>
                        )) :
                        listChat.length !== 0 ? 
                        listChat.sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0)).map((e, i) => (
                            <div key={i} onClick={() => select(e)} className="d-flex flex-row justify-content-between align-items-center py-1 px-1" id="chat">
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/${e.image}`} className="rounded-circle img-fit" width={50} height={50} alt="" />
                                <div className="d-flex flex-column justify-content-between chat-info">
                                    <div className="chat-name mb-1"><b>{e.name}</b></div>
                                    <div className="chat-name text-truncate">{e.chat_sender == user.id_user && 'Me: '}{e.content}</div>
                                </div>
                                <div className="d-flex flex-column align-items-end justify-content-between">
                                    <div className="text-gray chat-time mb-2">{e.date_time.slice(11, 16)}</div>
                                    <div className="bg-blue text-center text-white chat-in text-truncate">999</div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center">Start a new chat...</div>
                        )
                    }
                </div>
            </div>
            <div className="chat-list bg-white px-3 pb-2 pt-3 overflow-auto" style={{display: !profile && 'none'}}>
                <div className="d-flex flex-row justify-content-between align-items-center text-blue">
                    <div className="text-blue pointer" onClick={toggleProfile}><FontAwesomeIcon icon={faAngleLeft} /></div>
                    <h5 className="text-blue m-0"><b>{user.username || user.fullname}</b></h5>
                    <div></div>
                </div>
                <Profile />
            </div>
        </div>
    )
}