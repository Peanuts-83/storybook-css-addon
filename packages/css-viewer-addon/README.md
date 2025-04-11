# Storybook Addon Css Viewer

This addon allows you to expose style related to your storie's component in a separate TAB called "CSS". 

Style file formats allowed: *.css(default), *.less, *.sass, *.scss, *.styl.

**Please note style's file names are deducted from stories id, so pay attention to your stories id naming!**

```bash
{ story id: 'ExampleButton', file name: 'button.css' } > KO
{ story id: 'button', file name: 'button.css' } > OK
{ story id: 'button.component', file name: 'button.component.css' } > OK
```

<div className="subheading">Configure</div>

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
          "pre-styles": "rm -rf ./src/assets/stylesForPreview && mkdir ./src/assets/stylesForPreview && find ./src/stories -type f -name '*.css'  -exec cp {} ./src/assets/stylesForPreview \\;",
          "storybook": "yarn pre-styles && storybook dev -p 6006",
          "build-storybook": "yarn pre-styles && storybook build"
        }
      ```
  </div>
</div>