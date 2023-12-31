import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ToastContainer } from "react-toastify";
import "./globals.css";

import LeftSide from "@/components/LeftSide";
import MiddleNavTop from "@/components/MiddleNavTop";
import LoginPage from "@/components/pages/LoginPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "ShareTho",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <QueryProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            {!session ? (
              <LoginPage />
            ) : (
              <>
                <div className="text-white container mx-auto min-h-[100dvh] max-h-[100dvh] flex">
                  {/* Left Side */}
                  <div className="flex-1 flex flex-col items-end mr-3 md:items-center md:mr-0 sticky top-0">
                    <LeftSide />
                  </div>
                  {/* Middle Side */}
                  <div className="border-x border-gray-600 flex-[4] md:flex-[2] overflow-auto no-scrollbar">
                    <MiddleNavTop />
                    {children}
                  </div>
                  {/* Right Side */}
                  <div className="md:flex-1"></div>
                </div>
              </>
            )}
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </body>
        </html>
      </AuthProvider>
    </QueryProvider>
  );
}
