import markdownIt from "markdown-it"
import Token from "markdown-it/lib/token"

class MindMapNodeInfo {
    topic: string;
    children: MindMapNodeInfo[];
    indent: number;
    level: number;
    constructor(topic: string, indent: number, level: number) {
        this.topic = topic;
        this.children = [];
        this.indent = indent;
        this.level = level;
    }
    render(md: markdownIt, env: any) {
        var topicHtml = md.renderInline(this.topic, env);
        var result = `<table><tr>`
            + `<td class="tinymap-topic-container"><div class="tinymap-topic tinymap-topic-level${this.level}">`
            + topicHtml
            + `</div></td>`;
        if (this.children && this.children.length > 0) {
            result += `<td class="tinymap-children-container"><div class="tinymap-children">`;
            for (const child of this.children) {
                result += child.render(md, env);
            }
            result += `</div></td>`;
        }
        result += `</tr></table>`
        return result;
    }
}

const processTinyMind = (md: markdownIt, token: Token, env: any) => {
    var code = token.content;
    var lines = code.match(/[^\r\n]+/g);
    var nodePath: MindMapNodeInfo[] = [];
    var roots: MindMapNodeInfo[] = [];
    for (const curLine of lines) {
        var topic = curLine.trim();
        var indent = curLine.match(/^[ \t]*/)[0].replace("\t", "    ").length;
        var node: MindMapNodeInfo = new MindMapNodeInfo(topic, indent, 1);
        while (nodePath.length > 0 && nodePath[nodePath.length - 1].indent >= indent) {
            nodePath.pop();
        }
        if (nodePath.length > 0) {
            var parentNode = nodePath[nodePath.length - 1];
            node.level = parentNode.level + 1;
            parentNode.children.push(node);
        }
        else {
            roots.push(node);
        }
        nodePath.push(node);
    }
    var result = '';
    result += `<div class="tinymap">`;
    for (const root of roots) {
        result += root.render(md, env);
    }
    result += `</div>`;
    return result;
}

const TinyMindPlugin = (md: markdownIt) => {
    const temp = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info === 'tinymind') {
            return processTinyMind(md, token, env);
        }
        return temp(tokens, idx, options, env, slf);
    };
}

export default TinyMindPlugin
