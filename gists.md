```!readme.md
Gists for the Medium article 'Create Github Gists the Easy Way Using Markdown and Node.js.'
```

```snippet.cs
Console.Writeline("Hello World!");
```

~~~code.txt
```
Console.Writeline("Hello World!");
```
~~~

```package.json
{
  "name": "gistbuilder",
  "version": "1.0.0",
  "description": "A command-line tool to create GitHub Gists from Markdown files.",
  "type": "module",
  "main": "gistbuilder.js",
  "bin": {
    "gistbuilder": "./gistbuilder.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "MIT"
}

```

```gistbuilder.js
#!/usr/bin/env node

import { program } from 'commander';

const processFile = async (file) =>
{
}

program.arguments('<file>')
       .action(processFile)
       .parse(process.argv);
```

```markdown.js
// Add imports
import { readFileSync } from 'fs';
import { unified } from "unified";
import remarkParse from "remark-parse";

// Add to processFile function
const fileContent = readFileSync(file);

const { children } = unified()
                      .use(remarkParse)
                      .parse(fileContent);

console.log(children);
```

```filter-codeblocks.js
const codeBlocks = children.filter(el => el.type == "code");
```

```token.js
// Add requiredOptions to program
program.arguments('<file>')
       .requiredOption('-t, --token <token>', `Your GitHub access token`)
       .action(processFile)
       .parse(process.argv);

// Add options to the processFile function
const processFile = async (file, options) =>
{
  const { token } = options;
  ...
```

```octokit.js
// Add imports
import { Octokit } from "@octokit/rest";

// Add to processFile function
const octokit = new Octokit({
  auth: token,
  userAgent: "gistbuilder"
});

var zen = await octokit.meta.getZen();

console.log(zen.data);
```

```create-gist.js
// Turn the array of code blocks into a dictionary
const files = Object.assign({}, ...codeBlocks.map(el => ({[el.lang] : { content: el.value }})));

// Create gist!
const params = {
  public: "false",
  files
}
const { data: gist } = await octokit.gists.create(params);

// Print the embeddable urls
for (const file in gist.files) {
  console.log(gist.html_url + '?file=' + file);
}
```

~~~trick.txt
```!readme.md
Gists for the Medium article 'Create Github Gists the Easy Way Using Markdown and Node.js.'
```
~~~