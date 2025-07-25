import Sia from '@siacentral/ledgerjs-sia'
import { LedgerDevice } from '../contexts/ledger/types'
import { transformAddressesResponse } from '../contexts/addresses/dataset'
import { Wallet, WalletAddressesResponse } from '@siafoundation/walletd-types'

export function getMockDevice() {
  return {
    type: 'HID',
    sia: {
      transport: {},
      getVersion: jest.fn(() => '0.4.5'),
      signTransaction: jest
        .fn()
        .mockReturnValueOnce(
          'Xt1EJckLmWXU+7HHHDN9bRV5KRuLdC4YY01LzaAMF269QH4hWV8zFkY3kCWs65svhb9HhA1Ix1MRGvhN9orBDpAA'
        )
        .mockReturnValueOnce(
          'fvmSaRzlO/n2L5tsT32e82kWqHnIjQJ8cqjWOc37TtlK6p/vIiOG+TO98HfvbgObTOYVqlKMtUyxTOjGb3bfCpAA'
        ),
      signV2Transaction: jest
        .fn()
        .mockReturnValueOnce(
          '5edd4425c90b9965d4fbb1c71c337d6d1579291b8b742e18634d4bcda00c176ebd407e21595f331646379025aceb9b2f85bf47840d48c753111af84df68ac10e'
        )
        .mockReturnValueOnce(
          '7ef992691ce53bf9f62f9b6c4f7d9ef36916a879c88d027c72a8d639cdfb4ed94aea9fef222386f933bdf077ef6e039b4ce615aa528cb54cb14ce8c66f76df0a'
        ),
      blindSign: jest
        .fn()
        .mockReturnValueOnce(
          'Xt1EJckLmWXU+7HHHDN9bRV5KRuLdC4YY01LzaAMF269QH4hWV8zFkY3kCWs65svhb9HhA1Ix1MRGvhN9orBDpAA'
        )
        .mockReturnValueOnce(
          'fvmSaRzlO/n2L5tsT32e82kWqHnIjQJ8cqjWOc37TtlK6p/vIiOG+TO98HfvbgObTOYVqlKMtUyxTOjGb3bfCpAA'
        ),
    } as unknown as Sia,
    transport: {
      forget: jest.fn(),
      deviceModel: {
        productName: 'Ledger Nano S',
      },
      _disconnectEmitted: false,
    },
  } as LedgerDevice
}

export function getMockAddresses({
  newWallet,
  walletAddressesResponse,
}: {
  newWallet: Wallet
  walletAddressesResponse: WalletAddressesResponse
}) {
  return transformAddressesResponse(
    walletAddressesResponse,
    newWallet.id,
    () => null
  )
}
