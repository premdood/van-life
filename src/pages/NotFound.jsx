import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="not-found-page-container">
      <div>
        <h1>Sorry, the page you were looking for was not found.</h1>
        <Link
          to='/'
          className='btn link-button'
        >
          Return to home
        </Link>
      </div>
    </section>
  );
}