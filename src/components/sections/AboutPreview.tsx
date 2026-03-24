import Link from 'next/link';

const advantages = [
  {
    title: 'Отраслевая экспертиза',
    description: 'Глубокое знание специфики оплаты труда в ключевых отраслях российской экономики.',
  },
  {
    title: 'Актуальные данные рынка',
    description: 'Доступ к актуальным обзорам заработных плат и данным ведущих HR-исследований.',
  },
  {
    title: 'Индивидуальный подход',
    description: 'Решения, разработанные под конкретные задачи и стратегию вашего бизнеса.',
  },
  {
    title: 'Комплексная поддержка',
    description: 'Сопровождение внедрения изменений и поддержка на всех этапах проекта.',
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <p className="text-[#3b82f6] text-sm font-semibold uppercase tracking-wider mb-3">
              О компании
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0C2140] mb-6 leading-tight">
              15 лет помогаем компаниям строить справедливые системы оплаты труда
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              ЭкономикаТруда — ведущий консалтинговый центр в области трудовой экономики. Мы специализируемся на разработке и оптимизации систем вознаграждения, анализе рынка труда и HR-аудите.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Наша команда объединяет сертифицированных специалистов с практическим опытом работы в крупнейших российских и международных компаниях. Мы понимаем, что каждый бизнес уникален, поэтому все решения разрабатываются индивидуально.
            </p>
            <Link
              href="/o-kompanii"
              className="inline-flex items-center gap-2 text-[#0C2140] font-semibold hover:text-[#2d4a6e] transition-colors"
            >
              Подробнее о нас
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          {/* Right: Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="bg-[#f8f9fb] rounded-lg p-6 border border-gray-100"
              >
                <div className="w-8 h-8 bg-[#0C2140] rounded mb-4 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-[#0C2140] text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
