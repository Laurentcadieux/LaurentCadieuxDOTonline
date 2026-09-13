# Laurent Cadieux Website - Ubuntu Server Deployment Guide

## Prerequisites
- Ubuntu 22.04+ server
- Git repository access (key to be provided)
- Domain: www.laurentcadieux.online
- Root/sudo access on server

## Step 1: Server Initial Setup

### 1.1 Update system packages
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install essential tools
```bash
sudo apt install -y curl wget git unzip build-essential
```

### 1.3 Set up firewall (optional but recommended)
```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Step 2: Install Node.js (for building the frontend)

### 2.1 Install Node.js 20.x LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2.2 Verify installation
```bash
node --version  # Should be v20.x.x
npm --version   # Should be 10.x.x
```

## Step 3: Install Java (for voice gateway backend)

### 3.1 Install OpenJDK 17
```bash
sudo apt install -y openjdk-17-jdk
```

### 3.2 Verify installation
```bash
java -version  # Should be OpenJDK 17.x.x
```

## Step 4: Install Nginx (web server)

### 4.1 Install Nginx
```bash
sudo apt install -y nginx
```

### 4.2 Start and enable Nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4.3 Verify Nginx is running
```bash
sudo systemctl status nginx
```

## Step 5: Clone and Set Up the Project

### 5.1 Create project directory
```bash
sudo mkdir -p /var/www/laurentcadieux.online
sudo chown $USER:$USER /var/www/laurentcadieux.online
cd /var/www/laurentcadieux.online
```

### 5.2 Clone the repository
```bash
# Replace with your actual repository URL when provided
git clone <YOUR_GIT_REPO_URL> .
```

### 5.3 Install frontend dependencies
```bash
cd /var/www/laurentcadieux.online
npm ci
```

### 5.4 Build the frontend
```bash
npm run build
```

This will create a `dist/` folder with optimized static files.

## Step 6: Configure Nginx

### 6.1 Create Nginx site configuration
```bash
sudo nano /etc/nginx/sites-available/laurentcadieux.online
```

Paste this configuration:
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name www.laurentcadieux.online;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name www.laurentcadieux.online;

    # SSL certificate paths (update with your actual paths)
    ssl_certificate /etc/ssl/certs/laurentcadieux.online.crt;
    ssl_certificate_key /etc/ssl/private/laurentcadieux.online.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Serve static files
    root /var/www/laurentcadieux.online/dist;
    index index.html;

    # Main site
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy voice API requests to Java backend
    location /api/voice/ {
        proxy_pass http://127.0.0.1:8088;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:8088/health;
        proxy_http_version 1.1;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6.2 Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/laurentcadieux.online /etc/nginx/sites-enabled/
```

### 6.3 Test Nginx configuration
```bash
sudo nginx -t
```

### 6.4 Reload Nginx
```bash
sudo systemctl reload nginx
```

## Step 7: Set Up Java Voice Gateway Backend

### 7.1 Create service directory
```bash
sudo mkdir -p /opt/laurent-voice-gateway
sudo cp /var/www/laurentcadieux.online/server/LaurentVoiceGateway.java /opt/laurent-voice-gateway/
cd /opt/laurent-voice-gateway
```

### 7.2 Compile the Java server
```bash
javac LaurentVoiceGateway.java
```

### 7.3 Create environment variables file
```bash
sudo nano /opt/laurent-voice-gateway/.env
```

Add these variables (replace with actual values):
```bash
# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_AGENT_ID=your_agent_id_here

# Access Configuration
VOICE_ACCESS_SECRET=sherpa

# Server Configuration
PORT=8088
```

### 7.4 Set proper permissions
```bash
sudo chmod 600 /opt/laurent-voice-gateway/.env
```

### 7.5 Create systemd service
```bash
sudo nano /etc/systemd/system/laurent-voice-gateway.service
```

Paste this configuration:
```ini
[Unit]
Description=Laurent Cadieux Voice Gateway
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/laurent-voice-gateway
EnvironmentFile=/opt/laurent-voice-gateway/.env
ExecStart=/usr/bin/java -cp /opt/laurent-voice-gateway LaurentVoiceGateway
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### 7.6 Start and enable the service
```bash
sudo systemctl daemon-reload
sudo systemctl start laurent-voice-gateway
sudo systemctl enable laurent-voice-gateway
```

### 7.7 Verify service is running
```bash
sudo systemctl status laurent-voice-gateway
```

### 7.8 Test the health endpoint
```bash
curl http://127.0.0.1:8088/health
# Should return: {"ok":true}
```

## Step 8: Set Up SSL Certificate (HTTPS)

### 8.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 8.2 Obtain SSL certificate
```bash
sudo certbot --nginx -d www.laurentcadieux.online
```

Follow the prompts:
- Enter email address
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: yes)

### 8.3 Test automatic renewal
```bash
sudo certbot renew --dry-run
```

## Step 9: Final Verification

### 9.1 Test the website
```bash
curl https://www.laurentcadieux.online
# Should return the HTML content
```

### 9.2 Test the voice API health
```bash
curl https://www.laurentcadieux.online/health
# Should return: {"ok":true}
```

### 9.3 Check all services
```bash
sudo systemctl status nginx
sudo systemctl status laurent-voice-gateway
```

## Step 10: Ongoing Maintenance

### 10.1 Update the website
```bash
cd /var/www/laurentcadieux.online
git pull
npm ci
npm run build
```

### 10.2 Restart Java backend if needed
```bash
sudo systemctl restart laurent-voice-gateway
```

### 10.3 Reload Nginx if needed
```bash
sudo systemctl reload nginx
```

### 10.4 View logs
```bash
# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Voice gateway logs
sudo journalctl -u laurent-voice-gateway -f
```

## Troubleshooting

### Issue: Java service won't start
- Check logs: `sudo journalctl -u laurent-voice-gateway -n 50`
- Verify Java installation: `java -version`
- Check port conflicts: `sudo netstat -tlnp | grep 8088`

### Issue: Website not loading
- Check Nginx status: `sudo systemctl status nginx`
- Test Nginx config: `sudo nginx -t`
- Check file permissions: `ls -la /var/www/laurentcadieux.online/dist`

### Issue: Voice API returning errors
- Check environment variables: `sudo cat /opt/laurent-voice-gateway/.env`
- Verify ElevenLabs API key is valid
- Check Java service logs: `sudo journalctl -u laurent-voice-gateway -n 100`

### Issue: SSL certificate issues
- Renew certificate: `sudo certbot renew`
- Check certificate status: `sudo certbot certificates`

## Security Checklist
- [ ] Firewall configured (only ports 80, 443, 22 open)
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Environment variables file has restricted permissions (600)
- [ ] Services running as non-root user (www-data)
- [ ] Regular security updates: `sudo apt update && sudo apt upgrade`
- [ ] Monitor logs for suspicious activity

## Performance Optimization (Optional)
- Enable gzip compression in Nginx
- Set up CDN for static assets
- Configure caching headers properly
- Monitor server resources with tools like htop or netdata