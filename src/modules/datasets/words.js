import { createStream } from 'streams';

const wordsURI = `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1XFE49bXPvVQtmYUhIfUTeynKVGfnFrbefoczInZtJtI`;

export const loadAllWords = (cb) => {

  return fetch(wordsURI)
    .then(res => res.json())
    .then(map(word => ({ name: `${word.id[0].toUpperCase()}${word.id.slice(1)}`, ...word })))
    // .then(cb);
};

export const getWordsStream = () => {

  return createStream(observer => {

    loadAllWords(words => {

      map(word => observer.next(word))(words);

      observer.complete();
    })
  });
};
