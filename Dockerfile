FROM node:18.18-alpine

RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install yt-dlp mutagen requests --break-system-packages

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000
EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3000

CMD ["yarn", "dev"]
