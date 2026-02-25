import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../SEO';
import type { AlternativesData, AlternativeEntry } from '../../data/seo-pages';
import { alternatives } from '../../data/seo-pages';

function EntryCard({ entry }: { entry: AlternativeEntry }) {
  return (
    <section className={`border-t ${entry.isInboxed ? 'border-black border-t-4' : 'border-black/10'} pt-12`}>
      <div className="flex items-center gap-4 mb-6">
        <span className={`px-3 py-1 font-mono text-sm ${entry.isInboxed ? 'bg-black text-white' : 'bg-muted text-mutedForeground'}`}>
          #{entry.rank}{entry.isInboxed ? ' TOP PICK' : ''}
        </span>
        <h2 className="font-serif text-4xl">{entry.name}</h2>
      </div>
      <p className="font-body text-lg mb-8 leading-relaxed">{entry.description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-muted/30 p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Check size={18} /> Pros</h3>
          <ul className="space-y-2 text-sm">
            {entry.pros.map((pro, i) => (
              <li key={i}>• {pro}</li>
            ))}
          </ul>
        </div>
        <div className="bg-muted/30 p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><X size={18} className="text-mutedForeground" /> Cons</h3>
          <ul className="space-y-2 text-sm">
            {entry.cons.map((con, i) => (
              <li key={i}>• {con}</li>
            ))}
          </ul>
        </div>
      </div>

      {entry.isInboxed ? (
        <Link to="/" className="btn-primary inline-block">Try Inboxed Free</Link>
      ) : entry.slug ? (
        <Link
          to={`/compare/${entry.slug}`}
          className="text-black font-bold underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          Read our comparison &rarr;
        </Link>
      ) : null}
    </section>
  );
}

export default function AlternativesTemplate({ data }: { data: AlternativesData }) {
  const relatedAlternatives = alternatives
    .filter((a) => a.slug !== data.slug)
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
        <p className="font-body text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed text-mutedForeground">
          {data.intro}
        </p>

        <div className="space-y-20">
          {data.entries.map((entry) => (
            <EntryCard key={entry.rank} entry={entry} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 p-12 bg-black text-white">
          <h2 className="font-serif text-4xl mb-6 text-center">Ready to make the switch?</h2>
          <p className="text-xl text-center mb-8 opacity-80">
            Join thousands of users who chose privacy and intelligence.
          </p>
          <div className="flex justify-center">
            <Link to="/" className="bg-white text-black px-8 py-4 font-bold hover:bg-white/90 transition-colors">
              {data.cta}
            </Link>
          </div>
        </div>

        {/* Related Alternatives */}
        {relatedAlternatives.length > 0 && (
          <div className="border-t border-black/10 mt-20 pt-16">
            <h3 className="font-mono text-sm uppercase tracking-widest text-mutedForeground mb-8">More Alternatives</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedAlternatives.map((a) => (
                <Link
                  key={a.slug}
                  to={`/alternatives/${a.slug}`}
                  className="block p-4 border border-black/10 hover:border-black transition-colors"
                >
                  <span className="font-body text-sm">{a.competitor} Alternatives</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
