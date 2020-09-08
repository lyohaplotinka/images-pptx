# images-pptx

### A simple and blazing-fast javascript library for creating PPTX presentation from list of images

If you have a set of raster picture files (for example, after converting PDF to JPG's) and you want to nicely wrap them into PowerPoint presentation–**images-pptx** is everything that you need.

Use it with pure Node.js or TypeScript: library is written on TS and has all typings.

#### Currently works:
|  **Node.js** | **Browser**  | **CLI** |
| :------------: | :------------: | :------------: |
| Yes  | WIP  | Yes |

------------


### Installation
Via `npm`:
```bash
npm install --save images-pptx
```

### Usage
Add it to your project:
```javascript
// JavaScript
const ImagesPptx = require('images-pptx')
// TypeScript
import * as ImagesPptx from 'images-pptx'
// or, for TypeScript
import { createPptx } from 'images-pptx';
```
After that, you can use it like this:
```javascript
await ImagesPptx.createPptx(options)
```

Options are:

| **Option**  |  **Description**  |
| :------------ | :------------ |
| pictures  | Array of full paths to images (array of string) or single string to the directory where image files are placed  |
| saveTo | Path to the directory (string) where .pptx file will be created |
| pptxFileName | Name of .pptx file (string) (default is "presentation.pptx" |
| extension | Extension of pictures (string, default: "jpg") which will be used in pptx (f.e. "jpg") |
| native | Boolean (default is `false`). Forces `images-pptx` use native OS commands, such as `cp` or `rm` on Mac and Linux instead of Node-based solutions. This solution can be a bit faster.    **WARNING to Windows users:** this functionality was not tested correctly on Windows yet. |
| meta | Meta fields for presentation (see below)
Example usage:
```javascript
await ImagesPptx.createPptx({
  pictures: '/Users/username/Pictures',
  saveTo: '/Users/username/Presentation',
  pptxFileName: 'Our great party.pptx',
  extension: 'png',
  native: true,
  meta: {
    author: 'Lyoha Plotinka',
    title: 'Our great party!',
    revision: 2,
    createdAt: '2020-09-08T10:24:09.658Z'
  }
})
```
This will generate file `/Users/username/Presentation/Our great party.pptx` with all the .png files from `/Users/username/Pictures`.

For every key in `meta` objects there are default values:
* `Images-pptx presentation` from `title`;
* `Images-pptx` for `author`;
* `1` for `revision`;
* Output from `new Date().toISOString()` for `createdAt`

### CLI usage
You can use `images-pptx` as command-line app. Install it globally or call it from node_modules folder. 
For example: 
```bash
npm install -g images-pptx
# after installing
images-pptx --help
# ...all usage options printed next
```

### How fast is it?
All test were made on MacOS, using `console.time` and `console.timeEnd`

| Options | Result |
| :------------ | :------------ |
| 3 pictures, ~8.5mb total; native: false; directory with extension as a path | 453.053ms |
| 3 pictures, ~8.5mb total; native: true; directory with extension as a path | 335.393ms |
| 27 pictures, ~49mb total; native: false; directory with extension as a path | 2518.479ms |
| 27 pictures, ~49mb total; native: true; directory with extension as a path | 1893.986ms |
| 3 pictures, ~8.5mb total; native: false; array of direct paths | 323.845ms |

### TODO
1. Browser version of `images-pptx`
2. Proportional resizing of pictures

### Found a bug?
Feel free to contribute, create an issue or contact me directly. All my contacts are availabe on [my website](https://lyoha.info)
