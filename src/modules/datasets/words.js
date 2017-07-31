import { createStream } from 'streams';
import { getIsProduction } from 'environment'

const wordsURI =
  getIsProduction()
    ? `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1XFE49bXPvVQtmYUhIfUTeynKVGfnFrbefoczInZtJtI`
    : `https://script.google.com/macros/s/AKfycbzT4ERAPkM2vyoUruIGLL7peNfhkmxGMzcEXniUO9iRCD49TIs/exec?doc_id=1QoLBcOl7UVGMeMSYzyBPA1h2pnFH033w_7ZbX8izDCI`;

export const loadAllWords = (cb) => {

  return fetch(wordsURI)
    .then(res => res.json())
    .then(map(word => ({ name: `${word.id[0].toUpperCase()}${word.id.slice(1)}`, ...word })))
    .then(shuffle);
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

//@todo move out of the data layer.
function shuffle(a0) {

    const a = [...a0];

    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
}
