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