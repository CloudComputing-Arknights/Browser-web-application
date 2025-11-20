# CreateTransactionReq


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requested_item_id** | **string** |  | [default to undefined]
**initiator_user_id** | **string** |  | [default to undefined]
**receiver_user_id** | **string** |  | [default to undefined]
**type** | **string** |  | [default to undefined]
**offered_item_id** | **string** |  | [optional] [default to undefined]
**offered_price** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to StatusEnum_Pending]
**message** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateTransactionReq } from './api';

const instance: CreateTransactionReq = {
    requested_item_id,
    initiator_user_id,
    receiver_user_id,
    type,
    offered_item_id,
    offered_price,
    status,
    message,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
