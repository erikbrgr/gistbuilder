#!/usr/bin/env node

import { program } from 'commander';

const processFile = async (file) =>
{
}

program.arguments('<file>')
       .action(processFile)
       .parse(process.argv);