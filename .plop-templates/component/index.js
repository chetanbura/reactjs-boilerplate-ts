const prettier = require('prettier');
const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = __dirname;

async function format(code) {
  const options = await prettier.resolveConfig(path.resolve(__dirname, '../../'));
  return prettier.format(code, {
    ...options,
  });
}

/*
depend on name
*/
function actions(componentPath, aType, aSubType, skipTest) {
  const actions = [];
  const isSubType = ['ui', 'pages'].includes(aType);
  const sourcePath = path.join(
    componentPath,
    isSubType
      ? path.join(
          getComponentPath('', aSubType),
          aType === 'pages' ? 'components' : '',
          '{{ kebabCase name }}'
        )
      : '{{ kebabCase name }}'
  );

  actions.push({
    type: 'add',
    path: path.join(sourcePath, '{{kebabCase name}}.tsx'),
    templateFile: path.join(TEMPLATE_DIR, 'component.tsx.hbs'),
  });
  actions.push({
    type: 'add',
    path: path.join(sourcePath, '{{kebabCase name}}.module.scss'),
    templateFile: path.join(TEMPLATE_DIR, 'component.module.scss.hbs'),
  });
  if (!skipTest)
    actions.push({
      type: 'add',
      path: path.join(sourcePath, '{{kebabCase name}}.spec.tsx'),
      templateFile: path.join(TEMPLATE_DIR, 'component.spec.tsx.hbs'),
    });
  actions.push({
    type: 'add',
    path: path.join(sourcePath, '{{ kebabCase name }}.stories.tsx'),
    templateFile: path.join(TEMPLATE_DIR, 'component.stories.tsx.hbs'),
  });

  // Add to barrel file
  const barrelPath = path.join(sourcePath, '..', 'index.ts');
  if (fs.existsSync(barrelPath)) {
    actions.push({
      type: 'modify',
      path: barrelPath,
      pattern: '// PLOP_MODIFY_PATTERN_BARREL_FILE',
      template: `
      export { {{ properCase name }} } from './{{ kebabCase name }}/{{ kebabCase name }}';
      // PLOP_MODIFY_PATTERN_BARREL_FILE`,
      transform: async function (code) {
        const formattedCode = await format(code);
        return formattedCode;
      }
    });
  } else {
    actions.push({
      type: 'add',
      path: barrelPath,
      template: `
      export { {{ properCase name }} } from './{{ kebabCase name }}/{{ kebabCase name }}';
      // PLOP_MODIFY_PATTERN_BARREL_FILE`,
      transform: async function (code) {
        const formattedCode = await format(code);
        return formattedCode;
      }
    });
  }
  return actions;
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

module.exports = function (plop, source) {
  plop.setGenerator('component', {
    description: 'create component',
    prompts(inquirer) {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Select type of UI component',
          default: 'ui',
          choices() {
            return ['ui', 'pages', 'shared'];
          },
        },
        {
          type: 'list',
          name: 'subtype',
          message: 'Select base component for subcomponents',
          choices(data) {
            const componentPath = getComponentPath(source, data.type);
            return getFileDir(componentPath);
          },
          when(data) {
            return data.type === 'ui' || data.type === 'pages';
          },
        },
        {
          type: 'input',
          name: 'name',
          message: 'Input name of component',
        },
        {
          type: 'confirm',
          name: 'skipTest',
          message: 'Skip Test files?',
          default: false,
        },
      ]);
    },
    actions(data) {
      const componentPath = getComponentPath(source, data.type);
      return actions(componentPath, data.type, data.subtype, data.skipTest);
    },
  });
};

module.exports.actions = actions;
