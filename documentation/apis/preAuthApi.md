###Pre Auth Apis
As the name suggests, these apis are accessible to anyone without any authentication. No ID token is required to use these apis.
This means that these apis are very vulnerable to any one. **_`So no database or storage accessing should happen with these apis.`_**  

These apis should only be used either to facilitate the user authentication process or the processes which you want to have no authorisation (as, anyone can use it).

In this application, these apis can be accessed by : `<api_url>/authApi/<api_name>`.
Particular apis should be made in separate .ts files in `appBeforeAuth` directory.

`api_url` can be accessed from function `companyApis` in Firebase console.

These all apis are compiled in `appBeforeAuth.ts`. This exported module is the middleware of main app which has route `/authApi`. 
This is why these apis are accessed with route `/authApi`.
*****************************

####List of Pre Auth Functions

- [x] **_`checkNewUserStatus`_**
    - This api checks if signed in user is first time user or old user.
    - Module `checkNewUserStatus.ts` in `appBeforeAuth` folder has the logic for this api.
    - json Parser is needed by this api
    - this api can be accessed with _`<api_url>/authApi/checkNewUserStatus`_
