"use client"
const Footer = () => {

    return (

        <nav className="navbar fixed-bottom navbar-expand-sm navbar-transparent bg-transparent">
            <div className="container-fluid">
                <div className="text-sm text-dark pt-2">
                    Copyright &copy; {new Date().getFullYear()} By &nbsp;                                       
                    <a
                    href="https://github.com/hilmysyarif" className="text-sm text-dark underline">
                        Hilmy Syarif
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Footer