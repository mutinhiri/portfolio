import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   FlexilogicBlogArticle.jsx
   ─────────────────────────────────────────────────────────────
   HOW TO USE THIS TEMPLATE FOR EVERY NEW BLOG POST:

   1. Copy this file (or import it as a route component).
   2. Find the const ARTICLE = { … } object below and fill it in:
        - slug, title, category, date, readTime, author, excerpt
        - content: array of blocks (heading, paragraph, image,
          quote, code, callout, list) — examples are in the
          sample article below.
   3. In your router, add a route like:
        <Route path="/blog/:slug" element={<FlexilogicBlogArticle />} />
      The component reads the :slug param and finds the right
      article from BLOG_POSTS (imported from the portfolio file)
      or you can keep the article data right here.
   4. Make sure the `slug` here matches the `slug` in BLOG_POSTS
      in FlexilogicPortfolio.jsx so the card links to this page.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   ARTICLE DATA  ← Edit everything in this object for each post
   ───────────────────────────────────────────────────────────── */
const ARTICLE = {
  slug: "zero-downtime-deployments-node",
  category: "DevOps",
  categoryColor: "bg-[#C8922A]/15 text-[#C8922A]",
  title: "Zero-Downtime Deployments on a Budget: Our Node.js Playbook",
  subtitle: "Every minute your application is offline is a minute your users are losing trust in your product. Here is the practical playbook we use to deploy Node.js applications without taking them offline — on budgets that African startups actually have.",
  date: "10 January 2025",
  readTime: "5 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "☁️",
  coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",

  content: [
    {
      type: "paragraph",
      text: "It is 7pm on a Tuesday. Your Node.js application is handling its evening peak — the period when mobile money transactions, student fee payments, and delivery confirmations flood in after the working day ends. Your team has a critical bug fix ready to deploy. The traditional approach is to take the application offline, swap in the new code, restart the server, and hope the restart completes before too many users notice. In Europe or the United States, a two-minute maintenance window at an off-peak hour is a minor inconvenience. In African markets, where there is no true off-peak hour and where users have low tolerance for digital unreliability, it is a trust event.",
    },
    {
      type: "paragraph",
      text: "Zero-downtime deployment is the practice of releasing new versions of an application while the current version continues serving users without interruption. It sounds complex. In practice, for a Node.js application running on a single server or a small cloud environment, it is entirely achievable with tools that cost nothing and techniques that any engineer can learn in an afternoon. This is the playbook we use at FlexiLogic for every Node.js production deployment.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "Why Downtime Hits African Products Harder",
    },
    {
      type: "paragraph",
      text: "Application downtime is a universal problem but an unequally distributed one. In markets where digital trust is still being established — where a significant proportion of users adopted your product recently and have not yet built the loyalty that tolerates occasional failures — a deployment that takes your application offline for even two minutes sends a message. The message is that your product is unreliable. And in African markets where the alternative to your digital product is often a manual, in-person process that users abandoned your product to avoid, unreliability is a reason to go back to the old way.",
    },
    {
      type: "callout",
      emoji: "⚠️",
      title: "The trust cost of downtime",
      text: "A mobile money platform that goes offline during a peak payment window does not just lose the transactions that could not be processed. It loses the confidence of every user who tried to transact and could not. In markets where that confidence took months to build, two minutes of downtime can undo a meaningful portion of it. Zero-downtime deployment is not a technical nicety — it is a trust preservation strategy.",
    },
    {
      type: "paragraph",
      text: "There is also a practical business dimension. African tech products frequently serve users across multiple time zones — a Zimbabwean platform with users in South Africa, Zambia, and the diaspora has no genuine off-peak window. A Kenyan fintech with East African and European users faces the same challenge. The concept of a safe maintenance window, where most users are asleep and a brief outage will be unnoticed, does not exist for products with geographically distributed user bases.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Foundation: Understanding What Happens During a Normal Deployment",
    },
    {
      type: "paragraph",
      text: "Before explaining zero-downtime techniques, it helps to understand exactly why a normal deployment causes downtime. When you SSH into a server and restart your Node.js application — whether manually or via a deployment script — there is a period between the old process stopping and the new process being ready to accept connections. During that window, any incoming request hits a server with nothing listening on the application port. The user receives a connection refused error or a 502 Bad Gateway from Nginx. That window is the downtime.",
    },
    {
      type: "paragraph",
      text: "Zero-downtime deployment eliminates that window by ensuring the new version of the application is fully started and ready to handle requests before the old version stops. At no point during the deployment is there a moment where no process is listening for incoming connections. The transition is invisible to users.",
    },
    {
      type: "heading",
      level: 2,
      text: "Technique 1: PM2 Cluster Mode with Graceful Reloads",
    },
    {
      type: "paragraph",
      text: "PM2 is a production process manager for Node.js applications. It handles starting, stopping, restarting, and monitoring your application processes, and it is the fastest path to zero-downtime deployments for teams running Node.js on a single server. PM2's cluster mode runs multiple instances of your application in parallel — one per CPU core — and its graceful reload feature restarts those instances one at a time, ensuring that at least one instance is always available to handle incoming requests throughout the reload process.",
    },
    {
      type: "code",
      lang: "javascript",
      text: `// ecosystem.config.js — PM2 configuration file
// Place this in your project root

module.exports = {
  apps: [{
    name: "flexilogic-api",
    script: "./src/server.js",

    // Cluster mode — one process per CPU core
    // On a 2-core DigitalOcean droplet: 2 processes
    // On a 4-core AWS t3.medium: 4 processes
    instances: "max",
    exec_mode: "cluster",

    // Graceful shutdown — wait for in-flight requests to complete
    // before killing the old process (max 10 seconds)
    kill_timeout: 10000,

    // New process must be ready within 10 seconds or PM2 rolls back
    listen_timeout: 10000,

    // Restart if memory exceeds 500MB (memory leak protection)
    max_memory_restart: "500M",

    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
    }
  }]
};

// ─── In your server.js — signal readiness to PM2 ───────────────
// This tells PM2 the process is ready to receive traffic
// Only signal ready AFTER database connections are established

const app = express();
// ... your middleware and routes ...

const server = app.listen(PORT, async () => {
  await db.connect();           // Wait for DB connection
  await redis.connect();        // Wait for Redis connection

  console.log(\`Server ready on port \${PORT}\`);

  // Signal to PM2 that this process is ready for traffic
  if (process.send) process.send("ready");
});

// Graceful shutdown — finish in-flight requests before exiting
process.on("SIGINT", () => {
  server.close(() => {
    db.disconnect();
    process.exit(0);
  });
});`,
    },
    {
      type: "paragraph",
      text: "With this configuration in place, deploying a new version is a single command. PM2 restarts each cluster instance one at a time, waiting for each new instance to signal readiness before moving to the next. Throughout the process, the remaining instances continue serving traffic. Users experience no interruption.",
    },
    {
      type: "code",
      lang: "bash",
      text: `# Zero-downtime deployment with PM2
# Run this on your server after pulling new code

# 1. Pull the latest code
git pull origin main

# 2. Install any new dependencies
npm ci --production

# 3. Graceful reload — restarts instances one at a time
#    New code is live, zero connections dropped
pm2 reload ecosystem.config.js --env production

# 4. Save the process list so PM2 restarts correctly after a reboot
pm2 save

# ─── Check that everything is healthy ───────────────────────────
pm2 status          # All instances should show 'online'
pm2 logs --lines 50 # Check for startup errors`,
    },
    {
      type: "heading",
      level: 2,
      text: "Technique 2: Nginx as a Reverse Proxy and Load Balancer",
    },
    {
      type: "paragraph",
      text: "Nginx sits in front of your Node.js application and handles incoming HTTP and HTTPS traffic. As a reverse proxy it forwards requests to your application processes, abstracts the port your application runs on from the port users connect to, and handles SSL termination so your Node.js code never needs to deal with certificate management. As a load balancer it distributes traffic across multiple application instances — including the multiple PM2 cluster instances running on the same server.",
    },
    {
      type: "paragraph",
      text: "The combination of Nginx and PM2 cluster mode is the most cost-effective zero-downtime setup for African startups running on a single server or a small VPS. Nginx never goes offline during a Node.js deployment — it continues accepting connections and routing them to whichever PM2 instances are currently live. Users see no interruption even as PM2 cycles through restarting each instance.",
    },
    {
      type: "code",
      lang: "nginx",
      text: `# /etc/nginx/sites-available/flexilogic-api
# Nginx reverse proxy configuration for a Node.js API

upstream nodejs_cluster {
    # PM2 cluster instances all listen on the same port
    # Nginx load balances across them automatically
    server 127.0.0.1:3000;

    # If running on multiple servers, add them here:
    # server 10.0.0.2:3000;
    # server 10.0.0.3:3000;

    # Keep connections alive to Node.js — reduces overhead
    keepalive 64;
}

server {
    listen 80;
    server_name api.yourdomain.co.zw;

    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.co.zw;

    # SSL certificate (Let's Encrypt — free)
    ssl_certificate     /etc/letsencrypt/live/api.yourdomain.co.zw/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.co.zw/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000" always;

    location / {
        proxy_pass         http://nodejs_cluster;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;

        # Health check timeout — fail fast if Node.js is unresponsive
        proxy_connect_timeout 5s;
        proxy_read_timeout    30s;
    }

    # Health check endpoint — used by monitoring and load balancers
    location /health {
        proxy_pass http://nodejs_cluster/health;
        access_log off;   # Don't fill logs with health check noise
    }
}`,
    },
    {
      type: "heading",
      level: 2,
      text: "Technique 3: Blue-Green Deployments",
    },
    {
      type: "paragraph",
      text: "Blue-green deployment is a strategy that runs two complete, identical environments in parallel — Blue (the current live version) and Green (the new version being deployed). When the Green environment is fully started, tested, and confirmed healthy, traffic is switched from Blue to Green at the load balancer level. The switch is instantaneous from the user's perspective. If anything is wrong with Green after the switch, traffic is switched back to Blue in seconds — a rollback that takes one command rather than a full redeployment.",
    },
    {
      type: "paragraph",
      text: "Blue-green deployment requires either two servers or a containerised environment where two application versions can run side by side on the same server using different ports. On a budget, the two-port approach on a single server is entirely workable for most African startup traffic volumes.",
    },
    {
      type: "code",
      lang: "bash",
      text: `#!/bin/bash
# blue-green-deploy.sh — simple blue-green deployment script
# Runs two Node.js instances on different ports, switches Nginx between them

BLUE_PORT=3001
GREEN_PORT=3002
NGINX_CONF="/etc/nginx/sites-available/flexilogic-api"

# Determine which environment is currently live
CURRENT=$(grep -oP '(?<=server 127.0.0.1:)\d+' $NGINX_CONF | head -1)

if [ "$CURRENT" = "$BLUE_PORT" ]; then
  DEPLOY_PORT=$GREEN_PORT
  DEPLOY_ENV="green"
  LIVE_ENV="blue"
else
  DEPLOY_PORT=$BLUE_PORT
  DEPLOY_ENV="blue"
  LIVE_ENV="green"
fi

echo "Currently live: $LIVE_ENV (port $CURRENT)"
echo "Deploying to:   $DEPLOY_ENV (port $DEPLOY_PORT)"

# 1. Pull new code and install dependencies
git pull origin main
npm ci --production

# 2. Start the new version on the deploy port
PORT=$DEPLOY_PORT pm2 start ecosystem.config.js \
  --name "app-$DEPLOY_ENV" \
  --env production

# 3. Wait for the new version to become healthy
echo "Waiting for $DEPLOY_ENV to become healthy..."
for i in {1..30}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    http://127.0.0.1:$DEPLOY_PORT/health)
  if [ "$STATUS" = "200" ]; then
    echo "$DEPLOY_ENV is healthy — switching traffic"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "Health check failed — aborting deployment"
    pm2 delete "app-$DEPLOY_ENV"
    exit 1
  fi
  sleep 2
done

# 4. Switch Nginx to point at the new version
sed -i "s/server 127.0.0.1:$CURRENT/server 127.0.0.1:$DEPLOY_PORT/" $NGINX_CONF
nginx -t && nginx -s reload

echo "Traffic switched to $DEPLOY_ENV — deployment complete"

# 5. Stop the old version (optional — keep it for quick rollback)
# pm2 delete "app-$LIVE_ENV"
echo "Old $LIVE_ENV still running on port $CURRENT for rollback if needed"
echo "To rollback: sed -i 's/$DEPLOY_PORT/$CURRENT/' $NGINX_CONF && nginx -s reload"`,
    },
    {
      type: "heading",
      level: 2,
      text: "Technique 4: Docker and Containerised Deployments",
    },
    {
      type: "paragraph",
      text: "Docker containers package your Node.js application and all its dependencies — the exact Node.js version, the exact npm packages, the exact system libraries — into a single portable unit. Containerised deployments make zero-downtime even more reliable because the new version of your application is built and tested in an identical environment to production before a single production request is affected. Docker Compose makes running multiple containers on a single server straightforward, and the container orchestration handles the rolling restart logic automatically.",
    },
    {
      type: "code",
      lang: "yaml",
      text: `# docker-compose.yml — production Node.js setup
# Nginx + Node.js app + automatic zero-downtime deploys

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - app
    restart: always

  app:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      PORT: 3000
      DATABASE_URL: {DATABASE_URL}
      REDIS_URL: {REDIS_URL}

    # Health check — Docker won't route traffic until this passes
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s   # Give Node.js time to connect to DB on startup

    restart: unless-stopped

# ─── Dockerfile ──────────────────────────────────────────────────
# FROM node:20-alpine
#
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --production
# COPY . .
#
# USER node          # Never run Node.js as root in production
# EXPOSE 3000
# CMD ["node", "src/server.js"]`,
    },
    {
      type: "paragraph",
      text: "With Docker Compose, a zero-downtime deployment is a single command that builds the new image, starts new containers from it, waits for health checks to pass, and then stops the old containers — all automatically. If the health check fails, Docker stops the deployment and the old containers continue serving traffic. No manual intervention required, no risk of a bad deployment taking everything offline.",
    },
    {
      type: "code",
      lang: "bash",
      text: `# Zero-downtime Docker Compose deployment
# Docker handles the rolling restart automatically

# Pull new code
git pull origin main

# Build new image and deploy with zero downtime
# --no-deps: only recreate the app container, not nginx
# Docker waits for health checks before stopping old container
docker compose up -d --build --no-deps app

# Verify deployment
docker compose ps           # All containers should be 'healthy'
docker compose logs app --tail 50   # Check for startup errors

# Instant rollback if needed — redeploy previous image
# docker compose up -d --no-deps app --image myapp:previous-tag`,
    },
    {
      type: "heading",
      level: 2,
      text: "Health Checks: The Safety Net That Makes Everything Work",
    },
    {
      type: "paragraph",
      text: "Every zero-downtime technique described above depends on one critical capability: knowing whether the new version of your application is actually ready to serve traffic before routing users to it. Health checks are the mechanism that provides that certainty. A health check is a dedicated API endpoint in your Node.js application that returns a 200 status code when the application is fully initialised and ready to handle requests — database connected, cache warmed, external services reachable — and a non-200 status when it is not.",
    },
    {
      type: "code",
      lang: "javascript",
      text: `// Health check endpoint — add this to your Express app
// Returns 200 only when ALL dependencies are healthy
// PM2, Docker, and load balancers poll this before routing traffic

app.get("/health", async (req, res) => {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {}
  };

  let statusCode = 200;

  // Check database connectivity
  try {
    await db.raw("SELECT 1");   // Lightweight query — just tests connection
    health.checks.database = "ok";
  } catch (err) {
    health.checks.database = "error";
    health.status = "degraded";
    statusCode = 503;           // Service Unavailable — don't route traffic here
  }

  // Check Redis connectivity
  try {
    await redis.ping();
    health.checks.redis = "ok";
  } catch (err) {
    health.checks.redis = "error";
    // Redis failure is non-fatal if it's only used for caching
    // Adjust based on your architecture
    health.checks.redis = "degraded";
  }

  // Check memory usage — restart if approaching limit
  const memUsage = process.memoryUsage();
  const memMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  health.checks.memory = \`\${memMB}MB\`;

  if (memMB > 450) {  // Alert if approaching PM2's 500MB restart threshold
    health.status = "degraded";
    health.checks.memoryWarning = "approaching limit";
  }

  res.status(statusCode).json(health);
});

// Example healthy response:
// {
//   "status": "ok",
//   "timestamp": "2025-01-10T14:32:00.000Z",
//   "uptime": 3847.2,
//   "checks": {
//     "database": "ok",
//     "redis": "ok",
//     "memory": "124MB"
//   }
// }`,
    },
    {
      type: "heading",
      level: 2,
      text: "Rollback Strategy: When a Deployment Goes Wrong",
    },
    {
      type: "paragraph",
      text: "Zero-downtime deployment eliminates the risk of downtime during a deployment. It does not eliminate the risk of deploying broken code. A new version that deploys cleanly but has a logic error that only manifests under production load is a different kind of problem — one that requires fast rollback rather than fast deployment. Every deployment strategy we use at FlexiLogic includes a defined rollback procedure that can be executed in under two minutes.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "PM2 rollback — keep the previous deployment's code in a dated directory alongside the current one. A rollback is a git checkout to the previous commit, npm ci, and pm2 reload. Takes under 90 seconds.",
        "Blue-green rollback — the old environment is kept running after the traffic switch. Rollback is a single Nginx config change to point traffic back at the old port. Takes under 10 seconds.",
        "Docker rollback — tag every production image with the git commit SHA. Rollback is docker compose up with the previous image tag. Takes the time to pull the previous image from the registry — typically under 60 seconds.",
        "Database migrations — always write backward-compatible migrations that the previous version of the code can run against. Never deploy a database migration that makes the previous application version incompatible with the schema. This constraint is the hardest discipline to maintain but the most important for safe rollbacks.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "CI/CD Pipeline Integration: Automating the Whole Thing",
    },
    {
      type: "paragraph",
      text: "Manual deployment steps are a source of human error and a bottleneck on deployment frequency. The logical endpoint of the techniques described above is a fully automated CI/CD pipeline that runs tests, builds the application, deploys it with zero downtime, verifies the health check, and rolls back automatically if the health check fails — triggered by a single git push to the main branch.",
    },
    {
      type: "code",
      lang: "yaml",
      text: `# .github/workflows/deploy.yml
# Automated zero-downtime deployment pipeline
# Triggered on every push to main branch

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test      # Only deploy if tests pass
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production server
        uses: appleboy/ssh-action@v1
        with:
          host:     {{ secrets.PROD_HOST }}
          username: {{ secrets.PROD_USER }}
          key:      {{ secrets.PROD_SSH_KEY }}
          script: |
            cd /var/www/flexilogic-api

            # Pull latest code
            git pull origin main
            npm ci --production

            # Zero-downtime reload via PM2
            pm2 reload ecosystem.config.js --env production

            # Verify health check passes after deployment
            sleep 5
            HEALTH=$(curl -s -o /dev/null -w "%{http_code}" \
              https://api.yourdomain.co.zw/health)

            if [ "$HEALTH" != "200" ]; then
              echo "Health check failed after deployment — rolling back"
              git checkout HEAD~1
              npm ci --production
              pm2 reload ecosystem.config.js --env production
              exit 1
            fi

            echo "Deployment successful — health check passed"

      - name: Notify team on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "⚠️ Production deployment failed on {{ github.ref }}. Rollback executed. Check the logs."
            }
        env:
          SLACK_WEBHOOK_URL: {{ secrets.SLACK_WEBHOOK_URL }}`,
    },
    {
      type: "paragraph",
      text: "With this pipeline in place, a developer merging a pull request to main triggers an automated sequence: tests run, code deploys with zero downtime, health is verified, and the team is notified if anything goes wrong — all without a single manual step. Deployments go from being anxiety-inducing events that require senior engineering attention to being routine, invisible background operations that happen multiple times per day.",
    },
    {
      type: "quote",
      text: "The goal of a good deployment pipeline is to make deploying so boring that nobody thinks about it. When a deployment is unremarkable, your team deploys more frequently, ships smaller changes, and reduces the risk of every individual release. Fear of deploying is a compounding tax on your entire engineering velocity.",
      author: "FlexiLogic DevOps Team",
    },
    {
      type: "heading",
      level: 2,
      text: "Choosing the Right Approach for Your Stage",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Early stage, single server, limited budget — start with PM2 cluster mode and graceful reloads. It costs nothing beyond what you already have, takes an afternoon to set up, and eliminates deployment downtime immediately. Add Nginx in front as a reverse proxy from day one — you will need it eventually and it is easy to add early.",
        "Growing product, single server, moderate traffic — add blue-green deployment on top of PM2. The two-port setup requires no additional infrastructure cost and gives you instant rollback capability that PM2 reload alone does not provide.",
        "Scaling product, multiple servers or cloud auto-scaling — move to Docker containers and a container orchestration approach. Docker Compose is sufficient for two or three servers. When you reach the scale where you need more than three servers, consider AWS ECS, Google Cloud Run, or a managed Kubernetes service.",
        "Any stage — implement the health check endpoint immediately, regardless of which deployment strategy you choose. It costs thirty minutes to build and is the dependency that makes every other technique reliable.",
      ],
    },
    {
      type: "callout",
      emoji: "🚀",
      title: "Need help setting this up?",
      text: "If your team is still deploying with a manual restart and a held breath, FlexiLogic can implement a zero-downtime deployment pipeline for your Node.js application in a single engagement. We deliver the PM2 configuration, Nginx setup, health check endpoint, and CI/CD pipeline — fully documented and with your team trained to own it. Get in touch to book a scoping call.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "Zero-downtime deployment is one of the highest-leverage DevOps investments a Node.js team can make. The techniques are not complicated. The tools are free. The setup takes a day, not a sprint. And the return — deployments that happen without drama, without user impact, and without requiring your best engineer to be available and anxious every time code ships — compounds every single time you deploy for the rest of the product's life. For African tech products where user trust is hard-won and easily lost, that return is not optional. It is foundational.",
    },
  ],

  related: [
    {
      slug: "cloud-devops",
      category: "DevOps",
      categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
      title: "Why African Startups Can No Longer Afford to Ignore DevOps",
      date: "13 Mar 2025",
      readTime: "9 min read",
      cover: "☁️",
      coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
    },
    {
      slug: "why-african-startups-choose-flutter",
      category: "Engineering",
      categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
      title: "Why African Startups Are Choosing Flutter Over React Native in 2025",
      date: "28 Jan 2025",
      readTime: "6 min read",
      cover: "📱",
      coverBg: "linear-gradient(135deg,#0d1b2a 0%,#1a2f4a 100%)",
    },
  ],
};

/* ─── Styles ─── */
const ArticleStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    :root { --gold: #C8922A; }
    * { box-sizing: border-box; }
    body { font-family: 'DM Sans', sans-serif; background: #F8F6F1; margin: 0; overflow-x: hidden; }
    .serif { font-family: 'DM Serif Display', Georgia, serif; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #F8F6F1; }
    ::-webkit-scrollbar-thumb { background: #C8922A; border-radius: 2px; }

    /* Reading progress bar */
    #read-progress {
      position: fixed; top: 0; left: 0; height: 3px; z-index: 200;
      background: linear-gradient(90deg,#C8922A,#E5A93C);
      transition: width .1s linear;
    }

    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    .btn-shimmer {
      background: linear-gradient(90deg,#C8922A 0%,#E5A93C 40%,#C8922A 60%,#E5A93C 100%);
      background-size: 200% 100%; animation: shimmer 3s linear infinite;
    }
    .afu { animation: fadeUp 0.6s ease both; }

    /* Article body prose */
    .prose-body { font-size: 17px; line-height: 1.85; color: #3D4461; }
    .prose-body p { margin: 0 0 1.6em; }

    /* Code block */
    .code-block {
      background: #0B1221;
      border: 1px solid rgba(200,146,42,0.15);
      border-radius: 14px;
      overflow: hidden;
      margin: 2em 0;
    }
    .code-block pre {
      margin: 0; padding: 22px 24px;
      font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
      font-size: 13px; line-height: 1.7; color: #E2E8F0;
      overflow-x: auto;
    }
    .code-lang-badge {
      background: rgba(200,146,42,0.12);
      color: #C8922A;
      font-size: 10px; font-weight: 800;
      letter-spacing: .1em; text-transform: uppercase;
      padding: 6px 14px;
      border-bottom: 1px solid rgba(200,146,42,0.15);
    }

    /* TOC sticky */
    .toc-item {
      font-size: 12px; font-weight: 600; color: #6B7592;
      padding: 6px 0 6px 12px;
      border-left: 2px solid #E4E1D9;
      cursor: pointer;
      transition: color .18s, border-color .18s;
      line-height: 1.4;
    }
    .toc-item:hover, .toc-item.active { color: #C8922A; border-color: #C8922A; }
    .toc-item.h3 { padding-left: 24px; font-weight: 500; font-size: 11px; }

    /* Related card hover */
    .related-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; cursor: pointer; }
    .related-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(11,18,33,0.1); border-color: rgba(200,146,42,0.3) !important; }
  `}</style>
);

/* ─── Icons ─── */
const Arr = ({ sz = 14 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const ArrLeft = ({ sz = 14 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
);
const LogoMark = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect width="100" height="100" rx="14" fill="#0B1221" />
    <path d="M38 14 C30 16 24 22 22 30 C20 38 22 44 20 50 C18 58 22 66 28 72 C34 78 40 82 46 84 C52 86 58 82 62 76 C66 70 66 62 68 56 C70 50 74 44 72 38 C70 32 64 28 60 22 C56 16 46 12 38 14Z" fill="#F8F6F1" opacity="0.92" />
    <line x1="50" y1="60" x2="50" y2="38" stroke="#0B1221" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="52" x2="42" y2="44" stroke="#0B1221" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="38" x2="58" y2="30" stroke="#C8922A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="62" r="3.5" fill="#6B7592" />
    <circle cx="42" cy="43" r="3.5" fill="#6B7592" />
    <circle cx="58" cy="29" r="3.5" fill="#C8922A" />
    <circle cx="50" cy="37" r="3.5" fill="#C8922A" />
  </svg>
);

/* ─── Hooks ─── */
function useReadProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const calc = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", calc, { passive: true });
    return () => window.removeEventListener("scroll", calc);
  }, []);
  return progress;
}

/* ─── Content block renderer ─── */
function Block({ block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="prose-body">{block.text}</p>;

    case "heading":
      if (block.level === 2) return (
        <h2
          id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="serif italic text-[#0B1221] mt-12 mb-5"
          style={{ fontSize: "clamp(22px,3vw,28px)", scrollMarginTop: "96px" }}
        >
          {block.text}
        </h2>
      );
      return (
        <h3
          id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="serif italic text-[#0B1221] mt-9 mb-4 text-[20px]"
          style={{ scrollMarginTop: "96px" }}
        >
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-7 border-l-[3px] border-[#C8922A]">
          <p className="serif italic text-[#0B1221] text-[18px] leading-[1.7] mb-3">{block.text}</p>
          {block.author && <cite className="text-[12px] font-bold text-[#6B7592] not-italic">— {block.author}</cite>}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-7 bg-[#FDF3E0] border border-[#C8922A]/25 rounded-2xl px-6 py-5 flex gap-4">
          <div className="text-[22px] flex-shrink-0 mt-0.5">{block.emoji}</div>
          <div>
            {block.title && <div className="text-[11px] font-extrabold tracking-[.1em] text-[#C8922A] uppercase mb-2">{block.title}</div>}
            <p className="text-[14px] text-[#3D4461] leading-[1.75] m-0">{block.text}</p>
          </div>
        </div>
      );

    case "list":
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={`my-6 pl-5 space-y-2 ${block.ordered ? "list-decimal" : "list-none"}`}>
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-[#3D4461] leading-[1.75]">
              {!block.ordered && (
                <span className="flex-shrink-0 mt-[6px] w-4 h-4 rounded-full bg-[#C8922A]/15 border border-[#C8922A]/30 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8922A] inline-block" />
                </span>
              )}
              {block.ordered && <span className="flex-shrink-0 w-5 text-right text-[#C8922A] font-bold text-[13px] mt-0.5">{i + 1}.</span>}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );

    case "code":
      return (
        <div className="code-block">
          {block.lang && <div className="code-lang-badge">{block.lang}</div>}
          <pre><code>{block.text}</code></pre>
        </div>
      );

    case "image":
      return (
        <figure className="my-8">
          <img src={block.src} alt={block.caption || ""} className="w-full rounded-2xl border border-[#E4E1D9]" />
          {block.caption && <figcaption className="text-center text-[12px] text-[#6B7592] mt-3 font-medium">{block.caption}</figcaption>}
        </figure>
      );

    case "divider":
      return (
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#E4E1D9]" />
          <span className="text-[#C8922A] text-xs">◆</span>
          <div className="flex-1 h-px bg-[#E4E1D9]" />
        </div>
      );

    default:
      return null;
  }
}

/* ─── Table of Contents ─── */
function TableOfContents({ content }) {
  const [active, setActive] = useState("");
  const headings = content.filter(b => b.type === "heading");

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-20% 0px -75% 0px" });
    headings.forEach(h => {
      const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="text-[9px] font-extrabold tracking-[.15em] text-[#6B7592] uppercase mb-4">In this article</div>
      <nav className="flex flex-col gap-0.5">
        {headings.map((h, i) => {
          const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <button
              key={i}
              className={`toc-item text-left ${h.level === 3 ? "h3" : ""} ${active === id ? "active" : ""}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            >
              {h.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ─── Share buttons ─── */
function ShareBar({ title, slug }) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const titleEnc = encodeURIComponent(title);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-bold tracking-[.1em] uppercase text-[#6B7592] mr-1">Share</span>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${titleEnc}`} target="_blank" rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-[#0B1221] flex items-center justify-center text-white hover:bg-[#1DA1F2] transition-colors no-underline">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-[#0B1221] flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors no-underline">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <button onClick={copy}
        className="w-8 h-8 rounded-lg bg-[#0B1221] flex items-center justify-center text-white hover:bg-[#C8922A] transition-colors cursor-pointer border-none">
        {copied
          ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        }
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function FlexilogicBlogArticle() {
  const progress = useReadProgress();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goTo = (slug) => {
    if (slug === "all") navigate("/blog");
    else navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ArticleStyles />

      {/* Reading progress bar */}
      <div id="read-progress" style={{ width: `${progress}%` }} />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-12 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-[#F8F6F1]/95 backdrop-blur-[18px] border-b border-[#E4E1D9]" : "bg-transparent"}`}>
        <div className="flex items-center gap-8">
          {/* Back to portfolio */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7592] hover:text-[#0B1221] transition-colors cursor-pointer bg-transparent border-none"
          >
            <ArrLeft sz={13} /> Back
          </button>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <LogoMark size={34} />
            <div>
              <div className="text-[14px] font-extrabold text-[#0B1221] tracking-tight leading-tight">FLEXILOGIC</div>
              <div className="text-[7px] font-bold tracking-[.2em] text-[#C8922A]">AFRICA</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ShareBar title={ARTICLE.title} slug={ARTICLE.slug} />
          <Link to="/#contact" className="btn-shimmer font-bold text-[12px] text-[#0B1221] border-none rounded-[10px] px-4 py-2 cursor-pointer flex items-center gap-1.5 no-underline ml-2">
            Start a Project <Arr sz={12} />
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-28 pb-16 px-12" style={{ background: ARTICLE.coverBg }}>
        {/* Subtle grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {[100,200,300,400,500,600,700,800,900,1000,1100].map(x=><line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#C8922A" strokeWidth="1"/>)}
          {[50,100,150,200,250,300,350].map(y=><line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#C8922A" strokeWidth="1"/>)}
        </svg>
        {/* Big cover emoji */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[160px] opacity-[0.08] select-none pointer-events-none leading-none">
          {ARTICLE.coverEmoji}
        </div>

        <div className="relative z-10 max-w-[780px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/35 text-[11px] font-semibold mb-6">
            <Link to="/" className="hover:text-white/70 transition-colors no-underline text-white/35">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white/70 transition-colors no-underline text-white/35">Blog</Link>
            <span>/</span>
            <span className="text-white/55 truncate max-w-[240px]">{ARTICLE.title}</span>
          </div>

          {/* Category tag */}
          <div className={`inline-flex items-center text-[9px] font-extrabold tracking-[.1em] uppercase px-3 py-1.5 rounded-full border border-current/25 mb-5 ${ARTICLE.categoryColor}`}>
            {ARTICLE.category}
          </div>

          {/* Title */}
          <h1 className="serif italic text-white leading-[1.05] mb-5 afu" style={{ fontSize: "clamp(28px,4.5vw,50px)" }}>
            {ARTICLE.title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/55 text-[16px] leading-[1.75] mb-8 max-w-[600px] afu" style={{ animationDelay: ".1s" }}>
            {ARTICLE.subtitle}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-5 flex-wrap afu" style={{ animationDelay: ".18s" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C8922A] flex items-center justify-center text-[11px] font-extrabold text-[#0B1221]">
                {ARTICLE.author.avatar}
              </div>
              <div>
                <div className="text-white text-[12px] font-bold leading-none">{ARTICLE.author.name}</div>
                <div className="text-white/40 text-[10px] mt-0.5">{ARTICLE.author.role}</div>
              </div>
            </div>
            <div className="w-px h-7 bg-white/15" />
            <div className="text-white/45 text-[12px] font-semibold">{ARTICLE.date}</div>
            <div className="w-1 h-1 rounded-full bg-[#C8922A] inline-block" />
            <div className="text-white/45 text-[12px] font-semibold">{ARTICLE.readTime}</div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main className="px-12 py-16" style={{ background: "#F8F6F1" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid gap-16" style={{ gridTemplateColumns: "1fr 220px" }}>

            {/* Article content */}
            <article>
              {ARTICLE.content.map((block, i) => <Block key={i} block={block} />)}

              {/* Author card */}
              <div className="mt-14 p-6 bg-white border border-[#E4E1D9] rounded-2xl flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#C8922A] flex items-center justify-center text-[18px] font-extrabold text-[#0B1221] flex-shrink-0">
                  {ARTICLE.author.avatar}
                </div>
                <div>
                  <div className="text-[12px] font-extrabold uppercase tracking-[.1em] text-[#C8922A] mb-1">Written by</div>
                  <div className="serif text-[#0B1221] text-[18px] mb-1">{ARTICLE.author.name}</div>
                  <div className="text-[13px] text-[#6B7592]">{ARTICLE.author.role} · FlexiLogic Africa</div>
                </div>
              </div>

              {/* Share row */}
              <div className="mt-8 pt-8 border-t border-[#E4E1D9] flex items-center justify-between flex-wrap gap-4">
                <ShareBar title={ARTICLE.title} slug={ARTICLE.slug} />
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-[13px] font-bold text-[#6B7592] hover:text-[#0B1221] cursor-pointer bg-transparent border-none transition-colors"
                >
                  <ArrLeft sz={13} /> Back to Blog
                </button>
              </div>
            </article>

            {/* Sticky sidebar */}
            <aside>
              <TableOfContents content={ARTICLE.content} />
            </aside>

          </div>
        </div>
      </main>

      {/* ── RELATED POSTS ── */}
      {ARTICLE.related?.length > 0 && (
        <section className="px-12 py-16 bg-[#EEE9DF] border-t border-[#E4E1D9]">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex text-[10px] font-extrabold tracking-[.1em] uppercase text-[#C8922A] bg-[#FDF3E0] border border-[#C8922A]/25 px-3 py-1 rounded-full mb-3">More from the Studio</div>
                <h3 className="serif italic text-[#0B1221] text-[28px]">Keep Reading</h3>
              </div>
              <button
                onClick={() => goTo("all")}
                className="font-bold text-[13px] bg-transparent text-[#0B1221] border border-[#E4E1D9] rounded-xl px-5 py-2.5 flex items-center gap-2 cursor-pointer hover:border-[#C8922A]/30 transition-all"
              >
                All Articles <Arr />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {ARTICLE.related.map(post => (
                <div
                  key={post.slug}
                  className="related-card bg-white border border-[#E4E1D9] rounded-3xl overflow-hidden flex flex-col"
                  onClick={() => goTo(post.slug)}
                >
                  <div className="relative overflow-hidden aspect-video flex items-center justify-center" style={{ background: post.coverBg }}>
                    <div className="text-[56px] opacity-25 select-none">{post.cover}</div>
                    <div className="absolute top-4 left-5">
                      <span className={`text-[9px] font-extrabold tracking-[.1em] uppercase px-2.5 py-1 rounded-full border border-current/25 ${post.categoryColor}`}>{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 text-[11px] text-[#6B7592] font-semibold mb-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#C8922A] inline-block" />
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="serif italic text-[#0B1221] text-[18px] leading-tight mb-4 flex-1">{post.title}</h4>
                    <div className="flex items-center gap-1.5 text-[#C8922A] font-bold text-[12px] pt-4 border-t border-[#E4E1D9]">
                      Read Article <Arr sz={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FOOTER STRIP ── */}
      <div className="px-12 py-12 border-t border-[#E4E1D9]" style={{ background: "linear-gradient(135deg,#0B1221 0%,#131D35 100%)" }}>
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-8">
          <div>
            <div className="text-[10px] font-extrabold tracking-[.12em] text-[#C8922A] uppercase mb-1.5">Work with us</div>
            <h3 className="serif italic text-white text-[26px] leading-tight mb-1">Got a project in mind?</h3>
            <p className="text-white/40 text-[13px]">We're currently taking on new clients for Q2 2025.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/blog" className="font-bold text-[13px] bg-transparent text-white border border-white/20 rounded-xl px-5 py-2.5 cursor-pointer flex items-center gap-2 no-underline hover:border-white/40 transition-colors">
              More Articles
            </Link>
            <Link to="/#contact" className="btn-shimmer font-bold text-[13px] text-[#0B1221] border-none rounded-xl px-6 py-2.5 cursor-pointer flex items-center gap-2 no-underline">
              Start a Project <Arr sz={13} />
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}