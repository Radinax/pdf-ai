# PDF AI Test Challenge

This is a project where the tasked challenge is to create an application similar to [PDF AI](https://pdf.ai/demo) but without the upload. The LLM is already fed with a pre existing PDF so all questions are related to the specific PDF.

## 🚀 Project structure

Simple structure for the size of the project:

```text
├── public/
├── src/
│   ├── components/
│   ├── api.ts
│   ├── main.ts
│   ├── utils.ts
│   ├── constants.ts
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

## 🚀 Tech stack

- ✅ Built with Vite and Typescript
- ✅ Used Tailwind and Lucide for Icons
- ✅ React PDF for a library that renders the PDF
- ✅ ZOD
- ✅ Sonner for toast notifications

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/`     |

## 🧞 Thought Process

The LLM is already powered by an existing PDF so the idea is to just render that specific PDF so the viewer can use it to ask questions to the model.

Initial view is rendering two screens on the same page, on the left is the PDF and on the right is the chatbox. The PDF is very straightforward.

For the chatbox, it was copied from the PDF AI design itself, for functionality it was first tested the URL provided:

```
curl -X 'POST' \
'https://prosper-conversations-beta.onrender.com/assistant/ask_question' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: test-challenge' \
-H 'X-Organization: test' \
-d '{
"question": "Does Hiscox include waiver of subrogation?"
}'
```

Once it worked a hook called `askedQuestion` on the `api.ts` file was created, defined the types with a schema validation using zod and handled the errors accordingly. This hook is then used when submitting a prompt to the URL in the `app.tsx` file and with the response we send it to the chatbox screen with its respecting `isLoading` to handle async process.

Once received from the endpoint, its mapped using a separation between generated answer vs user prompts and it renders in the screen.

To be done, is highlight the exact place where the LLM extracted the answer from, which is returned from the endpoint, using REGEX we can match the specific page and with that we can update the left screen which is the PDF itself and then highlight the citation itself, but its what's missing.

The most challening aspect of this project is handle the React PDF library which didn't work at first and needed some configurations to be done.

## Conclusion

It was a fun challenge to be done. Duration was 1 hour and 30 minutes, it has everything needed to test a candidate and it personally gives me ideas to make when testing candidates myself.

Best regards,

**Adrian Beria**
