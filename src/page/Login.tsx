import { FormEvent } from "react";

import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentTarget } = e;
    const data = new FormData(currentTarget);
    const auth = await login(
      data.get("user")!.toString(),
      data.get("password")!.toString(),
    );

    if (auth == false) 
      console.log("error");
  };

  return (
    <>
      <div className="antialiased bg-gray-900 border-gray-200 dark:bg-gray-900 font-sans">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">
              Login
            </span>
            <form className="mb-4" onSubmit={handleSubmit}>
              <div className="mb-4 md:w-full">
                <label htmlFor="user" className="block text-xs mb-1">
                  Username or Email
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="text"
                  name="user"
                  placeholder="Username or Email"
                />
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="password" className="block text-xs mb-1">
                  Password
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
