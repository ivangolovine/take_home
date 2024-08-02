FROM node

RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY --chown=app:app . /app

CMD npm run dev
