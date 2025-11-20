# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authMeMeUserGet**](#authmemeuserget) | **GET** /me/user | Auth Me|
|[**createTransactionTransactionsTransactionPost**](#createtransactiontransactionstransactionpost) | **POST** /transactions/transaction | Create Transaction|
|[**createUserUsersPost**](#createuseruserspost) | **POST** /users | Create User|
|[**deleteTransactionTransactionsTransactionIdDelete**](#deletetransactiontransactionstransactioniddelete) | **DELETE** /transactions/{transaction_id} | Delete Transaction|
|[**getTransactionTransactionsTransactionIdGet**](#gettransactiontransactionstransactionidget) | **GET** /transactions/{transaction_id} | Get Transaction|
|[**listTransactionsTransactionsGet**](#listtransactionstransactionsget) | **GET** /transactions | List Transactions|
|[**rootGet**](#rootget) | **GET** / | Root|
|[**signInTokenPost**](#signintokenpost) | **POST** /token | Sign In|
|[**updateTransactionTransactionsTransactionIdPut**](#updatetransactiontransactionstransactionidput) | **PUT** /transactions/{transaction_id} | Update Transaction|

# **authMeMeUserGet**
> SignedInUserRes authMeMeUserGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authMeMeUserGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SignedInUserRes**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createTransactionTransactionsTransactionPost**
> TransactionRes createTransactionTransactionsTransactionPost(createTransactionReq)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateTransactionReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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

# **createUserUsersPost**
> SignedInUserRes createUserUsersPost(signUpReq)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    SignUpReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let signUpReq: SignUpReq; //

const { status, data } = await apiInstance.createUserUsersPost(
    signUpReq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpReq** | **SignUpReq**|  | |


### Return type

**SignedInUserRes**

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
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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

# **rootGet**
> any rootGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.rootGet();
```

### Parameters
This endpoint does not have any parameters.


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signInTokenPost**
> SignInRes signInTokenPost(signInReq)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    SignInReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let signInReq: SignInReq; //

const { status, data } = await apiInstance.signInTokenPost(
    signInReq
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signInReq** | **SignInReq**|  | |


### Return type

**SignInRes**

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

# **updateTransactionTransactionsTransactionIdPut**
> TransactionRes updateTransactionTransactionsTransactionIdPut(updateTransactionStatusReq)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTransactionStatusReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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

