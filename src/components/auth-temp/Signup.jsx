import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../features/authActions.js";
import { Lock, Mail, User } from "lucide-react";
import { AuthContainer, Input } from "./index.js";
import { Button } from "./index.js";


const Signup = ({loginFn}) => {
  const {register, handleSubmit, formState : {errors}} = useForm()

  return (
    <AuthContainer title="Create Your Grupio">
      <form className="space-y-6" onSubmit={handleSubmit(signUp)}>
        <Input
          type="text"
          label="Full Name"
          name="name"
          placeholder="Enter your Full Name"
          id="name"
          Icon={User}
          error={errors}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            maxLength: {
              value: 20,
              message: "Name must be less than 20 characters",
            },
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message:
                "Name can only contain letters, spaces, hyphens, and apostrophes",
            },
          })}
        />
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
        <Button
          className="w-full"
          type="submit"
          buttonStyle={"manual"}
          aria-lable="create account with email"
        >
          Sign up
        </Button>
      </form>
      <div>
        <span></span>
        <Button onClick={() => loginFn("login")} size={"sm"} buttonStyle={"ghost"}>Click to log in</Button>
      </div>
    </AuthContainer>
  );
};

export default Signup;

