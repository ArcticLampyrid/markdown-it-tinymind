# markdown-it-tinymind

MindMap plugin for markdown-it.


## Install

```
npm install markdown-it-tinymind --save
```

## Usage
```js
// Remember to import css/tinymind.css
import markdownIt from 'markdown-it'
import markdownItTinyMind from '../src/index'

const mdi = markdownIt()
mdi.use(markdownItTinyMind)
console.log(mdi.render(`\`\`\`tinymind
    A
        B
        C
        D
            E
            F
            G
                H
            I
        J
        K
        L
            M
            N\`CodeHere\`
\`\`\``))
```

## Screenshot
![Screenshot 1](https://raw.githubusercontent.com/1354092549/markdown-it-tinymind/master/screenshot/1.png)   