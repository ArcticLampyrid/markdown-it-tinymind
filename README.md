# markdown-it-tinymind

MindMap plugin for markdown-it.


## Install

```
npm install markdown-it-tinymind --save
```

## Usage
```js
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
![Screenshot 1](https://github.com/1354092549/markdown-it-tinymind/blob/master/screenshot/1.png)   