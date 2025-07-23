# 🌤️ Weather React App

A modern, feature-rich weather application built with React 18, TypeScript, and TailwindCSS. Get comprehensive weather information including current conditions, 5-day forecasts, and interactive temperature charts for cities worldwide.

## ✨ Features

### 🌍 Weather Data
- Real-time current weather conditions
- 5-day detailed weather forecast
- Comprehensive meteorological data (humidity, pressure, wind, visibility)
- Sunrise and sunset times
- Temperature trends with "feels like" data

### 📊 Data Visualization
- Interactive temperature charts with Recharts
- Daily temperature trends
- Visual weather icons for all conditions
- Responsive charts that adapt to screen size

### 🎨 Modern UI/UX
- Clean, modern design with TailwindCSS
- Smooth animations with Framer Motion
- Fully responsive layout (mobile-first)
- Optimized desktop layout with side-by-side charts
- Loading states and error handling
- Intuitive geolocation functionality

### 📱 Responsive Design
- Mobile-optimized interface
- Desktop layout with efficient space usage
- Tablet-friendly intermediate layouts
- Cross-browser compatibility

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clima
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_KEY_WEATHER=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
src/
  ├── components/
  │   ├── Header.tsx            # App header with navigation
  │   ├── Form.tsx              # Search form with geolocation
  │   ├── Weather.tsx           # Main weather display component
  │   ├── Forecast.tsx          # 5-day forecast component
  │   ├── TemperatureChart.tsx  # Interactive temperature charts
  │   └── Error.tsx             # Error handling component
  ├── types/
  │   └── index.ts              # TypeScript type definitions
  ├── App.tsx                   # Main app component & API logic
  ├── main.tsx                  # App entry point
  ├── index.css                 # Global styles with TailwindCSS
  └── vite-env.d.ts             # Vite environment types
```

## 🛠️ Tech Stack

### Core Technologies
- **React 18.2.0** - Latest React with hooks and concurrent features
- **TypeScript 5.2.2** - Type safety and enhanced developer experience
- **Vite 5.2.0** - Lightning-fast build tool and dev server

### Styling & UI
- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.7** - Production-ready animations
- **Lucide React 0.525.0** - Beautiful, customizable icons

### Data & Visualization
- **Recharts 3.1.0** - Composable charting library
- **Date-fns 4.1.0** - Modern date utility library
- **OpenWeatherMap API** - Comprehensive weather data source

### Development Tools
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility
- **ESLint** - Code quality and consistency
- **TypeScript Strict Mode** - Enhanced type checking

## 🌐 API Integration

The app integrates with OpenWeatherMap API endpoints:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

### Supported Data
- Temperature (current, min, max, feels like)
- Weather conditions and descriptions
- Humidity, pressure, visibility
- Wind speed and direction
- Sunrise and sunset times
- 5-day forecast with 3-hour intervals

## 🎨 Design System

### Color Palette
- **Primary**: Sky blue variants (`sky-400` to `sky-600`)
- **Accents**: Semantic colors for different weather metrics
- **Backgrounds**: Glass-morphism with backdrop blur
- **Text**: Gray scale for optimal readability

### Layout Principles
- **Mobile-first responsive design**
- **Grid-based layouts** for consistent spacing
- **Card-based components** for content organization
- **Smooth animations** for enhanced user experience

### Responsive Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (transitional layouts)
- **Desktop**: > 1024px (multi-column with sidebars)
- **Large Desktop**: > 1280px (optimized wide layouts)

## 🔧 Development

### Local Development

1. **Clone and setup** (see Installation above)

2. **Environment Configuration**
   ```bash
   # Required environment variable
   VITE_API_KEY_WEATHER=your_openweathermap_api_key
   ```

3. **Start development server**
   ```bash
   npm run dev
   # App will be available at http://localhost:5173
   ```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

### Code Quality

```bash
# Run linting
npm run lint

# TypeScript type checking
npx tsc --noEmit
```

## 📊 Performance Features

- **Optimized bundle size** with Vite's tree shaking
- **Lazy loading** of chart components
- **Efficient API calls** with proper error handling
- **Responsive images** and icons
- **Fast refresh** during development
- **Production-ready** optimizations

## 🌍 Internationalization Ready

The app structure supports easy internationalization:

- Date formatting with `date-fns`
- Consistent text structure in components
- Semantic HTML for accessibility
- ARIA labels for screen readers

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - TailwindCSS customization
- `postcss.config.js` - PostCSS plugins configuration
- `tsconfig.json` - TypeScript compiler options

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the coding standards**:
   - Use TypeScript for type safety
   - Follow the existing component structure
   - Add proper error handling
   - Include responsive design considerations
4. **Test your changes** thoroughly
5. **Commit changes** (`git commit -m 'feat: add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: TailwindCSS utility classes
- **State**: React hooks for local state management
- **API**: Async/await with proper error handling

## 📦 Deployment

The app can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## � Troubleshooting

### Common Issues

1. **API Key Issues**
   - Ensure your OpenWeatherMap API key is valid
   - Check the `.env.local` file exists and has correct variable name
   - Verify the API key has proper permissions

2. **Build Issues**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf node_modules/.vite`

3. **TypeScript Errors**
   - Update TypeScript: `npm update typescript`
   - Check tsconfig.json configuration

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [React 18 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Recharts Documentation](https://recharts.org/)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ and modern web technologies**
