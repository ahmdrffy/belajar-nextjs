import Link from "next/link"
import Image from "next/image"

function Header() {
  return (
    <div className="header">
        <nav>
        <div className="logo">
            <Link href="/">
                <Image src="/next.svg" width={50} height={50} alt="Logo"/>
            </Link>
        </div>
        <div className="nav-links">
        
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">Login</Link>
        </div>
        </nav>
    </div>
  )
}

export default Header