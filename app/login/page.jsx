import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="login-card">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username / Email</label>
          <input
            type="text"
            id="username"
            placeholder="Masukkan username atau email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Masukkan password"
          />
        </div>
        <Link href='/admin'>
            <button type="submit" className="btn-submit">
            Login
            </button>
        </Link>
      </form>
    </div>
  );
}
