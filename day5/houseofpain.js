function jump_around(list) {
  const jump_list = split_on_newline(list).map(int_parser);
  let jump_count = 0;
  let next_index = 0;
  let current_index = 0;
  let current_loction = jump_list[0];
  while (next_index in jump_list) {
    // next index becomes current index
    current_index = next_index;
    // increment jump counter
    jump_count++;
    // set next index from current index and value
    next_index = current_index + jump_list[current_index]
    // increment value at current index
    jump_list[current_index]++;
  }

  return jump_count;
}

function jump_around2(list) {
  const jump_list = split_on_newline(list).map(int_parser);
  let jump_count = 0;
  let next_index = 0;
  let current_index = 0;
  let current_loction = jump_list[0];
  while (next_index in jump_list) {
    // next index becomes current index
    current_index = next_index;
    // increment jump counter
    jump_count++;
    // set next index from current index and value
    next_index = current_index + jump_list[current_index]
    // change value at current index
    if (jump_list[current_index] > 2) {
      jump_list[current_index]--;
    } else {
      jump_list[current_index]++;
    }
  }

  return jump_count;
}
