import Rx from 'rxjs';

export const createStream = (cb) => {

  return Rx.Observable.create(cb);
};
