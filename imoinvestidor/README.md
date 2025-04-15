Todos os seguintes comandos tem de ser corridos dentro da pasta imoinvestidor (fazer cd imovestidor)

Para correr a app fazer npm run dev

- Setup

Se estiveres no PowerShell e tiveres erros de permissões, corre:
Set-ExecutionPolicy Unrestricted -Scope CurrentUser

1 - NodeJS
fazer download do nodejs, em https://nodejs.org/
npm install

Este comando instala automaticamente as dependências definidas no package.json, incluindo:
- react-router-dom
- axios
- tailwindcss, postcss, autoprefixer
- lucide-react
- prop-types
- eslint, prettier, eslint-config-prettier, eslint-plugin-react, eslint-plugin-react-hooks

2 - ESLint
npx eslint --init

3 - Tailwind
Se precisares de inicializar o Tailwind manualmente:
npx tailwindcss init -p
npm install tailwind-scrollbar-hide
npm install react-slick slick-carousel

4- backend

Django Rest Framework:
pip install django-cors-headers

Install Flask:
pip install flask-cors
