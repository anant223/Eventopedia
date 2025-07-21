import React from "react";
import { useSearchParams } from "react-router-dom";
import { Login, Signup } from "@/components/auth";

const Auth = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const type = searchParam.get("type");
  return (
    <div className=" min-h-screen bg-background text-text font-bricolage pt-24 pb-4">
      <div className=" absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      <div className="mx-auto relative container px-4 sm:px-6 lg:px-8 sm:text-center">
        <div className=" max-w-sm mx-auto">
          {type === "login" ? (
            <Login signupFn={() => setSearchParam({ type: "signup" })} />
          ) : (
            <Signup loginFn={() => setSearchParam({ type: "login" })} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
