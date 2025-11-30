# TransactionApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createTransactionTransactionsTransactionPost**](#createtransactiontransactionstransactionpost) | **POST** /transactions/transaction | Create Transaction|
|[**deleteTransactionTransactionsTransactionIdDelete**](#deletetransactiontransactionstransactioniddelete) | **DELETE** /transactions/{transaction_id} | Delete Transaction|
|[**getTransactionTransactionsTransactionIdGet**](#gettransactiontransactionstransactionidget) | **GET** /transactions/{transaction_id} | Get Transaction|
|[**listTransactionsTransactionsGet**](#listtransactionstransactionsget) | **GET** /transactions | List Transactions|
|[**updateTransactionTransactionsTransactionIdPut**](#updatetransactiontransactionstransactionidput) | **PUT** /transactions/{transaction_id} | Update Transaction|

# **createTransactionTransactionsTransactionPost**
> TransactionRes createTransactionTransactionsTransactionPost(createTransactionReq)


### Example

```typescript
import {
    TransactionApi,
    Configuration,
    CreateTransactionReq
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionApi(configuration);

let createTransactionReq: CreateTransactionReq; //
let xIdempotencyKey: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.createTransactionTransactionsTransactionPost(
    createTransactionReq,
    xIdempotencyKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTransactionReq** | **CreateTransactionReq**|  | |
| **xIdempotencyKey** | [**string**] |  | (optional) defaults to undefined|


### Return type

**TransactionRes**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteTransactionTransactionsTransactionIdDelete**
> TransactionRes deleteTransactionTransactionsTransactionIdDelete()


### Example

```typescript
import {
    TransactionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionApi(configuration);

let transactionId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteTransactionTransactionsTransactionIdDelete(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionRes**

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

# **getTransactionTransactionsTransactionIdGet**
> TransactionRes getTransactionTransactionsTransactionIdGet()


### Example

```typescript
import {
    TransactionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionApi(configuration);

let transactionId: string; // (default to undefined)

const { status, data } = await apiInstance.getTransactionTransactionsTransactionIdGet(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionRes**

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

# **listTransactionsTransactionsGet**
> Array<TransactionRes> listTransactionsTransactionsGet()


### Example

```typescript
import {
    TransactionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionApi(configuration);

let statusParam: 'pending' | 'accepted' | 'rejected' | 'canceled' | 'completed'; // (optional) (default to undefined)
let initiatorUserId: string; // (optional) (default to undefined)
let receiverUserId: string; // (optional) (default to undefined)
let requestedItemId: string; // (optional) (default to undefined)
let type: 'trade' | 'purchase'; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.listTransactionsTransactionsGet(
    statusParam,
    initiatorUserId,
    receiverUserId,
    requestedItemId,
    type,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **statusParam** | [**&#39;pending&#39; | &#39;accepted&#39; | &#39;rejected&#39; | &#39;canceled&#39; | &#39;completed&#39;**]**Array<&#39;pending&#39; &#124; &#39;accepted&#39; &#124; &#39;rejected&#39; &#124; &#39;canceled&#39; &#124; &#39;completed&#39;>** |  | (optional) defaults to undefined|
| **initiatorUserId** | [**string**] |  | (optional) defaults to undefined|
| **receiverUserId** | [**string**] |  | (optional) defaults to undefined|
| **requestedItemId** | [**string**] |  | (optional) defaults to undefined|
| **type** | [**&#39;trade&#39; | &#39;purchase&#39;**]**Array<&#39;trade&#39; &#124; &#39;purchase&#39;>** |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **offset** | [**number**] |  | (optional) defaults to 0|


### Return type

**Array<TransactionRes>**

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

# **updateTransactionTransactionsTransactionIdPut**
> TransactionRes updateTransactionTransactionsTransactionIdPut(updateTransactionStatusReq)


### Example

```typescript
import {
    TransactionApi,
    Configuration,
    UpdateTransactionStatusReq
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionApi(configuration);

let transactionId: string; // (default to undefined)
let updateTransactionStatusReq: UpdateTransactionStatusReq; //

const { status, data } = await apiInstance.updateTransactionTransactionsTransactionIdPut(
    transactionId,
    updateTransactionStatusReq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTransactionStatusReq** | **UpdateTransactionStatusReq**|  | |
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionRes**

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

