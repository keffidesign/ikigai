import { createStream, subscribe } from 'streams';
import { getAnswersStream } from 'datasets/answers.js';

// import { main } from '../../../experiments';

const answersStream = getAnswersStream();

subscribe(answer => console.log(`--answer`, answer), answersStream);

export const getQuestionsStream = () => answersStream;

// import Rx from 'rxjs';
// import './flashCards.css'
//
// import data0 from '../../../mockups/dataset.json';
// let data = data0.slice(0, 100);
//
// const toPageTemplate = data => `
//   <div class="content">
//     <div class="word">${data.word}</div>
//     <div class="translation">${data.definition || data.translation}</div>
//     <input class="answer" placeholder="Type answer here..."/>
//   </div>
// `;
//
// document.body.innerHTML = toPageTemplate({ word: "Loading...", translation: ""});
//
// const isPrevious = e => [ 'ArrowLeft' ].includes(e.key);
// const isNext = e => [ 'Enter', ' ', 'ArrowRight' ].includes(e.key);
//
// const isNotPositive = e => [ 'Escape' ].includes(e.key);
//
// const isNavigationKey = e => isPrevious(e) || isNext(e) || isNotPositive(e);
//
//
// const writeLog = (body) => {
//
//   const url = `https://script.google.com/macros/s/AKfycbwsCP5PTcT5mOrVvqGZ9tbpWVeOsknXX2Bs-BTv6wPBOEN9J14/exec`;
//
//   const headers = new Headers({
//     "Content-Type": "application/json"
//   });
//
//   fetch(url, {
//     method: `POST`,
//     // headers,
//     body: JSON.stringify(body)
//   })
//     .then(res => res.json())
//     .then(data => console.log('POST', data))
//     .catch(() => {});
// };
//
// let isPositive = false;
//
// Rx.Observable.fromEvent(document, 'keyup')
//   .filter(isNavigationKey)
//   .map(e => {
//
//
//     // return isNext(e) ? 1 : -1
//
//     console.log(e);
//
//     isPositive = !isNotPositive(e);
//
//     return 1;
//   })
//   .scan((acc, one) => {
//
//     return acc + one;
//
//     // return acc + one <= 0 ? 0 : acc + one >= data.length -1 ? data.length : acc + one;
//   }, 0)
//   // .startWith(0)
//   .map(index => {
//
//
//     const i = index >= data.length ? data.length - 1 : index - 1;
//
//     console.log('index', index, i, data.length, data);
//
//
//
//     if(index <= data.length) {
//
//       writeLog({ ...data[i], isPositive: isPositive, createdAt: Date.now() });
//     }
//
//     return index >= data.length ?
//       toPageTemplate({ word: "You have completed all words for today.", translation: "Please work on me if you have a moment. (Ikigai)"})
//       :
//       toPageTemplate(data[index]);
//   })
//   .subscribe(template => document.body.innerHTML = template);
//
// import { main } from '../../../experiments';
//
// const fetchAllLogs = () => {
//
//   return fetch('https://script.google.com/macros/s/AKfycbwsCP5PTcT5mOrVvqGZ9tbpWVeOsknXX2Bs-BTv6wPBOEN9J14/exec')
//     .then(res => res.json())
//     .then(data1 => data = main(data1.reverse()))
//     .then(() => document.body.innerHTML = toPageTemplate(data[0] || { word: "Dulcet", translation: "Pleasing to the ear"}));
//     // .then(() => document.body.innerHTML = toPageTemplate(data[0] || { word: "You have completed all words for today.", translation: "Please work on me if you have a moment. (Ikigai)"}));
// };
//
// fetchAllLogs();



