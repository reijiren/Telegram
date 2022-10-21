import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../component/Footer";
import { getRecipe, updateImage, updateRecipe } from "../../redux/action/recipe";

const UpdateRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { title } = useParams();
    const token = localStorage.getItem('token');

    const [form, setForm] = useState({
        title: '',
        ingredient: '',
        image: '',
        changeImg: false,
    })

    const upImage = (e) => {
        e.preventDefault();

        let dataForm = new FormData();
        dataForm.append('image', form.image);

        const handleSuccess = (data) =>{
            console.log(data);
            alert('Gambar telah diubah');
        }

        dispatch(updateImage(dataForm, token, title, handleSuccess));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(form.title)

        if(form.title == '' || form.ingredient == ''){
            alert('Data harus lengkap');
        }else{
            const body = {
                title: form.title,
                ingredient: form.ingredient,
            }

            const handleSuccess = (data) =>{
                console.log(data);
                alert('Resep telah diubah');
                // return navigate('/');
            }

            dispatch(updateRecipe(body, token, title, handleSuccess));

            if(form.changeImg){
                upImage(e);
            }

            return navigate(`/detailrecipe?title=${form.title}`);
        }
        
    }

    // mount
    useEffect(() => {
        const handleSuccess = (data) => {
            setForm({
                ...form, 
                title: data.data.data[0].title, 
                ingredient: data.data.data[0].ingredient,
                image: data.data.data[0].image,
            });
        }

        dispatch(getRecipe(title, token, handleSuccess));
    }, [])

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
                            <Link to="#" className="currentPage">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="add-recipe-container">
            <div className="add-recipe-form">
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="add-photo rounded-2 bg-transparent">
                        {/* <i id="img" htmlFor="image" name="image" className="fa fa-image"></i>
                        <input onChange={(e) => {setForm({...form, image: e.target.files[0]})}} type="file" ref={hiddenFileInput} id="formFile" style={{ display: 'none' }} />
                        <p name="image" htmlFor="image" onClick={handleClick} id="img">
                            {form.image == '' ? 'Add Photo' : form.image.name}
                        </p> */}
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/recipes/${form.image}`} alt={`pic of ${form.title}`} width='200px' height='200px'/>
                        <input onChange={(e) => {setForm({...form, image: e.target.files[0], changeImg: true})}} type="file" id="formFile" style={{fontSize: '16px', height: '40px', width: '250px'}} />
                    </div>
                    <div className="add-title rounded-2">
                        <input type="text" placeholder="Title" onChange={(e) => setForm({...form, title: e.target.value})} defaultValue={form.title} required/>
                    </div>
                    <div className="add-ingredient rounded-2">
                        <textarea placeholder="Ingredients" onChange={(e) => setForm({...form, ingredient: e.target.value})} defaultValue={form.ingredient} required></textarea>
                    </div>
                    <div className="add-title rounded-2">
                        <input type="text" placeholder="Video"/>
                    </div>
                    <div className="post-new-recipe">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default UpdateRecipe;