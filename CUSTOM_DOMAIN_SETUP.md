# Custom Domain Setup for eaikw.com

This repository is configured to deploy to **eaikw.com** via GitHub Pages.

## Setup Instructions

### 1. GitHub Repository Settings

1. Go to your repository: `https://github.com/kaw393939/is117_portfolio`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Custom domain**, enter: `eaikw.com`
4. Click **Save**
5. GitHub will automatically create a CNAME file in your repository
6. Ensure **Enforce HTTPS** is checked (wait for SSL certificate provisioning)

### 2. Domain DNS Configuration

Configure your domain registrar (where you bought eaikw.com) with these DNS records:

#### Option A: Apex Domain (eaikw.com)

Add these **A Records**:
```
Type: A
Host: @
Value: 185.199.108.153
TTL: 3600
```
```
Type: A
Host: @
Value: 185.199.109.153
TTL: 3600
```
```
Type: A
Host: @
Value: 185.199.110.153
TTL: 3600
```
```
Type: A
Host: @
Value: 185.199.111.153
TTL: 3600
```

#### Option B: With www subdomain (Recommended)

Add **CNAME Record**:
```
Type: CNAME
Host: www
Value: kaw393939.github.io
TTL: 3600
```

Add **A Records** (same as above for apex domain)

### 3. Verify DNS Propagation

DNS changes can take 24-48 hours to propagate globally. Check status:

```bash
# Check A records
dig eaikw.com +short

# Check CNAME
dig www.eaikw.com +short
```

Or use online tools:
- https://dnschecker.org/
- https://www.whatsmydns.net/

### 4. Repository Configuration

This repository includes:
- ✅ `src/CNAME` file with `eaikw.com`
- ✅ GitHub Actions workflow configured for custom domain
- ✅ No PATH_PREFIX (custom domain doesn't need subdirectory)
- ✅ `site.json` updated with `https://eaikw.com`

### 5. Workflow Changes

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured to:
- Build the site with `PATH_PREFIX: ''` (no subdirectory)
- Deploy to GitHub Pages
- Preserve the CNAME file

### 6. Testing After Deployment

Once DNS is configured and GitHub Actions runs:

1. Visit: `https://eaikw.com`
2. Ensure HTTPS is working (green padlock)
3. Check that all assets load correctly
4. Verify no 404 errors in browser console

### Troubleshooting

**Issue: "Domain not found" or 404 errors**
- Wait for DNS propagation (up to 48 hours)
- Verify GitHub Pages is enabled in repository settings
- Check that CNAME file exists in the deployed site

**Issue: "Mixed content" warnings**
- Ensure all resources use HTTPS
- Check `site.json` has `https://eaikw.com` (not http)

**Issue: CSS/JS not loading**
- Verify PATH_PREFIX is empty string in workflow
- Check that passthrough copy includes all assets
- Inspect Network tab in browser DevTools

**Issue: SSL certificate not provisioning**
- GitHub can take up to 24 hours to issue SSL certificate
- Ensure DNS records are correctly pointing to GitHub
- Try removing and re-adding custom domain in GitHub settings

### Expected Timeline

| Step | Time |
|------|------|
| GitHub Actions Build | 2-5 minutes |
| DNS Propagation | 1-48 hours |
| SSL Certificate | 1-24 hours |
| Full Site Available | 1-48 hours |

### Current Configuration

- **Domain**: eaikw.com
- **GitHub Repository**: kaw393939/is117_portfolio (or eaikw)
- **GitHub Pages Source**: `main` branch via GitHub Actions
- **Custom Domain File**: `src/CNAME` → copied to `_site/CNAME`
- **Site URL**: https://eaikw.com
- **Build Type**: ES Module (Node 20+)

### Support Links

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages IP Addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
- [Eleventy Documentation](https://www.11ty.dev/docs/)
