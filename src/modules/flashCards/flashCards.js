import { render } from 'ui';
import { createStream, subscribe } from 'streams';
import { getWordsStream, loadAllWords, loadAllAnswers, postAnswer } from 'datasets';
import Rx from 'rxjs';
import moment from 'moment';

const starSucceed = `<div class="star star--succeed">★</div>`;
const starFailed = `<div class="star star--failed">★</div>`;
const starEmpty = `<div class="star star--empty">☆</div>`;

const renderStar = star => {

  if (star === 'empty') return starEmpty;

  return star === 'succeed' ? starSucceed : starFailed;
};

const renderStars = stars => `<div class="stars">${ map(star => renderStar(star))(stars).join('') }</div>`;

const loadingPage = `
  <div class="content">
    <div class="loading">Loading...</div>
  </div>
`;

const emptyPage = stars => `
  <div class="content">
    <div class="empty">Nothing to show.</div>
    ${renderStars(stars)}
  </div>
`;

const questionPage = (data, stars) => `
  ${renderStars(stars)}
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

    loadAllWords()
      .then(words => {

        console.log('--newAnswers', newAnswers);

        let newWords = words.filter(word => !newAnswers.includes(word.id));

        const stars = calculateStars(answers, !newWords.length);

        if (!newWords.length) {

          return render(document.body, emptyPage(stars));
        }

        render(document.body, questionPage(newWords[ 0 ], stars));

        const answersStream = Rx.Observable.fromEvent(document, 'keyup')
          .filter(e => {

            const input = document.querySelector('.answer');

            console.log('--13', input && input.value);

            return e.keyCode === 13 && input && !!input.value;
          })
          .subscribe(() => {

            const target = document.querySelector('.answer');

            const id = target.dataset.id;

            newWords = newWords.filter(word => word.id !== id);

            postAnswer({ id, enteredValue: target.value, date: (new Date()).toISOString(), userAgent: navigator.userAgent });

            console.log('--newWords', newWords, id);

            if (newWords.length) {

              updateQuestion(newWords[ 0 ]);
            } else {

              const stars = calculateStars(answers, true);

              render(document.body, emptyPage(stars));
            }
          })
      });
  })

function calculateStars(answers, todayCompleted) {

  let smallestDay = (new Date(answers[0].date)).getDate();
  let maxDay = (new Date(answers[0].date)).getDate();

  const days = reduce((hash, answer) => {

    const day = (new Date(answer.date)).getDate();

    if (day < smallestDay) { smallestDay = day }
    if (day > maxDay) { maxDay = day }

    return { ...hash, [day]: true }
  }, {}, answers);

  const todayDate = moment.utc().date();

  const stars = new Array(moment().daysInMonth() - smallestDay + 1).fill()
    .map((_, i) => {

      const day = i + smallestDay;

      console.log('--day', day);

      if (day > maxDay) { return 'empty' }

      if (day === todayDate && !todayCompleted) { return 'empty' }

      return days[day] ? 'succeed' : 'failed';
    });

  console.log('--days', stars, answers, days);

  return stars
}



