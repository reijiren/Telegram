import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import Footer from "../../component/Footer";
import { changeImg, getUser } from "../../redux/action/user";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const name = JSON.parse(localStorage.getItem('name'));
    const email = JSON.parse(localStorage.getItem('email'));
    const hiddenFileInput = useRef(null);

    const token = localStorage.getItem('token');

    const user = useSelector((state) => {
        return state.user;
    })
    
    const [image, setImage] = useState(user.data.map((e) => {return e.image}));

    const [form, setForm] = useState({
        image: '',
    })

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    useEffect(() => {
        dispatch(getUser(email, token));

        // console.log(JSON.stringify(user));
        user.data.map((item) => 
            setForm({...form, image: item.image})
        )
    }, [image])

    const onSubmit = (e) => {
        e.preventDefault();

        let dataForm = new FormData();
        dataForm.append('image', image);

        setForm({...form, image: image.name});

        // console.log(dataForm);
        const handleSuccess = (data) => {
            console.log(data.data);

            window.location.reload(false);
        }

        dispatch(changeImg(dataForm, email, token, handleSuccess));
    }

    return(
        <>
        <div className="container-fluid h100">
            <nav className="navbar">
                <div className="main-menu full">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/addrecipe">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="#" className="currentPage">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="profile-container">
            <div className="profile-picture rounded-circle" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/profile/${form.image}')`}}>
                <button className="pencil-btn btn-primary" type="button" data-toggle="collapse" data-target="#edit-profile" aria-expanded="false" aria-controls="collapseExample"></button>
            </div>
            <div className="profile-name">
                {name}
            </div>
            <div className="collapse" id="edit-profile">
                <input onChange={(e) => {setImage(e.target.files[0])}} type="file" ref={hiddenFileInput} id="formFile" style={{ display: 'none' }} />
                <button className="btn btn-primary prof-btn cpp" id="img" onClick={handleClick}>Change Photo Profile</button>
                <button type="sumbit" className="btn btn-primary prof-btn" onClick={(e) => onSubmit(e)}>Ok</button>
                <Link to="/resetpassword" className="btn btn-primary prof-btn cp">Change Password</Link>
            </div>
        </div>
        <div className="recipe-container">
            <div className="recipe-panel-group" id="accordion">
                <div className="head-panel">
                    <a data-toggle="collapse" data-parent="#accordion" href="#my-collapse">My Recipe</a>
                    <a data-toggle="collapse" data-parent="#accordion" href="#s-collapse">Saved Recipe</a>
                    <a data-toggle="collapse" data-parent="#accordion" href="#l-collapse">Liked Recipe</a>
                    {/* <button className="my-btn">My Recipe</button>
                    <button className="s-btn">Saved Recipe</button>
                    <button className="l-btn">Liked Recipe</button> */}
                </div>
                <div className="content-panel collapse in" id="my-collapse">
                    <div className="profile-recipe-img m1 rounded-2">
                        <p>Bomb Chicken</p>
                    </div>
                    <div className="profile-recipe-img m2 rounded-2">
                        <p>Bananas Pancake</p>
                    </div>
                </div>
                <div className="content-panel collapse" id="s-collapse">
                    <div className="profile-recipe-img rounded-2 s1">
                        <p>Coffee Lava Cake</p>
                    </div>
                    <div className="profile-recipe-img rounded-2 s2">
                        <p>Chicken Kare</p>
                    </div>
                </div>
                <div className="content-panel collapse" id="l-collapse">
                    <div className="profile-recipe-img rounded-2 l1">
                        <p>Pizza Lamoa</p>
                    </div>
                    <div className="profile-recipe-img rounded-2 l2">
                        <p>Indian Salad</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />

        <script src="../../component/Collapse.js"></script>
        </>
    )
}

export default Profile;