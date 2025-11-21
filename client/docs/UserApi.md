# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authMeMeUserGet**](#authmemeuserget) | **GET** /me/user | Auth Me|
|[**createUserUsersPost**](#createuseruserspost) | **POST** /users | Create User|
|[**signInTokenPost**](#signintokenpost) | **POST** /token | Sign In|

# **authMeMeUserGet**
> SignedInUserRes authMeMeUserGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.authMeMeUserGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SignedInUserRes**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createUserUsersPost**
> SignedInUserRes createUserUsersPost(signUpReq)


### Example

```typescript
import {
    UserApi,
    Configuration,
    SignUpReq
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

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

# **signInTokenPost**
> SignInRes signInTokenPost(signInReq)


### Example

```typescript
import {
    UserApi,
    Configuration,
    SignInReq
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

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

