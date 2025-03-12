"use client"

import Link from 'next/link'
import NavLink from './NavLink'
import { usePathname } from 'next/navigation'
const Navigation = () => {

    return (

        <nav className="navbar navbar-expand-md navbar-dark bd-navbar fixed-top bg-dark">
            <div className="container-fluid">
            <Link href="/" className="navbar-brand">
                ETM
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <NavLink
                            href="/"
                            active={usePathname() === '/'}>
                            Home
                        </NavLink>
                    </li>
        
                    <li className="nav-item">
                        <NavLink
                            href="/employees"
                            active={usePathname() === '/employees'}>
                            Pegawai
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            href="/tasks"
                            active={usePathname() === '/tasks'}>
                            Pekerjaan
                        </NavLink>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}

export default Navigation