import { render } from 'ui';
import { createStream, subscribe } from 'streams';
import { getWordsStream, loadAllWords, loadAllAnswers, postAnswer } from 'datasets';
import Rx from 'rxjs';

const loadingPage = `
  <div class="content">
    <div class="loading">Loading...</div>
  </div>
`;

const emptyPage = `
  <div class="content">
    <div class="empty">Nothing to show.</div>
  </div>
`;

const questionPage = data => `
  <div class="content">
    <div class="word">${data.name || data.id}</div>
    <input type="text" class="answer" placeholder="Type answer here..." data-id="${data.id}" />
  </div>
`;

const answerPage = data => `
  <div class="content">
    <div class="word">${data.word}</div>
    <div class="translation">${data.definition || data.translation}</div>
  </div>
`;

const updateQuestion = data => {

  document.querySelector('.word').innerHTML = data.name;
  const answer = document.querySelector('.answer');

  answer.value = '';
  answer.dataset.id = data.id;
};

render(document.body, loadingPage);

loadAllAnswers()
  .then(answers => {

    const newAnswers = answers
      .filter(answer => (new Date(answer.date)).getDate() === (new Date()).getDate())
      .map(answer => answer.id);

    console.log('--newAnswers', newAnswers);

    loadAllWords()
      .then(words => {

        let newWords = words.filter(word => !newAnswers.includes(word.id));

        if (!newWords.length) {

          return render(document.body, emptyPage);
        }


        render(document.body, questionPage(newWords[0]));

        const answersStream = Rx.Observable.fromEvent(document.querySelector('.answer'), 'change')
          .subscribe(value => {
            console.log('--value', value.target && value.target.dataset.id);

            const id = value.target.dataset.id;

            newWords = newWords.filter(word => word.id !== id);

            postAnswer({ id, enteredValue: value.target.value, date: (new Date()).toISOString() });

            console.log('--newWords', newWords, id);

            if (newWords.length) {

              updateQuestion(newWords[0]);
            } else {

              render(document.body, emptyPage);
            }
          })
      });
  })




