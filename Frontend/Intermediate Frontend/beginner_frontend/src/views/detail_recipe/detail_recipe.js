import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../component/Footer";
import { deleteRecipe, getRecipe } from "../../redux/action/recipe";

const DetRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [queryParam] = useSearchParams();
    const dataFetched = useRef(false);

    const titleSearch = queryParam.get('title');
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState('');
    const [ingred, setIngred] = useState([]);
    const [image, setImage] = useState('');

    const onUpdate = () => {
        return navigate(`/detailrecipe/${title}`)
    }

    const onDelete = () => {
        const handleSuccess = (data) => {
            console.log(data.data);

            if(data.data.status !== "success"){
                alert(data.data.message);
            }else {
                alert(`resep ${title} telah dihapus`);
                return navigate('/');
            }
        }

        dispatch(deleteRecipe(title, token, handleSuccess));
    }

    // mount
    useEffect(() => {
        if(dataFetched.current) return;
        dataFetched.current = true;

        const handleSuccess = (data) => {
            setTitle(data.data.data[0].title);
            setIngred(data.data.data[0].ingredient.split(","));
            setImage(data.data.data[0].image);
        }

        dispatch(getRecipe(titleSearch, token, handleSuccess));
    }, [])

    return(
        <>
        <div className="container-fluid">
            <nav className="navbar">
                <div className="main-menu full">
                    <ul>
                        <li>
                            <Link to="/" className="currentPage">Home</Link>
                        </li>
                        <li>
                            <Link to="/addrecipe">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="recipe-title">
                <div className="title-r">
                    <h3>{title}</h3>
                </div>
                <div   
                    className="image-r rounded-4" 
                    style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${image}')`}}>
                    <div className="save-button rounded-4">
                        <i className="fa fa-bookmark"></i>
                    </div>
                    <div className="like-button rounded-4">
                        <i className="fa fa-thumbs-up"></i>
                    </div>
                </div>
                <div className="d-flex gap-4">
                    <button className="btn btn-primary" onClick={() => onUpdate()}>Update</button>
                    <button className="btn btn-primary" style={{backgroundColor: 'red'}} onClick={() => onDelete()}>Delete</button>
                </div>
            </div>
        </div>
        <div className="ingredient-container">
            <div className="ingredient-list">
                <h4>Ingredients</h4>
                <ul>
                    {ingred.map((item, index) => {
                        // console.log("index" + index + " item" + item);
                        return (<li key={index}>{item}</li>);
                    })}
                    {/* <li>{ingred[0]}</li>
                    <li>{ingred[1]}</li>
                    <li>{ingred[2]}</li>
                    <li>{ingred[3]}</li> */}
                    {/* {listItem} */}
                </ul>
            </div>
        </div>
        <div className="vid-step-container">
            <div className="vid-step">
                <h4>Video Step</h4>
                <div className="vid">
                    <Link to="/detailvideo" className="btn btn-primary"><i className="fa fa-play"></i></Link>
                </div>
                <div className="vid">
                    <Link to="/detailvideo" className="btn btn-primary"><i className="fa fa-play"></i></Link>
                </div>
                <div className="vid">
                    <Link to="/detailvideo" className="btn btn-primary"><i className="fa fa-play"></i></Link>
                </div>
                <div className="vid">
                    <Link to="/detailvideo" className="btn btn-primary"><i className="fa fa-play"></i></Link>
                </div>
            </div>
        </div>
        <div className="comment-container">
            <div className="comment">
                <div className="comment-box">
                    <textarea className="rounded-3" placeholder="Comment :"></textarea>
                    <div className="vid">
                        <a className="btn btn-primary" type="submit">Send</a>
                    </div>
                </div>
                <div className="comment-list">
                    <h4>Comment</h4>
                    <div className="user-comment">
                        <div className="user-img rounded-circle"></div>
                        <div className="comment-content">
                            <h6>Ayudia</h6>
                            <p>Nice Recipe, Simple And Delicious, Thankyou</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default DetRecipe;