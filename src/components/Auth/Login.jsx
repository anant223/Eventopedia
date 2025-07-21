import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch} from "react-redux";
import {useNavigate } from 'react-router-dom';
import { loginSession } from '../../features/authActions.js';
import { Lock, Mail} from 'lucide-react';
import { AuthContainer, Input } from './index.js';
import { Button } from './index.js';


const Login = ({signupFn}) => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState : {errors}} = useForm();
  const dispatch = useDispatch();
  
  const handleSession = (data) => {
    dispatch(loginSession(data, navigate));
  };

  return (
    <AuthContainer title="Sign In Your Account">
      <form onSubmit={handleSubmit(handleSession)} className="space-y-6">
        <Input
          type="email"
          label="Email address"
          name="email"
          placeholder="Enter your email"
          id="email"
          autoComplete="email"
          Icon={Mail}
          error={errors}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <div>
          <Input
            type="password"
            label="Enter password"
            name="password"
            placeholder="Enter your password"
            id="password"
            autoComplete="current-password"
            Icon={Lock}
            error={errors}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </div>
        <div>
          <Button
            type="submit"
            buttonStyle="manual"
            aria-lable="login with email"
          >
            Sign in
          </Button>
        </div>
      </form>
      <div>
        <Button onClick={() => signupFn("signup")} buttonStyle={"ghost"} size="sm">
          Create Grupio Account
        </Button>
      </div>
    </AuthContainer>
  );
}

export default Login


