import { useOutletContext } from 'react-router';

export default function HostVanInfo() {
  const { vanData } = useOutletContext();

  return (
    <section className='host-van-detail-info'>
      <h4>
        Name: <span>{vanData.name}</span>
      </h4>
      <h4>
        Category: <span>{vanData.type}</span>
      </h4>
      <h4>
        Description: <span>{vanData.description}</span>
      </h4>
      <h4>
        Visibility: Public
      </h4>
    </section>
  );
}