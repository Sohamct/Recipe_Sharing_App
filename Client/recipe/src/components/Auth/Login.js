import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import AuthService from './Auth.service'


export const Login = () => {
    const notify = () => toast.success("Logged in successfully!", {autoClose: 2000, theme: "colored"});
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("working...")
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        console.log(username + password)
        try{
            const loginResponse = await AuthService.login(username, password)
            if(loginResponse.success){
                console.log(loginResponse.message)
                notify();
                navigate('/')
            }else{
                console.log(loginResponse.message)
                toast.error(loginResponse.message, {autoClose: 2000, theme: "colored"});
            }
        }catch(error){
            console.log(error.message || "Erjlkbagr")
        }
    }

    return (
        <div style={{ marginLeft: '4rem', marginTop: '2rem' }}>
            <h2 className='ml-3 my-3 mt-2'>Login To Continue Recipe Book</h2>
            <form onSubmit={handleClick}>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input
                        type="text"
                        className="form-control my-1"
                        id="username"
                        name='username'
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control my-1"
                        id="password"
                        name='password'
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary my-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
