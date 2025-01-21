import { Suspense } from 'react';
import { Await, Link, NavLink, Outlet, useLoaderData } from 'react-router';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';

export async function loader({ params, request }) {
  await requireAuth(request);
  return { vanData: getHostVans(params.id) };
}

export default function HostVanDetail() {
  const loaderData = useLoaderData();
  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616'
  };

  function renderVanElement(vanData) {
    const vanDetail = (
      <div className="host-van-detail">
        <img
          src={vanData.imageUrl}
          alt={`image of ${vanData.name}`}
        />
        <div>
          <div className={`van-type ${vanData.type}`}>
            {vanData.type && vanData.type[0].toUpperCase() + vanData.type.slice(1)}
          </div>
          <div className="van-name">
            {vanData.name}
          </div>
          <div className="van-price">
            ${vanData.price}
            <span>/day</span>
          </div>
        </div>
      </div>
    );

    return (
      <div className="host-van-detail-container">
        {vanDetail}

        <nav className="nav host-van-detail-nav">
          <NavLink
            to='.'
            end
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Details
          </NavLink>

          <NavLink
            to='pricing'
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Pricing
          </NavLink>

          <NavLink
            to='photos'
            style={({ isActive }) => isActive ? activeStyles : null}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={{ vanData }} />
      </div>
    );
  }

  return (
    <section className='host-van-page-container'>
      <Link
        to='..'
        relative='path'
        className='back-button'
      >
        &larr; Back to all vans
      </Link>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={loaderData.vanData}>
          {renderVanElement}
        </Await>
      </Suspense>
    </section >
  );
}