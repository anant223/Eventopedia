import AuthPage from "@/auth/AuthPage";
import useWarmupServer from "@/hooks/useWarmupServer";
import React from "react"

const Auth = () => {
  const backendHealthUrl = `${import.meta.VITE_API_BASE_URL}/api/v1/health`;
  const {isWakingUp} = useWarmupServer(backendHealthUrl);

  return (
    <div className="relative">
      {isWakingUp && (
        <div className="absolute top-4 right-4 text-xs text-muted-foreground animate-pulse">
          Connecting to secure server...
        </div>
      )}
      <AuthPage />
    </div>
  );
};
export default Auth;


// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import {Signup, Login} from "../components/auth-temp/index.js"
// import { AnimatePresence, motion } from "framer-motion";
// import useAuth from "@/hooks/useAuth.js";
// const Auth = () => {
//   const [type, setType] = React.useState("login");
//   const {createAccount, createSession, loading} = useAuth()


//   return (
//     <div className="min-h-screen bg-[#0a0f1a] text-white font-sans pt-32 sm:pt-40 pb-4">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
//       </div>
//       <div className="mx-auto relative container px-4 sm:px-6 lg:px-8 sm:text-center">
//         <div className="max-w-sm mx-auto">
//           <AnimatePresence mode="wait">
//             {type === "login" ? (
//               <motion.div
//                 key="login"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Login signupFn={() => setType("signup")} loginFn ={createSession} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="signup"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Signup loginFn={() => setType("login")} signupFn={createAccount} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;