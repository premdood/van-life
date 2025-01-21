import { useOutletContext } from 'react-router';

export default function HostVanPricing() {
  const { vanData } = useOutletContext();

  return (
    <div className="van-price">
      ${(vanData.price)}
      <span>/day</span>
    </div>
  );
}