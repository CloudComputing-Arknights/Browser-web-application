# UpdateOwnItemReq


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [optional] [default to undefined]
**condition** | [**ConditionType**](ConditionType.md) |  | [optional] [default to undefined]
**transaction_type** | [**TransactionType**](TransactionType.md) |  | [optional] [default to undefined]
**price** | **number** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**category_ids** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**address_UUID** | **string** |  | [optional] [default to undefined]
**image_urls** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateOwnItemReq } from './api';

const instance: UpdateOwnItemReq = {
    title,
    condition,
    transaction_type,
    price,
    description,
    category_ids,
    address_UUID,
    image_urls,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
