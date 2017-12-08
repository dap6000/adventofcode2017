function find_bottom(input) {
  const rows = split_on_newline(input);
  const all_nodes = get_all_nodes(rows);
  const younguns = get_child_nodes(rows);
  const bottom = all_nodes.filter(item => (! younguns.includes(item)));
  return bottom[0];
}
function get_all_nodes(rows) {
  return rows.map(item => item.split(" ")[0]);
}
function get_child_nodes(rows) {
  return rows.filter(item => item.includes(" -> "))
    .map(split_on_arrow)
    .map(item => item[1])
    .map(split_on_comma)
    .reduce(concat_reducer, [])
    .reduce(unique_reducer, []);
}
function parse_tree(input) {
  const rows = split_on_newline(input);
  const nodes = rows.map(parse_row);
  const bottom = find_bottom(input);
  const tree = tree_builder(bottom, nodes);

  return tree;
}
function parse_row(row) {
  const segs = split_on_arrow(row);
  const node = parse_root(segs[0]);
  if (segs.length > 1) {
    node.children = split_on_comma(segs[1]);
  }

  return node;
}
function parse_root(seg) {
  const split = split_on_space(seg);
  const n = split[0];
  const w = parseInt(split[1].replace("(", "").replace(")", ""), 10);
  const c = [];
  return {
    name: n,
    weight: w,
    children: c,
    plate: [],
    total_weight: w,
  };
}
function lookup_node(name, nodes) {
  return nodes.filter(node => (node.name === name))[0];
}
function lookup_siblings(name, nodes) {
  return nodes
    .filter(node => node.children.includes(name))
    [0].children.filter(item => item !== name);
}
function tree_builder(bottom, nodes) {
  const root = lookup_node(bottom, nodes);
  for (index in root.children) {
    const child = tree_builder(root.children[index], nodes)
    root.plate.push(child);
    root.total_weight += child.total_weight;
  }

  return root;
}
function portly_gentleman(tree) {
  const candidate = tree.plate.filter(weight_filter);
  if (candidate.length === 0) {
    return tree;
  } else {
    return portly_gentleman(candidate[0]);
  }
}
function weight_filter(element, index, array) {
  const sorted_weights = array.map(item => item.total_weight).sort();
  const big = sorted_weights.pop();
  const next = sorted_weights.pop();

  return (big > next && element.total_weight === big);
}
function parse_weight_correction(input) {
  const rows = split_on_newline(input);
  const nodes = rows.map(parse_row);
  const bottom = find_bottom(input);
  const tree = tree_builder(bottom, nodes);
  const big = portly_gentleman(tree);
  const sibs = lookup_siblings(big.name, nodes);
  const proper_weight = lookup_node(sibs[0], nodes).total_weight;
  const weight_diff = big.total_weight - proper_weight;

  return big.weight - weight_diff;
}
