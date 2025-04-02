import { UsersApi } from '@/api/users'
import { useMutation } from '@tanstack/react-query'

interface UsersServiceProps {
    id?: string
}

export function useUsersService(data: UsersServiceProps) {
    const { mutate: registerUser, isPending: isRegistering } = useMutation({
        mutationFn: UsersApi.register,
    })

    const { mutate: authenticateUser, isPending: isAuthenticating } =
        useMutation({
            mutationFn: UsersApi.login,
        })

    return { registerUser, isRegistering, authenticateUser, isAuthenticating }
}
