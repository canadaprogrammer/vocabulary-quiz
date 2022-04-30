// Initial set values
let words = {};
let total_pages = 0;
let page_number = 1;

let unremoved_words = {};
let key_prop = '';
let answer = '';

// Get words
async function fetchJson() {
  const response = await fetch('./words.json');

  if (response.status === 200) {
    data = await response.json();
    words = data.words;
    total_pages = Object.keys(words).length;
    unremoved_words = words;

    // First question
    choose_word();
  } else {
    fetchJson();
  }
}

fetchJson();

// Remove property
function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;
  return rest;
}

// Select Question
let results = [];
const choose_word = () => {
  console.log(words, unremoved_words);
  const keys = Object.keys(unremoved_words);
  key_prop = keys[Math.floor(Math.random() * keys.length)];
  answer = unremoved_words[key_prop];
  console.log(unremoved_words, keys, key_prop, answer);
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
  }, 5000);

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

// Print results
const print_results = () => {
  document.querySelector('#quiz').style.display = 'none';
  const print = document.createElement('div');
  const container = document.querySelector('#results');
  container.setAttribute('class', 'active');
  const title = document.createElement('h1');
  let count = 1;
  let right_number = 0;
  let element = '';
  results.forEach((r) => {
    if (r.bool) right_number++;

    element += `<p class="${r.bool ? 'right' : 'wrong'}">${count++}. ${
      r.question
    }: ${r.answer} <span>${r.bool ? '' : '(' + r.selected + ')'}</span></p>`;
  });
  title.innerHTML = `Results <span>( ${right_number} / ${total_pages} )</span>`;
  container.appendChild(title);
  container.appendChild(print);
  print.innerHTML = element;

  const button = document.createElement('button');
  button.setAttribute('onclick', 'window.location.reload()');
  button.innerText = 'Restart';
  container.appendChild(button);
};
