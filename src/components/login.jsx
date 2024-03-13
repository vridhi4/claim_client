import React, { useState } from 'react';
import signup_pic from "./assets/signup.png";
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ isAdmin }) => {
    const navigate = useNavigate();

    const [user_login, setUser_login] = useState({
        email: "",
        password: ""
    });

    const [Admin, SetAdmin] = useState({
        username: "",
        password: ""
    });

    const HandleInput = (e) => {
        console.log(isAdmin)
        const { name, value } = e.target;
        if (isAdmin) {
            SetAdmin(prevAdmin => ({
                ...prevAdmin,
                [name]: value
            }));
        } else {
            setUser_login(prevUserLogin => ({
                ...prevUserLogin,
                [name]: value
            }));
        }
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isAdmin) {
                response = await fetch('https://claim-server.onrender.com/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Admin)
                });
            } else {
                response = await fetch('https://claim-server.onrender.com/customer/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user_login)
                });
            }

            if (response.ok) {
                const data = await response.json();
                const { status, token } = data;
                if (status === "Success") {
                    if (isAdmin) {
                        localStorage.setItem('admin_token', token); // Store admin token
                        navigate('/AdminDashboard');
                    } else {
                        localStorage.setItem('token', token); // Store regular user token
                        navigate('/dashboard');
                    }
                }
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <section className='signup'>
                <div className='container mt-5'>
                    <div className='signup-content'>
                        <div className='signup-form'>
                            <h2 className='form-title'>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
                            <form className='registration-form' id='registration-form' onSubmit={HandleSubmit}>
                                {isAdmin ? (
                                    <>
                                        <div className='form-group'>
                                            <label htmlFor="username">Username</label>
                                            <input type="text" name="username" id='Username' autoComplete='off' placeholder='Your Username'
                                                value={Admin.username}
                                                onChange={HandleInput} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="Password">Password</label>
                                            <input type="password" name="password" id='Password' autoComplete='off' placeholder='Your Password'
                                                value={Admin.password}
                                                onChange={HandleInput} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='form-group'>
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" id='email' autoComplete='off' placeholder='Your Email'
                                                value={user_login.email}
                                                onChange={HandleInput} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" id='password' autoComplete='off' placeholder='Your Password'
                                                value={user_login.password}
                                                onChange={HandleInput} />
                                        </div>
                                    </>
                                )}
                                <div className='form-group form-button'>
                                    <input type="submit" name='login' id='login' className='form-submit' value="Login" />
                                </div>
                            </form>
                            {isAdmin && (
                                <div className='back-login'>
                                    <span onClick={() => navigate('/register')}>SignUp</span>
                                    <span onClick={() => navigate('/login')}>Login</span>
                                </div>
                            )}
                            {!isAdmin && ( // Render only if it's user login
                                <div className='login-admin'>
                                    <span onClick={() => navigate('/adminLogin')}>Login as admin</span>
                                    <span onClick={() => navigate('/register')}>SignUp</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
