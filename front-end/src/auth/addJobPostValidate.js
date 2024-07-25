const isEmpty = (input) => {
  if (input === undefined || input === null || input === "") {
    return true;
  } else {
    return false;
  }
};

const isNumber = (input) => {
  if (isNaN(input)) {
    return false;
  } else {
    return true;
  }
};
