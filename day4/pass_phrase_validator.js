function validate_passphrase(pp) {
  return ! split_on_space(pp).reduce(duplicate_reducer, false);
}
function duplicate_reducer(accumulator, currentValue, currentIndex, array) {
  if (accumulator) {
    return accumulator;
  }
  const rest = array.slice(currentIndex + 1, array.length);
  const dupes = rest.filter(item => currentValue === item);
  return (dupes.length > 0);
}
function valid_passphrases(phrases) {
  return split_on_newline(phrases).filter(validate_passphrase);
}
function anagram_reducer(accumulator, currentValue, currentIndex, array) {
  if (accumulator) {
    return accumulator;
  }
  const rest = array.slice(currentIndex + 1, array.length);
  const anagrams = rest.filter(item => are_anagrams(currentValue, item));
  return (anagrams.length > 0);
}
function are_anagrams(word1, word2) {
  const w1 = split_on_empty(word1).sort().join("");
  const w2 = split_on_empty(word2).sort().join("");
  return (w1 === w2);
}
function validate_passphrase2(pp) {
  return ! split_on_space(pp).reduce(anagram_reducer, false);
}
function valid_passphrases2(phrases) {
  return split_on_newline(phrases).filter(validate_passphrase2);
}
