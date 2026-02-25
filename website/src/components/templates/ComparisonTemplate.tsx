import { Check, X, Shield, Zap, Cpu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../SEO';
import type { ComparisonData, ComparisonRow } from '../../data/seo-pages';
import { comparisons } from '../../data/seo-pages';

const inboxedIcons = {
  check: Check,
  shield: Shield,
  zap: Zap,
  cpu: Cpu,
  search: Search,
  neutral: null,
} as const;

function CompetitorCell({ row }: { row: ComparisonRow }) {
  return (
    <td className="py-5 px-8 opacity-70">
      {row.competitorIcon === 'x' && <X size={18} className="inline mr-2 text-black/50" />}
      {row.competitorIcon === 'check' && <Check size={18} className="inline mr-2 text-black/50" />}
      {row.competitor}
    </td>
  );
}

function InboxedCell({ row }: { row: ComparisonRow }) {
  const IconComponent = inboxedIcons[row.inboxedIcon];
  return (
    <td className="py-5 px-8 font-medium">
      {IconComponent && <IconComponent size={18} className="inline mr-2" />}
      {row.inboxed}
    </td>
  );
}

export default function ComparisonTemplate({ data }: { data: ComparisonData }) {
  const relatedComparisons = comparisons
    .filter((c) => c.slug !== data.slug)
    .slice(0, 4);

  return (
    <div className="container-custom py-32">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonical={data.seo.canonical}
        schema={data.schema}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-8">{data.h1}</h1>
        <p className="font-body text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed text-mutedForeground">
          {data.intro}
        </p>

        {/* Comparison Table */}
        <div className="mb-20 overflow-x-auto">
          <table className="w-full border-collapse text-left font-sans text-lg">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="py-4 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Feature</th>
                <th className="py-4 px-8 font-serif text-2xl opacity-70">{data.name}</th>
                <th className="py-4 px-8 font-serif text-2xl font-bold">Inboxed</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr key={i} className={i < data.rows.length - 1 ? 'border-b border-black/10' : ''}>
                  <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">{row.feature}</td>
                  <CompetitorCell row={row} />
                  <InboxedCell row={row} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why Switch */}
        <div className="border-t border-black pt-16">
          <h2 className="font-serif text-4xl mb-6">{data.whySwitch.heading}</h2>
          {data.whySwitch.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg leading-relaxed mb-4">
              {p}
            </p>
          ))}
          <div className="mt-4">
            <Link to="/" className="btn-primary inline-block">
              {data.cta}
            </Link>
          </div>
        </div>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <div className="border-t border-black/10 mt-20 pt-16">
            <h3 className="font-mono text-sm uppercase tracking-widest text-mutedForeground mb-8">More Comparisons</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedComparisons.map((c) => (
                <Link
                  key={c.slug}
                  to={`/compare/${c.slug}`}
                  className="block p-4 border border-black/10 hover:border-black transition-colors"
                >
                  <span className="font-body text-sm">vs {c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
