import { useRouteError } from 'react-router';

export default function Error() {
  const error = useRouteError();

  return (
    <div className='error-message'>
      <h1>Error: {error.message}</h1>
      <pre>{error.status} - {error.statusText}</pre>
    </div>
  );
}