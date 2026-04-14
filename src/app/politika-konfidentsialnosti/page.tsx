import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности ЭкономикаТруда.',
};

export default function PolitikaPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#f8f9fb] border-b border-gray-200 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#0C2140] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[#0C2140]">Политика конфиденциальности</span>
          </nav>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#0C2140]">
            Политика конфиденциальности
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Настоящая политика конфиденциальности описывает, как ЭкономикаТруда собирает, использует и защищает персональные данные пользователей сайта.
          </p>
          <h2 className="font-display font-bold text-[#0C2140] text-2xl mt-8 mb-4">
            1. Сбор данных
          </h2>
          <p>
            Мы собираем только те персональные данные, которые вы предоставляете добровольно при заполнении форм на сайте: имя, телефон, адрес электронной почты и текст обращения.
          </p>
          <h2 className="font-display font-bold text-[#0C2140] text-2xl mt-8 mb-4">
            2. Использование данных
          </h2>
          <p>
            Собранные данные используются исключительно для ответа на ваш запрос и организации консультации. Мы не передаём персональные данные третьим лицам без вашего согласия.
          </p>
          <h2 className="font-display font-bold text-[#0C2140] text-2xl mt-8 mb-4">
            3. Защита данных
          </h2>
          <p>
            Мы принимаем необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения.
          </p>
          <h2 className="font-display font-bold text-[#0C2140] text-2xl mt-8 mb-4">
            4. Контакты
          </h2>
          <p>
            По вопросам, связанным с обработкой персональных данных, обращайтесь по адресу:{' '}
            <a href="mailto:info@ekonomikatruda.ru" className="text-[#3b82f6] hover:underline">
              info@ekonomikatruda.ru
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
