import { ProductPoster } from "../components/ProductPoster";

interface PosterPageProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function PosterPage({ onNavigate }: PosterPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductPoster onNavigate={onNavigate} />
    </div>
  );
}
