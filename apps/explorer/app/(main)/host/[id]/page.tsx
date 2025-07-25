import { Metadata } from 'next'
import { routes } from '../../../../config/routes'
import { buildMetadata } from '../../../../lib/utils'
import { Host } from '../../../../components/Host'
import { truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../../lib/explored'
import { to } from '@siafoundation/request'
import { notFound } from 'next/navigation'
import { ExplorerPageProps } from '../../../../lib/pageProps'

export async function generateMetadata({
  params,
}: ExplorerPageProps): Promise<Metadata> {
  const id = decodeURIComponent(((await params)?.id as string) || '')
  const title = `Host ${truncate(id, 30)}`
  const description = `View details for Sia host.`
  const url = routes.host.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }: ExplorerPageProps) {
  const p = await params
  const id = p?.id
  const explored = await getExplored()
  const [host, hostError, hostResponse] = await to(
    explored.hostByPubkey({ params: { id } })
  )

  if (hostError) {
    if (hostResponse?.status === 404) return notFound()
    throw hostError
  }

  return <Host host={host} />
}
