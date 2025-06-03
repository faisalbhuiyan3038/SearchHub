# 🔍 SearchHub

A beautiful, customizable search engine dispatcher that lets users choose their preferred search engine for any query. Instead of being locked into one search engine, SearchHub presents an elegant interface where users can select from multiple search engines after entering their query.

![SearchHub Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=SearchHub+Demo)

## ✨ Features

### 🎯 Core Functionality
- **Search Engine Selection**: Choose from multiple search engines for each query
- **URL Parameter Support**: Compatible with OpenSearch specification (`?q=query`)
- **Browser Integration**: Can be added as a custom search engine in browsers
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🛠️ Customization
- **Editable Engine List**: Add, remove, and manage search engines
- **Local Storage**: Customizations persist across browser sessions
- **Automatic Favicon Detection**: Fetches search engine icons automatically
- **Custom Descriptions**: Add personalized descriptions for each engine

### 🎨 User Experience
- **Modern Design**: Clean, gradient-based interface with smooth animations
- **Mobile Optimized**: Two-column card layout on mobile devices
- **Modal Interface**: Professional modal for adding new search engines
- **Keyboard Navigation**: Full keyboard support including Escape to close modals

## 🚀 Quick Start

### Local Development
1. Clone or download the project files
2. Open `index.html` in your browser
3. Start searching and customizing!

### Deploy to Vercel
1. Create a new Vercel project
2. Upload the project files:
   - `index.html` (main application)
   - `opensearch.xml` (in `/public` folder)
   - `favicon.ico` (optional, for your site icon)
3. Update the domain in `opensearch.xml`
4. Deploy!

## 📁 Project Structure

```
searchhub/
├── index.html          # Main application file
├── public/
│   └── opensearch.xml  # OpenSearch configuration
├── favicon.ico         # Site favicon (optional)
└── README.md          # This file
```

## 🔧 Configuration

### OpenSearch Setup
Update the `opensearch.xml` file with your domain:

```xml
<Url type="text/html" template="https://yourdomain.vercel.app/?q={searchTerms}"/>
<Image width="16" height="16" type="image/x-icon">https://yourdomain.vercel.app/favicon.ico</Image>
```

### Default Search Engines
The application comes with these search engines pre-configured:
- **Google** - The most popular search engine
- **Bing** - Microsoft's search engine  
- **DuckDuckGo** - Privacy-focused search
- **Yahoo** - Yahoo Search
- **Startpage** - Private Google results
- **Yandex** - Russian search engine

## 🎯 How It Works

1. **Enter Query**: User types search query in the homepage or arrives via URL
2. **Select Engine**: Beautiful cards display available search engines
3. **Redirect**: Click redirects to chosen search engine with the query
4. **Customize**: Add/remove engines, descriptions persist locally

## 🌐 Browser Integration

### Adding as Search Engine
Users can add SearchHub as a custom search engine in their browser:

1. **Chrome/Edge**: Settings → Search engines → Add
2. **Firefox**: Right-click address bar → Add search engine
3. **Safari**: Preferences → Search → Manage websites

### OpenSearch Discovery
The site includes proper OpenSearch metadata for automatic discovery by browsers.

## 📱 Mobile Experience

- **Responsive Grid**: 2 search engines per row on mobile
- **Touch Optimized**: Proper touch targets and spacing
- **Modal Interface**: Full-screen modal on small devices
- **Optimized Typography**: Scaled text for readability

## 🛡️ Privacy & Storage

- **Local Storage Only**: All customizations stored locally in browser
- **No Tracking**: No analytics or user tracking
- **No Server**: Pure client-side application
- **No Data Collection**: Queries are sent directly to chosen search engines

## 🎨 Customization

### Adding Search Engines
1. Click "Add Engine" button
2. Fill in the modal form:
   - **Name**: Display name (e.g., "Google")
   - **URL**: Search URL with `{query}` placeholder
   - **Description**: Brief description (optional)
   - **Favicon**: Custom icon URL (auto-detected if empty)

### URL Format Examples
```
Google: https://www.google.com/search?q={query}
Bing: https://www.bing.com/search?q={query}
DuckDuckGo: https://duckduckgo.com/?q={query}
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **Vanilla JavaScript**: No frameworks or dependencies
- **Local Storage API**: For persistence
- **Google Favicon API**: For automatic icon fetching

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance
- **Lightweight**: Single HTML file (~15KB)
- **Fast Loading**: No external dependencies
- **Efficient**: Minimal DOM manipulation
- **Cached**: Leverages browser caching

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Netlify
```bash
# Deploy to Netlify
netlify deploy --prod --dir .
```

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch

### Any Static Host
Upload files to any static hosting service (AWS S3, Firebase Hosting, etc.)

## 🤝 Contributing

Contributions are welcome! Here are some ways to contribute:

- 🐛 Report bugs or issues
- 💡 Suggest new features
- 🎨 Improve the design
- 📱 Enhance mobile experience
- 🌐 Add more default search engines
- 📚 Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Favicon API** for automatic icon fetching
- **OpenSearch Specification** for browser integration
- **Modern CSS** techniques for responsive design

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for errors
2. Ensure JavaScript is enabled
3. Try resetting to default search engines
4. Clear browser cache and local storage

---

**Made with ❤️ for better search experiences**

*Give users the freedom to choose their search engine while maintaining a beautiful, unified interface.*