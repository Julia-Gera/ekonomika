import Link from 'next/link';
import { services } from '@/lib/placeholder-data';

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    // Analytics
    <svg key="0" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>,
    // Layers
    <svg key="1" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>,
    // Search
    <svg key="2" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>,
    // Target
    <svg key="3" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>,
  ];
  return icons[index % icons.length];
}

export default function ServicesPreview() {
  const previewServices = services.slice(0, 4);

  return (
    <section className="bg-[#f8f9fb] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <p className="text-[#3b82f6] text-sm font-semibold uppercase tracking-wider mb-3">
            Что мы делаем
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0C2140] mb-4">
            Наши услуги
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Комплексные консалтинговые решения в области трудовой экономики и управления вознаграждением персонала.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {previewServices.map((service, index) => (
            <Link
              key={service.id}
              href={`/uslugi/${service.slug}`}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-[#3b82f6]/30 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-[#0C2140]/5 rounded-lg flex items-center justify-center mb-5 text-[#0C2140] group-hover:bg-[#0C2140] group-hover:text-white transition-colors duration-200">
                <ServiceIcon index={index} />
              </div>
              <h3 className="font-display font-semibold text-[#0C2140] text-lg mb-3 leading-snug group-hover:text-[#2d4a6e] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {service.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[#0C2140] text-sm font-medium">{service.price}</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0C2140] transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#0C2140] text-white font-semibold rounded hover:bg-[#2d4a6e] transition-colors duration-150"
          >
            Все услуги
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
