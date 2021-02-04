import { node, tran, toNode } from '../nodes.js';
import {
    addHtml,
    getHtml,
    getHtmls,
    putHtml,
    addCss,
    addClass,
    remClass
} from '../html.js';
import { component, getComp } from '../components.js';

const getTextEditableContent = div => {
    var innerText = div.innerText; // using innerText here because it preserves newlines
    if (innerText[innerText.length - 1] === '\n')
        innerText = innerText.slice(0, -1); // get rid of weird extra newline
    return innerText;
};

export const editor = component('editor', ({ root }, input) => {
    const initialH = 20;

    const textarea = getHtml(root, 'textarea');

    // var myCodeMirror = CodeMirror(document.body, {
    //     value: "function myScript(){return 100;}\n",
    //     mode:  "javascript"
    // });
    // var myCodeMirror = CodeMirror(function(elt) {
    //     textarea.parentNode.replaceChild(elt, textarea);
    // }, {value: ''});
    //
    var cm = CodeMirror.fromTextArea(textarea, {
        lineWrapping: true,
        viewportMargin: Infinity,
        mode: 'markdown',
        showCursorWhenSelecting: true
    });

    cm.setValue(`# Example
Write your post here! ![asdasdasd](img)`);
    setTimeout(() => {
        cm.refresh();
    })

    // cm.on('change', () => {
    //     cm.setSize('100%', '5px');
    //     const { height  } = cm.getScrollInfo();
    //     console.log('heigh', height);
    //     cm.setSize('100%', height + 'px');
    // });

    // editable.addEventListener('input', () => {
    //     // get contents
    //     const text = getTextEditableContent(editable);
    //     input.val = text;

    //     // resize div
    //     editable.style.height = '5px';
    //     const h = editable.scrollHeight;
    //     if (h <= initialH) {
    //         editable.style.height = initialH + 'px';
    //     } else {
    //         editable.style.height = h + 'px';
    //     }
    // });
});

export const createPostHTML = (root, content) => {
    const div = document.createElement('div');
    addClass(div, 'p-2');

    content.forEach(entry => {
        if (entry.par) {
            const par = entry.par;

            const p = document.createElement('p');
            p.style['font-size'] = '16px';
            p.style['text-align'] = 'left';
            p.innerText = par;

            div.append(p);
        } else if (entry.h1) {
            const title = entry.h1;

            const h1 = document.createElement('h1');
            h1.innerText = title;
            h1.style['font-size'] = '20px';
            h1.style['text-align'] = 'center';

            div.append(h1);
        } else if (entry.img) {
            const src = entry.img;

            const img = document.createElement('img');
            img.setAttribute('loading', 'lazy');
            img.setAttribute('src', src);
            img.style.width = '100%';

            div.append(img);
        }
    });

    root.innerHTML = '';
    root.append(div);
};

export const textToContent = txt => {
    const cells = txt.split('\n');

    const res = [];

    cells.forEach(cell => {
        if (cell != '') {
            if (cell.startsWith('#')) {
                const sep = cell.split('#');
                if (sep.length == 2) {
                    res.push({ h1: sep[1] });
                }
            } else if (cell.startsWith('!')) {
                const sep = cell.split('!');
                if (sep.length == 2) {
                    res.push({ img: sep[1] });
                }
            } else {
                res.push({ par: cell });
            }
        }
    });

    return res;
};

export const createPostHTMLFromText = (rectDiv, txt) =>
    createPostHTML(rectDiv, textToContent(txt));

export const preview = component('preview', ({ entry }, input) => {
    tran(input, val => {
        if (val === '') {
            addClass(entry, 'hidden');
        } else {
            remClass(entry, 'hidden');
            createPostHTMLFromText(entry, val);
        }
    });
});
