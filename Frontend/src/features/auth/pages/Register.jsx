import { useState } from "react";
import {Link, useNavigate } from "react-router";
import { useAuth } from '../hooks/useAuth';
const Register = () => {
    const navigate=useNavigate();
    const {loading,handleRegister}=useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({username,email,password});
        navigate("/")
    }
    if(loading){
        return (<main><h1>Loading.....</h1></main>)
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor='Username'>Username</label>
                        <input onChange={(e)=>setUsername(e.target.value)}
                         type='text' id='Username' value={username} name='username' placeholder='Enter Username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor='email'>Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                         type='email' id='email' name='email' placeholder='Enter Email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'>Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                         type='password' id='password' name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already Have an Account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register