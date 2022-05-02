# English - Korean Vocabulary Quiz App

- Multiple choice quiz

- Speed quiz, The page will be changed after 3 seconds.

- Random vocabulary order and the answer choices

- Show results after finishing quiz

## Steps

- Choose Day

- Quiz vocabularies of the Day

- Results and Restart

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
