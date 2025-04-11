
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

## Credentials

[![Peanuts-83](../../assets/peanuts-mini.png)](https://github.com/Peanuts-83)<br>
**Peanuts-83** aka Thomas RANQUE<br>
https://github.com/Peanuts-83<br>
tranque@free.fr