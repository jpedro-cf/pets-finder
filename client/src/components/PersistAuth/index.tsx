import { UsersApi } from '@/api/users'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
export function PersistAuth() {
    const { token, setUser } = useAuth()
    const [loading, setLoading] = useState(true)

    async function fetchMe() {
        try {
            const user = await UsersApi.me()
            setUser(user)
            setLoading(false)
        } catch (error) {
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMe()
    }, [token])
    if (loading) {
        return <div>loading....</div>
    }

    return <Outlet />
}
