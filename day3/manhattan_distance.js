/*
 * Given a set of memory registers laid out in a spiral
 * pattern like this:

 * 37	36	35	34	33	32	31
 * 38	17	16	15	14	13	30
 * 39	18	05	04	03	12	29
 * 40	19	06	01	02	11	28
 * 41	20	07	08	09	10	27
 * 42	21	22  23	24	25	26
 * 43	44	45	46	47	48	49	...
 *
 * We are asked to calculate the number of steps required
 * to move from some `position` to the entry/exit point at
 * location 01 provided we can only move single steps in
 * the directions Left, Right, Up, or Down. We're told this
 * distance is sometimes called the Manhattan Distance and given
 * a link to the Wikipedia article on Taxicab Geometry:
 * https://en.wikipedia.org/wiki/Taxicab_geometry
 *
 * I'm sure this problem has a straight forward solution
 * for those familiar with working in movement over grids.
 * But this is a problem space that's new to me and I had to
 * brute force it out. Here's what I came up with.
 *
 * If diagnonal moves were allowed then the distance from
 * the center node would be a simple matter of counting
 * the "rings" of the spiral. Diagnonal moves are *not* allowed
 * so this isn't our entire solution, but it's our first step.
 *
 * 3	3	3	3	3	3	3
 * 3	2	2	2	2	2	3
 * 3	2	1	1	1	2	3
 * 3	2	1	0	1	2	3
 * 3	2	1	1	1	2	3
 * 3	2	2	2	2	2	3
 * 3	3	3	3	3	3	3	...
 *
 * In addition to the distance in terms of "rings", since we cannot
 * make diagnonal moves, we also need to account for movement away
 * from the "corners" of each ring. We end up with happy paths of
 * zeroes where we can reach the center by moving in a single direction
 * once per ring. Everywhere else we need to count the steps away from
 * these avenues of zeroes.
 *
 * 3	2	1	0	1	2	3
 * 2	2	1	0	1	2	2
 * 1	1	1	0	1	1	1
 * 0	0	0	0	0	0	0
 * 1	1	1	0	1	1	1
 * 2	2	1	0	1	2	2
 * 3	2	1	0	1	2	3	...
 *
 * I notice that each ring of the spiral ends with the square of an
 * odd number. I calculate that number from the `position` and call it
 * a. If a is zero then we are on ring zero. Otherwise we're in the ring
 * equal to half of a plus 1, rounded down.
 *
 * One of our happy avenues of zeroes is at the 3 o'clock position. We
 * can calculate where that is for any given ring by finding the number
 * that ends the previous ring (which is a squared) and adding our ring
 * position or 1, whichever is larger. Finding the distance between the
 * zero position at 3 o'clock on our current ring and our provided
 * `position` is a matter of subtraction and absolute value. As we move
 * away from this zero point in either direction the number of moves
 * required to get to our center node goes up, until it reaches a maximum
 * possible value in the corners of the current ring. That maximum value
 * happens to be equal to our ring count. And from there the number of
 * moves required to reach the center node count back down to zero. The
 * full movement from zero up through the maximum value at the corner and
 * back down to our zero point at the noon position in a ring is equal to
 * double our ring position. In terms of distance from a corner the value
 * for position = p is the same as position = p + (ring * 2). This pattern
 * repeats in each quadrant in the spiral. And that may lend itself to some
 * optimization for mirroring around the diagnonals. But my solution was to
 * repeatedly subtract the total number of steps in the repeating pattern for
 * our current ring from the calculated distance between our known zero point
 * and our specified `position` until the resulting absolute value falls
 * within the range from zero to our maximum value found in the corners.
 * This gives us the number of moves we need to add to our ring count
 * to make up for the lack of diagnonal movement, which I called
 * corner_distance.
 *
 * Adding our ring count and our corner_distance gives us the total
 * number of moves needed to reach the center node, aka the Manhattan
 * distance.
 */
function spiral_memory_steps(position) {
  const a = get_lower_right_corner_sqrt(position);
  const ring = get_ring_count(a);
  const zero_point = get_right_zero_point(a, ring);
  const corner_distance = get_corner_distance(position, zero_point, ring);

  return ring + corner_distance;
}

function get_lower_right_corner_sqrt(position) {
  let a = Math.floor(Math.sqrt(position - 1));
  if (a > 0 && a % 2 === 0) {
    a = a - 1;
  }
  return a;
}

function get_ring_count(a) {
  return (a > 0) ? Math.floor((a / 2) + 1) : 0;
}

function get_right_zero_point(a, ring) {
  return (a * a) + biggest([ring, 1]);
}

function get_corner_distance(position, zero_point, ring) {
  const steps = ring * 2;
  let corner_distance = Math.abs(position - zero_point);
  while (corner_distance > ring) {
    corner_distance = Math.abs(corner_distance - steps);
  }

  return corner_distance;
}

function spiral_nodes() {
  const spiral = [];
  const node0 = {
    X: 0,
    Y: 0,
    V: 1,
  };
  spiral.push(node0);
  const node1 = {
    X: 1,
    Y: 0,
    V: 1,
  };
  spiral.push(node1);
  const target = 265149;
  while (spiral[spiral.length - 1].V < target) {
    addNode(spiral);
  }

  return spiral;
}
function addNode(spiral) {
  const last_position = spiral.length;
  const a = get_lower_right_corner_sqrt(last_position);
  const ring = get_ring_count(a);
  const side_len = ring * 2;
  const first = (a * a) + 1;
  const top_right = first + side_len - 1;
  const top_left = top_right + side_len;
  const bottom_left = top_left + side_len;
  const bottom_right = bottom_left + side_len;
  const current_node = spiral[spiral.length - 1];
  let newX, newY, newV;
  if (first <= last_position && last_position < top_right) {
    // UP
    newX = current_node.X;
    newY = current_node.Y + 1;
  } else if (top_right <= last_position && last_position < top_left) {
    // LEFT
    newX = current_node.X - 1;
    newY = current_node.Y;
  } else if (top_left <= last_position && last_position < bottom_left) {
    // DOWN
    newX = current_node.X;
    newY = current_node.Y - 1;
  } else if (bottom_left <= last_position && last_position <= bottom_right) {
    // RIGHT
    // the range here includes the bottom right corner as we continue
    // right one more step to begin the next ring
    newX = current_node.X + 1;
    newY = current_node.Y;
  } else {
    console.log("last_position", last_position);
    console.log("a", a);
    console.log("ring", ring);
    console.log("side_len", side_len);
    console.log("first", first);
    console.log("top_right", top_right);
    console.log("top_left", top_left);
    console.log("bottom_left", bottom_left);
    console.log("bottom_right", bottom_right);
    console.log("current_node", current_node);
    throw "Can't sort out direction of movement for placing the next node!";
  }
  const neighbors = find_neighbors(newX, newY, spiral);
  newV = neighbors.map(node => node.V).reduce(sum_reducer, 0);
  const new_node = {
    X: newX,
    Y: newY,
    V: newV,
  };
  spiral.push(new_node);

  return spiral;
}
function find_neighbors(newX, newY, spiral) {
  return spiral.filter(node => {
    const diffX = Math.abs(node.X - newX);
    const diffY = Math.abs(node.Y - newY);
    return (diffX < 2 && diffY < 2);
  });
}
