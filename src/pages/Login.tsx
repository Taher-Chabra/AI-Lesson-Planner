import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { UserRound, LockKeyhole } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

const Login: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const {setUser} = useAuth();
  const navigate = useNavigate();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'demouser' && password == 'demopass') {
      setUser(username);
      navigate('/lesson-input')
    }
   else {
      toast.error('Login Failed, Invalid Credentials!!');
   }
  };
  return (
    <div className="h-full flex flex-col items-center justify-center my-4">
      <h1 className="text-2xl font-bold my-4 underline underline-offset-4">
        User Login
      </h1>
      <form
        onSubmit={submitForm}
        className="w-4/5 md:w-1/2 bg-slate-200/50 p-6 md:p-12 rounded-md shadow-md dark:bg-gray-800/50 my-4"
      >
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-gray-200 border border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600  dark:border-gray-500">
            <UserRound className="size-4 text-slate-600 dark:text-white" />
          </span>
          <Input
            type="text"
            placeholder="enter your username"
            min={8}
            max={20}
            id="username"
            className="rounded-s-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6"
        >
          Password
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-gray-200 border border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600  dark:border-gray-500">
            <LockKeyhole className="size-4 text-slate-600 dark:text-white" />
          </span>
          <Input
            type="password"
            placeholder="enter your password"
            min={8}
            id="password"
            className="rounded-s-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <span className="block mt-8 w-full text-center">
            <Button
               type="submit"
               variant="default"
               className="bg-cyan-600 dark:bg-slate-100 px-6 sm:px-8 text-sm md:text-base"
            >
               Login
            </Button>
         </span>
      </form>
    </div>
  );
};

export default Login;
