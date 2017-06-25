/**
 * @see https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
 */

// Instance of the `refreshButton` in the DOM.
const refreshButton = document.querySelector('.refresh__button');

// Stream of click events.
// -(Click)-|->
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

// Transform the stream of click events into a stream of URL strings.
// -(Click)-|->
// into
// -(`https://api.github.com/users?since=<Number>`)-|->
const requestOnRefreshStream = refreshClickStream
  .map(_ => `https://api.github.com/users?since=${ Math.floor( Math.random() * 500 ) }`);

// Stream of URL strings.
// -(`https://api.github.com/users`)-|->
const startupRequestStream = Rx.Observable.just(`https://api.github.com/users`);

// Merge
// -(`https://api.github.com/users`)-|->
// and
// -(`https://api.github.com/users?since=<Number>`)-|->
// into
// -(`https://api.github.com/users`)-(`https://api.github.com/users?since=<Number>`)-|->
const requestStream = Rx.Observable.merge(startupRequestStream, requestOnRefreshStream);

/* ALTERNATIVE 1
const requestStream = refreshClickStream
  .map(_ => `https://api.github.com/users?since=${ Math.floor( Math.random() * 500 ) }`)
  .merge(Rx.Observable.just(`https://api.github.com/users`));
*/

/* ALTERNATIVE 2
const requestStream = refreshClickStream
  .map(_ => `https://api.github.com/users?since=${ Math.floor( Math.random() * 500 ) }`);
  .startWith(`https://api.github.com/users`);
*/

/* ALTERNATIVE 3
const requestStream = refreshClickStream
  .startWith(`startup click`)
  .map(_ => `https://api.github.com/users?since=${ Math.floor( Math.random() * 500 ) }`);
*/

// Transform the stream of URL strings into a stream of streams.
// -(-(PROMISE)-|->)-|->
const responseStream = requestStream
  .flatMap(url => Rx.Observable.fromPromise(fetch(url)));

// const suggestion1Stream = responseStream
//   .map(users => users[ Math.floor( Math.random() * users.length ) ])
//   .merge(refreshClickStream.map(_ => null))
//   .startWith(null);

// Refresh single item button.
const close1Button = document.querySelector('.close__button');

// Stream of clicks on the close1Button.
const close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');

const suggestion1Stream = close1ClickStream
  .startWith('startup click')
  .combineLatest(responseStream, (click, users) => users[ Math.floor( Math.random() * users.length ) ])
  .merge(refreshClickStream.map(_ => null))
  .startWith(null);

// RENDERING

suggestion1Stream
  .subscribe(suggestion => {

    if (suggestion === null) {

      // Hide the first suggestion element
    } else {

      // Show the first suggestion element
      // Insert suggestion data.
    }
  });
























