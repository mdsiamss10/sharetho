"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => {
        void signOut();
      }}
      className="btn btn-primary m-2"
    >
      LOGOUT
    </button>
  );
}

export default LogoutButton;
