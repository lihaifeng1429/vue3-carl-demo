Function.prototype.bind2 = function (context) {
  if (typeof this != "function") {
    throw new Error("not a function");
  }
  var args = Array.prototype.slice(arguments, 1);

  var fNOP = function () {};
  let self = this;

  var fBound = function () {
    var curArgs = Array.prototype.slice(arguments);

    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(curArgs)
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

const curry5 = (fn, ...args) => {
  return (...args1) => {
    args = [...args, ...args1];
    console.log("args", args);
    return fn.length <= args.length ? fn(...args) : curry5(fn, ...args);
  };
};

function transformArr(arr) {
  if (!arr.length) return "";
  let res = [arr[0]],
    flag = false;
  for (let i = 1; i < arr.length; i++) {
    if (res[res.length - 1] + 1 === arr[i]) {
      if (!flag) {
        res.push("~");
        res.push(arr[i]);
        flag = true;
      } else {
        res[res.length - 1] = arr[i];
      }
    } else {
      res.push(" ");
      res.push(arr[i]);
      flag = false;
    }
  }
  return res.join("");
}

// console.log(transformArr([1, 2, 3, 5, 7, 8, 10]));
// console.log(transformArr([1, 2, 3, 5]));
// console.log(transformArr([1]));

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const len = nums.length;
  const dp = [];
  dp[0] = 0;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < i + nums[i]; j++) {
      console.log(dp[i], dp[j]);
      if (dp[j]) {
        dp[j] = Math.min(dp[j], dp[i] + 1);
      } else {
        dp[j] = dp[i] + 1;
      }
    }
  }
  return dp[len - 1];
};

var reverseParentheses = function (s) {
  const stack = [];
  let tempStr = "",
    res = "",
    flagIndex = 0,
    resFlag = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(tempStr);
      tempStr = "";
      flagIndex++;
    } else if (s[i] === ")") {
      //   console.log("res", res);
      console.log("res", stack);
      flagIndex--;
      if (!res && !resFlag) {
          resFlag = true;
        res = tempStr.split("").reverse().join("");
        tempStr = "";
      } else {
        let pre = "";
        if (stack.length) pre = stack.pop();
        res = (pre + res + tempStr).split("").reverse().join("");
        tempStr = "";
      }
      if (flagIndex === 0) {
        stack.push(res);
        res = "";
      }
    } else if (i === s.length - 1) {
      tempStr += s[i];
      let pre = "";
      if (stack.length) pre = stack.pop();
      res = pre + res + tempStr;
      tempStr = "";
    } else {
      tempStr += s[i];
    }
  }
  while (stack.length) res = stack.pop() + res;
  return res;
};

console.log(222, reverseParentheses("uxbpgfzt(cn(nnn()))"));
