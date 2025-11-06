# Bauhaus Revival Portfolio

> A modern portfolio website showcasing Bauhaus design principles through contemporary web development.

[![Deploy Status](https://img.shields.io/github/deployments/username/bauhaus/github-pages?label=deployment)](https://github.com/username/bauhaus/deployments)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://username.github.io/bauhaus/) | [Documentation](#documentation)

## 🎨 Overview

Bauhaus Revival is a portfolio website that applies the timeless principles of the Bauhaus design movement to modern web development. It emphasizes:

- **Form Follows Function** - Every element serves a purpose
- **Simplicity** - Clean, minimal design without unnecessary ornamentation
- **Geometric Abstraction** - Bold use of primary shapes and colors
- **Unity of Design & Technology** - Seamless integration of aesthetics and functionality

## ✨ Features

### Design
- 🎨 Bauhaus-inspired color palette (Red #e31e24, Blue #004f9f, Yellow #ffd100)
- 📐 Geometric shapes and animations
- 🌓 Dark mode support with theme persistence
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 AA accessible

### Technical
- ⚡ **Eleventy 3.x** - Fast static site generator
- 🎭 **Nunjucks** - Powerful templating engine
- 🎯 **CSS Custom Properties** - Maintainable design system
- 🚀 **Docker** - Containerized deployment
- 🔄 **GitHub Actions** - Automated CI/CD
- 📊 **Lighthouse Score 95+** - Optimized performance

### Features
- 📝 Blog system with markdown support
- 🎯 Project showcase with case studies
- 📧 Contact form with validation
- 🎭 Scroll-based animations
- 🔍 SEO optimized with structured data
- 📍 Sitemap and robots.txt generation

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/bauhaus.git
   cd bauhaus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

## 📝 Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run serve    # Preview production build
npm run clean    # Clean build directory
```

### Docker Development

```bash
# Development with hot reload
make dev

# Production build and serve
make prod

# View logs
make logs

# Clean up containers and images
make clean
```

## 📁 Project Structure

```
bauhaus/
├── src/
│   ├── _data/          # Global data files
│   │   └── site.json   # Site configuration
│   ├── _layouts/       # Page templates
│   │   ├── base.njk    # Base layout
│   │   ├── post.njk    # Blog post layout
│   │   └── project.njk # Project layout
│   ├── blog/           # Blog posts (markdown)
│   ├── projects/       # Project case studies
│   ├── css/            # Stylesheets
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── animations.css
│   │   └── components/
│   ├── js/             # JavaScript files
│   │   ├── main.js
│   │   ├── animations.js
│   │   └── forms.js
│   ├── index.njk       # Homepage
│   ├── about.njk       # About page
│   ├── contact.njk     # Contact page
│   └── 404.njk         # Error page
├── .eleventy.js        # Eleventy configuration
├── package.json        # Dependencies and scripts
├── Dockerfile          # Production Docker image
├── Dockerfile.dev      # Development Docker image
├── docker-compose.yml  # Docker orchestration
├── Makefile            # Development commands
└── nginx.conf          # Nginx configuration

```

## 🎨 Design System

### Colors

```css
--color-primary: #e31e24;    /* Bauhaus Red */
--color-secondary: #004f9f;  /* Bauhaus Blue */
--color-accent: #ffd100;     /* Bauhaus Yellow */
```

### Typography

- **Font Family**: Inter (sans-serif)
- **Scale**: Modular scale based on 1rem base
- **Weights**: 300, 400, 500, 600, 700, 900

### Spacing

Golden ratio-based spacing system:
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem
- 3xl: 4rem

## 🔧 Configuration

### Site Configuration

Edit `src/_data/site.json`:

```json
{
  "title": "Your Portfolio Title",
  "description": "Your description",
  "author": "Your Name",
  "email": "your@email.com",
  "url": "https://yourdomain.com",
  "social": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  }
}
```

### Eleventy Configuration

Key configurations in `.eleventy.js`:
- Collections (blog, projects, featured)
- Filters (date formatting, excerpts, reading time)
- Plugins (HTML Base Plugin for GitHub Pages)
- Passthrough copy for static assets

## 📦 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages** in repository settings
2. **Push to main branch** - GitHub Actions will automatically build and deploy
3. **Custom domain** (optional): Add `CNAME` file to `src/` directory

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy _site directory to your hosting provider
```

### Docker Deployment

```bash
# Build production image
docker build -t bauhaus-portfolio .

# Run container
docker run -p 80:80 bauhaus-portfolio
```

## 🧪 Testing

### Performance Testing

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun
```

### Accessibility Testing

- Use [WAVE](https://wave.webaim.org/) browser extension
- Test with screen readers (VoiceOver, NVDA)
- Verify keyboard navigation

### Cross-Browser Testing

Test on:
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)
- Mobile devices (iOS/Android)

## 📚 Documentation

### Content Management

#### Adding a Blog Post

1. Create a new markdown file in `src/blog/`
2. Add frontmatter:
   ```yaml
   ---
   layout: post.njk
   title: "Your Post Title"
   description: "Post description"
   date: 2024-01-15
   tags:
     - blog
     - your-tag
   ---
   ```
3. Write your content in markdown

#### Adding a Project

1. Create a new markdown file in `src/projects/`
2. Add frontmatter:
   ```yaml
   ---
   layout: project.njk
   title: "Project Name"
   description: "Project description"
   date: 2024-01-15
   featured: true
   status: active
   tags:
     - projects
     - technology
   image: /images/projects/project-name.jpg
   github: https://github.com/user/repo
   demo: https://demo-url.com
   ---
   ```

## 🛠️ Troubleshooting

### Common Issues

**Issue**: Build fails with module not found error
```bash
# Solution: Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Styles not updating in development
```bash
# Solution: Clear cache and restart
npm run clean
npm run dev
```

**Issue**: Images not loading
```bash
# Solution: Check image paths use baseUrl filter
{{ '/images/photo.jpg' | baseUrl }}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bauhaus Movement** - Design inspiration
- **Eleventy** - Static site generator
- **Inter Font** - Typography
- **GitHub** - Hosting and CI/CD

## 📧 Contact

Your Name - [@twitter](https://twitter.com/username) - your@email.com

Project Link: [https://github.com/username/bauhaus](https://github.com/username/bauhaus)

---

**Built with ♥️ using Bauhaus principles**
