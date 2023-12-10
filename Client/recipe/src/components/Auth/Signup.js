import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from './Auth.service';

export const Signup = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const cpassword = e.target.elements.cpassword.value;
        const email = e.target.elements.email.value;
        const firstname = e.target.elements.firstname.value;
        const lastname = e.target.elements.lastname.value;
        const gender = e.target.elements._gender.value;
        const isPrivate = e.target.elements.isPrivate.value === 'private';

        if (password !== cpassword) {
            toast.error("Password doesn't match with conform password");
            return;
        }
        console.log(username, password, email, firstname, lastname, gender, isPrivate)

        const signupResponse = await AuthService.signup(
            username,
            password,
            email,
            firstname,
            lastname,
            gender,
            isPrivate
        );

        if (signupResponse.success) {
            
            toast.success('Account created successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        
            navigate('/login');
        } else {
            toast.error(signupResponse.message, {autoClose: 2000, theme: "colored"});
        }
    };


    return (
        <div className='container'>
            <h2 className='my-2 mt-2'> Create an Account to use Recipe Book</h2>
            <form onSubmit={handleSubmit} className='my-4'>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control my-1" id="username" name='username' aria-describedby="emailHelp" placeholder="Enter UserName" />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-1" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-1" id="password" name='password' placeholder="Password" minLength={5} required />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control my-1" id="cpassword" name='cpassword' placeholder="Confirm Password" minLength={5} required />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Firstname</label>
                    <input type="text" className="form-control my-1" id="firstname" name='firstname' aria-describedby="emailHelp" placeholder="Enter FirstName" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Lastname</label>
                    <input type="text" className="form-control my-1" id="lastname" name='lastname' aria-describedby="emailHelp" placeholder="Enter LastName" />
                </div>

                <label>Select Gender:</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="_gender" id="female" value="female" />
                    <label className="form-check-label" htmlFor="female">
                        Female
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="_gender" id="male" value="male" checked />
                    <label className="form-check-label" htmlFor="male">
                        Male
                    </label>
                </div>


                <label>Select Account type:</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="isPrivate" id="private" value="private" defaultChecked />
                    <label className="form-check-label" htmlFor="private">
                        Private
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="isPrivate" id="public" value="public" />
                    <label className="form-check-label" htmlFor="public">
                        Public
                    </label>
                </div>



                <button type="submit" className="btn btn-primary my-2">Signup</button>
            </form>
            <ToastContainer />

        </div>
    )
}
