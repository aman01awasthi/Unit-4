/** @format */

let formatError = (errorarray) => {
  return errorarray.map((err) => {
    return {
      message: err.msg,
      param: err.param,
    };
  });
};

module.exports = formatError;
