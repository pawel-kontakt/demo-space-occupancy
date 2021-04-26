FROM nginx:1.19

COPY deploy/nginx/frontend-variables.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/frontend-variables.sh

COPY deploy/nginx/nginx.conf /etc/nginx/
COPY deploy/nginx/default.conf.template /etc/nginx/templates/
COPY dist /usr/share/nginx/html/

EXPOSE 80

ENV LIVE_STREAM_URL="${LIVE_STREAM_URL}"
ENV LIVE_STREAM_API_KEY="${LIVE_STREAM_API_KEY}"
ENV WEB_ASSETS_CDN="${WEB_ASSETS_CDN}"
ENV VUE_APP_LIVE_STREAM_URL_FOR_WEB="${VUE_APP_LIVE_STREAM_URL_FOR_WEB}"
