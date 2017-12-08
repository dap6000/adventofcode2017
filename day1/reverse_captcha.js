function reverse_captcha1(digits) {
  return prep_digits(digits).reduce(sum_duplicates1, 0);
}
function reverse_captcha2(digits) {
  return prep_digits(digits).reduce(sum_duplicates2, 0);
}

function sum_duplicates1(accumulator, currentValue, currentIndex, array) {
  let nextValue;
  if (array[currentIndex + 1]) {
    nextValue = array[currentIndex + 1];
  } else {
    nextValue = array[0];
  }
  if (currentValue === nextValue) {
    accumulator = accumulator + currentValue;
  }

  return accumulator;
}

function sum_duplicates2(accumulator, currentValue, currentIndex, array) {
  const nextValue = array[(currentIndex + (array.length / 2)) % array.length];
  if (currentValue === nextValue) {
    accumulator = accumulator + currentValue;
  }

  return accumulator;
}
