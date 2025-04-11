import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        const alreadyRefreshed = originalRequest._alreadyRefreshed
        const { setToken } = useAuth.getState()

        if (error.response.status == 401 && !alreadyRefreshed) {
            originalRequest._alreadyRefreshed = true

            axiosInstance
                .get('/auth/refresh')
                .then((res) => {
                    if (res.status == 200) {
                        const { access_token } = res.data
                        setToken(access_token)
                        return
                    }
                })
                .catch((e) => {})
        }
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.request.use((config: any) => {
    const { token } = useAuth.getState()
    config.headers.Authorization = token
        ? `Bearer ${token}`
        : config.headers.Authorization

    return config
})

export { axiosInstance }
