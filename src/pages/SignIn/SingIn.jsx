import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdPerson } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { login } from "../../redux/services/Api";
import {setToken, setUser, setRole} from "../../redux/features/userSlice";
import "./SignIn.css"

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit =  async () => {
        const {userName,password} = formData;
        const requestInfo = {
            "userName": userName,
            "password": password
          }
        
    
         if (!password.trim()) {
            setErrorMessage("Password is required");
            return;
        }
    

        await login(requestInfo).then(response => {
           
            if (response.data != null){
                dispatch(setToken(response.data));
                dispatch(setUser(userName));
            }
           
        });
        // thay thế tìm kiếm role của user sau
        const fakeRole = {
            "role": "Patient"
        };
        dispatch(setRole(fakeRole));


        
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
                    <input type="email" placeholder="Email" name="email" value={formData.userName} onChange={handleInputChange}/>
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