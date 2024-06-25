'use client'
import { useAuthContext } from "@/Contexts/AuthContext"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Principal() {
    const route = useRouter()
    const { logout } = useAuthContext()
    const [active, setActive] = useState(false)
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
        route.push('/login')
    }

    return (
        <>
            <nav className="navbar is-dark">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <p className="is-size-5 has-text-weight-medium">LOGIN</p>
                    </div>

                    <a className={`navbar-burger ${active && 'is-active'}`}
                        onClick={() => setActive(!active)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>

                <div className={`navbar-menu ${active && 'is-active'}`}>
                    <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <p className="navbar-link">{user}</p>
                            <div className="navbar-dropdown">
                                <a className="navbar-item" onClick={handleLogout}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >

            <div className="columns is-centered">
                <div className="column is-two-thirds">
                    <figure className="image is-16by9">
                        <img src="/welcome.webp" alt="welcome" />
                    </figure>
                </div>
            </div>
        </>
    )
}