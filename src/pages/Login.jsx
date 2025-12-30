// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginApi, registerApi } from "../api/api";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Login"); // default to Login
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (currentState === "Sign Up") {
//       try {
//         const response = await registerApi({ name, email, password });
//         const { token, user } = response.data;

//         localStorage.clear();

//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));

//         toast.success("Register Successfull")
//         navigate("/");

//       } catch (error) {
//         toast.error(error.response?.data?.message || "Login failed. Please try again.");
//         console.error("Login Error:", error);
//       }
//       setCurrentState("Login");
//       setName("");
//       setEmail("");
//       setPassword("");

//     } else {
//       try {
//         const response = await loginApi({ email, password });
//         const { token, user } = response.data;
//         localStorage.clear();

//         // Save token
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));

//         toast.success("Login Successfull")
//         navigate("/");
//         window.location.reload()
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Login failed. Please try again.");
//         console.error("Login Error:", error);
//       }

//       setName("");
//       setEmail("");
//       setPassword("");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl prata-regular">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {currentState === "Sign Up" && (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Enter your name"
//           required
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       )}

//       <input
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Enter your email"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Enter your password"
//         required
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className="flex justify-between w-full text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create a new account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login here
//           </p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="px-8 py-2 mt-4 font-light text-white bg-black"
//       >
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi, registerApi } from "../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // default to Login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      try {
        const response = await registerApi({ name, email, password });

        if (response.status === 200 || response.status === 201) {
          toast.success("Register Successfull")
        }


      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
        console.error("Login Error:", error);
      }
      setCurrentState("Login");
      setName("");
      setEmail("");
      setPassword("");

    } else {
      try {
        const response = await loginApi({ email, password });
        const { token, user } = response.data;

        // Save token
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
        toast.success("Login Successfull")
        
        window.location.reload()
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
        console.error("Login Error:", error);
      }

      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 pr-10 border border-gray-800"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        {currentState === "Login" ? (
          <>
            <Link to="/forgot-password" className="cursor-pointer hover:underline">
              Forgot your password?
            </Link>
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Create a new account
            </p>
          </>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:underline ml-auto"
          >
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-8 py-2 mt-4 font-light text-white bg-black"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;