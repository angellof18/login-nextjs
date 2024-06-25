"use client"
import { useAuthContext } from "@/Contexts/AuthContext"
import axios from "axios"
import { SHA256 } from "crypto-js"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export const LoginDesktop = () => {
    const form = useRef(null)
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [usuario, setUsuario] = useState('')
    const { login } = useAuthContext()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == 'password') {
            setPassword(value)
        } else {
            setUsuario(value.toUpperCase())
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { usuario, password: SHA256(password).toString() }
        const { data } = await axios.post('/api/login', userData)
        if (data.message == 'SESION CORRECTA') {
            login({
                user: usuario,
                pwd: SHA256(password).toString()
            })
            router.push('/home')
        } else {
            alert(data.message)
            form.current.reset()
        }
    }

    return (
        <div className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-two-fifths">
                            <div className="box">
                                <div className="mx-4 my-4">
                                    <div className="columns is-vcentered is-centered">
                                        <div className="column is-full">
                                            <p className="has-text-weight-bold is-size-3 is-size-4-mobile is-size-4-tablet mb-5">INICIO DE SESION</p>
                                            <form onSubmit={handleSubmit} ref={form}>
                                                <div className="field has-text-left">
                                                    <label className="label">Usuario</label>
                                                    <div className="control">
                                                        <input name="usuario" type="text" className="input" required autoFocus
                                                            onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="field has-text-left">
                                                    <label className="label">Contraseña</label>
                                                    <div className="control">
                                                        <input name="password" type="password" className="input" required
                                                            onChange={handleChange} />
                                                        <a href="#" className="is-size-7 is-underlined" hidden>Has olvidado tu Contraseña??</a>
                                                    </div>
                                                </div>

                                                <div className="buttons mt-5">
                                                    <button type="submit" className="button is-link">Iniciar sesión</button>
                                                    <button type="button" className="button is-outlined is-link"
                                                        onClick={() => router.push('/sign')}>Registrate</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
