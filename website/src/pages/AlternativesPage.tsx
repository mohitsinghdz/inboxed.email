import { useParams, Navigate } from 'react-router-dom';
import AlternativesTemplate from '../components/templates/AlternativesTemplate';
import { alternatives } from '../data/seo-pages';

export default function AlternativesPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = alternatives.find((a) => a.slug === slug);

  if (!data) return <Navigate to="/" replace />;

  return <AlternativesTemplate data={data} />;
}
