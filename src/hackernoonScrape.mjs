import fetch from 'isomorphic-fetch';
import { JSDOM } from 'jsdom';

const response = await fetch(
  'https://www.forextradingbig.com/instaforex-broker-review/?ref=hackernoon.com'
);
const htmlAsText = await response.text();
const dom = new JSDOM(htmlAsText);
console.log(`Has ${parseInt(dom.window.document.querySelector('.comments-box > h3').textContent)} posts`);
