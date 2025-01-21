import { Link } from 'react-router';

export default function Home() {
  return (
    <main className='main'>
      <section>
        <h1>You got the travel plans, we got the travel vans.</h1>
        <span>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</span>
        <Link to="/vans" className='btn link-button'>Find your van</Link>
      </section>
    </main>
  );
}
