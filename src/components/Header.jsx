import { Link, NavLink } from 'react-router';
import imageUrl from '../assets/avatar-icon.png';

export default function Header() {
  return (
    <header className='header'>
      <Link to="/" className='site-logo'>#VANLIFE</Link>
      <nav className='nav'>
        <NavLink
          to="/host"
          className={({isActive}) => isActive ? 'active-link': null}
        >
          Host
        </NavLink>

        <NavLink
          to='/about'
          className={({isActive}) => isActive ? 'active-link': null}
        >
          About
        </NavLink>

        <NavLink
          to='/vans'
          className={({isActive}) => isActive ? 'active-link': null}
        >
          Vans
        </NavLink>

        <NavLink
          to='login'
          className='login-link'
        >
          <img
            src={imageUrl}
            alt="Login avatar"
            className='login-icon'
          />
        </NavLink>
      </nav>
    </header>
  );
}