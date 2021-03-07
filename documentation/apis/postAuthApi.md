###Post Auth Apis
As the name suggests, these apis are only accessible to anyone if they have authenticated by us. Auth ID token is required to use these apis.
This means that these apis are very secured by nature and no one can access it without those tokens.
Those ID tokens from firebase are short lived (about an hour) and then new token is provided to the user.
So if tokens leak then also apis are safe. 
**_`So database or storage accessing should happen with these apis.`_**  

This security magic happens using `validateFirebaseIdToken` middleware.
This middleware's logic id in file `validateFirebaseIdToken.ts`.
It checks for the authorisation token in header of request. If it gets the token then it verifies it with firebase verify method. If verification also passes, then only api can be accessed, otherwise, Unauthorised message is sent.

```
    headers: 
    {
        'authorization': 'Bearer ' + token
    }
```

In this application, these apis can be accessed by : `<api_url>/postAuthApi/<api_name>`.
Particular apis should be made in separate .ts files in `appAfterAuth` directory.

`api_url` can be accessed from function `companyApis` in Firebase console.

These all apis are compiled in `appAfterAuth.ts`. This exported module is the middleware of main app which has route `/postAuthApi`. 
This is why these apis are accessed with route `/postAuthApi`.
*****************************

####List of Post Auth Functions

- [x] **_`updateUserData`_**  
    - `POST` method
    - This api update the user data in Firestore and auth data.
    - Module `updateUserData.ts` in `appAfterAuth` folder has the logic for this api.
    - json Parser is needed by this api
    - this api can be accessed with _`<api_url>/postAuthApi/updateUserData`_

- [x] **_`kycDetailsUpload`_**
- [x] **_`downloadBusinessCard`_**
- [x] **_`saveNewUserInDb`_**

