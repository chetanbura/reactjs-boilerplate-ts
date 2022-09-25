---
title: 'React JS application boilerplate with TypeScript support'
author:
  - name: 'Chetan Bura'
    url: https://github.com/chetanbura
---

## Author

- Chetan Bura [@chetanbura](https://github.com/chetanbura)

## Stack

This project is made on base of

- [React v17](https://reactjs.org/docs/getting-started.html)
- [React Code-Splitting](https://reactjs.org/docs/code-splitting.html)
- [React Router v6](https://reactrouter.com/docs/en/v6)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky pre/post commit hook](https://typicode.github.io/husky/#/)
- [Storybook](https://storybook.js.org/)
- [Plop- Generators (component/page)](https://www.npmjs.com/package/plop)
- [Typescript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- Custom hooks for app configuration and Axios

# Getting Started with React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prepare the project

```sh
cp .env.sample .env.local

npm i

# Setup pre-commit hooks
npm run prepare

# Run app on local environment
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

### `npm run lint`

Find the eslint issue from the project folder.\

### `npm run lint:fix`

Auto fix the fixable eslint issue from the project folder.\

### `npm run format`

Format the all files with prettier from the project folder.\

### `npm run plop`

It initiate the generator script and used to generate pages/component as per options selected by users.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## Consider below libraries for faster development as per project need

#### React hook form

For form manipulation and validations etc [React hook form](https://www.npmjs.com/package/react-hook-form).

#### React Helmet

This reusable React component will manage all of your changes to the document head, for dynamic title update per page wise [React Helmet](https://www.npmjs.com/package/react-helmet).

#### React UI Libraries

1. [Chakra UI](https://chakra-ui.com/docs).
2. [Material UI](https://mui.com/material-ui/getting-started/overview/).
3. [Semantic UI React](https://react.semantic-ui.com/).
4. [AntD UI React](https://ant.design/docs/react/introduce).

---

### For more information please refer `/docs` section

---
