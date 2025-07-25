# @siafoundation/explored-types

## 0.19.1

### Patch Changes

- 388a7f38: The library is now published in both ESM and CJS.
- Updated dependencies [388a7f38]
  - @siafoundation/types@0.12.1

## 0.19.0

### Minor Changes

- 6f8085ed: Fixed typings around SiacoinOutput and SiafundOutput routes.

### Patch Changes

- 3571359f: Fixed v1 ExplorerTransaction arbitraryData type.
- Updated dependencies [3571359f]
- Updated dependencies [b57aee94]
- Updated dependencies [3571359f]
  - @siafoundation/types@0.12.0

## 0.18.0

### Minor Changes

- 98c1eb3b: Refactored ExplorerV2Transaction to match explored implementation.

## 0.17.0

### Minor Changes

- 66ecafa1: Added renewedFrom/To keys to the v2 contract type.

### Patch Changes

- Updated dependencies [ca620883]
- Updated dependencies [8a0a34c0]
- Updated dependencies [8a0a34c0]
- Updated dependencies [8a0a34c0]
- Updated dependencies [4f1fb6eb]
  - @siafoundation/types@0.11.0

## 0.16.0

### Minor Changes

- b95e34d7: Added explorerTip API.
- cefe1ef1: Added support for v2 types.
- 05b0b5b4: Updated to new hostByPubkey URL.
- f3480b15: Fixed missing address event types.
- 6547d895: Added unconfirmed address events API.

## 0.15.0

### Minor Changes

- 17d53d9b: Added v2Settings to HostMetrics.
- 5c8694b1: Added host netaddress search. Closes https://github.com/SiaFoundation/web/issues/977

### Patch Changes

- Updated dependencies [eb4b6a1f]
  - @siafoundation/types@0.10.0

## 0.14.0

### Minor Changes

- ea9cc58f: Fixed v2 host protocol version.

### Patch Changes

- Updated dependencies [cad48e35]
- Updated dependencies [ce20d281]
  - @siafoundation/types@0.9.0

## 0.13.0

### Minor Changes

- 61af4d04: Rearranged location data for the ExplorerHost type to match explored.
- 443c4a47: Add v2 Host support.

### Patch Changes

- Updated dependencies [a8e77c6c]
  - @siafoundation/types@0.8.1

## 0.12.0

### Minor Changes

- 2ab9ec6e: Add exchange rate API.
- b0a1ea99: Added HostsList API.

### Patch Changes

- Updated dependencies [ef647e54]
  - @siafoundation/types@0.8.0

## 0.11.0

### Minor Changes

- b53dc63a: Modifed Event type to match developing explored implementation.
- 2207daf7: Fixed address routes to return arrays and use ExplorerEvent type.
- 84c409e9: Added 'host' to SearchResultType.

## 0.10.0

### Minor Changes

- 292e6e23: Rename block metrics APIs.
- 7a93acf1: Add hostMetrics API.

## 0.9.0

### Minor Changes

- 288841e4: Removed possibly null option for confirmation fields on ExplorerFileContract.
- cf5c2842: Added the HostByPubkey API.
- ecec83f1: Updated ExplorerFileContract type for refactored inclusion of output ID.

### Patch Changes

- Updated dependencies [36b55f89]
  - @siafoundation/types@0.7.0

## 0.8.0

### Minor Changes

- 2bb6a0d3: In ExplorerFileContract, changed confirmationIndex and confirmationTxnID to possibly null.
- f3686029: Changed all fields except id to optional on the ExplorerTransaction type.

## 0.7.0

### Minor Changes

- 24ce33b9: Added contractionRevisions API.
- 866fc68d: Added transactionID property to the ExplorerFileContract type.
- 9ba91ad7: Re-export base SiacoinOutput type.
- 411e378d: Added null case to proof\* fields in the ExplorerFileContract type.

## 0.6.0

### Minor Changes

- 7767e65a: Added confirmation transaction and proof transaction information to the ExplorerFileContract type.

## 0.5.0

### Minor Changes

- 24b984b2: Added host announcements to the ExplorerTransaction type.

## 0.4.0

### Minor Changes

- ff5dc113: Added the TransactionChainIndices API.
- 79470441: Added the ExplorerSiacoinInput and ExplorerSiafundInput types.

## 0.3.0

### Minor Changes

- a0aff962: Add timestamp field to ExplorerBlock type.
- f3100c8e: Change Source type from number to string to match responses.

## 0.2.0

### Minor Changes

- 5e478dc3: Added id field to ExplorerTransaction type.
- 6bb9322f: Updated routes to match explored API changes.
- 3c66edbb: Fixed webpack-related empty export warning.

## 0.1.0

### Minor Changes

- 04b45f7d: Added the explored-types, js, and react libraries.

### Patch Changes

- Updated dependencies [04b45f7d]
  - @siafoundation/types@0.6.0

## 0.0.1

### Patch Changes

- Updated dependencies [a64f40cc]
  - @siafoundation/types@0.5.0
