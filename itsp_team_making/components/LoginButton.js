"use client";

const PROJECT_ID = process.env.PROJECT_ID;

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = 
      `https://sso.tech-iitb.org/project/${PROJECT_ID}/ssocall/`;
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