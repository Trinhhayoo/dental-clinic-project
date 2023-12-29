import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdPerson } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { login } from "../../redux/services/Api";
import {setToken} from "../../redux/features/userSlice";
import "./SignIn.css"

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit =  async () => {
        const {email,password} = formData;
        const requestInfo = {
            "userName": email,
            "password": password
          }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordPattern = /^[a-zA-Z0-9]{3,16}$/;

        if (!email.trim()) {
            setErrorMessage("Email is required");
            return;
        }
        
    
         if (!password.trim()) {
            setErrorMessage("Password is required");
            return;
        }
    
        //  if (!passwordPattern.test(password)) {
        //     setErrorMessage("Password must be 3-16 characters");
        //     return;
        // }
        // else {
        //     setErrorMessage("Invalid email or password");
        // }
        debugger

        await login(requestInfo).then(response => {
            dispatch(setToken(response.data));
            if (response.data != null){
                navigate("/Employee");
            }
           
        })

        
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

            <div className="inputs  ">
                <div className="input gap-2 px-2">
                    <IoMdPerson className="text-gray-500" size={30} />
                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange}/>
                </div>

                <div className="input gap-2 px-2">
                   <RiLockPasswordFill className="text-gray-500" size={30}/>
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