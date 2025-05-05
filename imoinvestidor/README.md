Todos os seguintes comandos tem de ser corridos dentro da pasta imoinvestidor (fazer cd imoinvestidor)

Para correr a app fazer 
```bash 
npm run dev
```
- Setup

Se estiveres no PowerShell e tiveres erros de permissões, corre:

```bash
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

## 1 - NodeJS
Fazer download do nodejs, em https://nodejs.org/
```bash
npm install
```

Se houver vulnerabilidades correr o comando: 
```bash
npm audit fix
```

Este comando instala automaticamente as dependências definidas no package.json, incluindo:
- react-router-dom
- axios
- tailwindcss, slider, postcss, autoprefixer
- lucide-react
- prop-types
- eslint, prettier, eslint-config-prettier, eslint-plugin-react, eslint-plugin-react-hooks

## 2 - ESLint

```bash
npx eslint --init
```
- "What do you want to lint?": Selecionar javascript e css
- "How would you like to use ESLint?": Selecionar "To check syntax and find problems"
- "What type of modules does your project use?": Selecionar JavaScript modules
- "Which framework does your project use?": Selecionar React
- "Does your project use TypeScript?": Selecionar no
- "Where does your code run?": Selecionar browser e node
- "Would you like to install them now?": Selecionar Yes
- "Which package manager do you want to use?": Selecionar npm

## 3 - Tailwind 
Se precisares de inicializar o Tailwind manualmente:
```bash
npx tailwindcss init -p
```



## 4- backend

Django Rest Framework:
```bash
pip install django-cors-headers
```

Install Flask:
```bash
pip install flask-cors
```