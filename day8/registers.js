function build_registers(rows) {
  const register_names = rows
    .reduce(row_to_register_names, [])
    .reduce(unique_reducer, [])
    .sort();
  const registers = [];
  for (index in register_names) {
    registers[register_names[index]] = 0;
  }

  return registers;
}
function row_to_register_names(accumulator, currentValue, currentIndex, array) {
  return accumulator.concat(
    split_on_if(currentValue).map(item => split_on_space(item)[0])
    );
}
function row_to_instruction(row) {
  const segs = split_on_space(row);
  const r = segs[0];
  const o = segs[1];
  const a = parseInt(segs[2], 10);
  const s = segs[4];
  const c = segs[5];
  const t = parseInt(segs[6], 10);

  return {
    register: r,
    operation: o,
    amount: a,
    sibling: s,
    comparison: c,
    target: t,
  };
}
function increment(a, b) {
  return a + b;
}
function decrement(a, b) {
  return a - b;
}
function predicate_eq(a, b) {
  return a === b;
}
function predicate_lt(a, b) {
  return a < b;
}
function predicate_lte(a, b) {
  return a <= b;
}
function predicate_gt(a, b) {
  return a > b;
}
function predicate_gte(a, b) {
  return a >= b;
}
function predicate_neq(a, b) {
  return a !== b;
}
function do_instruction(registers, instruction) {
  const r = registers[instruction.register];
  const o = instruction.operation;
  const a = instruction.amount;
  const s = registers[instruction.sibling];
  const c = instruction.comparison;
  const t = instruction.target;
  let pass = null;
  if (c === "==") {
    pass = predicate_eq(s, t);
  } else if (c === "<") {
    pass = predicate_lt(s, t);
  } else if (c === "<=") {
    pass = predicate_lte(s, t);
  } else if (c === ">") {
    pass = predicate_gt(s, t);
  } else if (c === ">=") {
    pass = predicate_gte(s, t);
  } else if (c === "!=") {
    pass = predicate_neq(s, t);
  }
  if (pass) {
    if (o === "inc") {
      registers[instruction.register] = increment(r, a);
    } else if (o === "dec") {
      registers[instruction.register] = decrement(r, a);
    }
  }

  return registers;
}
function biggest_in_registers(registers) {
  let big_index, big = 0;
  for (const key in registers) {
    if (registers[key] > big) {
      big = registers[key];
      big_index = key;
    }
  }

  return big;
}
function* process(input) {
  const rows = split_on_newline(input);
  let registers = build_registers(rows);
  const instructions = rows.map(row_to_instruction);
  let big, biggest_ever = 0;
  for (const index in instructions) {
    registers = do_instruction(registers, instructions[index]);
    big = biggest_in_registers(registers);
    if (big > biggest_ever) {
      biggest_ever = big;
    }
  }
  big = biggest_in_registers(registers);
  yield big;
  return biggest_ever;
}
