import { createStream } from 'streams';
import { getIsProduction } from 'environment'

const answersURI =
  getIsProduction()
  ? `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1FR58xufUQ0YUGOMS0B8xomAq0eOaP4Cj6AVAtl0ZB3o`
  : `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1ZOTH5sbfeJTLxhkAHAP9aZ7us_UgE6OBe-uumWpopUY`;

export const loadAllAnswers = (cb) => {

  return fetch(answersURI)
    .then(res => res.json())
};


export const postAnswer = payload => {

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    fetch(answersURI, {
      mode: `no-cors`,
      method: `POST`,
      // headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log('POST', data))
      .catch(() => {});
};

export const getAnswersStream = () => {

  return createStream(observer => {

    loadAllAnswers(answers => {

      map(answer => observer.next(answer))(answers);

      observer.complete();
    })
  });
};
