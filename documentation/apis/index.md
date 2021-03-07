###API Documentation
Companies APIs are hosted on firebase cloud functions. To get the url go to the firebase console.  
  
These Apis are in another repository (not in this).

This project uses **_`express`_**
 
***********************

####Coding styles:
- This repository has a project structure like this:
    ```
    functions/src
        |- authApi/
        |   |- authApi.ts
        |   |- //... all the exported functions of pre auth apis
        |
        |- postAuthApi/
        |   |- postAuthApi.ts
        |   |- //... all the exported functions of post auth apis
        |
        |- index.ts
        |- firebaseAdmin.ts
        |- firebaseConfig.ts
    ```
  
- No body parser should be used in app middleware, instead, use specific body parser with every route.
- Till now three types of body parser has been configured in project:
    - json body parser from library **_`body-parser`_**. 
    - url encoded parser from library **_`body-parser`_**.
    - multipart parser (files or image) from library **_`multer`_**

--------------------------
Two types of api will be there:
- **Pre Auth Api**  
    - This api will not need any authorisation or ID tokens to use
    - These apis are not secured, so database or business logic work will be done with these apis.
    - These apis will be in route `<url>/authApi/<api_name>` 
    - For more info, refer **_`preAuthApi.md`_** 
    
---------------------

- **Post Auth Api**
    - These apis will be super secured with ID tokens in header of request.
    - No one can access these without active and accurate ID token from firebase. Also, this token expires every hour and new token is given to a user.
    - These apis will be used for storage and database access in firebase.
    - Most of the work will be done by this api.
    - These apis will be in route `<url>/postAuthApi/<api_name>`
    - in header **_`authorization`_** key should be there to access it. And the value will be something like **_`Bearer <id_token>`_**. This format is important.
    - In axios, do this 
    ```
    headers: 
    {
        'authorization': 'Bearer ' + token
    }
    ```
    - For more info, refer **_`postAuthApi.md`_**
