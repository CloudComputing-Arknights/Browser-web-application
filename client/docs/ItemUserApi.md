# ItemUserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createItemForMeMeItemsPost**](#createitemformemeitemspost) | **POST** /me/items | Create Item For Me|
|[**deleteMyItemMeItemsItemIdDelete**](#deletemyitemmeitemsitemiddelete) | **DELETE** /me/items/{item_id} | Delete My Item|
|[**getMyJobStatusMeItemsJobsJobIdGet**](#getmyjobstatusmeitemsjobsjobidget) | **GET** /me/items/jobs/{job_id} | Check status of job, store item-user relation when job is COMPLETED|
|[**listMyItemsMeItemsGet**](#listmyitemsmeitemsget) | **GET** /me/items | List My Items|
|[**updateMyItemMeItemsItemIdPatch**](#updatemyitemmeitemsitemidpatch) | **PATCH** /me/items/{item_id} | Update My Item|

# **createItemForMeMeItemsPost**
> JobRead createItemForMeMeItemsPost(createOwnItemReq)


### Example

```typescript
import {
    ItemUserApi,
    Configuration,
    CreateOwnItemReq
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemUserApi(configuration);

let createOwnItemReq: CreateOwnItemReq; //

const { status, data } = await apiInstance.createItemForMeMeItemsPost(
    createOwnItemReq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createOwnItemReq** | **CreateOwnItemReq**|  | |


### Return type

**JobRead**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**202** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteMyItemMeItemsItemIdDelete**
> any deleteMyItemMeItemsItemIdDelete()


### Example

```typescript
import {
    ItemUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemUserApi(configuration);

let itemId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteMyItemMeItemsItemIdDelete(
    itemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**string**] |  | defaults to undefined|


### Return type

**any**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyJobStatusMeItemsJobsJobIdGet**
> JobRead getMyJobStatusMeItemsJobsJobIdGet()


### Example

```typescript
import {
    ItemUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemUserApi(configuration);

let jobId: string; // (default to undefined)

const { status, data } = await apiInstance.getMyJobStatusMeItemsJobsJobIdGet(
    jobId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **jobId** | [**string**] |  | defaults to undefined|


### Return type

**JobRead**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listMyItemsMeItemsGet**
> any listMyItemsMeItemsGet()


### Example

```typescript
import {
    ItemUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemUserApi(configuration);

let skip: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)

const { status, data } = await apiInstance.listMyItemsMeItemsGet(
    skip,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skip** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|


### Return type

**any**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateMyItemMeItemsItemIdPatch**
> ItemRead updateMyItemMeItemsItemIdPatch(updateOwnItemReq)


### Example

```typescript
import {
    ItemUserApi,
    Configuration,
    UpdateOwnItemReq
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemUserApi(configuration);

let itemId: string; // (default to undefined)
let ifMatch: string; //ETag required for concurrent update protection (default to undefined)
let updateOwnItemReq: UpdateOwnItemReq; //

const { status, data } = await apiInstance.updateMyItemMeItemsItemIdPatch(
    itemId,
    ifMatch,
    updateOwnItemReq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateOwnItemReq** | **UpdateOwnItemReq**|  | |
| **itemId** | [**string**] |  | defaults to undefined|
| **ifMatch** | [**string**] | ETag required for concurrent update protection | defaults to undefined|


### Return type

**ItemRead**

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

