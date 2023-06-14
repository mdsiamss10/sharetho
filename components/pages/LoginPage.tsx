"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

function LoginPage() {
  return (
    <div className="h-[100dvh] px-1 text-white flex flex-col items-center justify-center">
      <div>
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-extrabold leading-snug font-space text-5xl md:text-7xl lg:text-9xl mb-2 md:mb-6 text-center"
        >
          Live a life.
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="font-bold font-space text-xl text-white/85 md:text-2xl text-center"
        >
          By sharing your thoughts.
        </motion.h2>
      </div>
      {/* Login Button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-7 md:mt-8 lg:mt-10 btn btn-primary rounded-full"
        onClick={() => {
          void signIn("auth0");
        }}
      >
        SHARE NOW!
      </motion.div>
    </div>
  );
}

export default LoginPage;
