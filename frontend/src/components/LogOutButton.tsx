import MyUserApi from '@/api/MyUserApi'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

const LogoutButton = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation(MyUserApi.LogOutApi, {
        onSuccess: async () => {
            toast.success("LogOut Successful!", { duration: 500 })
            await queryClient.invalidateQueries("validateToken")
        },
        onError: () => {
            toast.error("LogOut failed")
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
        >
            Sign Out
        </button>
    )
}

export default LogoutButton