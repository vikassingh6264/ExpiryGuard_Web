# 🚀 ExpiryGuard Deployment Guide

## GitLab Pages Deployment

Your ExpiryGuard application is configured for automatic deployment to GitLab Pages!

### 📋 What Was Configured

1. **`.gitlab-ci.yml`** - CI/CD pipeline configuration
2. **`vite.config.ts`** - Updated with correct base path for GitLab Pages

### 🔄 Automatic Deployment Process

The deployment happens automatically when you push to the `main` branch:

```
Push to main → GitLab CI/CD Pipeline → Build → Deploy → Live! 🎉
```

### 📍 Your Live Website URL

Once the pipeline completes, your website will be available at:

**https://vikassingh62644.gitlab.io/expiryguard/**

---

## 🛠️ How to Check Deployment Status

### Step 1: View Pipeline Status

1. Go to your GitLab project: https://gitlab.com/vikassingh62644/expiryguard
2. Click on **CI/CD → Pipelines** in the left sidebar
3. You should see a pipeline running or completed

### Step 2: Monitor Build Progress

Click on the pipeline to see:
- ✅ **Build stage**: Compiling React app with Vite
- ✅ **Deploy stage**: Moving files to GitLab Pages

### Step 3: Access GitLab Pages Settings

1. Go to **Settings → Pages** in your GitLab project
2. After successful deployment, you'll see:
   - ✅ Your live URL
   - ✅ Deployment status
   - ✅ Last deployment time

---

## 🎯 Pipeline Stages Explained

### Stage 1: Build
```yaml
- Install dependencies (npm ci)
- Build React app (npm run build)
- Create optimized production bundle
- Save dist/ folder as artifact
```

### Stage 2: Deploy
```yaml
- Take the built dist/ folder
- Rename it to public/
- Deploy to GitLab Pages
- Make it live!
```

---

## 🔧 Troubleshooting

### Pipeline Failed?

**Check the logs:**
1. Go to **CI/CD → Pipelines**
2. Click on the failed pipeline
3. Click on the failed job (build or pages)
4. Read the error message

**Common Issues:**

1. **Build fails:**
   ```bash
   # Solution: Check if all dependencies are in package.json
   npm install
   npm run build  # Test locally first
   ```

2. **Pages not updating:**
   - Wait 2-3 minutes after pipeline completes
   - Clear browser cache (Ctrl+Shift+R)
   - Check if pipeline actually succeeded

3. **404 Error on live site:**
   - Verify base path in `vite.config.ts` matches your project name
   - Should be: `base: '/expiryguard/'`

---

## 🌐 Alternative Deployment Options

### Option 1: Vercel (Recommended for React)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd expiry-guard
vercel

# Follow prompts
```

**Advantages:**
- ✅ Faster deployment
- ✅ Automatic HTTPS
- ✅ Better performance
- ✅ Custom domains easy

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd expiry-guard
netlify deploy --prod

# Follow prompts
```

### Option 3: GitHub Pages

1. Update `vite.config.ts`:
   ```typescript
   base: '/ExpiryGuard_Web/'
   ```

2. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

## 📊 Deployment Checklist

Before going live, ensure:

- [x] `.gitlab-ci.yml` is in project root
- [x] `vite.config.ts` has correct base path
- [x] All dependencies are in `package.json`
- [x] Build works locally (`npm run build`)
- [x] Pushed to main branch
- [ ] Pipeline completed successfully
- [ ] Visited live URL and tested
- [ ] All features work (login, add products, etc.)
- [ ] Tested on mobile devices

---

## 🎨 Post-Deployment Tasks

### 1. Update README

Add your live URL to README.md:
```markdown
## 🌐 Live Demo

Visit the live application: https://vikassingh62644.gitlab.io/expiryguard/
```

### 2. Test All Features

- ✅ Signup/Login
- ✅ Add products
- ✅ Earn points
- ✅ View achievements
- ✅ Dashboard statistics
- ✅ Mobile responsiveness

### 3. Share Your Project

- Tweet about it
- Post on LinkedIn
- Share on Reddit (r/webdev, r/reactjs)
- Add to your portfolio

---

## 🔐 Environment Variables (Future)

When you add a backend, configure environment variables in GitLab:

1. Go to **Settings → CI/CD → Variables**
2. Add variables:
   ```
   VITE_API_URL=https://your-api.com
   VITE_ENABLE_ANALYTICS=true
   ```

3. Access in code:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL
   ```

---

## 📈 Performance Optimization

Your build is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization

**Further improvements:**
- Add service worker for offline support
- Implement lazy loading for routes
- Add image optimization
- Enable gzip compression

---

## 🆘 Need Help?

- **GitLab CI/CD Docs**: https://docs.gitlab.com/ee/ci/
- **GitLab Pages Docs**: https://docs.gitlab.com/ee/user/project/pages/
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## 🎉 Success!

Once your pipeline completes, your ExpiryGuard application will be live and accessible to anyone with the URL!

**Your Live URL:** https://vikassingh62644.gitlab.io/expiryguard/

Share it with the world! 🌍
