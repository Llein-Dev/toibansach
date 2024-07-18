"use client"

import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

const { useRef } = require("react")

export default function Login() {
    const email = useRef("")
    const password = useRef("")
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email.current.value, password.current.value)
        const user = {
            email: "email.current.value",
            password: "5125125"
        }
    }
    if (
        email.current.value == user.email &&
        password.current.value == user.password
    ) {
        dispatch(login(user));
        router.pust("/");
    } else {
        alert("Email hoặc mật khẩu không dúng!");
    }

}