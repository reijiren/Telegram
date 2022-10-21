import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import { getRecipe } from "../../redux/action/recipe";
import { getUser } from "../../redux/action/user";

const Home = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const name = JSON.parse(localStorage.getItem('name'));
    const email = JSON.parse(localStorage.getItem('email'));

    const [form, setForm] = useState({
        title: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);

        if(form.title !== ""){
            const handleSuccess = (data) => {
                if(data.data.data == ""){
                    alert("Resep tidak ditemukan")
                }else{
                    return navigate(`/recipe?title=${form.title}&sort=title&page=1&asc=asc`)
                }
            }

            dispatch(getRecipe(form.title, token, handleSuccess));
        }
    }

    useEffect(() => {
        if(token !== null){
            dispatch(getUser(email, token));
        }
    }, [])

    return (
        <>
        <div className="landing-body">
            <div className="container-fluid">
                <nav className="navbar">
                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to="#" className="currentPage">Home</Link>
                            </li>
                            <li>
                                <Link to="/addrecipe">Add Recipe</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="login-menu">
                        <ul>
                            <li>
                                <Link to="/login" className="login">
                                    <div className="icon"><i className="far fa-user"></i></div>
                                    {!token ? (<div>Login</div>) : (<div>{name}</div>)}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <section className="hero">
                    <div className="content">
                        <div className="jumbroton">
                            <form onSubmit={(e) => onSubmit(e)}>
                                <h1>Discover Recipe & Delicious Food</h1>
                                <div className="form-group">
                                    <i className="fa fa-search"></i>   
                                    <input type="search" className="form-control rounded" placeholder="Search Recipe" width="400px" height="100px" onChange={(e) => setForm({...form, title: e.target.value})} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="food-image">
                        <img src={require(`../../assets/img/seledri.png`)} style={{top: '50px', right: '50px'}} />
                        <img src={require(`../../assets/img/—Pngtree—delicious food_568171 1.png`)} />
                    </div>
                </section>
            </div>
            <div className="container-fluid">
                <div className="popular">
                    <div className="yellow-line"></div>
                    <div className="title"><h2>Popular For You !</h2></div>
                </div>
                <div className="popular-content">
                    <div className="bg-image1 rounded">
                        <h4>Pizza Lamoa</h4>
                    </div>
                    <div className="bg-image2 rounded">
                        <h4>King Burger</h4>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="new-recipe">
                    <div className="yellow-line"></div>
                    <div className="title"><h2>New Recipe</h2></div>
                </div>
                <div className="new-recipe-content">
                    <div className="yellow-bg"></div>
                    <div className="nr-image rounded"></div>
                    <div className="new-rec-desc">
                        <div>
                            <h3>Healthy Bone Broth Ramen (Quick & Easy)</h3>
                        </div>
                        <div className="nr-line"></div>
                        <div>
                            <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                        </div>
                        <div>
                            <Link to="/detailrecipe?title=ayam geprek" className="btn btn-primary">Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="popular-rec">
                    <div className="yellow-line"></div>
                    <div className="title"><h2>Popular Recipe</h2></div>
                </div>
                <div className="popular-recipe-content">
                    <div className="d-flex justify-content-between">
                        <div className="pr-image11 rounded">
                            <h4>Chiken <br/>Kare</h4>
                        </div>
                        <div className="pr-image12 rounded">
                            <h4>Bomb <br/>Chicken</h4>
                        </div>
                        <div className="pr-image13 rounded">
                            <h4>Banana Smothie Pop</h4>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="pr-image21 rounded">
                            <h4>Coffe Lava Cake</h4>
                        </div>
                        <div className="pr-image22 rounded">
                            <h4>Sugar <br/>Salmon</h4>
                        </div>
                        <div className="pr-image23 rounded">
                            <h4>Indian <br />Salad</h4>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Home;