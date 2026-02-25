import { useParams, Navigate } from 'react-router-dom';
import ComparisonTemplate from '../components/templates/ComparisonTemplate';
import { comparisons } from '../data/seo-pages';

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = comparisons.find((c) => c.slug === slug);

  if (!data) return <Navigate to="/" replace />;

  return <ComparisonTemplate data={data} />;
}
