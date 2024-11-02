import { SignUpFormdata, LogInFormdata } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const SignUpApi = async (formData: SignUpFormdata) => {

    const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message);
    }

}

const LogInApi = async (formData: LogInFormdata) => {

    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message);
    }
    return body
}

const LogOutApi = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/logout`, {
        method: 'POST',
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error during Log out")
    }
}

const validateTokenApi = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/validatetoken`, {
        method: 'GET',
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Token invalid")
    }

    return response.json()
}


export default {
    SignUpApi,
    LogInApi,
    LogOutApi,
    validateTokenApi
}