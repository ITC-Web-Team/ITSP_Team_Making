"use client";

const NEXT_PUBLIC_PROJECT_ID  = process.env.NEXT_PUBLIC_PROJECT_ID ;

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = 
      "http://sso.tech-iitb.org/project/7eb1de06-b2db-4a1f-8dce-6f6ea1b608ad/ssocall/"
;
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