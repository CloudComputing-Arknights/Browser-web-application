# CreateOwnItemReq

Request body from frontend.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [default to undefined]
**condition** | [**ConditionType**](ConditionType.md) |  | [default to undefined]
**transaction_type** | [**TransactionType**](TransactionType.md) |  | [default to undefined]
**price** | **number** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**address_UUID** | **string** |  | [optional] [default to undefined]
**image_urls** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**category_ids** | **Array&lt;number&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateOwnItemReq } from './api';

const instance: CreateOwnItemReq = {
    title,
    condition,
    transaction_type,
    price,
    description,
    address_UUID,
    image_urls,
    category_ids,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
