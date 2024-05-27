import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {

	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const URL = 'login'

    function handleSubmit() {
        fetch('https://urban-spoon-q7vv7x4wvvxqc9xrv-3001.app.github.dev/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: email,
              password: password,
          }),
        })
        .then(response => {
            if (response.ok) { // 
                return response.json(); // Parse response body as JSON
            } else {
                throw new Error('Failed to log in'); // Throw error if response is not successful
            }
        })
        .then(data => {
            // Check if a specific response is returned from the server
            if (data && data.success === true) {
                sessionStorage.setItem('jwtToken', data.access_token);
                window.location.href = "/private"; // Redirect to private page
            } else {
                console.log(data)
                throw new Error(data[0].error); // Throw error if unexpected response
            }
        })
        .catch(error => {
            console.error('Error:', error); // Handle error
        });
      };

	return (
		<div className="text-center mt-5">
			<div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">email</span>
        </div>
        <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
          onChange={(e) => setEmail(e.target.value)} value={email}/>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">password</span>
        </div>
        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
          onChange={(e) => setPassword(e.target.value)} value={password}/>
      </div>
      <button onClick={handleSubmit} type="button" className="btn">submit</button>
		</div>
	);
};