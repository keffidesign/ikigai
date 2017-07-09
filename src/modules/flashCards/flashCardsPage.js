import { subscribe } from 'streams';
import { getQuestionsStream } from 'datasets';

const loadingPage = `
  <div class="content">
    <div>Loading...</div>
  </div>
`;

const emptyPage = () => `
  <div class="content">
    <div>Nothing to show.</div>
  </div>
`;

const questionPage = data => `
  <div class="content">
    <div class="word">${data.word}</div>
    <input class="answer" placeholder="Type answer here..."/>
  </div>
`;

const answerPage = data => `
  <div class="content">
    <div class="word">${data.word}</div>
    <div class="translation">${data.definition || data.translation}</div>
  </div>
`;

subscribe({
  next: data => document.body.innerHTML = questionPage(data),
  // complete: () => document.body.innerHTML = emptyPage()
}, getQuestionsStream());
