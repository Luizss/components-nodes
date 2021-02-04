import { node, tran, toNode } from './nodes.js';
import {
    addHtml,
    getHtml,
    getHtmls,
    putHtml,
    addCss,
    addClass,
    remClass
} from './html.js';
import { component, getComp } from './components.js';
import { sendQL } from './api.js';
import { editor, preview, createPostHTML } from './src/editor.js';

export const main = component('main', ({ root }) => {
    const headerRoot = getComp(root, 'header');
    addHtml(headerRoot, header());

    const input = node('');

    const editorRoot = getComp(root, 'editor');
    addHtml(editorRoot, editor(input));

    const previewRoot = getComp(root, 'preview');
    addHtml(previewRoot, preview(input));

    const orderRoot = getComp(root, 'order');
    addHtml(orderRoot, order(input));

    const postsRoot = getComp(root, 'posts');
    addHtml(postsRoot, posts(input));
});

export const header = component('header');

export const order = component('order', ({}, lal) => {});

export const posts = component('posts', ({ entry }) => {
    sendQL(
        `query GetAllPosts {
  posts(order_by: {gold: desc}) {
    content
    created_at
    gold
    id
    stars
  }
}`,
        res => {
            const posts = res.data.posts; //.filter((x,i) => i < 5);
            posts.forEach((pst, i) => {
                pst.number = i + 1;
                const postDom = post(pst);
                addHtml(entry, postDom);
            });
            console.log('posts', posts);
            //State.posts.val = posts.map(postTree);
        }
    );
});

export const post = component('post', ({ root, entry }, input) => {
    const { number, id, created_at, content, gold, stars } = input;

    //putHtml(entry, JSON.stringify(input));
    const entryNumber = getHtml(root, 'entry-number');
    const entryId = getHtml(root, '.entry-id');
    const entryCreatedAt = getHtml(root, 'entry-created-at');
    const entryGold = getHtml(root, 'entry-gold');
    const entryStars = getHtml(root, 'entry-stars');

    if (number == 1) {
        putHtml(entryNumber, number + 'st');
        addClass(entryNumber, 'bg-gold');
        addClass(entryNumber, 'text-royal');
    } else {
        putHtml(entryNumber, number + 'th');
    }

    putHtml(entryId, id);
    entryId.setAttribute('href', '#' + id);
    putHtml(entryCreatedAt, created_at);
    putHtml(entryGold, gold);
    putHtml(entryStars, stars);

    createPostHTML(entry, content);
});

const mainRoot = getHtml('main');
addHtml(mainRoot, main());
