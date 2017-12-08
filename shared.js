// returns the maximum int value found among the supplied array of values
function biggest(a) {
  return Math.max.apply({}, a);
};
// returns the minimum int value found among the supplied array of values
function smallest(a) {
  return Math.min.apply({}, a);
};
// casts input to string and splits on specified char
function split_on(char, foo) {
  return String(foo).split(char);
}
function split_on_empty(input) {
  return split_on('', input);
}
function split_on_newline(input) {
  return split_on('\n', input);
}
function split_on_space(input) {
  return split_on(' ', input);
}
function split_on_tab(input) {
  return split_on('	', input);
}
function split_on_comma(input) {
  return split_on(', ', input);
}
function split_on_arrow(input) {
  return split_on(' -> ', input);
}
function split_on_if(input) {
  return split_on(' if ', input);
}
// makes sure we are dealing with an array of integers
function prep_digits(digits) {
  return split_on_empty(digits).map(int_parser);
}
// makes sure we are dealing with an array of integers
function prep_row(row) {
  return split_on_tab(row).map(int_parser);
}
// map friendly parseInt()
function int_parser(currentValue, index, array) {
  return parseInt(currentValue, 10);
}
// turns a textual representation of a spreadsheet into a
// mutlidimensional array of integers
function prep_sheet(sheet_string) {
  return split_on_newline(sheet_string).map(prep_row);
}
// reduce friendly addition
function sum_reducer(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
}
// reduce friendly function to find 2 evenly divisible entries
// in a given row and return the quotient of the division
function row_divider(accumulator, currentValue, currentIndex, array) {
  if (accumulator > 0) {
    return accumulator;
  }
  const multiples = array.filter(item => evenly_divides(currentValue, item));
  if (multiples.length > 0) {
    return multiples[0] / currentValue;
  } else {
    return 0;
  }
}
function evenly_divides(a, b) {
  return (a < b && b % a === 0);
}

function concat_reducer(accumulator, currentValue, currentIndex, array) {
  return accumulator.concat(currentValue);
}
function unique_reducer(accumulator, currentValue, currentIndex, array) {
  if (! accumulator.includes(currentValue)) {
    accumulator.push(currentValue);
  }
  return accumulator;
}
