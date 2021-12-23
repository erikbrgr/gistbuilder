#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import { unified } from "unified";
import remarkParse from "remark-parse";
import { Octokit } from "@octokit/rest";


const processFile = async (file, options) =>
{
  const { token, gist_id, description } = options;

  const fileContent = readFileSync(file);

  const { children } = unified()
                        .use(remarkParse)
                        .parse(fileContent);

  const codeBlocks = children.filter(el => el.type == "code");

  const octokit = new Octokit({
    auth: token,
    userAgent: "gistbuilder"
  });

  // Turn the array of code blocks into a dictionary
  const files = Object.assign({}, ...codeBlocks.map(el => ({[el.lang] : { content: el.value }})));

  // Create gist!
  const params = {
    gist_id,
    description,
    public: "false",
    files
  }
  const { data: gist } = await octokit.gists.create(params);

  // Print the embeddable urls
  for (const file in gist.files) {
    console.log(gist.html_url + '?file=' + file);
  }
}

program.arguments('<file>')
       .requiredOption('-t, --token <token>', `Your GitHub access token`)
       .option('-d, --description <description>', 'Id of an existing gist to update')
       .option('-g, --gist <gist_id>', 'Id of an existing gist to update')
       .action(processFile)
       .parse(process.argv);