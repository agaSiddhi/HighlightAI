# HighlighterAI

A simple web extension that allows the highlighting of text on webpages with a simple right-click (or keyboard shortcut Ctrl+Shfit+H). Saves all highlights so they can be re-highlighted when a webpage is reopened!

It also come with a special feature called **Auto-Highlight**. It employs LLMs to

## How to Use

Steps to load the web-extension in the browser:

1. Download the code using the clone command or using the 'Download Zip' option

2. Extract the zip file, if downloaded using 'Download Zip'

3. Go to `<BROWSER_NAME>://extensions` and switch on the **Developer Mode**.

4. Load the extension into the browser using the **Load Unpacked** option.

Now, you can enjoy using the **HighlighterAI**.

## Development Set Up

```sh
npm install
```

## Other commands:

- Linting (ESLint): `npm run lint`
- Releasing a new version:

```sh
# Bump the version in the manifest and package.json files, create a new commit, tag it, push to Github
# and create a draft release on Github using the `gh` CLI tool
npm run release

# Create the zipped package to upload to the Chrome web store
npm run build
```
