// calculates a checksum from the textual representation of
// a spreadsheet
function checksum(sheet) {
  return prep_sheet(sheet).map(row_diff).reduce(sum_reducer);
}
// given an array of integers representinga  spreadsheet row
// returns the diffference between the biggest and the smallest
// value found in the row
function row_diff(row) {
  return biggest(row) - smallest(row);
}

function checksum2(sheet) {
  return prep_sheet(sheet).map(row_division).reduce(sum_reducer);
}

function row_division(row) {
  return row.reduce(row_divider, 0);
}
