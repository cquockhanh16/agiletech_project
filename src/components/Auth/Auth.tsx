import React, { useState, useRef } from "react";
import "./Auth.css";
import { AuthResponse } from "../../interface/authResponse";
import logo from "../../shared/Images/logo.png";
import { signin } from "../../services/apiServices";
import { saveTokens } from "../../services/apiServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginProps {
  onLogin: () => void;
}

const Auth: React.FC<LoginProps> = ({ onLogin }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      try {
        let username = inputRef.current.value.trim();
        const res: AuthResponse = await signin("/auth/login", username);
        if (res) {
          localStorage.setItem("isAuthenticated", "true");
          saveTokens(res);
          onLogin();
          navigate("/");
          toast.success("Login success!!");
          return;
        } else {
        }
      } catch (error) {
        toast.error("Login unsuccess!!");
        console.log(error);
        setError(error);
      }
    } else {
      setError("Not get value in input");
      console.log(error);
    }
  };
  return (
    <nav>
      <div className='container'>
        <div className='nav-auth'>
          <div>
            <Link to={"/"}>
              <img src={logo} alt='logo' />
            </Link>
          </div>
        </div>
        <div className='form'>
          <h1>Sign In</h1>
          <form onSubmit={loginHandler}>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' ref={inputRef} />
            <button type='submit'>Sign in</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Auth;
