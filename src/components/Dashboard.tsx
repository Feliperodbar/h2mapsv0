import { useState, useEffect } from 'react';
import Statistics from './Statistics';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search,
  Menu,
  X,
  Star,
  TrendingUp,
  Cloud,
  Thermometer,
  Eye,
  Map as MapIcon,
  TreePine,
  Home,
  Settings,
  Bell,
  User,
  Wind,
  Sun,
  Droplets,
  Gauge,
  ChevronDown,
  MapPin,
  BarChart3,
  Newspaper,
  Calendar,
  ArrowUp,
  ArrowDown,
  Navigation,
  Layers,
  Zap,
  RefreshCw,
  Compass,
  Activity,
  Plus,
  Minus,
  Grid3X3,
  Maximize2,
  Copy
} from 'lucide-react';

// Brazilian cities database for comprehensive search
const brazilianCities = [
  // State Capitals
  { name: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333 },
  { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729 },
  { name: 'Brasília', state: 'DF', lat: -15.8267, lng: -47.9218 },
  { name: 'Salvador', state: 'BA', lat: -12.9714, lng: -38.5014 },
  { name: 'Fortaleza', state: 'CE', lat: -3.7319, lng: -38.5267 },
  { name: 'Belo Horizonte', state: 'MG', lat: -19.9167, lng: -43.9345 },
  { name: 'Manaus', state: 'AM', lat: -3.1190, lng: -60.0217 },
  { name: 'Curitiba', state: 'PR', lat: -25.4284, lng: -49.2733 },
  { name: 'Recife', state: 'PE', lat: -8.0476, lng: -34.8770 },
  { name: 'Porto Alegre', state: 'RS', lat: -30.0346, lng: -51.2177 },
  { name: 'Belém', state: 'PA', lat: -1.4558, lng: -48.4902 },
  { name: 'Goiânia', state: 'GO', lat: -16.6864, lng: -49.2643 },
  { name: 'Vitória', state: 'ES', lat: -20.3194, lng: -40.3373 },
  { name: 'São Luís', state: 'MA', lat: -2.5297, lng: -44.3028 },
  { name: 'Maceió', state: 'AL', lat: -9.6658, lng: -35.7353 },
  { name: 'Teresina', state: 'PI', lat: -5.0892, lng: -42.8019 },
  { name: 'Natal', state: 'RN', lat: -5.7945, lng: -35.2009 },
  { name: 'João Pessoa', state: 'PB', lat: -7.1195, lng: -34.8430 },
  { name: 'Aracaju', state: 'SE', lat: -10.9095, lng: -37.0748 },
  { name: 'Cuiabá', state: 'MT', lat: -15.6014, lng: -56.0979 },
  { name: 'Campo Grande', state: 'MS', lat: -20.4697, lng: -54.6201 },
  { name: 'Florianópolis', state: 'SC', lat: -27.5954, lng: -48.5480 },
  { name: 'Porto Velho', state: 'RO', lat: -8.7619, lng: -63.9003 },
  { name: 'Rio Branco', state: 'AC', lat: -9.9740, lng: -67.8203 },
  { name: 'Macapá', state: 'AP', lat: 0.0346, lng: -51.0678 },
  { name: 'Palmas', state: 'TO', lat: -10.1753, lng: -48.3332 },
  
  // Major Cities
  { name: 'Campinas', state: 'SP', lat: -22.9099, lng: -47.0626 },
  { name: 'Guarulhos', state: 'SP', lat: -23.4625, lng: -46.5333 },
  { name: 'São Bernardo do Campo', state: 'SP', lat: -23.6914, lng: -46.5658 },
  { name: 'Santo André', state: 'SP', lat: -23.6539, lng: -46.5383 },
  { name: 'Osasco', state: 'SP', lat: -23.5329, lng: -46.7918 },
  { name: 'Sorocaba', state: 'SP', lat: -23.4938, lng: -47.4582 },
  { name: 'Ribeirão Preto', state: 'SP', lat: -21.1767, lng: -47.8208 },
  { name: 'Campinas Grande', state: 'PB', lat: -7.2303, lng: -35.8811 },
  { name: 'São José dos Campos', state: 'SP', lat: -23.2237, lng: -45.9009 },
  { name: 'Nova Iguaçu', state: 'RJ', lat: -22.7592, lng: -43.4511 },
  { name: 'Jaboatão dos Guararapes', state: 'PE', lat: -8.1113, lng: -35.0122 },
  { name: 'Contagem', state: 'MG', lat: -19.9317, lng: -44.0597 },
  { name: 'São Gonçalo', state: 'RJ', lat: -22.8272, lng: -43.0505 },
  { name: 'Uberlândia', state: 'MG', lat: -18.9113, lng: -48.2752 },
  { name: 'Aparecida de Goiânia', state: 'GO', lat: -16.8268, lng: -49.2439 },
  { name: 'Joinville', state: 'SC', lat: -26.3044, lng: -48.8456 },
  { name: 'São Luís', state: 'MA', lat: -2.5297, lng: -44.3028 },
  { name: 'Guarujá', state: 'SP', lat: -23.9936, lng: -46.2565 },
  { name: 'Londrina', state: 'PR', lat: -23.3045, lng: -51.1696 },
  { name: 'Juiz de Fora', state: 'MG', lat: -21.7642, lng: -43.3502 },
  { name: 'Ananindeua', state: 'PA', lat: -1.3628, lng: -48.3721 },
  { name: 'Porto Velho', state: 'RO', lat: -8.7619, lng: -63.9003 },
  { name: 'Serra', state: 'ES', lat: -20.1289, lng: -40.3077 },
  { name: 'Niterói', state: 'RJ', lat: -22.8833, lng: -43.1035 },
  { name: 'Caxias do Sul', state: 'RS', lat: -29.1634, lng: -51.1794 },
  { name: 'Campos dos Goytacazes', state: 'RJ', lat: -21.7587, lng: -41.3249 },
  { name: 'Vila Velha', state: 'ES', lat: -20.3297, lng: -40.2925 },
  { name: 'Mauá', state: 'SP', lat: -23.6678, lng: -46.4611 },
  { name: 'São José do Rio Preto', state: 'SP', lat: -20.8197, lng: -49.3794 },
  { name: 'Mogi das Cruzes', state: 'SP', lat: -23.5229, lng: -46.1875 },
  { name: 'Santo André', state: 'SP', lat: -23.6539, lng: -46.5383 },
  { name: 'Betim', state: 'MG', lat: -19.9681, lng: -44.1988 },
  { name: 'Jundiaí', state: 'SP', lat: -23.1864, lng: -46.8842 },
  { name: 'Carapicuíba', state: 'SP', lat: -23.5226, lng: -46.8358 },
  { name: 'Piracicaba', state: 'SP', lat: -22.7253, lng: -47.6492 },
  { name: 'Cariacica', state: 'ES', lat: -20.2619, lng: -40.4163 },
  { name: 'Vila Velha', state: 'ES', lat: -20.3297, lng: -40.2925 },
  { name: 'Bauru', state: 'SP', lat: -22.3147, lng: -49.0606 },
  { name: 'São Vicente', state: 'SP', lat: -23.9634, lng: -46.3918 },
  { name: 'Olinda', state: 'PE', lat: -8.0085, lng: -34.9059 },
  { name: 'Taboão da Serra', state: 'SP', lat: -23.6261, lng: -46.7573 },
  { name: 'Suzano', state: 'SP', lat: -23.5426, lng: -46.3126 },
  { name: 'Ribeirão das Neves', state: 'MG', lat: -19.7667, lng: -44.0836 }
];

// Historical Weather Data Service
class HistoricalWeatherService {
  private baseUrl = 'https://archive-api.open-meteo.com/v1/archive';

  async getHistoricalData(lat: number, lon: number, startDate: string, endDate: string) {
    try {
      console.log(`📊 Historical Weather: Fetching data for ${lat}, ${lon} from ${startDate} to ${endDate}`);
      
      const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        start_date: startDate,
        end_date: endDate,
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'precipitation',
          'wind_speed_10m',
          'wind_direction_10m',
          'shortwave_radiation',
          'direct_radiation',
          'diffuse_radiation'
        ].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'wind_speed_10m_max',
          'shortwave_radiation_sum'
        ].join(','),
        timezone: 'auto',
        windspeed_unit: 'kmh',
        precipitation_unit: 'mm',
        temperature_unit: 'celsius'
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Historical weather API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Historical weather data received:', data);
      return this.formatHistoricalData(data);
    } catch (error) {
      console.error('❌ Historical weather API error:', error);
      throw error;
    }
  }

  private formatHistoricalData(data: any) {
    return {
      location: {
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone
      },
      hourly: {
        time: data.hourly?.time || [],
        temperature: data.hourly?.temperature_2m || [],
        humidity: data.hourly?.relative_humidity_2m || [],
        precipitation: data.hourly?.precipitation || [],
        windSpeed: data.hourly?.wind_speed_10m || [],
        windDirection: data.hourly?.wind_direction_10m || [],
        solarRadiation: data.hourly?.shortwave_radiation || [],
        directRadiation: data.hourly?.direct_radiation || [],
        diffuseRadiation: data.hourly?.diffuse_radiation || []
      },
      daily: {
        time: data.daily?.time || [],
        maxTemperature: data.daily?.temperature_2m_max || [],
        minTemperature: data.daily?.temperature_2m_min || [],
        precipitationSum: data.daily?.precipitation_sum || [],
        maxWindSpeed: data.daily?.wind_speed_10m_max || [],
        solarRadiationSum: data.daily?.shortwave_radiation_sum || []
      }
    };
  }

  // Calculate hydrogen viability metrics
  calculateHydrogenViability(historicalData: any) {
    const { daily } = historicalData;
    
    // Wind energy potential (days with wind speed > 6 m/s = 21.6 km/h)
    const windViableDays = daily.maxWindSpeed.filter((speed: number) => speed > 21.6).length;
    const windViability = (windViableDays / daily.maxWindSpeed.length) * 100;
    
    // Solar energy potential (average daily radiation > 4 kWh/m²)
    const solarViableDays = daily.solarRadiationSum.filter((radiation: number) => radiation > 4).length;
    const solarViability = (solarViableDays / daily.solarRadiationSum.length) * 100;
    
    // Water availability (average precipitation > 2mm/month)
    const avgPrecipitation = daily.precipitationSum.reduce((sum: number, val: number) => sum + val, 0) / daily.precipitationSum.length;
    const waterAvailability = avgPrecipitation > 2 ? 'Favorável' : 'Limitado';
    
    return {
      windViability: Math.round(windViability),
      solarViability: Math.round(solarViability),
      waterAvailability,
      overallViability: Math.round((windViability + solarViability) / 2),
      analysisPeriod: `${daily.time[0]} to ${daily.time[daily.time.length - 1]}`
    };
  }
}

// Environmental Analysis Service
class EnvironmentalAnalysisService {
  private mapbiomasUrl = 'https://plataforma.brasil.mapbiomas.org/api';

  async getLandUseData(lat: number, lon: number, radius: number = 10) {
    try {
      console.log(`🌍 Environmental Analysis: Getting land use data for ${lat}, ${lon}`);
      
      // Simulated MapBiomas data (in real implementation, would use their API)
      // This provides information about vegetation, conservation units, etc.
      const mockLandUseData = {
        coordinates: { lat, lon, radius },
        landCover: {
          forest: 45.2, // percentage
          agriculture: 23.8,
          pasture: 18.5,
          urban: 2.1,
          water: 1.3,
          other: 9.1
        },
        conservationUnits: [
          {
            name: 'Parque Nacional da Serra da Canastra',
            distance: 15.3, // km
            type: 'Proteção Integral',
            restrictions: ['Proibida instalação de energia eólica', 'Proibida instalação solar em grande escala']
          }
        ],
        biodiversity: {
          speciesRichness: 'Alta',
          endemicSpecies: 127,
          threatenedSpecies: 23,
          habitatTypes: ['Cerrado', 'Mata Atlântica', 'Veredas']
        },
        environmentalConstraints: {
          slope: Math.random() * 30 + 5, // degrees
            soilType: 'Latossolo Vermelho',
            waterResources: 'Disponibilidade moderada',
            accessRoads: 'Ruim'
        }
      };

      console.log('✅ Environmental analysis data received');
      return this.analyzeEnvironmentalImpact(mockLandUseData);
    } catch (error) {
      console.error('❌ Environmental analysis error:', error);
      throw error;
    }
  }

  private analyzeEnvironmentalImpact(landUseData: any) {
    const { landCover, conservationUnits, biodiversity, environmentalConstraints } = landUseData;
    
    // Calculate environmental impact scores
    const forestCoverScore = landCover.forest > 30 ? 'Baixo impacto' : 'Alto impacto';
    const biodiversityScore = biodiversity.threatenedSpecies > 20 ? 'Restrições severas' : 'Moderado';
    const slopeScore = environmentalConstraints.slope > 15 ? 'Restrito' : 'Favorável';
    
    // Generate recommendations
    const recommendations = [];
    
    if (landCover.forest > 40) {
      recommendations.push('Priorizar áreas já desmatadas para minimizar impacto ambiental');
    }
    
    if (biodiversity.threatenedSpecies > 15) {
      recommendations.push('Realizar estudo de impacto ambiental detalhado');
      recommendations.push('Implementar programas de compensação ambiental');
    }
    
    if (environmentalConstraints.slope > 20) {
      recommendations.push('Evitar instalação em áreas com declividade > 20°');
    }
    
    return {
      impactLevel: this.calculateOverallImpact(forestCoverScore, biodiversityScore, slopeScore),
      scores: {
        forest: forestCoverScore,
        biodiversity: biodiversityScore,
        topography: slopeScore
      },
      constraints: {
        conservationUnits: conservationUnits.length,
        protectedSpecies: biodiversity.threatenedSpecies,
        slopeLimit: environmentalConstraints.slope
      },
      recommendations,
      feasibility: this.determineFeasibility(landUseData)
    };
  }

  private calculateOverallImpact(forest: string, biodiversity: string, slope: string): string {
    const highImpactFactors = [forest, biodiversity, slope].filter(score => 
      score.includes('Alto') || score.includes('severas') || score.includes('Restrito')
    ).length;
    
    if (highImpactFactors >= 2) return 'Alto impacto ambiental';
    if (highImpactFactors === 1) return 'Impacto moderado';
    return 'Baixo impacto';
  }

  private determineFeasibility(data: any): string {
    const { landCover, environmentalConstraints } = data;
    
    if (environmentalConstraints.slope > 25 || landCover.forest > 60) {
      return 'Não recomendado';
    } else if (environmentalConstraints.slope > 15 || landCover.forest > 40) {
      return 'Requer estudos detalhados';
    } else {
      return 'Viável com mitigação';
    }
  }
}

// Real Weather API Service - Multiple APIs for redundancy
class WeatherService {
  private apis = [
    {
      name: 'OpenWeatherMap',
      baseUrl: 'https://api.openweathermap.org/data/2.5',
      key: import.meta.env.VITE_OPENWEATHER_API_KEY || '', // No fallback key
      getCurrent: async (lat: number, lon: number) => {
        try {
          console.log(`🌤️ OpenWeatherMap: Fetching weather for ${lat}, ${lon}`);
          const response = await fetch(
            `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.key}&units=metric&lang=pt_br`
          );
          
          if (!response.ok) {
            throw new Error(`OpenWeatherMap request failed: ${response.status} ${response.statusText}`);
          }
          
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('OpenWeatherMap returned non-JSON response');
          }
          
          const data = await response.json();
          console.log('✅ OpenWeatherMap data received:', data);
          return data;
        } catch (error) {
          console.error('❌ OpenWeatherMap error:', error);
          throw error;
        }
      }
    },
    {
      name: 'WeatherAPI',
      baseUrl: 'https://api.weatherapi.com/v1',
      key: import.meta.env.VITE_WEATHERAPI_KEY || '', // Requires signup for free key
      getCurrent: async (lat: number, lon: number) => {
        try {
          console.log(`🌤️ WeatherAPI: Fetching weather for ${lat}, ${lon}`);
          const response = await fetch(
            `${this.baseUrl}/current.json?key=${this.key}&q=${lat},${lon}&lang=pt`
          );
          
          if (!response.ok) {
            throw new Error(`WeatherAPI request failed: ${response.status} ${response.statusText}`);
          }
          
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('WeatherAPI returned non-JSON response');
          }
          
          const data = await response.json();
          console.log('✅ WeatherAPI data received:', data);
          return this.convertWeatherAPIFormat(data);
        } catch (error) {
          console.error('❌ WeatherAPI error:', error);
          throw error;
        }
      }
    }
  ];

  private convertWeatherAPIFormat(data: any) {
    return {
      name: data.location.name,
      lat: data.location.lat,
      lon: data.location.lon,
      main: {
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        pressure: data.current.pressure_mb
      },
      wind: {
        speed: data.current.wind_kph / 3.6, // Convert km/h to m/s
        deg: data.current.wind_degree
      },
      weather: [{
        main: data.current.condition.text,
        description: data.current.condition.text,
        icon: data.current.condition.icon
      }],
      visibility: data.current.vis_km,
      uvi: data.current.uv || 5
    };
  }



  private convertClimatempoFormat(data: any) {
    // Convert Climatempo Brazilian weather data
    const weather = data.data || {};
    return {
      name: weather.name || 'Localização',
      lat: parseFloat(weather.latitude || '-15.8267'),
      lon: parseFloat(weather.longitude || '-47.9218'),
      main: {
        temp: parseFloat(weather.temperature || '25'),
        humidity: parseInt(weather.humidity || '60'),
        pressure: parseFloat(weather.pressure || '1013')
      },
      wind: {
        speed: parseFloat(weather.wind_velocity || '5'),
        deg: parseInt(weather.wind_direction || '180')
      },
      weather: [{
        main: weather.condition || 'Céu limpo',
        description: weather.condition || 'Céu limpo',
        icon: '01d'
      }],
      visibility: parseFloat(weather.visibility || '10'),
      uvi: parseFloat(weather.uv || '5')
    };
  }

  async getCurrentWeather(lat: number, lon: number) {
    console.log(`🌍 WeatherService: Getting weather for ${lat}, ${lon}`);
    
    // Check if we have valid API keys
    const hasOpenWeatherKey = this.apis[0].key && this.apis[0].key.length > 10;
    const hasWeatherAPIKey = this.apis[1].key && this.apis[1].key.length > 10;
    
    if (!hasOpenWeatherKey && !hasWeatherAPIKey) {
      console.warn('⚠️ No valid API keys found, using fallback data');
      console.log('💡 To get real weather data:');
      console.log('   1. Get a free API key from https://openweathermap.org/api');
      console.log('   2. Copy .env.example to .env');
      console.log('   3. Add your API key to VITE_OPENWEATHER_API_KEY');
      return this.getFallbackWeatherData(lat, lon);
    }
    
    // Try OpenWeatherMap first if we have a valid key
    if (hasOpenWeatherKey) {
      try {
        console.log('🔄 Trying OpenWeatherMap as primary API...');
        const data = await this.apis[0].getCurrent(lat, lon);
        console.log('✅ OpenWeatherMap data fetched successfully');
        return this.convertOpenWeatherMapFormat(data);
      } catch (error) {
        console.warn('❌ OpenWeatherMap failed, trying WeatherAPI:', error);
      }
    }
    
    // Try WeatherAPI as fallback if we have a valid key
    if (hasWeatherAPIKey) {
      try {
        console.log('🔄 Trying WeatherAPI as fallback...');
        const data = await this.apis[1].getCurrent(lat, lon);
        console.log('✅ WeatherAPI data fetched successfully');
        return data;
      } catch (error) {
        console.warn('❌ WeatherAPI failed:', error);
      }
    }
    
    // If all APIs fail, return fallback data instead of throwing error
    console.warn('⚠️ All weather APIs failed, using fallback data');
    return this.getFallbackWeatherData(lat, lon);
  }

  // Fallback weather data when APIs fail
  private getFallbackWeatherData(lat: number, lon: number) {
    console.log('🎭 Using fallback weather data for location:', { lat, lon });
    
    // Generate realistic weather data based on location and time
    const now = new Date();
    const hour = now.getHours();
    const isDayTime = hour >= 6 && hour <= 18;
    
    // Base temperature varies slightly by latitude
    const baseTemp = 25 - Math.abs(lat) * 0.5;
    const temp = baseTemp + (Math.random() - 0.5) * 10;
    
    // Realistic weather conditions
    const conditions = [
      { main: 'Clear', description: 'Céu limpo', icon: isDayTime ? '01d' : '01n' },
      { main: 'Clouds', description: 'Parcialmente nublado', icon: isDayTime ? '02d' : '02n' },
      { main: 'Clouds', description: 'Nublado', icon: isDayTime ? '03d' : '03n' }
    ];
    
    const selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      name: 'Localização',
      lat,
      lon,
      main: {
        temp: Math.round(temp * 10) / 10,
        feels_like: Math.round((temp + (Math.random() - 0.5) * 3) * 10) / 10,
        humidity: Math.round(50 + Math.random() * 40),
        pressure: Math.round(1000 + Math.random() * 30)
      },
      wind: {
        speed: Math.round((2 + Math.random() * 15) * 10) / 10,
        deg: Math.round(Math.random() * 360)
      },
      weather: [selectedCondition],
      visibility: Math.round(8 + Math.random() * 4),
      uvi: isDayTime ? Math.round(1 + Math.random() * 8) : 0,
      precipitation: Math.round(Math.random() * 5 * 10) / 10,
      isDayTime
    };
  }

  // Convert OpenWeatherMap format to standard format
  private convertOpenWeatherMapFormat(data: any) {
    return {
      name: data.name || 'Localização',
      lat: data.coord?.lat || -15.8267,
      lon: data.coord?.lon || -47.9218,
      main: {
        temp: data.main?.temp || 25,
        feels_like: data.main?.feels_like || 25,
        humidity: data.main?.humidity || 60,
        pressure: data.main?.pressure || 1013
      },
      wind: {
        speed: data.wind?.speed || 5,
        deg: data.wind?.deg || 180
      },
      weather: [{
        main: data.weather?.[0]?.main || 'Céu limpo',
        description: data.weather?.[0]?.description || 'Céu limpo',
        icon: data.weather?.[0]?.icon || '01d'
      }],
      visibility: (data.visibility || 10000) / 1000, // Convert to km
      uvi: 0, // OpenWeatherMap free tier doesn't include UV index
      precipitation: 0,
      isDayTime: data.weather?.[0]?.icon?.includes('d') || true
    };
  }


}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  description: string;
  location: string;
  lat: number;
  lng: number;
  condition: string;
  icon: string;
}

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
}

interface FavoriteLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
  potential?: number;
}

interface MapConfig {
  id: string;
  title: string;
  type: 'weather' | 'wind' | 'solar' | 'temperature' | 'humidity' | 'pressure';
  center: [number, number];
  zoom: number;
  data?: any;
  loading?: boolean;
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshingWeather, setRefreshingWeather] = useState(false);
  const [showWindMap, setShowWindMap] = useState(false);
  const [selectedWindLocation, setSelectedWindLocation] = useState<FavoriteLocation | null>(null);
  
  // Historical and Environmental Analysis States
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [environmentalAnalysis, setEnvironmentalAnalysis] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [hydrogenViability, setHydrogenViability] = useState<any>(null);
  const [selectedAnalysisPeriod, setSelectedAnalysisPeriod] = useState('3years');
  
  // New mosaic map system - Initialize with all parameter types
  const [maps, setMaps] = useState<MapConfig[]>([
    {
      id: 'map-weather',
      title: 'Mapa Clima',
      type: 'weather',
      center: [-15.8267, -47.9218],
      zoom: 4
    },
    {
      id: 'map-wind',
      title: 'Mapa Vento',
      type: 'wind',
      center: [-15.8267, -47.9218],
      zoom: 4
    },
    {
      id: 'map-temperature',
      title: 'Mapa Temperatura',
      type: 'temperature',
      center: [-15.8267, -47.9218],
      zoom: 4
    },
    {
      id: 'map-humidity',
      title: 'Mapa Umidade',
      type: 'humidity',
      center: [-15.8267, -47.9218],
      zoom: 4
    }
  ]);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const weatherService = new WeatherService();

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    // Load weather data for default location (Brasília)
    loadWeatherForLocation({ 
      id: 1, 
      name: 'Brasília, DF', 
      lat: -15.8267, 
      lng: -47.9218, 
      type: 'city' 
    });
    
    setLoading(false);
  };

  const loadWeatherForLocation = async (location: FavoriteLocation) => {
    try {
      const weather = await weatherService.getCurrentWeather(location.lat, location.lng);
      
      const weatherData: WeatherData = {
        temperature: parseFloat(weather.main.temp.toFixed(1)),
        humidity: Math.round(weather.main.humidity),
        windSpeed: parseFloat((weather.wind.speed * 3.6).toFixed(1)), // Convert m/s to km/h
        windDirection: Math.round(weather.wind.deg),
        pressure: Math.round(weather.main.pressure),
        uvIndex: parseFloat((weather.uvi || 5).toFixed(1)),
        visibility: parseFloat((weather.visibility / 1000).toFixed(1)), // Convert m to km
        description: weather.weather[0].description,
        location: weather.name,
        lat: weather.lat,
        lng: weather.lon,
        condition: weather.weather[0].main,
        icon: weather.weather[0].icon
      };
      
      setWeatherData(weatherData);
      console.log('✅ Weather data loaded successfully:', weatherData);
    } catch (error) {
      console.error('❌ Error loading weather data:', error);
      // Set a default fallback state to prevent UI from breaking
      setWeatherData({
        temperature: 25,
        humidity: 60,
        windSpeed: 5,
        windDirection: 180,
        pressure: 1013,
        uvIndex: 5,
        visibility: 10,
        description: 'Dados não disponíveis',
        location: 'Localização',
        lat: -15.8267,
        lng: -47.9218,
        condition: 'Unknown',
        icon: '01d'
      });
    }
  };

  const refreshWeatherData = async () => {
    setRefreshingWeather(true);
    if (weatherData) {
      const currentLocation = favorites.find(f => 
        Math.abs(f.lat - weatherData.lat) < 0.1 && 
        Math.abs(f.lng - weatherData.lng) < 0.1
      );
      if (currentLocation) {
        await loadWeatherForLocation(currentLocation);
      }
    }
    setRefreshingWeather(false);
  };

  // Historical Data Analysis Functions
  const loadHistoricalAnalysis = async (location: FavoriteLocation, period: string) => {
    setAnalysisLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      // Calculate start date based on period
      const years = parseInt(period.replace('years', ''));
      startDate.setFullYear(endDate.getFullYear() - years);
      
      const historicalService = new HistoricalWeatherService();
      const historical = await historicalService.getHistoricalData(
        location.lat,
        location.lng,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      
      setHistoricalData(historical);
      
      // Calculate hydrogen viability
      const viability = historicalService.calculateHydrogenViability(historical);
      setHydrogenViability(viability);
      
      console.log('✅ Historical analysis completed:', viability);
    } catch (error) {
      console.error('❌ Error loading historical data:', error);
    }
    setAnalysisLoading(false);
  };

  // Environmental Analysis Functions
  const loadEnvironmentalAnalysis = async (location: FavoriteLocation) => {
    setAnalysisLoading(true);
    try {
      const environmentalService = new EnvironmentalAnalysisService();
      const analysis = await environmentalService.getLandUseData(
        location.lat,
        location.lng,
        10 // 10km radius
      );
      
      setEnvironmentalAnalysis(analysis);
      console.log('✅ Environmental analysis completed:', analysis);
    } catch (error) {
      console.error('❌ Error loading environmental analysis:', error);
    }
    setAnalysisLoading(false);
  };

  // Combined Analysis Function
  const runCompleteAnalysis = async (location: FavoriteLocation, period: string) => {
    setAnalysisLoading(true);
    await Promise.all([
      loadHistoricalAnalysis(location, period),
      loadEnvironmentalAnalysis(location)
    ]);
    setAnalysisLoading(false);
  };

  const addMap = () => {
    if (maps.length >= 4) return;
    
    const newMap: MapConfig = {
      id: `map-${Date.now()}`,
      title: `Mapa ${maps.length + 1}`,
      type: 'weather',
      center: [-15.8267, -47.9218],
      zoom: 4
    };
    
    setMaps([...maps, newMap]);
  };

  const removeMap = (mapId: string) => {
    if (maps.length <= 1) return; // Keep at least one map
    setMaps(maps.filter(map => map.id !== mapId));
  };

  const updateMap = (mapId: string, updates: Partial<MapConfig>) => {
    setMaps(maps.map(map => 
      map.id === mapId ? { ...map, ...updates } : map
    ));
  };

  const duplicateMap = (mapId: string) => {
    if (maps.length >= 4) return;
    
    const mapToDuplicate = maps.find(m => m.id === mapId);
    if (!mapToDuplicate) return;
    
    const newMap: MapConfig = {
      ...mapToDuplicate,
      id: `map-${Date.now()}`,
      title: `${mapToDuplicate.title} (Cópia)`
    };
    
    setMaps([...maps, newMap]);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        // Try CPTEC API first
        const cptecResults = await cptecService.searchCities(query);
        
        if (cptecResults.length > 0) {
          // Convert CPTEC results to our format
          const convertedResults = cptecResults.map(city => ({
            name: city.nome,
            state: city.uf,
            lat: 0, // Will be calculated later if needed
            lng: 0, // Will be calculated later if needed
            id: city.id
          }));
          setSearchSuggestions(convertedResults.slice(0, 10));
        } else {
          // Fallback to local database
          const filtered = fallbackCities.filter(city => 
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            city.state.toLowerCase().includes(query.toLowerCase()) ||
            `${city.name}, ${city.state}`.toLowerCase().includes(query.toLowerCase())
          );
          setSearchSuggestions(filtered.slice(0, 10));
        }
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error searching cities:', error);
        // Fallback to local database
        const filtered = fallbackCities.filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.state.toLowerCase().includes(query.toLowerCase()) ||
          `${city.name}, ${city.state}`.toLowerCase().includes(query.toLowerCase())
        );
        setSearchSuggestions(filtered.slice(0, 10));
        setShowSuggestions(true);
      }
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectCity = async (city: any) => {
    setSearchQuery(`${city.name}, ${city.state}`);
    setSearchSuggestions([]);
    setShowSuggestions(false);
    
    // Get coordinates for the city (use fallback if needed)
    let lat = city.lat;
    let lng = city.lng;
    
    if (!lat || !lng) {
      // Use approximate coordinates based on state
      const stateCoordinates: { [key: string]: [number, number] } = {
        'SP': [-23.5505, -46.6333],
        'RJ': [-22.9068, -43.1729],
        'DF': [-15.8267, -47.9218],
        'BA': [-12.9714, -38.5014],
        'CE': [-3.7319, -38.5267],
        'MG': [-19.9167, -43.9345],
        'AM': [-3.1190, -60.0217],
        'PR': [-25.4284, -49.2733],
        'PE': [-8.0476, -34.8770],
        'RS': [-30.0346, -51.2177],
        'PA': [-1.4558, -48.4902],
        'GO': [-16.6864, -49.2643],
        'ES': [-20.3194, -40.3373],
        'MA': [-2.5297, -44.3028],
        'AL': [-9.6658, -35.7353],
        'PI': [-5.0892, -42.8019],
        'RN': [-5.7945, -35.2009],
        'PB': [-7.1195, -34.8430],
        'SE': [-10.9095, -37.0748],
        'MT': [-15.6014, -56.0979],
        'MS': [-20.4697, -54.6201],
        'SC': [-27.5954, -48.5480],
        'RO': [-8.7619, -63.9003],
        'AC': [-9.9740, -67.8203],
        'AP': [0.0346, -51.0678],
        'TO': [-10.1753, -48.3332]
      };
      
      const coords = stateCoordinates[city.state] || [-15.8267, -47.9218];
      lat = coords[0];
      lng = coords[1];
    }
    
    // Update all maps to center on selected city
    maps.forEach((map, index) => {
      updateMap(map.id, {
        center: [lat, lng],
        zoom: 10
      });
    });
    
    // Load weather data for selected city
    loadWeatherForLocation({
      id: 0,
      name: city.name,
      lat: lat,
      lng: lng,
      type: 'city'
    });
  };



  const mapTypes = [
    { id: 'weather', name: 'Clima', icon: Cloud, color: '#0099D9' },
    { id: 'wind', name: 'Vento', icon: Wind, color: '#00A651' },
    { id: 'solar', name: 'Solar', icon: Sun, color: '#FF6B35' },
    { id: 'temperature', name: 'Temperatura', icon: Thermometer, color: '#FF6B35' },
    { id: 'humidity', name: 'Umidade', icon: Droplets, color: '#0099D9' },
    { id: 'pressure', name: 'Pressão', icon: Gauge, color: '#003865' }
  ];

  const handleLocationClick = (location: FavoriteLocation) => {
    loadWeatherForLocation(location);
  };

  const getMapGridClass = () => {
    switch (maps.length) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 lg:grid-cols-2';
      case 3: return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
      case 4: return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-2';
      default: return 'grid-cols-1';
    }
  };

  const getMapHeight = () => {
    switch (maps.length) {
      case 1: return 'h-96 lg:h-full';
      case 2: return 'h-80 lg:h-96';
      case 3: return 'h-72 lg:h-80';
      case 4: return 'h-64 lg:h-72';
      default: return 'h-96';
    }
  };

  return (
    <div className="min-h-screen bg-h2-light-green flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-h2-white border-r border-h2-bright transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-h2-bright">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-h2-primary to-h2-vibrant rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-h2-white" />
              </div>
              {sidebarOpen && <span className="text-xl font-bold text-h2-dark">H2maps</span>}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-h2-light-green rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="p-4 border-b border-h2-bright">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-h2-bright w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar cidades brasileiras..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-2 border border-h2-medium-green rounded-lg focus:outline-none focus:ring-2 focus:ring-h2-primary"
            />
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
             

function App() {
  const handleSearch = (query) => {
    console.log('Busca realizada:', query);
    // Aqui você pode integrar com sua API ou lógica de filtragem
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

)}
          </div>
          </div>
        )}



       

        {/* Map Controls */}
        {sidebarOpen && (
          <div className="p-4 ">
            <div className="space-y-3">
                         
              
              

              {/* Hydrogen Analysis Section */}
              {sidebarOpen && (
                <div className=" border-b border-h2-bright">
                  <h3 className="text-sm font-semibold text-h2 mb-3">ANÁLISE DE VIABILIDADE </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-h2 mb-1 block">Período de Análise</label>
                      <select
                        value={selectedAnalysisPeriod}
                        onChange={(e) => setSelectedAnalysisPeriod(e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-h2-medium-green rounded focus:outline-none focus:ring-1 focus:ring-h2-primary"
                      >
                        <option value="1year">1 ano</option>
                        <option value="3years">3 anos</option>
                        <option value="5years">5 anos</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (weatherData) {
                          const location = {
                            id: 'current',
                            name: weatherData.location,
                            lat: weatherData.lat,
                            lng: weatherData.lng,
                            type: 'city' as const
                          };
                          runCompleteAnalysis(location, selectedAnalysisPeriod);
                        }
                      }}
                      disabled={analysisLoading || !weatherData}
                      className="w-full flex items-center space-x-2 px-3 py-2 bg-h2-blue text-h2-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                    >
                      {analysisLoading ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Activity className="w-3 h-3" />
                      )}
                      <span className="font-medium">
                        {analysisLoading ? 'Analisando...' : 'Analisar Viabilidade'}
                      </span>
                    </button>
                     {/* Quick Results */}
                    {hydrogenViability && (
                      <div className="mt-3 p-2 bg-h2-light-green rounded text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Viabilidade Eólica:</span>
                            <span className="font-semibold">{hydrogenViability.windViability}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Viabilidade Solar:</span>
                            <span className="font-semibold">{hydrogenViability.solarViability}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Viabilidade Geral:</span>
                            <span className="font-semibold text-h2-primary">{hydrogenViability.overallViability}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                     {/* Navigation Menu */}
        {sidebarOpen && (
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3">NAVEGAÇÃO</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-h2-light-green transition-colors">
                <Star className="w-5 h-5 text-h2-orange" />
                <span className="text-sm font-medium text-h2-dark">Favoritos</span>
              </button>
              <Link 
                to="/statistics" 
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-h2-light-green transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-h2-blue" />
                <span className="text-sm font-medium text-h2-dark">Dados Estatísticos</span>
              </Link>
            </div>
          </div>
        )}
                    
                   
                  </div>
                </div>
              )}
            </div>
          </div>
        )}


      </div>
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-h2-white border-b border-h2-bright px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-h2-dark">Dashboard de Análise</h1>
              

            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={refreshWeatherData}
                className="p-2 hover:bg-neo-light rounded-lg transition-colors"
                disabled={refreshingWeather}
              >
                <RefreshCw className={`w-5 h-5 ${refreshingWeather ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
            {/* Analysis Results Panel */}
        {(hydrogenViability || environmentalAnalysis) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-h2-white border-b border-h2-bright px-6 py-4"
          >
           
          </motion.div>
        )}

 <h3 className="text-lg font-semibold text-h2-dark mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-h2-primary" />
              Análise de Viabilidade para Hidrogênio Verde
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hydrogen Viability Results */}
              {hydrogenViability && (
                <div>
                  <h4 className="text-md font-semibold text-h2-dark mb-3">Potencial Energético</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-h2-light-green rounded">
                      <span className="text-sm text-h2-dark">Viabilidade Eólica</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-h2-bright rounded-full h-2 mr-2">
                          <div 
                            className="bg-h2-primary h-2 rounded-full"
                            style={{ width: `${hydrogenViability.windViability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-h2-primary">
                          {hydrogenViability.windViability}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-h2-light-green rounded">
                      <span className="text-sm text-h2-dark">Viabilidade Solar</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-h2-bright rounded-full h-2 mr-2">
                          <div 
                            className="bg-h2-orange h-2 rounded-full"
                            style={{ width: `${hydrogenViability.solarViability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-h2-orange">
                          {hydrogenViability.solarViability}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-h2-light-green rounded">
                      <span className="text-sm text-h2-dark">Viabilidade Geral</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-h2-bright rounded-full h-2 mr-2">
                          <div 
                            className="bg-h2-vibrant h-2 rounded-full"
                            style={{ width: `${hydrogenViability.overallViability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-h2-vibrant">
                          {hydrogenViability.overallViability}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-h2-bright mt-2">
                      Período: {hydrogenViability.analysisPeriod}
                    </div>
                  </div>
                </div>
              )}

              {/* Environmental Analysis Results */}
              {environmentalAnalysis && (
                <div>
                  <h4 className="text-md font-semibold text-h2-dark mb-3">Análise Ambiental</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-h2-light-green rounded">
                      <div className="text-sm text-h2-dark mb-1">Impacto Ambiental</div>
                      <div className={`text-sm font-semibold ${
                        environmentalAnalysis.impactLevel.includes('Baixo') ? 'text-h2-primary' :
                        environmentalAnalysis.impactLevel.includes('moderado') ? 'text-h2-orange' : 'text-red-500'
                      }`}>
                        {environmentalAnalysis.impactLevel}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-h2-light-green rounded">
                      <div className="text-sm text-h2-dark mb-1">Viabilidade do Projeto</div>
                      <div className={`text-sm font-semibold ${
                        environmentalAnalysis.feasibility.includes('Viável') ? 'text-h2-primary' :
                        environmentalAnalysis.feasibility.includes('detalhados') ? 'text-h2-orange' : 'text-red-500'
                      }`}>
                        {environmentalAnalysis.feasibility}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-h2-light-green rounded">
                      <div className="text-sm text-h2-dark mb-2">Restrições Ambientais</div>
                      <div className="text-xs text-black space-y-1">
                        <div>Unidades de Conservação: {environmentalAnalysis.constraints.conservationUnits}</div>
                        <div>Espécies Ameaçadas: {environmentalAnalysis.constraints.protectedSpecies}</div>
                        <div>Declividade Máxima: {environmentalAnalysis.constraints.slopeLimit.toFixed(1)}°</div>
                      </div>
                    </div>
                    
                    {environmentalAnalysis.recommendations.length > 0 && (
                      <div className="p-3 bg-h2-light-green rounded">
                        <div className="text-sm text-h2-dark mb-2">Recomendações</div>
                        <div className="text-xs text-black space-y-1">
                          {environmentalAnalysis.recommendations.slice(0, 3).map((rec: string, index: number) => (
                            <div key={index}>• {rec}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
            </div>
        </header>

      
      </div>
    </div>
    
  );
};

export default Dashboard;