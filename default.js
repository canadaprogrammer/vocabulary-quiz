const words = {
  word: '단어',
  ship: '배',
  sheep: '양',
  movie: '영화',
  test: '시험',
  smile: '웃음',
  car: '자동차',
  house: '집',
};

// Choosing a Word for Question
const keys = Object.keys(words);
const key_prop = keys[Math.floor(Math.random() * keys.length)];
const answer = words[key_prop];

// Selecting Answers for Options
function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;
  return rest;
}

let remain_words = words;
let options = [answer];
remain_words = withoutProperty(remain_words, key_prop);

while (options.length < 4) {
  const remain_keys = Object.keys(remain_words);
  const selected_key =
    remain_keys[Math.floor(Math.random() * remain_keys.length)];
  options.push(words[selected_key]);
  remain_words = withoutProperty(remain_words, selected_key);
}

// Shuffle the Options
// Fisher-Yates shuffle Algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

shuffleArray(options);
let choices = '';

// Display the Options
options.forEach(function (value, index) {
  choices += '<p>' + value + '</p>';
});
document.querySelector('#vocabulary').innerHTML = key_prop;
document.querySelector('#choices').innerHTML = choices;
