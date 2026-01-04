# Use nginx alpine for a lightweight web server
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy the application files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Create custom nginx configuration
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Serve JavaScript files with correct MIME type
    location ~ \.js$ {
        add_header Content-Type application/javascript;
        add_header Cache-Control "no-cache";
    }

    # Serve CSS files with correct MIME type
    location ~ \.css$ {
        add_header Content-Type text/css;
        add_header Cache-Control "no-cache";
    }

    # Main location
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
