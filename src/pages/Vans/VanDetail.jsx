import { Suspense } from 'react';
import { Await, Link, useLoaderData, useLocation } from 'react-router';
import { getVans } from '../../api';

export function loader({ params }) {
  return { vanData: getVans(params.id) };
}

export default function VanDetail() {
  const loaderData = useLoaderData();
  const location = useLocation();
  const search = location.state?.search || '';
  const type = location.state?.type || 'all';

  function renderVan(vanData) {
    return (
      <>
        <img
          src={vanData.imageUrl}
          className='van-image'
        />
        <div className="van-info">
          <span className={`van-type ${vanData.type}`}>
            {vanData.type[0].toUpperCase() + vanData.type.slice(1)}
          </span>
          <h2 className='van-name'>{vanData.name}</h2>
          <p className='van-price'>
            ${vanData.price}
            <span>/day</span>
          </p>
          <p className='van-description'>{vanData.description}</p>
          <button className='btn link-button'>Rent this van</button>
        </div>
      </>
    );
  }

  return (
    <section className='van-detail-container'>
      <Link
        to={`../${search}`}
        relative='path'
        className='back-button'
      >
        &larr; Back to {type} vans
      </Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={loaderData.vanData}>
          {renderVan}
        </Await>
      </Suspense>
    </section>
  );
}