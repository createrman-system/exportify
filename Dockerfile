FROM node:18.18-alpine

RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install yt-dlp mutagen requests --break-system-packages

COPY . /

RUN yarn install

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT ["yarn", "dev"]
