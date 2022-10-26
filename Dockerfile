FROM node:16 As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
ENV DATABASE=ai_art
ENV DATABASE_USER=root
ENV USER_PASSWORD=mysql
ENV CLIENT_ID=601653797159-p2raa8mrfotcorb6jh3jd8sj4ab0c7jr.apps.googleusercontent.com
ENV HOST=mysql
ENV DIALECT=mysql
EXPOSE ${PORT}

CMD ["npm", "start"]
