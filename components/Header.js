import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>ReactJS Repositories</a>
        </Link>
    </div>
)

export default Header