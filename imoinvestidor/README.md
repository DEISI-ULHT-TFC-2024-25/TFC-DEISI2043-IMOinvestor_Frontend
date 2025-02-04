
Setup
Todos os seguintes comandos tem de ser corridos dentro da pasta imoinvestidor (fazer cd imovestidor)

1 - NodeJS
fazer download do nodejs, em https://nodejs.org/
npm install

2 - ESLint, axios e Prettier
(não estava a conseguir correr o comando abaixo sem tirar as restrições)
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
npm install react-router-dom axios eslint prettier

npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
npx eslint --init

3 - Tailwind
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss @tailwindcss/vite
npm install tailwindcss@latest

4- React Router
npm install react-router-dom

para correr o website fazer npm run dev