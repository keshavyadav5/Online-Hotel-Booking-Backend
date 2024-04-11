import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import Sucess from '../Components/Sucess'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState();

  const [error, setError] = useState();

  async function register() {
    setError(""); // Reset error state
    if (password === cpassword) {
      setLoading(true);
      const user = { name, email, password };
      setLoading(false);
      setSucess(true);
      try {
        const result = await axios.post('http://localhost:3000/api/users/register', user);

        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
      } catch (error) {
        setError("Registration failed. Please try again.");
        console.error("Registration error:", error);
        setLoading(false);
        setError(true);
      }
    } else {
      setError("Passwords do not match");
    }
  }

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className='bs m-5'>
            {sucess && <Sucess message='registration success' />}
            <h2>Register</h2>
            <input type="text" className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" className='form-control' placeholder='Confirm Password' value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
            {error && <div className="alert alert-danger mt-2">{error}</div>} {/* Display error message if present */}
            <button className='btn btn-primary mt-3' onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
