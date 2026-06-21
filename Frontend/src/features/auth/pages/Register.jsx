import {Link } from "react-router";

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor='Username'>Username</label>
                        <input type='text' id='Username' name='username' placeholder='Enter Username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Enter Email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already Have an Account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register