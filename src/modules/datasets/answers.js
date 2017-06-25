import { createStream } from 'streams';

const answersURI = `https://script.google.com/macros/s/AKfycbwsCP5PTcT5mOrVvqGZ9tbpWVeOsknXX2Bs-BTv6wPBOEN9J14/exec`;

const loadAllAnswers = (cb) => {

  fetch(answersURI)
    .then(res => res.json())
    .then(cb);
};

export const getAnswersStream = () => {

  return createStream(observer => {

    loadAllAnswers(answers => {

      map(answer => observer.next(answer))(answers);

      observer.complete();
    })
  });
};
