"use client";

const NEXT_PUBLIC_PROJECT_ID  = process.env.NEXT_PUBLIC_PROJECT_ID ;

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = 
      `https://sso.tech-iitb.org/project/${NEXT_PUBLIC_PROJECT_ID }/ssocall/`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
    >
      Login with SSO
    </button>
  );
}