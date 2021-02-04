import { isArray } from './utils/index.js';

export const getHtml = (...args) =>
    args.length == 1
        ? document.querySelector(args[0])
        : args[0].querySelector(args[1]);

export const getHtmls = (...args) =>
    args.length == 1
        ? document.querySelectorAll(args[0])
        : args[0].querySelectorAll(args[1]);

export const addHtml = (root, html) => {
    // let shadow = root.shadowRoot;

    // if (!shadow) {

    //     shadow = root.attachShadow({mode: 'open'});

    // }
    //
    if (!root) {
        document.body.appendChild(html);
    } else {
        root.appendChild(html);
    }
};

export const putHtml = (root, html) => {
    // let shadow = root.shadowRoot;

    // if (!shadow) {

    //     shadow = root.attachShadow({mode: 'open'});

    // }

    // shadow.innerHTML = html;

    root.innerHTML = html;
};

export const addCss = (elem, css) => {
    Object.entries(css).forEach(([key, val]) => {
        elem.style[key] = val;
    });
};

export const addClass = (elem, class_) => {
    elem.classList.add(class_);
};

export const remClass = (elem, class_) => {
    elem.classList.remove(class_);
};

// REVISAR NODES.js: DESTROY NODE È IMPORTANTE: quanto mais light melhor o arquivo e os objectos, melhor
