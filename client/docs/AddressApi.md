# AddressApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteAddressAddressesAddressIdDelete**](#deleteaddressaddressesaddressiddelete) | **DELETE** /addresses/{address_id} | Delete Address|
|[**updateAddressAddressesAddressIdPut**](#updateaddressaddressesaddressidput) | **PUT** /addresses/{address_id} | Update Address|

# **deleteAddressAddressesAddressIdDelete**
> any deleteAddressAddressesAddressIdDelete()


### Example

```typescript
import {
    AddressApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AddressApi(configuration);

let addressId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteAddressAddressesAddressIdDelete(
    addressId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addressId** | [**string**] |  | defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateAddressAddressesAddressIdPut**
> AddressDTO updateAddressAddressesAddressIdPut(addressDTO)


### Example

```typescript
import {
    AddressApi,
    Configuration,
    AddressDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AddressApi(configuration);

let addressId: string; // (default to undefined)
let addressDTO: AddressDTO; //

const { status, data } = await apiInstance.updateAddressAddressesAddressIdPut(
    addressId,
    addressDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addressDTO** | **AddressDTO**|  | |
| **addressId** | [**string**] |  | defaults to undefined|


### Return type

**AddressDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

