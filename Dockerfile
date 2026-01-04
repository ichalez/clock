# Use nginx alpine for a lightweight web server
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy the application files to nginx html directory
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

# Create custom nginx configuration
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
listen 80;
server_name _;
root /usr/share/nginx/html;

# Logging
access_log /var/log/nginx/access.log;
error_log /var/log/nginx/error.log debug;

# Exact match for root
location = / {
try_files /index.html =404;
}

# Exact matches for static files - BEFORE the catch-all
location = /script.js {
default_type application/javascript;
add_header Content-Type "application/javascript; charset=utf-8";
add_header Cache-Control "no-cache, no-store, must-revalidate";
}

location = /style.css {
default_type text/css;
add_header Content-Type "text/css; charset=utf-8";
add_header Cache-Control "no-cache, no-store, must-revalidate";
}

location = /index.html {
default_type text/html;
add_header Content-Type "text/html; charset=utf-8";
add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# Catch-all for everything else
location / {
try_files $uri $uri/ /index.html;
}
}
EOF

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
