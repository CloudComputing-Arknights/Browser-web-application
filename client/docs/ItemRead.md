# ItemRead

Server representation returned to clients.

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
**item_UUID** | **string** |  | [default to undefined]
**categories** | [**Array&lt;CategoryRead&gt;**](CategoryRead.md) |  | [optional] [default to undefined]
**address** | [**AddressBase**](AddressBase.md) |  | [optional] [default to undefined]
**user** | [**PublicUserRes**](PublicUserRes.md) |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ItemRead } from './api';

const instance: ItemRead = {
    title,
    condition,
    transaction_type,
    price,
    description,
    address_UUID,
    image_urls,
    item_UUID,
    categories,
    address,
    user,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
