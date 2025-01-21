import { Suspense } from 'react';
import { Await, Link, useLoaderData, useSearchParams } from 'react-router';
import { getVans } from '../../api';

export function loader() {
  return { vansData: getVans() };
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loaderData = useLoaderData();
  const typeFilter = searchParams.get('type');

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value == null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }

      return prevParams;
    });
  }

  function renderVanElements(vansData) {
    const displayedVans = typeFilter
      ? vansData.filter(van => van.type.toLowerCase() == typeFilter)
      : vansData;

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${typeFilter == 'simple' ? 'selected' : null}`}
            onClick={() => handleFilterChange('type', 'simple')}
          >
            Simple
          </button>
          <button
            className={`van-type rugged ${typeFilter == 'rugged' ? 'selected' : null}`}
            onClick={() => handleFilterChange('type', 'rugged')}
          >
            Rugged
          </button>
          <button
            className={`van-type luxury ${typeFilter == 'luxury' ? 'selected' : null}`}
            onClick={() => handleFilterChange('type', 'luxury')}
          >
            Luxury
          </button>
          {typeFilter != null && (
            <button
              className='van-type clear-filters'
              onClick={() => handleFilterChange('type', null)}
            >
              Clear filters
            </button>
          )}
        </div>
        <div className='vans-list'>
          {displayedVans.map(vanData => (
            <Van
              key={vanData.id}
              vanData={vanData}
              search={`?${searchParams.toString()}`}
              type={typeFilter}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <section className="vans-page-container">
      <h1>Explore our vans options</h1>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={loaderData.vansData}>
          {renderVanElements}
        </Await>
      </Suspense>
    </section>
  );
}

function Van({ vanData, search, type }) {
  const vanType = vanData.type[0].toUpperCase() + vanData.type.slice(1);

  return (
    <div className='van-tile'>
      <Link
        to={vanData.id}
        state={{ search, type }}
        aria-label={`View details for ${vanData.name},
                     priced at $${vanData.price} per day`}
      >
        <img
          src={vanData.imageUrl}
          className='van-image'
          height="250"
          width="250"
        />
        <div className='van-info'>
          <p className='van-name'>
            {vanData.name}
          </p>
          <p className='van-price'>
            ${vanData.price}
            <span>/day</span>
          </p>
        </div>
        <span className={`van-type ${vanData.type}`}>
          {vanType}
        </span>
      </Link>
    </div>
  );
}