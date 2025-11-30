# AddressUserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createMyAddressMeAddressesPost**](#createmyaddressmeaddressespost) | **POST** /me/addresses | Create My Address|

# **createMyAddressMeAddressesPost**
> AddressDTO createMyAddressMeAddressesPost(addressDTO)


### Example

```typescript
import {
    AddressUserApi,
    Configuration,
    AddressDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AddressUserApi(configuration);

let addressDTO: AddressDTO; //

const { status, data } = await apiInstance.createMyAddressMeAddressesPost(
    addressDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addressDTO** | **AddressDTO**|  | |


### Return type

**AddressDTO**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

