###Steps taken to link firebase in android

****************************

- [x] install _`@react-native-firebase/app`_ package   
    - **_`npm install --save @react-native-firebase/app`_**
    
- [x] change native codes:
    - reference: **_`https://rnfirebase.io/#2-android-setup`_**
    - download `google-services.json` from firebase console and place it inside of your project at the following location: `/android/app/google-services.json`
    - create file `android/local.properties` and write `sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk`
    - run command _**`cd android && gradlew signingReport`**_. You will get SHA1 key and other keys.
    - First, add the google-services plugin as a dependency inside of your `/android/build.gradle` file:
    ```
    buildscript {
         dependencies {
           // ... other dependencies
           classpath 'com.google.gms:google-services:4.2.0'
           // Add me --- /\
         }
    }
    ```
    - Lastly, execute the plugin by adding the following to your `/android/app/build.gradle` file:
    
    ```
        apply plugin: 'com.android.application'
        apply plugin: 'com.google.gms.google-services' // <- Add this line
    ```
  
*********************************************

####Enabling multidex support in android

- [x] reference: `https://rnfirebase.io/enabling-multidex`
- [x] Open the /android/app/build.gradle file. Under dependencies we need to add the module, and then enable it within the defaultConfig:
```
android {
    defaultConfig {
        // ...
        multiDexEnabled true // <-- ADD THIS in the defaultConfig sectino
    }
    // ...
}

dependencies {
  implementation 'androidx.multidex:multidex:2.0.1'  // <-- ADD THIS DEPENDENCY
}

```

- [x] alter your `android/app/src/main/java/.../MainApplication.java` file to extend MultiDexApplication like so:

```
// ... all your other imports here
import androidx.multidex.MultiDexApplication; // <-- ADD THIS IMPORT


// Your class definition needs `extends MultiDexApplication` like below
public class MainApplication extends MultiDexApplication implements ReactApplication {
```  
*********************************************

####Increasing Android build memory

- [x] To avoid `OutOfMemory` errors during Android builds, you should uncomment the alternate Gradle memory setting present in `/android/gradle.properties`:
```
# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx10248m -XX:MaxPermSize=256m
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```
**********************************

####Overriding Native SDK Versions

- [x] Within your projects `/android/app/build.gradle` file, provide your own versions by specifying any of the following options shown below:

```
project.ext {
  set('react-native', [
    versions: [
      // Overriding Build/Android SDK Versions
      android : [
        minSdk    : 16,
        targetSdk : 28,
        compileSdk: 28,
        buildTools: "28.0.3"
      ],

      // Overriding Library SDK Versions
      firebase: [
        // Override Firebase SDK Version
        bom           : "21.1.0"
      ],
    ],
  ])
}
```
**********************************

####Packages used

- [x] npm install --save @react-native-firebase/auth
