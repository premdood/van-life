import { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';

export async function loader({ request }) {
  await requireAuth(request);
  return { vansData: getHostVans() };
}

export default function HostVans() {
  const loaderData = useLoaderData();

  function renderVansList(vansData) {
    const hostVans = vansData.map(vanData => (
      <Link
        to={vanData.id}
        key={vanData.id}
        className='host-vans-link-wrapper'
      >
        <div className='host-van-tile'>
          <img
            src={vanData.imageUrl}
            alt={`photo of ${vanData.name}`}
          />
          <div className='host-van-info'>
            <p className="van-name">
              {vanData.name}
            </p>
            <p className="van-price">
              {vanData.price}<span>/day</span>
            </p>
          </div>
        </div>
      </Link>
    ));

    return hostVans;
  }

  return (
    <section className='host-vans-page-container'>
      <h1 className='host-vans-title'>Your listed vans</h1>

      <div className="host-vans-container">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Await resolve={loaderData.vansData}>
            {renderVansList}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}