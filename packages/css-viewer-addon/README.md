
[![Storybook](https://img.shields.io/badge/Dependencies-Storybook-info?logo=Storybook&logoColor=white&color=FF4785)](https://storybook.js.org/)
[![Typescript](https://img.shields.io/badge/Code-Typescript-info?logo=Typescript&logoColor=white&color=3178c6)](https://www.typescriptlang.org//)
[![React](https://img.shields.io/badge/Code-React-info?logo=React&logoColor=white&color=61DAFB)](https://fr.react.dev/)
[![Tsup](https://img.shields.io/badge/Bundle-Tsup-info?logo=Tsup&logoColor=white&color=F16728)](https://github.com/egoist/tsup)
[![Vite](https://img.shields.io/badge/Builder-Vite-info?logo=Vite&logoColor=white&color=646CFF)](https://vite.dev/)

# Storybook Addon - Css Viewer

This addon allows you to expose style related to your storie's component in a separate TAB called "CSS". 

Style file formats allowed: *.css(default), *.less, *.sass, *.scss, *.styl.

**Please note style's file names are deducted from stories id, so pay attention to your stories id naming!**<br>
Please note **debugMode** (activable from config) is here to help you fit the right regex config for matching your style files' name.

```bash
{ story id: 'ExampleButton', file name: 'button.css' } > KO
{ story id: 'button', file name: 'button.css' } > OK
{ story id: 'button-component', file name: 'button.component.css' } > OK
```

## Configure

<div className="config-setup">
  <div className="setup-block">
    <b>.storybook/preview.js|ts</b>
    ```javascript
      
      const preview = {
        ...,
        parameters: {
          ...,
          cssViewerConfig: {
            /** file format css|less|sass|scss|styl */
            format: 'css' | 'less' | 'sass' | 'scss' | 'styl'
            /** stories to ignore */
            ignore: Array<string>
            /** regex to transform story ID into file name */
            fileRegex?: { in: string, out: string }
            /** debug mode activation */
            debug?: boolean
          }          
        }
      }
    ```
  </div>
  <div className="setup-block">
    <b>.storybook/main.js|ts</b>
      ```javascript
        
        const config = {
          ...,
          /** add cssViewer addon */
          addons: [
            ...,
            "@storybook/addon-css-viewer"
          ],
          /** copy all style files to src/styles */
          staticDirs: [
            ...,
            {from: '../src/styles', to:'assets/styles'}
          ]
        }
      ```
  </div>
  <div className="setup-block">
    <b>package.json</b>
    <p>If you want to automate style files' copy to .\/src\/styles (here for *.css files, adjust script to your configuration): </p>
      ```javascript
        
        "scripts": {
          "pre-styles": "find ./src/stories -type f -name '*.css'  -exec cp {} ./src/assets/stylesForPreview \\;",
          "storybook": "yarn pre-styles && storybook dev -p 6006",
          "build-storybook": "yarn pre-styles && storybook build"
        }
      ```
  </div>
</div>

## Build & Publish addon

Build and Publish must be done from addon's root, not workspace's root. Anyway, workspace's package.json contain scripts to manage it if you prefer.

```bash
yarn addon:build    // -> cd packages/css-viewer-addon && tsup
yarn  addon:publish // -> cd packages/css-viewer-addon && npm publish
```

## Versions

| Addon | Storybook | Project exposed |
|:-------|:---------|:----------------|
| 8.x | 8.x | Angular 15/17 OR React 18 |
| 10.0.3+ | 10.x | Angular 18+ OR React 18/19 | 

In case of a project documented based on angular 18+, force **react** and **react-dom** versions to match addon's react version (18.3.x for addon 10.0.3+ currently) in your devDependencies. The reason is addon's peerDependecies seem not to be respected by angular, loading by default react 19.x versions which causes mismatch error.

## Credentials

[**Peanuts-83** aka Thomas RANQUE](https://github.com/Peanuts-83)<br>
https://github.com/Peanuts-83<br>
tranque@free.fr