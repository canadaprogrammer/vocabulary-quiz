# English - Korean Vocabulary Quiz App

- Multiple choice quiz

- Speed quiz, The page will be changed after 3 seconds.

- Random vocabulary order and the answer choices

- Show results after finishing quiz

## Steps

- Choose Day

- Quiz vocabularies of the Day

- Results and Restart

## Get works by using fetch

- ```js
  async function fetchJson() {
    const response = await fetch('./words.json');

    if (response.status === 200) {
      const data = await response.json();
      showDays(data);
    } else {
      fetchJson();
    }
  }

  fetchJson();
  ```

## Text to Speech

- ```js
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const utterThis = new SpeechSynthesisUtterance();
  utterThis.voice = voices['2'];
  utterThis.volume = 2;
  utterThis.pitch = 1.5;
  utterThis.rate = 1;
  utterThis.text = key_prop;
  synth.speak(utterThis);
  ```

## gh-pages

- ```bash
  npm init -y
  npm i gh-pages
  ```

- Create `dist` folder and move `default.css`, `default.js`, and `index.html` into the folder

- On `package.json`

  - ```json
    "scripts": {
      "deploy": "gh-page -d dist"
    },
    "homepage": "https://https://canadaprogrammer.github.io/vocabulary-quiz",
    ```

- Create `.gitignore` and put `node_module` in it

- `npm run deploy`
