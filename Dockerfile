# Use nginx alpine for a lightweight web server
FROM nginx:alpine

# Copy the application files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# Create a simple nginx configuration
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
    try_files $uri $uri/ /index.html; \
    add_header Cache-Control "no-cache"; \
    } \
    \
    location ~* \.(js|css)$ { \
    add_header Content-Type "application/javascript" always; \
    add_header Cache-Control "no-cache"; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
