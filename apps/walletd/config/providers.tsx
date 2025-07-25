import { DialogProvider, Dialogs } from '../contexts/dialog'
import { WalletsProvider } from '../contexts/wallets'
import { AddressesProvider } from '../contexts/addresses'
import { EventsProvider } from '../contexts/events'
import { LedgerProvider } from '../contexts/ledger'
import { AppProvider } from '../contexts/app'
import { RescanStatus } from '../components/RescanStatus'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <AppProvider>
      <DialogProvider>
        <LedgerProvider>
          <WalletsProvider>
            <AddressesProvider>
              <EventsProvider>
                {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                <Dialogs />
                <RescanStatus />
                {children}
              </EventsProvider>
            </AddressesProvider>
          </WalletsProvider>
        </LedgerProvider>
      </DialogProvider>
    </AppProvider>
  )
}
