import UserAPI from "@/api/MyUserApi"
import { LogInFormdata } from "@/types"
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

const LogInPage = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm<LogInFormdata>()

    const mutation = useMutation(UserAPI.LogInApi, {
        onSuccess: async () => {
            toast.success("Login Successful!", { duration: 500 })
            await queryClient.invalidateQueries("validateToken")
            navigate("/")
        },
        onError: () => {
            toast.error("Login failed")
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })




    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Log In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })}
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>


            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", { required: "This field is required" })}
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Login
                </button>
                <span className="text-sm">
                    Not Registered?{" "}
                    <Link className="underline" to="/signup">
                        Create an account here
                    </Link>
                </span>
            </span>


        </form >
    )
}

export default LogInPage

