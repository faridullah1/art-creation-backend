FROM node:16 As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT=3000
ENV PORT=${PORT}
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG DATABASE=${ai_art}
ENV DATABASE=${DATABASE}
ARG DATABASE_USER=root
ENV DATABASE_USER=${DATABASE_USER}
ARG USER_PASSWORD=mysql
ENV USER_PASSWORD=${USER_PASSWORD}
ARG CLIENT_ID=514739382536-2keit72t0nfuuvlvcni1gn03lmij0htq.apps.googleusercontent.com
ENV CLIENT_ID=${CLIENT_ID}
ARG HOST=mysql
ENV HOST=${HOST}
ARG DIALECT=mysql
ENV DIALECT=${DIALECT}

EXPOSE ${PORT}

CMD ["npm", "start"]
