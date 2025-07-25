import {
  Container,
  Link,
  webLinks,
  Logo,
  ThemeRadio,
  CurrencyFiatSelector,
  ClientSideOnly,
} from '@siafoundation/design-system'

export function Footer() {
  return (
    // mobile browsers clip the bottom because of how their the navbar works, so add padding
    <Container className="pt-16 pb-20 sm:pb-0">
      <div className="py-4 border-t border-gray-200 dark:border-graydark-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-1.5 items-center">
            <Logo size={12} />
            <Link
              size="12"
              color="contrast"
              weight="medium"
              underline="hover"
              href={webLinks.website.index}
              noWrap
            >
              The Sia Foundation © {new Date().getFullYear()}
            </Link>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <Link
              href={webLinks.website.tos}
              size="12"
              color="subtle"
              underline="hover"
              noWrap
            >
              Terms of Service
            </Link>
            <Link
              href={webLinks.website.privacy}
              size="12"
              color="subtle"
              underline="hover"
              noWrap
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex-1" />
          <div className="flex-1 flex items-center justify-end gap-6">
            <CurrencyFiatSelector />
            <ClientSideOnly
              fallback={<div className="w-[80px] h-[16px]"></div>}
            >
              <ThemeRadio className="hidden md:flex" />
            </ClientSideOnly>
          </div>
        </div>
      </div>
    </Container>
  )
}
