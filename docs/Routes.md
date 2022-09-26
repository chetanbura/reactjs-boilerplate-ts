# How to add new page route

- Execute the below generator

### `npm run generate`

It execute the script for plop generate

- Select the `page` option from generator script
- Select the appropriate options from below

  - `root-page`
  - `sub-page`

- `root-page`

  - `root-page` is the main page created under `/src/pages`
  - this will add route meta into `/src/constants/NavigationMeta.js`

- `sub-page`
  - on selection options `sub-page` you will see the list of existing pages created from folder `/src/pages`
  - You need to select the main page from the list
  - this will create your page under `/src/pages/${selected-page}`
  - this will add route meta into `/src/constants/NavigationMeta.js`

Note:

- The Routes are added into `src\helpers\components\routes-guard.tsx` no need to add specifically.
- The deletion of the page/route not available from `generator`
- While deleting any page please do not remove the `plop template` from any file.
