FROM node:20.11-alpine

# Create app directory
WORKDIR /usr/api

# Install app dependencies
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

# Bundle app source
COPY . .

# Config environment variables
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG PORT
ENV PORT=${PORT}

ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL}

ARG LOGGERS
ENV LOGGERS=${LOGGERS}

ARG JWT_SECRET_KEY
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}

ARG JWT_VALIDATE
ENV JWT_VALIDATE ${JWT_VALIDATE}

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY ${OPENAI_API_KEY}

RUN pnpm prisma generate
RUN pnpm run build

EXPOSE 5000

CMD ["node", "dist/main.js"]