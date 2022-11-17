import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faAngleRight, faBell, faChartLine, faLock, faMessage, faMobileScreen, faPencil } from "@fortawesome/free-solid-svg-icons";
import { updateUser, updateUserImg } from "../redux/action/user";

export default function Profile() {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.user);
    const user = data.user;

    const [toggleEdit, setToggleEdit] = useState(false);
    const [form, setForm] = useState({
        id_user: user.id_user,
        fullname: null,
        username: null,
        phone: null,
        bio: null,
    })

    const [image, setImage] = useState(null);

    const edit = () => {
        setToggleEdit((prevstate) => !prevstate)
    }

    const submitEdit = (e) => {
        e.preventDefault();

        if(image) {
            let data = new FormData();
            data.append('image', image);

            const handleSuccess = (data) => {
                console.log(data);
            }
            dispatch(updateUserImg(form.id_user, data, handleSuccess))
        }

        const handleSuccess = (data) => {
            alert(data.message)
        }
        dispatch(updateUser(form, handleSuccess));

        edit();
    }

    return(
        <div className="d-flex flex-column">
            <div className="d-flex flex-column my-4 align-items-center">
                <img src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`} height={100} width={100} className="rounded-circle mb-2" />
                <h4><b>{user.fullname}</b></h4>
                <div>{user.username || "- no username -"}</div>
            </div>
            <div className="d-flex flex-column">
                <h5><b>Account</b></h5>
                <div className="ml-1 mb-3">
                    <label>Phone Number</label>
                    <div>{user.phone || "- no phone number -"}</div>
                </div>
                <div className="ml-1 mb-3">
                    <label>Bio</label>
                    <div>{user.bio || "- no bio set -"}</div>
                </div>
            </div>
            <form onSubmit={submitEdit}>
                <div className="flex-column" style={{display: toggleEdit ? 'flex' : 'none'}}>
                    <h5><b>Edit Account</b></h5>
                    <div className="ml-1 mb-3">
                        <label>Name</label>
                        <input onChange={(e) => setForm({...form, fullname: e.target.value})} type={"text"} className="w-100 p-2 border-bottom-1 border-top-0 border-left-0 border-right-0" placeholder="Name" defaultValue={user.fullname} />
                    </div>
                    <div className="ml-1 mb-3">
                        <label>Username</label>
                        <input onChange={(e) => setForm({...form, username: e.target.value})} type={"text"} className="w-100 p-2 border-bottom-1 border-top-0 border-left-0 border-right-0" placeholder="Username" defaultValue={user.username} />
                    </div>
                    <div className="ml-1 mb-3">
                        <label>Phone Number</label>
                        <input onChange={(e) => setForm({...form, phone: e.target.value})} type={"text"} className="w-100 p-2 border-bottom-1 border-top-0 border-left-0 border-right-0" placeholder="Phone number" defaultValue={user.phone} />
                    </div>
                    <div className="ml-1 mb-3">
                        <label>Bio</label>
                        <input onChange={(e) => setForm({...form, bio: e.target.value})} type={"text"} className="w-100 p-2 border-bottom-1 border-top-0 border-left-0 border-right-0" placeholder="Bio" defaultValue={user.bio} />
                    </div>
                    <div className="ml-1 mb-3">
                        <label>Change Photo Profile</label>
                        <input onChange={(e) => setImage(e.target.files[0])} type={"file"} className="w-100 p-2 border-bottom-1 border-top-0 border-left-0 border-right-0" />
                    </div>
                    <button type="submit" className="btn bg-blue text-white my-1">Change</button>
                    <button type="button" className="btn bg-blue text-white my-1" onClick={edit}>Cancel</button>
                </div>
            </form>
            <div className="flex-column" style={{display: !toggleEdit ? 'flex' : 'none'}}>
                <h5><b>Settings</b></h5>
                <div className="d-flex flex-row w-100 justify-content-between align-items-center text-blue pointer py-2" onClick={edit}>
                    <FontAwesomeIcon icon={faPencil} />
                    <div className="text-truncate">Edit Account</div>
                    <div className="align-self-end"><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-between align-items-center text-blue pointer py-2">
                    <FontAwesomeIcon icon={faBell} />
                    <div className="text-truncate">Notification and Sounds</div>
                    <div className="align-self-end"><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-between align-items-center text-blue pointer py-2">
                    <FontAwesomeIcon icon={faLock} />
                    <div className="text-truncate">Privacy and Security</div>
                    <div className="align-self-end"><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-between align-items-center text-blue pointer py-2">
                    <FontAwesomeIcon icon={faChartLine} />
                    <div className="text-truncate">Data and Storage</div>
                    <div className="align-self-end"><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-between align-items-center text-blue pointer py-2">
                    <FontAwesomeIcon icon={faMessage} />
                    <div className="text-truncate">Chat Settings</div>
                    <div className="align-self-end"><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-between align-items-center text-blue pointer py-2">
                    <FontAwesomeIcon icon={faMobileScreen} />
                    <div className="text-truncate">Devices</div>
                    <div className="align-self-end"><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
            </div>
        </div>
    )
}