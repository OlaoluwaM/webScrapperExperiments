import fetch from 'isomorphic-fetch';
import { JSDOM } from 'jsdom';

const response = await fetch(
  'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'
);

const htmlAsText = await response.text();
const dom = new JSDOM(htmlAsText);

const wikiLinksOfPresidents = Array.from(
  dom.window.document.body.querySelectorAll('td > b > a')
).map(elem => elem.href);

const aggregatedPresidentData = [];

for await (let wikiLink of wikiLinksOfPresidents) {
  const potustWikiPage = await fetch(`https://en.wikipedia.org${wikiLink}`);
  const wikiPageHtmlAsText = await potustWikiPage.text();
  const wikiPageDom = new JSDOM(wikiPageHtmlAsText);

  const presidentDataObj = {
    name:
      wikiPageDom.window?.document?.body?.querySelector('h1.firstHeading')?.textContent ??
      'Not found',
    birthday:
      new Date(
        `${wikiPageDom.window?.document?.body?.querySelector('span.bday')?.textContent}:`
      ).toDateString() ?? 'Not found',
  };
  aggregatedPresidentData.push(presidentDataObj);
}

console.log(aggregatedPresidentData);
