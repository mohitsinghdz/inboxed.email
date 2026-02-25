import { Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../SEO';
import type { UseCaseData } from '../../data/seo-pages';
import { useCases } from '../../data/seo-pages';

export default function UseCaseTemplate({ data }: { data: UseCaseData }) {
  const relatedUseCases = useCases
    .filter((u) => u.slug !== data.slug)
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
        <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">{data.h1}</h1>
        <p className="font-body text-xl md:text-2xl mb-20 max-w-2xl leading-relaxed text-mutedForeground">
          {data.intro}
        </p>

        {/* Pain Points */}
        <section className="mb-20">
          <h2 className="font-mono text-sm uppercase tracking-widest text-mutedForeground mb-10">The Problem</h2>
          <div className="space-y-8">
            {data.painPoints.map((point, i) => (
              <div key={i} className="flex gap-4">
                <AlertCircle size={20} className="mt-1 flex-shrink-0 text-mutedForeground" />
                <div>
                  <h3 className="font-bold text-lg mb-1">{point.title}</h3>
                  <p className="font-body text-mutedForeground leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section className="mb-20 border-t border-black pt-16">
          <h2 className="font-mono text-sm uppercase tracking-widest text-mutedForeground mb-10">How Inboxed Solves This</h2>
          <div className="space-y-8">
            {data.solutions.map((solution, i) => (
              <div key={i} className="flex gap-4">
                <Check size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">{solution.title}</h3>
                  <p className="font-body text-mutedForeground leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="mb-20 bg-muted/30 p-8 md:p-12">
          <h2 className="font-serif text-3xl mb-8">Key Features for {data.profession}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={16} className="flex-shrink-0" />
                <span className="font-body text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-12">
          <Link to="/" className="btn-primary inline-block text-lg px-12 py-5">
            {data.cta}
          </Link>
        </div>

        {/* Related Use Cases */}
        {relatedUseCases.length > 0 && (
          <div className="border-t border-black/10 mt-8 pt-16">
            <h3 className="font-mono text-sm uppercase tracking-widest text-mutedForeground mb-8">Also Popular</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedUseCases.map((u) => (
                <Link
                  key={u.slug}
                  to={`/best-email-for/${u.slug}`}
                  className="block p-4 border border-black/10 hover:border-black transition-colors"
                >
                  <span className="font-body text-sm">For {u.profession}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
