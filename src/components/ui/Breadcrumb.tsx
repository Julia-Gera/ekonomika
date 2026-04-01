import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="hidden md:flex items-center gap-[8px] text-[14px] font-normal">
      <Link href="/" className="text-[#000000]">Главная</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-[8px]">
          <span className="text-[#000000]">{'>'}</span>
          {item.href ? (
            <Link href={item.href} className="text-[#000000]">{item.label}</Link>
          ) : (
            <span className="text-[#6D7A8C]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
