import Link from 'next/link'

export default function Header() {
  const headerIconAlt = "코드잇 아이콘";

  return (
    <header className="max-w-full w-full bg-[var(--header-background)] border-b-1 border-solid border-[var(--header-border-bottom)]">
      <div className="wrapper py-2.5 flex">
        <Link href="/">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/header-small.png 1x, /images/header-small@2x.png 2x, /images/header-small@3x.png 3x" />
            <img src="/images/header-large.png" srcSet="/images/header-large.png 1x, /images/header-large@2x.png 2x, /images/header-large@3x 3x" alt={headerIconAlt} />
          </picture>
        </Link>
      </div>
    </header>
  )
}
