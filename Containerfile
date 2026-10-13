# Dev + preview environment for rift4.github.io.
#
# The site is plain HTML/CSS/JS with no build step, so this image has one job:
# serve the checkout so you can preview it exactly as a host would, and give
# you a shell with the usual web tooling for when you want it.
#
# The base is node:22-bookworm, the same image Projects/container-lab uses, so
# the two dev containers behave identically. Nothing here needs Node -- it is
# there for consistency and for ad-hoc tooling, not because the site uses it.
FROM docker.io/library/node:22-bookworm

# nginx-light rather than the full nginx: no modules, no TLS, no mail proxy.
# It is only serving static files over http on localhost.
RUN apt-get update \
 && apt-get install -y --no-install-recommends nginx-light \
 && rm -rf /var/lib/apt/lists/*

# Run as a non-root user whose uid/gid match the host, so the bind-mounted
# checkout stays writable. Defaults match the common first local user;
# override for other machines:
#   podman build --build-arg UID=1001 --build-arg GID=1001 -t rift4-site .
#
# The node base image already has a `node` user at 1000:1000, which is exactly
# the default, so the common case is a no-op. The recreate branch only fires
# when a different UID/GID is requested, and has to drop the existing user
# first: you cannot add a second user named `node` or a second group with
# GID 1000.
ARG USERNAME=node
ARG UID=1000
ARG GID=1000

RUN if getent group "${GID}" >/dev/null && [ "$(getent group "${GID}" | cut -d: -f1)" = "${USERNAME}" ] \
         && [ "$(id -u "${USERNAME}")" = "${UID}" ]; then \
        echo "reusing existing ${USERNAME} ${UID}:${GID}"; \
    else \
        getent passwd "${USERNAME}" >/dev/null && userdel -r "${USERNAME}" 2>/dev/null || true; \
        getent group  "${USERNAME}" >/dev/null && groupdel "${USERNAME}" 2>/dev/null || true; \
        groupadd --gid "${GID}" "${USERNAME}"; \
        useradd --uid "${UID}" --gid "${GID}" --create-home --shell /bin/bash "${USERNAME}"; \
    fi

# The site root is the checkout. server_name is left empty so any Host header
# is accepted -- localhost, 127.0.0.1, or a *.localhost name. Setting it to a
# single name would make nginx reject everything else with a 404.
#
# The pid path is moved under /tmp because the compiled-in default is
# /run/nginx.pid, which the non-root user cannot write. listen 8080 rather
# than 80 for the same reason: binding a low port needs privileges this user
# deliberately does not have.
#
# mime.types is what maps .woff2 to font/woff2. Without it nginx falls back to
# application/octet-stream and the browser refuses the @font-face src, so the
# variable font silently never loads. The .woff2 type has to come from that
# file rather than a hand-written types block.
RUN printf '%s\n' \
      'server {' \
      '    listen 8080;' \
      '    server_name "";' \
      '    root /srv/www;' \
      '    index index.html;' \
      '' \
      '    # Directory URLs resolve to their index.html, so /pages/ serves' \
      '    # /pages/about.html the same way a static host would. try_files' \
      '    # rather than a bare root, so a missing path 404s instead of' \
      '    # silently falling through to the index page.' \
      '    location / {' \
      '        try_files $uri $uri/ =404;' \
      '    }' \
      '}' \
      > /etc/nginx/conf.d/site.conf \
 && printf '%s\n' \
      'pid /tmp/nginx.pid;' \
      'error_log /dev/stdout notice;' \
      'events {' \
      '    worker_connections 1024;' \
      '}' \
      'http {' \
      '    include /etc/nginx/mime.types;' \
      '    default_type application/octet-stream;' \
      '    access_log /dev/stdout;' \
      '' \
      '    # Same reason as the pid path: these default under /var/lib/nginx,' \
      '    # which is not writable here.' \
      '    client_body_temp_path /tmp/nginx-body;' \
      '    proxy_temp_path /tmp/nginx-proxy;' \
      '    fastcgi_temp_path /tmp/nginx-fastcgi;' \
      '    uwsgi_temp_path /tmp/nginx-uwsgi;' \
      '    scgi_temp_path /tmp/nginx-scgi;' \
      '' \
      '    include /etc/nginx/conf.d/*.conf;' \
      '}' \
      > /etc/nginx/nginx.conf \
 && mkdir -p /srv/www \
 && chown -R "${USERNAME}:${USERNAME}" /srv/www

# Validate the config at build time rather than discovering it at container
# start.
#
# `nginx -t` is not side-effect free: it creates the pid file and every
# *_temp_path directory, owned by root. Left alone they bake into the image and
# the runtime non-root user cannot write to them, which fails at startup with
# "Permission denied" on /tmp/nginx.pid. Both are removed and recreated owned
# by USERNAME here, in the same layer, so the image starts clean.
RUN nginx -t \
 && rm -f /tmp/nginx.pid \
 && rm -rf /tmp/nginx-body /tmp/nginx-proxy /tmp/nginx-fastcgi \
             /tmp/nginx-uwsgi /tmp/nginx-scgi \
 && mkdir -p /tmp/nginx-body /tmp/nginx-proxy /tmp/nginx-fastcgi \
              /tmp/nginx-uwsgi /tmp/nginx-scgi \
 && chown -R "${USERNAME}:${USERNAME}" \
              /tmp/nginx-body /tmp/nginx-proxy /tmp/nginx-fastcgi \
              /tmp/nginx-uwsgi /tmp/nginx-scgi

WORKDIR /srv/www

EXPOSE 8080

USER ${USERNAME}

CMD ["nginx", "-g", "daemon off;"]
