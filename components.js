import { getHtml } from './html.js';
//import Components from './index.js';

export const component = (name, init) => {
    const template = document.getElementById(name);

    if (!template) {
        console.error('Template ' + name + ' does not exist');
    }

    const content = template.content;

    return (...args) => {
        const root = content.cloneNode(true);
        const entry = getHtml(root, 'entry');
        if (init) {
            init({ root, entry }, ...args);
        }
        return root;
    };
};

export const getComp = (root, name) => getHtml(root, 'c-' + name);
