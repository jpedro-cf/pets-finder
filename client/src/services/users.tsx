import { UsersApi } from '@/api/users'
import { useMutation } from '@tanstack/react-query'

export function useUsersService() {
    const { mutate: registerUser, isPending: isRegistering } = useMutation({
        mutationFn: UsersApi.register,
    })

    return { registerUser, isRegistering }
}
