# Hello World

Мінімальний кросплатформний проєкт на TypeScript для Node.js 24 (лабораторна робота №1, варіант 6).

## Передумови

- Node.js 24
- npm 10 або новіший

## Встановлення та команди

```sh
npm install
npm run build
npm start
npm test
```

`npm run build` компілює файли з `src/` у `build/`, після чого створює платформні запускні файли.

## Запуск зібраної програми

- Linux/macOS: `./build/hello`
- Windows PowerShell: `.\build\hello.cmd`
- Windows Command Prompt: `build\hello.cmd`

Запускні файли викликають зібрану програму через Node.js. `npm test` запускає модульні тести Vitest, які додаються на етапі налаштування тестування.
