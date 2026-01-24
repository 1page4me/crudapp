import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, deleteUser, updateUser } from '../api/users';




export function useUsers() {
    const invalidateUsers = () => queryClient.invalidateQueries(['users']);
    const queryClient = useQueryClient()

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: invalidateUsers,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: invalidateUsers,
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, name }) => updateUser(id, name),

        onMutate: async ({ id, name }) => {
            await queryClient.cancelQueries(['users'])
            const previousUsers = queryClient.getQueryData(['users'])

            queryClient.setQueryData(['users'], oldUsers => oldUsers.map(u => (u.id === id ? { ...u, name } : u))
            )
            return { previousUsers }
        },

        onError: (_err, _variables, context) => queryClient.setQueryData(['users'], context.previousUsers),

        onSettled: invalidateUsers,
    })

    return {
        usersQuery,
        createMutation,
        deleteMutation,
        updateMutation,
    }
}