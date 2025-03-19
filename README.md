# Directory Structure

 directory follows Domain-Driven Design (DDD) using Nuxt layers
preview link: https://dahsboard-omega.vercel.app/en/
example for the directories

root/
├── public/
├── server/
├── app/                  <-- global, shared or one-off functionality
│   ├── _Auth      <-- module,feature or one functionality to control Authentication operations
│      ├── components/
│      ├── composables/
│         ├── api/
│           ├── useUsers()
│           ├── ...
│      ├── pages/
│      ├── layouts/
│      ├── middleware/
│      ├── stores/
│          ├── UserStore()
│          ├── ...
│   ├── assets/
│   ├── plugins/
│   ├── pages/
│      ├── about
│      ├── privacy-policy
│      ├── ...
│   ├── directives/
│   ├── app.vue
├── shared                 <-- global, shared between app and server
│   ├── types
│   ├── utils
├── server
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── middleware/
├── nuxt.config.ts
├── package.json
├── eslint.config.mjs
├── .eslintrc
├── locales/
├── .README.md
├── tailwind.config.js
├── tsconfig.json

## features

[*]- Project archtichtre [feature driven] and configurations
[*]- Base reusable components [Buttons , Inputs, DropDowns, Modals, Typography]
[*]- Localizations [AR, En]
[*]- Moods [Dark ,Light]
[*]- Auth system implementation using cookie  ['/auth' : public route to login ,'/users' : need Admin or Employee role to enter ]
[*]- Roles system [ "Admin" , "Employee" , "user"]
[*]- RBAC to mange roles permissions  UI
[*]- '/users' :  server route Api call to retrieve users info with pagination and filter fields [GET ,POST ,PUT ,Delete ,GET:/id]
[ ]-unit test using Jest no time available

### custom composables usage

#### useLocaleR() => used for navigateTo localization route { '/en/' or '/ar' } route path

#### useLocaleN() => used to return absolute route name without localization { '/en/' or '/ar' }  useLocaleN()

#### useApi() => used to make crude operation as top layer of request or as intercept (pre middleware or wrapper) for Async call you can add handleError or whiteList errors that user can see and track the other errors using sentry or any package you want

you need to copy .env.example and create your own .even

using aws s3 to upload images you can you cloudnairy or uploadthing just modify server/api/upload.ts and .env API key to match new keys

using no sql mongodb clusters to store the data

##### i get this error in 16/3/2025 "index.js:5"

 Uncaught SyntaxError: The requested module '/_nuxt/@fs/E:/programing/baseNuxt4/node_modules/unhead/dist/index.mjs?v=1dcb5680' does not provide an export named 'getActiveHead' (at index.js:5:10) " and that because i18n unstable release  link of issue https://github.com/nuxt/nuxt/issues/31265


Questions 
1. How would you optimize API calls in this application for performance?
using pagination - loading statemnt - prefetch - cache response you will find reuseabel composable useFetchWithCach used to store res in session 

2. Describe your approach to handling shared logic between components.
using props or slots in first creation make it accept modification with easy way and when need more fetures implement it based on props or route path or meta route in some cases  

3. How would you implement client-side data caching for this dashboard?
session or local storage be fine and when call again check if alredy key to this call retrieve response and return befor the call

4. What strategy would you use to scale this application if it needed to support hundreds of different user permission types?
fragments - .d.ts fils for more reusabel and needed types - also seperate the type file to related componenet or page or composable will make it easer

5. Explain your testing strategy and how you decided what to test.
forms and if conditions  alwayes need testing but in this project there was no time for test 

6. How would you handle offline capabilities in this application?
PWA stratigies (service workser) or workbox or local storage as in step 1 and 3 
