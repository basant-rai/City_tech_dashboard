import axios from "axios";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { AppConfig } from "../components/config/App.config";
import { LoginFormData } from "../components/form-validation/LoginForm";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";

interface authData {
  data: {
    id: string,
    jwt_token: string
  }[],

}


const Login = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,

  } = useForm<LoginFormData>({
    resolver: classValidatorResolver(LoginFormData),
  });

  const handleLogin = useCallback(async (data: LoginFormData) => {
    setIsLoading(true)
    const ip_address = '182.93.95.159'
    const newData = { ...data, ip_address }

    try {
      const { data } = await axios.post<authData>(
        `${AppConfig.api_url}/config/v1/auths/login`, newData
      );
      reset()
      navigate('/dashboard');
      setIsLoading(false)
      console.log(data)
      jsCookie.set('city_token',data.data[0].jwt_token);
      
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error.response.data.message)
      console.log(error)
      // throw error
    }
  }, [navigate, reset]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <Controller
            name='login_id'
            control={control}
            render={({ field }) => (
              <input
                type="email"
                id="email"
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="example@gmail.com"
              />
            )}
          />
          <span className="text-red-500 text-xs">{errors.login_id?.message}</span>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <Controller
            name='login_password'
            control={control}
            render={({ field }) => (
              <input
                type={show ? "text" : "password"}
                id="password"
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            )}
          />
          <span className="text-red-500 text-xs">{errors.login_password?.message}</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {
            isLoading ?
              <span>Loading</span> :
              <span>Submit</span>
          }

        </button>
      </form>
    </div>
  );
};

export default Login;
