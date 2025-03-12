import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`nav-link ${
            active
                ? 'active'
                : ''
        }`}>
        {children}
    </Link>
)

export default NavLink
