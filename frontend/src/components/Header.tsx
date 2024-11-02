import MyUserApi from "@/api/MyUserApi"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import LogoutButton from "./LogOutButton"


const Header = () => {
    const { isError } = useQuery("validateToken", MyUserApi.validateTokenApi, {
        retry: false
    })


    return (
        <div className="bg-blue-800 py-8">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MernHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {!isError ? (
                        <>
                            <Link
                                to="/login"
                                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                My Bookings
                            </Link>
                            <Link
                                to="/signin"
                                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                My Hotels
                            </Link>
                            <LogoutButton />
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                        >
                            Log In
                        </Link>
                    )}

                </span>
            </div>

        </div>
    )
}

export default Header