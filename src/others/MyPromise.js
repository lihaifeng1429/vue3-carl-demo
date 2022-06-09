class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(func) {
    this.promiseState = MyPromise.PENDING;
    this.promiseResult = null;
    this.onFulfillCallbacks = [];
    this.onRejectCallbacks = [];
    try {
      func(this.reslove.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  reslove(value) {
    if (this.promiseState === MyPromise.PENDING) {
      setTimeout(() => {
        this.promiseState = MyPromise.FULFILLED;
        this.promiseResult = value;
        this.onFulfillCallbacks.forEach((cb) => cb(value));
      });
    }
  }
  reject(reason) {
    if (this.promiseState === MyPromise.PENDING) {
      setTimeout(() => {
        this.promiseState = MyPromise.REJECTED;
        this.promiseResult = reason;
        this.onRejectCallbacks.forEach((cb) => cb(value));
      });
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new MyPromise((reslove, reject) => {
      if (this.promiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.promiseResult);
            reslovePromise(promise2, x, reslove, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.promiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.promiseResult);
            reslovePromise(promise2, x, reslove, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.onFulfillCallbacks.push(() => {
          try {
            const x = onFulfilled(this.promiseResult);
            reslovePromise(promise2, x, reslove, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectCallbacks.push(() => {
          try {
            const x = onRejected(this.promiseResult);
            reslovePromise(promise2, x, reslove, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2
  }
}

function reslovePromise(promise2, x, reslove, reject) {}
