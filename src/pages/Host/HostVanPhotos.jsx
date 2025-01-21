import { useOutletContext } from 'react-router';

export default function HostVanPhotos() {
  const { vanData } = useOutletContext();

  return (
    <img
      className='van-image'
      src={vanData.imageUrl}
      alt={`image of ${vanData.name}`}
    />
  );
}