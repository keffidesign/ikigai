import { createStream } from 'streams';

const answersURI = `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1FR58xufUQ0YUGOMS0B8xomAq0eOaP4Cj6AVAtl0ZB3o`;

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
