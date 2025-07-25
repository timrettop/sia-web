import { DialogProvider, Dialogs } from '../contexts/dialog'
import { ContractsProvider } from '../contexts/contracts'
import { HostsProvider } from '../contexts/hosts'
import { AppProvider } from '../contexts/app'
import { ConfigProvider } from '../contexts/config'
import { TransactionsProvider } from '../contexts/transactions'
import { KeysProvider } from '../contexts/keys'
import { FilesFlatProvider } from '../contexts/filesFlat'
import { FilesManagerProvider } from '../contexts/filesManager'
import { FilesDirectoryProvider } from '../contexts/filesDirectory'
import { UploadsProvider } from '../contexts/uploads'
import { AlertsProvider } from '../contexts/alerts'
import { UploadsManagerProvider } from '../contexts/uploadsManager'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <AppProvider>
      <ConfigProvider>
        <DialogProvider>
          <TransactionsProvider>
            <ContractsProvider>
              <HostsProvider>
                <FilesManagerProvider>
                  <UploadsManagerProvider>
                    <UploadsProvider>
                      <FilesDirectoryProvider>
                        <FilesFlatProvider>
                          <KeysProvider>
                            <AlertsProvider>
                              {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                              <Dialogs />
                              {children}
                            </AlertsProvider>
                          </KeysProvider>
                        </FilesFlatProvider>
                      </FilesDirectoryProvider>
                    </UploadsProvider>
                  </UploadsManagerProvider>
                </FilesManagerProvider>
              </HostsProvider>
            </ContractsProvider>
          </TransactionsProvider>
        </DialogProvider>
      </ConfigProvider>
    </AppProvider>
  )
}
