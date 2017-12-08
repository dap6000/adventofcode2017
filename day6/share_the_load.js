function familiar(input) {
  const seent = [];
  let banks = split_on_tab(input).map(int_parser);
  let seent_it = false;
  let steps = 0;
  let big_index = 0;
  let big, finder, json;
  while (! seent_it && big_index > -1) {
    json = JSON.stringify(banks);
    seent_it = seent.includes(json);
    if (! seent_it) {
      seent.push(json);
      big = biggest(banks);
      finder = big_searcher(big);
      big_index = banks.findIndex(finder);
      banks = marx(big_index, banks);
      steps++;
    }
  }

  return steps;
}

function marx(i, arr) {
  if (i >= 0 && i < arr.length) {
    let val = arr[i];
    arr[i] = 0;
    while (val > 0) {
      i = (i + 1) % arr.length;
      arr[i]++;
      val--;
    }
  }

  return arr;
}

function big_searcher(big) {
  return item => item === big;
}

function familiar2(input) {
  const seent = [];
  let banks = split_on_tab(input).map(int_parser);
  let seent_it = false;
  let steps = 0;
  let big_index = 0;
  let big, finder, json, item;
  while (! seent_it && big_index > -1) {
    json = JSON.stringify(banks);
    seent_it = seent.includes(json);
    if (! seent_it) {
      seent.push(json);
      big = biggest(banks);
      finder = big_searcher(big);
      big_index = banks.findIndex(finder);
      banks = marx(big_index, banks);
      steps++;
    } else {
      item = json;
    }
  }
  steps = 0;
  seent_it = false;
  while (! seent_it && big_index > -1) {
    big = biggest(banks);
    finder = big_searcher(big);
    big_index = banks.findIndex(finder);
    banks = marx(big_index, banks);
    steps++;
    json = JSON.stringify(banks);
    seent_it = (item === json);
  }

  return steps;
}
