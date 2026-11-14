# Архітектура проєкту Hello World

## Призначення

Hello World — мінімальний кросплатформний TypeScript-проєкт для Node.js 24, створений для лабораторної роботи №1, варіант 6. Застосунок виводить привітання, а модульний тест перевіряє функцію додавання `BasicAddition`.

## Структура проєкту

```text
.
├── .github/
│   ├── agents/
│   │   └── build-engineer.agent.md
│   ├── skills/
│   │   ├── build-and-test/SKILL.md
│   │   ├── github-actions/SKILL.md
│   │   └── project-scaffold/SKILL.md
│   └── workflows/
│       └── ci.yml
├── build/                   # Згенерований результат, ігнорується Git
├── docs/
│   ├── architecture.md
│   └── usage.md
├── scripts/
│   └── create-launchers.mjs
├── src/
│   ├── basicAddition.ts
│   └── index.ts
├── tests/
│   └── index.test.ts
├── .gitignore
├── ci.bat
├── ci.sh
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

### Каталоги та файли

- `src/` містить TypeScript-код застосунку. `index.ts` виводить `Hello, World!`, а `basicAddition.ts` експортує функцію `BasicAddition(a, b)`, що повертає суму двох чисел.
- `tests/` містить Vitest-тест `index.test.ts`, який перевіряє додавання додатних чисел, від'ємного числа та нуля.
- `scripts/` містить `create-launchers.mjs`. Npm запускає його після успішного складання.
- `build/` містить згенерований JavaScript і запускні файли. Каталог ігнорується Git через правило `build/` у `.gitignore`.
- `package.json` визначає npm scripts і залежності; `package-lock.json` фіксує версії залежностей для відтворюваного встановлення.
- `tsconfig.json` задає параметри компілятора TypeScript.
- `ci.sh` і `ci.bat` виконують кросплатформні CI-перевірки.
- `.github/workflows/ci.yml` налаштовує запуск CI на GitHub Actions.
- `.github/agents/` та `.github/skills/` містять manifest Build Engineer і три інструкції Skills.
- `docs/` містить документацію архітектури й використання проєкту.

## Компіляція та запускні файли

Команда `npm run build` запускає TypeScript-компілятор `tsc`. Налаштування `tsconfig.json` задають `src/` як корінь вихідного коду, а `build/` — як каталог результату. Компільовані модулі, зокрема `build/index.js` і `build/basicAddition.js`, використовують формат NodeNext та запускаються через Node.js 24.

Після успішної команди `build` npm автоматично виконує lifecycle script `postbuild`, який запускає `scripts/create-launchers.mjs`:

- `build/hello` — POSIX launcher із Node.js shebang для Linux і macOS. Він динамічно завантажує `build/index.js`; на POSIX йому надаються права виконання.
- `build/hello.cmd` — Windows batch launcher, який запускає `build/index.js` через Node.js і передає аргументи та код завершення.

Обидва launchers запускають зібраний застосунок; логіка Hello World залишається в TypeScript-коді `src/index.ts`.

## CI

`ci.sh` призначений для Linux і macOS, а `ci.bat` — для Windows. Кожен скрипт переходить у корінь проєкту, перевіряє наявність `package.json` і lock-файлу, потім послідовно виконує `npm ci`, `npm run build` та `npm test`. Скрипт зупиняється при першій помилці й повертає ненульовий код завершення.

`.github/workflows/ci.yml` запускається при `push` і `pull_request` до гілок `develop` та `master`. Є одна job із матрицею:

| GitHub Actions runner | Операційна система | CI-скрипт |
|---|---|---|
| `ubuntu-latest` | Linux | `bash ci.sh` |
| `windows-latest` | Windows | `ci.bat` через `cmd` |
| `macos-latest` | macOS | `bash ci.sh` |

Workflow перевіряє код через `actions/checkout@v4`, налаштовує Node.js 24 через `actions/setup-node@v4` і викликає відповідний платформі CI-скрипт. Встановлення залежностей, складання й тести виконуються всередині цих скриптів.
