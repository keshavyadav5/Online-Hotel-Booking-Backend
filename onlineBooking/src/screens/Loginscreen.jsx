import React, { useState } from 'react';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import axios from 'axios';

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function login() {
    const user = { email, password };

    try {
      setLoading(true);
      const result = await axios.post('http://localhost:3000/api/users/login', user);
      console.log(result);
      setLoading(false);

      localStorage.setItem('currentuser', JSON.stringify(result))
      window.location.href='/home'

    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div>
      {/* {loading && <Loading />} */}
      {error && <Error  message= "Invalid email or password"/>}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className='bs m-5'>
            <h2>Login</h2>
            <input type="email" className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='btn btn-primary mt-3' onClick={login}>Login</button>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
