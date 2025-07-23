# 🌤️ Weather React App

A modern weather application built with React 18, TypeScript, and Vite. Get real-time weather information for cities around the world using the OpenWeatherMap API.

## ✨ Features

- 🌍 Search weather by city and country
- 🌡️ Display current temperature, min/max temperatures
- 📱 Responsive design with Materialize CSS
- ⚡ Lightning-fast development with Vite
- 🔒 Type-safe with TypeScript
- 🎨 Clean, modern UI

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
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
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your OpenWeatherMap API key:
   ```env
   VITE_API_KEY_WEATHER=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
  ├── components/
  │   ├── Header.tsx      # App header component
  │   ├── Form.tsx        # Search form component
  │   ├── Weather.tsx     # Weather display component
  │   └── Error.tsx       # Error message component
  ├── types/
  │   └── index.ts        # TypeScript type definitions
  ├── App.tsx             # Main app component
  ├── main.tsx            # App entry point
  ├── index.css           # Global styles
  └── vite-env.d.ts       # Vite environment types
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Materialize CSS** - UI framework
- **OpenWeatherMap API** - Weather data

## 🌐 Supported Countries

- United States (US)
- Mexico (MX)
- Argentina (AR)
- Colombia (CO)
- Costa Rica (CR)
- Spain (ES)
- Peru (PE)

## 📦 Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [OpenWeatherMap API](https://openweathermap.org/api)
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Materialize CSS](https://materializecss.com/)
