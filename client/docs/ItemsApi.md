# ItemsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getPublicItemByIdItemsItemIdGet**](#getpublicitembyiditemsitemidget) | **GET** /items/{item_id} | Get an item by its id|
|[**listCategoriesItemsCategoriesGet**](#listcategoriesitemscategoriesget) | **GET** /items/categories | List Categories|
|[**listPublicItemsItemsGet**](#listpublicitemsitemsget) | **GET** /items/ | Get items through pagination.|

# **getPublicItemByIdItemsItemIdGet**
> ItemRead getPublicItemByIdItemsItemIdGet()

Get an item by its id

### Example

```typescript
import {
    ItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemsApi(configuration);

let itemId: string; // (default to undefined)

const { status, data } = await apiInstance.getPublicItemByIdItemsItemIdGet(
    itemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**string**] |  | defaults to undefined|


### Return type

**ItemRead**

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

# **listCategoriesItemsCategoriesGet**
> Array<CategoryRead> listCategoriesItemsCategoriesGet()


### Example

```typescript
import {
    ItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemsApi(configuration);

let skip: number; //Number of items to skip (optional) (default to 0)
let limit: number; //Max number of items to return (optional) (default to 10)

const { status, data } = await apiInstance.listCategoriesItemsCategoriesGet(
    skip,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skip** | [**number**] | Number of items to skip | (optional) defaults to 0|
| **limit** | [**number**] | Max number of items to return | (optional) defaults to 10|


### Return type

**Array<CategoryRead>**

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

# **listPublicItemsItemsGet**
> Array<ItemRead> listPublicItemsItemsGet()

Get items through pagination, can be filtered by ID, category, condition, transaction type

### Example

```typescript
import {
    ItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemsApi(configuration);

let id: Array<string>; //Filter by a list of item IDs (optional) (default to undefined)
let categoryId: number; //Filter by item\'s category (optional) (default to undefined)
let transactionType: TransactionType; //Filter by item\'s transaction type (optional) (default to undefined)
let search: string; //Search by item title (case-insensitive, partial match) (optional) (default to undefined)
let skip: number; //Number of items to skip (optional) (default to 0)
let limit: number; //Max number of items to return (optional) (default to 10)

const { status, data } = await apiInstance.listPublicItemsItemsGet(
    id,
    categoryId,
    transactionType,
    search,
    skip,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | **Array&lt;string&gt;** | Filter by a list of item IDs | (optional) defaults to undefined|
| **categoryId** | [**number**] | Filter by item\&#39;s category | (optional) defaults to undefined|
| **transactionType** | **TransactionType** | Filter by item\&#39;s transaction type | (optional) defaults to undefined|
| **search** | [**string**] | Search by item title (case-insensitive, partial match) | (optional) defaults to undefined|
| **skip** | [**number**] | Number of items to skip | (optional) defaults to 0|
| **limit** | [**number**] | Max number of items to return | (optional) defaults to 10|


### Return type

**Array<ItemRead>**

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

