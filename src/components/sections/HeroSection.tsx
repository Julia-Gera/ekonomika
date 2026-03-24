import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-[#0C2140] text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#3b82f6]/20 text-[#3b82f6] text-sm font-medium rounded border border-[#3b82f6]/30">
              Консалтинг в области трудовой экономики
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Эффективные решения в области оплаты труда
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Мы помогаем компаниям выстраивать справедливые и конкурентоспособные системы вознаграждения, мотивирующие сотрудников и поддерживающие рост бизнеса.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakty"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#3b82f6] text-white font-semibold rounded hover:bg-[#2563eb] transition-colors duration-150 text-base"
            >
              Получить консультацию
            </Link>
            <Link
              href="/uslugi"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors duration-150 text-base"
            >
              Наши услуги
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {[
            { value: '15+', label: 'лет на рынке' },
            { value: '300+', label: 'успешных проектов' },
            { value: '120+', label: 'компаний-клиентов' },
            { value: '98%', label: 'удовлетворённых клиентов' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-extrabold text-3xl md:text-4xl text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
