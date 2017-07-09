import { createStream } from 'streams';

const answersURI = `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1XFE49bXPvVQtmYUhIfUTeynKVGfnFrbefoczInZtJtI`;

const loadAllQuestions = (cb) => {

  fetch(answersURI)
    .then(res => res.json())
    .then(cb);
};

export const getQuestionsStream = () => {

  return createStream(observer => {

    loadAllQuestions(questions => {

      map(question => observer.next(question))(questions);

      observer.complete();
    })
  });
};
