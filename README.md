# SecureVet Directory Structure

SecureVet directory follows Domain-Driven Design (DDD) using Nuxt layers

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
[ ]- Base reusable components [Buttons , Inputs, DropDowns, Modals, Typography]
[ ]- Localizations [AR, En]
[ ]- Moods [Dark ,Light]
[ ]- Auth system implementation using sessions for more security ['/auth' : public route to login ]
[ ]- Roles system ["Owner", "Administrator" , "Employee" , "user"]
[ ]- RBAC to mange roles permissions in server routes and UI
[ ]- '/users' : authorized server route Api call to retrieve users info with pagination and filter fields [GET ,POST ,PUT ,Delete ,GET:/id]
[ ]-unit test using Jest

### custom composables usage

#### useLocaleR() => used for navigateTo localization route { '/en/' or '/ar' } route path

#### useLocaleN() => used to return absolute route name without localization { '/en/' or '/ar' }  useLocaleN()

#### useApi() => used to make crude operation as top layer of request or as intercept (pre middleware or wrapper) for Async call you can add handleError or whiteList errors that user can see and track the other errors using sentry or any package you want

##### i get this error in 16/3/2025 "index.js:5"

 Uncaught SyntaxError: The requested module '/_nuxt/@fs/E:/programing/baseNuxt4/node_modules/unhead/dist/index.mjs?v=1dcb5680' does not provide an export named 'getActiveHead' (at index.js:5:10) " and that because i18n unstable release  link of issue https://github.com/nuxt/nuxt/issues/31265