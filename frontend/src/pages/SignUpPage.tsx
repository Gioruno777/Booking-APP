import UserAPI from "@/api/MyUserApi"
import { SignUpFormdata } from "@/types"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"


const SignUpPage = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormdata>()


    const mutation = useMutation(UserAPI.SignUpApi, {
        onSuccess: async () => {
            toast.success("User profile updated")
            await queryClient.invalidateQueries("validateToken")
            navigate("/")

        },
        onError: () => {
            toast.error("User already exists")
        }
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        mutation.mutate(data)
    })



    return (
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create An Account</h2>
            <div className="flex flex-col md:flex-row gap-5">

                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstname", { required: "This field is required" })}
                    ></input>
                    {errors.firstname && (
                        <span className="text-red-500">{errors.firstname.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastname", { required: "This field is required" })}
                    ></input>
                    {errors.lastname && (
                        <span className="text-red-500">{errors.lastname.message}</span>
                    )}
                </label>
            </div>

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


            <label className="text-gray-700 text-sm font-bold flex-1">
                Comfirm Password
                <input className="border rounded w-full py-1 px-2 font-normal"
                    {...register("passwordConfirm", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            }
                            else if (watch("password") !== val) {
                                return "Your passwords do no match"
                            }

                        }
                    })}
                ></input>
                {errors.passwordConfirm && (
                    <span className="text-red-500">{errors.passwordConfirm.message}</span>
                )}
            </label>

            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Create Account
                </button>
            </span>

        </form >
    )
}

export default SignUpPage