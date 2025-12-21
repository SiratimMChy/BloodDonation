import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";



const axiosSecure = axios.create({
    baseURL: 'https://blood-donation-backend-theta.vercel.app',
});

const useAxiosSecure = () => {

    const { user } = useContext(AuthContext);

    useEffect(() => {

        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        })

        const responseInterceptor = axiosSecure.interceptors.response.use(response => {
            return response;
        }, (error) => {
            console.log(error);
            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }

    }, [ user]);

    return axiosSecure;

}

export default useAxiosSecure;