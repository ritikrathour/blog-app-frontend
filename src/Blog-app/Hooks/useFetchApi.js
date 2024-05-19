import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BaseURL } from "../constants";

const useFetchApi = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cancelToken = axios.CancelToken.source(); 
    const response = useCallback(
        async () => {
            try {
                const token = document.cookie.split(";")[0].split("=")[1];
                const { data } = await axios.get(`${BaseURL}/${url}`,token && {headers:{ Authorization: token} }, { cancelToken: cancelToken.token }); 
                setData(data?.data)
            } catch (error) {
                setError(error?.response?.data?.message || error.message)
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        ,[])
    useEffect(() => { 
        response()
        return () => {
            cancelToken.cancel()
        }
    }, [url])
    return { loading, error, data }
}
export default useFetchApi;