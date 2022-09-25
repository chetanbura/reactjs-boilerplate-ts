const prettier = require('prettier');
const _lodash = require('lodash');
const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = __dirname;

async function format(code) {
  const options = await prettier.resolveConfig(path.resolve(__dirname, '../../'));
  return prettier.format(code, {
    ...options,
  });
}

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

function actions(componentPath, pageType, subPageFor, name) {
  const actions = [];
  const sourcePath = path.join(componentPath, pageType === 'sub-page' ? `${subPageFor}/sub-pages` : '', '{{ kebabCase name }}');

  actions.push({
    type: 'add',
    path: path.join(sourcePath, 'index.tsx'),
    templateFile: path.join(TEMPLATE_DIR, 'index.tsx.hbs'),
    data: { isRootPage: pageType !== 'sub-page' }
  });

  actions.push({
    type: 'add',
    path: path.join(sourcePath, '{{ kebabCase name }}.module.scss'),
    templateFile: path.join(TEMPLATE_DIR, 'page.module.scss.hbs'),
  });

  if (pageType === 'root-page') {
    // Updating Nav meta for newly added page
    actions.push({
      type: 'modify',
      path: 'src/constants/navigation-meta.ts',
      pattern: '// PLOP_MODIFY_PATTERN_ROOT_NAV_META',
      template: `{
        path:'${name}',
        title:'{{ sentenceCase name }}',
        component:'${name}',
        // PLOP_MODIFY_PATTERN_NAV_META-${name}
      },
      // PLOP_MODIFY_PATTERN_ROOT_NAV_META`,
      transform: async function (code) {
        const formattedCode = await format(code);
        return formattedCode;
      }
    });
  }
  if (pageType === 'sub-page') {
    actions.push({
      type: 'modify',
      path: path.join(componentPath, subPageFor, 'index.tsx'),
      template: "import { Outlet } from 'react-router-dom';",
      pattern: "/* SUB-PAGE OUTLET IMPORT PATTERN */"
    });
    actions.push({
      type: 'modify',
      path: path.join(componentPath, subPageFor, 'index.tsx'),
      template: "<Outlet />",
      pattern: "{/* SUB-PAGE OUTLET INJECT PATTERN */}"
    });
    // Updating Nav meta for newly added page
    actions.push({
      type: 'modify',
      path: 'src/constants/navigation-meta.ts',
      transform: async function (code) {
        let rawCode = code;
        if (code.search(`// PLOP_MODIFY_PATTERN_NAV_META-${subPageFor}`) !== -1){
        const template = `subNav: [
            {
              path:'${name}',
              title:'${_lodash.startCase(name)}',
              component:'${name}',
            },
            // PLOP_APPEND_PATTERN_NAV_META-${subPageFor}
          ],`;
          rawCode = code.replace(`// PLOP_MODIFY_PATTERN_NAV_META-${subPageFor}`, template);
        } else if (code.search(`// PLOP_APPEND_PATTERN_NAV_META-${subPageFor}`) !== -1){
          const template = `{
              path:'${name}',
              title:'${_lodash.startCase(name)}',
              component:'${name}',
            },
            // PLOP_APPEND_PATTERN_NAV_META-${subPageFor}`;
          rawCode = code.replace(`// PLOP_APPEND_PATTERN_NAV_META-${subPageFor}`, template);
        }
        const formattedCode = await format(rawCode);
        return formattedCode;
      },
    });
  }
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
      return actions(componentPath, data.pageType, data.subPageFor, data.name);
    },
  });
};
