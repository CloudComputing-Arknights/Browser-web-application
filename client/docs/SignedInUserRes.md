# SignedInUserRes


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**username** | **string** |  | [default to undefined]
**email** | **string** |  | [default to undefined]
**phone** | **string** |  | [optional] [default to undefined]
**birth_date** | **string** |  | [optional] [default to undefined]
**avatar_url** | **string** |  | [optional] [default to undefined]
**addresses** | [**Array&lt;AddressDTO&gt;**](AddressDTO.md) |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { SignedInUserRes } from './api';

const instance: SignedInUserRes = {
    id,
    username,
    email,
    phone,
    birth_date,
    avatar_url,
    addresses,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
