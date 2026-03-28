import useBannerOwner from './use-banner-owner.js';
import useId from './use-id.js';

export default function useBanner(): string {
  const id: string = useId();

  useBannerOwner(id);

  return id;
}
