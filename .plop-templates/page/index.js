const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = __dirname;

function getComponentPath(source, aType) {
  return path.join(source, aType.split('-')[0]);
}

function getFileDir(filePath) {
  return new Promise((resolve, reject) =>
    fs.readdir(filePath, (err, files) =>
      err ? reject(err) : resolve(files.filter((p) => !/[!^.]/.test(p)))
    )
  );
}

function actions(componentPath, pageType, subPageFor) {
  const actions = [];
  const sourcePath = path.join(componentPath, pageType === 'sub-page' ? `${subPageFor}/sub-pages` : '', '{{ kebabCase name }}');

  actions.push({
    type: 'add',
    path: path.join(sourcePath, 'index.js'),
    templateFile: path.join(TEMPLATE_DIR, 'index.js.hbs'),
    data: {
      isSubPage: pageType === 'sub-page'
    }
  });

  actions.push({
    type: 'add',
    path: path.join(sourcePath, '{{ kebabCase name }}.module.css'),
    templateFile: path.join(TEMPLATE_DIR, 'page.module.css.hbs'),
  });

  return actions;
}

module.exports = function (plop, source) {
  plop.setGenerator('page', {
    description: 'create page',
    prompts: [
      {
        type: 'list',
        name: 'pageType',
        message: 'Creating for Root-Page or Sub-Page?',
        default: 'root-page',
        choices() {
          return ['root-page', 'sub-page'];
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Input name of page',
      },
      {
        type: 'list',
        name: 'subPageFor',
        message: 'Select Page for which create sub-page',
        choices() {
          const componentPath = getComponentPath(source, 'pages');
          return getFileDir(componentPath);
        },
        when(data) {
          return data.pageType === 'sub-page';
        },
      },
    ],
    actions(data) {
      const componentPath = getComponentPath(source, 'pages');
      return actions(componentPath, data.pageType, data.subPageFor);
    },
  });
};
