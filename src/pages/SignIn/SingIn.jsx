import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import iconPassWord from "../assets/password.png"
import iconPerson from "../assets/person.png"
import "./SignIn.css"

const SignIn = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = () => {
        const {email,password} = formData;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordPattern = /^[a-zA-Z0-9]{3,16}$/;

        if (formData.email === "admin" && formData.password === "123") {
            navigate("/home");
        } 

        else if (!email.trim()) {
            setErrorMessage("Email is required");
            return;
        }
        else if (!emailPattern.test(email)) {
            setErrorMessage("Invalid email format");
            return;
        }
    
        else if (!password.trim()) {
            setErrorMessage("Password is required");
            return;
        }
    
        else if (!passwordPattern.test(password)) {
            setErrorMessage("Password must be 3-16 characters");
            return;
        }
        else {
            setErrorMessage("Invalid email or password");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return(
        <div className="container">
            <div className="header">
                <div className="text">Sign In</div>
                <div className="underline"> </div>
            </div>

            <div className="inputs">
                <div className="input">
                    <img src={iconPerson} alt="" />
                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange}/>
                </div>

                <div className="input">
                    <img src={iconPassWord} alt="" />
                    <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange}/>
                </div>
            </div>

            {/* <div className="forgot-password">Lost Password? <span>Click Here!</span></div> */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="submit-container">
                <div className="submit" onClick={handleSubmit}>Login</div>

            </div>
        </div>
        
    )
};
export default SignIn;