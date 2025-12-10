#!/bin/bash
cd /home/kavia/workspace/code-generation/angular-component-testing-with-vitest-6191-6200/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

