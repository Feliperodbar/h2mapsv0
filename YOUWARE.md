# YOUWARE.md

This file provides guidance to YOUWARE Agent (youware.com) when working with code in this repository.

## Project Overview

**H2maps** - Plataforma de Georreferenciamento para Hidrogênio Verde

Uma aplicação web completa com landing page e dashboard interativo para análise georreferenciada que utiliza dados climáticos (tempo, chuvas, ventos) para analisar a viabilidade de instalação de energia eólica e solar para produção de hidrogênio verde. Inclui mapeamento de unidades de conservação da fauna e flora.

## Project Status

- **Project Type**: React + TypeScript Modern Web Application with Routing
- **Entry Point**: `src/main.tsx` (React application entry)
- **Build System**: Vite 7.0.0 (Fast development and build)
- **Styling System**: Tailwind CSS 3.4.17 (Atomic CSS framework)
- **Routing**: React Router DOM 6.30.1 for multi-page navigation
- **Animations**: Framer Motion 11.0.8 for smooth interactions
- **Icons**: Lucide React for modern iconography
- **Maps**: Leaflet 1.9.4 and React-Leaflet 4.2.1 for interactive mapping

## Architecture

### Application Structure
- **Single Page Application** with client-side routing
- **Landing Page** (`/`) - Marketing and information pages
- **Dashboard** (`/dashboard`) - Interactive analysis platform
- **Component-based architecture** with separation of concerns

### Key Components
- `App.tsx` - Main application with routing configuration
- `Dashboard.tsx` - Complete dashboard interface with sidebar and map
- Landing page sections integrated into main component

## Color Palette & Design System

### Primary Colors
- **Emerald** (`#10b981`) - Primary green for renewable energy
- **Teal** (`#14b8a6`) - Secondary accent color
- **Cyan** (`#06b6d4`) - Tertiary accent for water/climate

### Design Principles
- **Mobile-first responsive design**
- **Glass morphism effects** for modern UI elements
- **Smooth animations** with Framer Motion
- **Professional gradients** representing energy flow
- **Accessibility-focused** semantic HTML5

## Features Implemented

### Landing Page (`/`)
- **Hero Section** with clear value proposition and CTAs
- **Features Section** - 6 key capabilities including conservation units
- **Conservation Section** - Dedicated section for fauna/flora protection
- **Technology Section** - Technical capabilities and statistics
- **Navigation** - Fixed header with smooth scroll to sections
- **Responsive Design** - Mobile-optimized with hamburger menu

### Dashboard (`/dashboard`)
- **Interactive Sidebar** with:
  - City/state/region search functionality
  - Climate parameter selection (weather, wind, solar, rain, UV, topography)
  - Real-time news feed with energy sector updates
  - Collapsible design for screen optimization

- **Header Navigation** with:
  - Favorites, Statistics, and Climate menu items
  - User controls (notifications, settings, profile)
  - Current location and weather display

- **Interactive Map Area** with:
  - Multiple map layers (weather, conservation, wind potential, solar potential, topography)
  - Layer switching controls
  - Color-coded potential indicators
  - Navigation controls overlay

- **Statistics Panel** with:
  - Real-time weather conditions display
  - Favorite locations management
  - Quick action buttons for reports and analysis
  - Environmental metrics visualization

### Technical Features
- **Mock Weather API Integration** - Simulated real-time weather data
- **News Feed System** - Energy sector news with categorization
- **Location Management** - Favorite locations with coordinates
- **Parameter Switching** - Dynamic climate parameter selection
- **Responsive Layout** - Adapts to all screen sizes

## Development Commands

- **Install dependencies**: `npm install`
- **Build project**: `npm run build`
- **Development server**: `npm run dev` (for development)
- **Preview build**: `npm run preview` (production preview)

## File Structure

```
src/
├── App.tsx                 # Main application with routing
├── main.tsx               # Application entry point
├── index.css              # Global styles and Tailwind imports
├── components/
│   └── Dashboard.tsx      # Complete dashboard component
├── assets/                # Static assets
└── types/                 # TypeScript type definitions
```

## API Integration

### Weather Data (Real API Integration)
- **Primary API**: OpenWeatherMap (free tier: 1,000 calls/day)
- **Fallback API**: WeatherAPI.com (free tier: 1,000,000 calls/month)
- **Data Points**: Temperature, humidity, wind speed/direction, UV index, pressure, visibility
- **Location-based**: Real weather data for Brazilian cities
- **Error Handling**: Graceful fallback to simulated data when APIs fail
- **Configuration**: Environment variables for API keys (.env file)

### Environment Setup
1. Copy `.env.example` to `.env`
2. Get free API key from https://openweathermap.org/api
3. Add key to `VITE_OPENWEATHER_API_KEY` in `.env`
4. Optional: Add WeatherAPI key to `VITE_WEATHERAPI_KEY`

### News System (Mock Implementation)
- Energy sector news aggregation
- Category-based filtering (Solar, Wind, Hydrogen)
- Date-based sorting and display
- Responsive card layout

### Historical Weather Analysis
- **Open-Meteo Historical API**: Free access to weather data from 1940 to present
- **Data Points**: Temperature, humidity, precipitation, wind speed, solar radiation
- **Analysis Periods**: 1, 3, and 5-year historical analysis
- **Hydrogen Viability Metrics**: Wind/solar potential calculations based on historical data
- **API Endpoint**: https://archive-api.open-meteo.com/v1/archive

### Environmental Analysis
- **MapBiomas Integration**: Land use and cover data for Brazil (1985-2024)
- **Conservation Units**: Protected areas and biodiversity restrictions
- **Impact Assessment**: Environmental constraints and feasibility analysis
- **Data Sources**: Simulated MapBiomas data for vegetation, conservation units, biodiversity
- **Analysis Features**: Slope limitations, soil types, water resources assessment

## Map Integration

### Leaflet Configuration
- Base map integration ready for implementation
- Custom layer controls for different data types
- Interactive markers and overlays
- Responsive container with proper aspect ratios

### Map Layers Available
1. **Weather Layer** - Current weather conditions
2. **Conservation Layer** - Protected fauna/flora areas
3. **Wind Potential** - Wind energy viability mapping
4. **Solar Potential** - Solar energy suitability
5. **Topography** - Terrain and elevation data

## Performance Optimizations

- **Code Splitting** - Automatic with Vite
- **Lazy Loading** - Components load on demand
- **Optimized Bundle** - Gzip compression enabled
- **Efficient CSS** - Tailwind purging system
- **Image Optimization** - CDN-hosted static assets

## Future Enhancement Opportunities

### API Integrations
- Real weather API (OpenWeatherMap, AccuWeather)
- GIS mapping services (ArcGIS, Mapbox)
- Real-time news feeds (RSS, news APIs)
- Authentication and user management

### Advanced Features
- Real-time data visualization
- Advanced filtering and search
- User dashboard customization
- Export functionality (PDF, Excel reports)
- Mobile app development

## Browser Compatibility

- **Modern browsers** with ES6+ support
- **Chrome/Chromium** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Accessibility Features

- **Semantic HTML5** structure
- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** color combinations
- **Focus indicators** on all interactive elements

## Build Configuration

### Vite Setup
- **Development HMR** for fast development
- **Production optimization** with code splitting
- **Environment variables** configuration
- **Plugin system** for extensibility

### CSS Processing
- **PostCSS** for vendor prefixes
- **Tailwind CSS** for utility-first styling
- **Custom animations** and transitions
- **Responsive design** utilities

## Security Considerations

- **Client-side routing** without server-side secrets
- **API key management** ready for environment variables
- **XSS protection** through React's built-in safeguards
- **HTTPS ready** for production deployment