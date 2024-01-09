# PDF talk

A frontend aplication for chatPDF API (https://www.chatpdf.com/). It lets you upload a document and ask questions related to that document.

## Stack

- [React](https://react.dev/) - library for user interface

- [Redux](https://redux.js.org/) with [Redux toolkit](https://redux-toolkit.js.org/) - state managment library

- [Tanstack Query](https://tanstack.com/query/latest) with [Axios](https://axios-http.com/docs/intro) - data fetching library

- [React-pdf](https://react-pdf.org/) - PDF renderer library

- [React-hook-form](https://react-hook-form.com/) - form management library

- [Mantine](https://ui.mantine.dev/#main) - components and styling library

## Features

- [x] Document upload

- [x] Document related chat window

- [x] Predefined questions picker (Description, Analysis, Summary of the document)

- [x] Saving conversations as PDF

- [x] Conversations list - persisted list with previous conversations

## How to run

### Project installation

Run the terminal, open and install the project with `cd ProjectName` and `npm install`.

### Configuration (.env)

The project requires two env variables:

- `VITE_API_KEY` which is an API key that can be obtained on https://www.chatpdf.com/ under _My account_

- `VITE_API_BASE_URL` which sshould be set to `https://api.chatpdf.com/v1`

_IMPORTANT_ This project is for showcase purposes only. In production API keys should be used from secure backend environments.

### Run using node

Simply run `npm run dev` and head to the URL given in the terminal (default is http://localhost:5173/)
