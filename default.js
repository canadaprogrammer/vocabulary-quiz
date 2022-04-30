// Words Data
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

// Remove property
function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;
  return rest;
}

// Initial set values
const total_pages = Object.keys(words).length;
let page_number = 1;

let unremoved_words = words;
let key_prop = '';
let answer = '';

// Select Question
let results = [];
const choose_word = () => {
  const keys = Object.keys(unremoved_words);
  key_prop = keys[Math.floor(Math.random() * keys.length)];
  answer = unremoved_words[key_prop];

  // Go to result page when it's done
  if (Object.keys(unremoved_words).length == 0) {
    print_results();
    return;
  }

  unremoved_words = withoutProperty(unremoved_words, key_prop);

  // Selecting Answers for Options
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
    choices += '<button class="answers">' + value + '</button>';
  });
  document.querySelector(
    '#page_number'
  ).innerHTML = `<span>${page_number++} / ${total_pages}</span>`;
  document.querySelector('#vocabulary').innerHTML = key_prop;
  document.querySelector('#choices').innerHTML = choices;
  console.log(document.querySelectorAll('#choices .answers'));

  // Save results
  // Skip question after 3 seconds
  const timeout = setTimeout(() => {
    results.push({
      question: key_prop,
      answer: answer,
      selected: 'No Select',
      bool: false,
    });
    choose_word();
    return;
  }, 3000);

  // Click Answer
  document.querySelectorAll('#choices .answers').forEach((e) => {
    e.addEventListener('click', function (evt) {
      results.push({
        question: key_prop,
        answer: answer,
        selected: evt.target.innerText,
        bool: evt.target.innerText == answer,
      });
      clearTimeout(timeout);
      choose_word();
    });
  });
};

// First question
choose_word();
