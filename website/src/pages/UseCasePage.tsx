import { useParams, Navigate } from 'react-router-dom';
import UseCaseTemplate from '../components/templates/UseCaseTemplate';
import { useCases } from '../data/seo-pages';

export default function UseCasePage() {
  const { slug } = useParams<{ slug: string }>();
  const data = useCases.find((u) => u.slug === slug);

  if (!data) return <Navigate to="/" replace />;

  return <UseCaseTemplate data={data} />;
}
