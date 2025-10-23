import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Wind,
  Sun,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  Filter,
  RefreshCw,
  FileSpreadsheet,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import * as XLSX from 'xlsx';

// Weather API Service
class WeatherService {
  private apiKey: string = 'd471cb2776044a3bb7e163815252110'; // OpenWeatherMap demo key
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';

  async getHistoricalWeather(lat: number, lon: number, startDate: Date, endDate: Date) {
    try {
      // Simulate historical data since OpenWeatherMap historical API requires paid subscription
      return this.generateMockHistoricalData(lat, lon, startDate, endDate);
    } catch (error) {
      console.error('Error fetching historical weather data:', error);
      return this.generateMockHistoricalData(lat, lon, startDate, endDate);
    }
  }

  async getCurrentWeather(lat: number, lon: number) {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`
      );
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData(lat, lon);
    }
  }

  private generateMockHistoricalData(lat: number, lon: number, startDate: Date, endDate: Date) {
    const data = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      data.push({
        date: new Date(currentDate),
        temperature: 15 + Math.random() * 20 + Math.sin(currentDate.getDate() / 30) * 5,
        humidity: 40 + Math.random() * 40,
        windSpeed: 3 + Math.random() * 15,
        windDirection: Math.random() * 360,
        pressure: 1000 + Math.random() * 30,
        uvIndex: 1 + Math.random() * 10,
        visibility: 5 + Math.random() * 15,
        rainfall: Math.random() > 0.7 ? Math.random() * 50 : 0,
        solarIrradiance: 100 + Math.random() * 600 + Math.sin(currentDate.getHours() / 24) * 200
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  }

  private getMockWeatherData(lat: number, lon: number) {
    return {
      name: 'Localização',
      lat,
      lon,
      main: {
        temp: 20 + Math.random() * 15,
        humidity: 50 + Math.random() * 30,
        pressure: 1000 + Math.random() * 30
      },
      wind: {
        speed: 5 + Math.random() * 20,
        deg: Math.random() * 360
      },
      weather: [{
        main: 'Céu limpo',
        description: 'Céu limpo',
        icon: '01d'
      }],
      visibility: 8000 + Math.random() * 2000,
      uvi: 1 + Math.random() * 10
    };
  }
}

interface HistoricalData {
  date: Date;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  rainfall: number;
  solarIrradiance: number;
}

interface LocationData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
}

interface StatisticsSummary {
  avgTemperature: number;
  maxTemperature: number;
  minTemperature: number;
  avgHumidity: number;
  avgWindSpeed: number;
  maxWindSpeed: number;
  totalRainfall: number;
  avgSolarIrradiance: number;
  avgPressure: number;
  avgUVIndex: number;
  dataPoints: number;
}

const Statistics = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [dateRange, setDateRange] = useState<'7' | '15' | '30' | 'custom'>('7');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [statistics, setStatistics] = useState<StatisticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([
    'temperature', 'humidity', 'windSpeed', 'pressure', 'rainfall', 'solarIrradiance'
  ]);

  const weatherService = new WeatherService();

  const locations: LocationData[] = [
    { id: 1, name: 'São Paulo, SP', lat: -23.5505, lng: -46.6333, type: 'city' },
    { id: 2, name: 'Rio de Janeiro, RJ', lat: -22.9068, lng: -43.1729, type: 'city' },
    { id: 3, name: 'Brasília, DF', lat: -15.8267, lng: -47.9218, type: 'city' },
    { id: 4, name: 'Fortaleza, CE', lat: -3.7319, lng: -38.5267, type: 'city' },
    { id: 5, name: 'Salvador, BA', lat: -12.9714, lng: -38.5014, type: 'city' },
    { id: 6, name: 'Recife, PE', lat: -8.0476, lng: -34.8770, type: 'city' },
    { id: 7, name: 'Parque Eólico Rio do Fogo', lat: -5.3757, lng: -37.3439, type: 'wind' },
    { id: 8, name: 'Complexo Solar Pirapora', lat: -17.3406, lng: -44.9361, type: 'solar' }
  ];

  const parameters = [
    { id: 'temperature', name: 'Temperatura', icon: Thermometer, unit: '°C', color: '#ef4444' },
    { id: 'humidity', name: 'Umidade', icon: Droplets, unit: '%', color: '#3b82f6' },
    { id: 'windSpeed', name: 'Velocidade do Vento', icon: Wind, unit: 'm/s', color: '#10b981' },
    { id: 'pressure', name: 'Pressão', icon: Gauge, unit: 'hPa', color: '#6b7280' },
    { id: 'rainfall', name: 'Precipitação', icon: Droplets, unit: 'mm', color: '#06b6d4' },
    { id: 'solarIrradiance', name: 'Irradiação Solar', icon: Sun, unit: 'W/m²', color: '#f59e0b' },
    { id: 'uvIndex', name: 'Índice UV', icon: Eye, unit: '', color: '#8b5cf6' },
    { id: 'visibility', name: 'Visibilidade', icon: Eye, unit: 'km', color: '#14b8a6' }
  ];

  useEffect(() => {
    if (selectedLocation) {
      loadData();
    }
  }, [selectedLocation, dateRange, customStartDate, customEndDate]);

  const loadData = async () => {
    if (!selectedLocation) return;

    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange();
      const data = await weatherService.getHistoricalWeather(
        selectedLocation.lat,
        selectedLocation.lng,
        startDate,
        endDate
      );
      
      setHistoricalData(data);
      calculateStatistics(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDateRange = () => {
    const endDate = new Date();
    let startDate: Date;

    switch (dateRange) {
      case '7':
        startDate = subDays(endDate, 7);
        break;
      case '15':
        startDate = subDays(endDate, 15);
        break;
      case '30':
        startDate = subDays(endDate, 30);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
          endDate.setTime(new Date(customEndDate).getTime());
        } else {
          startDate = subDays(endDate, 7);
        }
        break;
      default:
        startDate = subDays(endDate, 7);
    }

    return { startDate: startOfDay(startDate), endDate: endOfDay(endDate) };
  };

  const calculateStatistics = (data: HistoricalData[]) => {
    if (data.length === 0) return;

    const stats: StatisticsSummary = {
      avgTemperature: parseFloat((data.reduce((sum, d) => sum + d.temperature, 0) / data.length).toFixed(1)),
      maxTemperature: parseFloat(Math.max(...data.map(d => d.temperature)).toFixed(1)),
      minTemperature: parseFloat(Math.min(...data.map(d => d.temperature)).toFixed(1)),
      avgHumidity: Math.round(data.reduce((sum, d) => sum + d.humidity, 0) / data.length),
      avgWindSpeed: parseFloat((data.reduce((sum, d) => sum + d.windSpeed, 0) / data.length).toFixed(1)),
      maxWindSpeed: parseFloat(Math.max(...data.map(d => d.windSpeed)).toFixed(1)),
      totalRainfall: parseFloat(data.reduce((sum, d) => sum + d.rainfall, 0).toFixed(1)),
      avgSolarIrradiance: parseFloat((data.reduce((sum, d) => sum + d.solarIrradiance, 0) / data.length).toFixed(1)),
      avgPressure: Math.round(data.reduce((sum, d) => sum + d.pressure, 0) / data.length),
      avgUVIndex: parseFloat((data.reduce((sum, d) => sum + d.uvIndex, 0) / data.length).toFixed(1)),
      dataPoints: data.length
    };

    setStatistics(stats);
  };

  const exportToExcel = () => {
    if (!historicalData.length || !selectedLocation) return;

    setExporting(true);
    try {
      // Prepare data for Excel
      const exportData = historicalData.map(item => {
        const row: any = {
          'Data': format(item.date, 'dd/MM/yyyy'),
          'Localização': selectedLocation.name,
          'Latitude': selectedLocation.lat.toFixed(4),
          'Longitude': selectedLocation.lng.toFixed(4)
        };

        selectedParameters.forEach(param => {
          const paramConfig = parameters.find(p => p.id === param);
          if (paramConfig) {
            const value = item[param as keyof HistoricalData] as number;
            row[`${paramConfig.name} (${paramConfig.unit})`] = parseFloat(value.toFixed(1));
          }
        });

        return row;
      });

      // Add summary data
      if (statistics) {
        exportData.push({});
        exportData.push({ 'Data': 'RESUMO ESTATÍSTICO' });
        exportData.push({ 'Data': 'Média Temperatura (°C)', 'Valor': statistics.avgTemperature });
        exportData.push({ 'Data': 'Temperatura Máxima (°C)', 'Valor': statistics.maxTemperature });
        exportData.push({ 'Data': 'Temperatura Mínima (°C)', 'Valor': statistics.minTemperature });
        exportData.push({ 'Data': 'Média Umidade (%)', 'Valor': statistics.avgHumidity });
        exportData.push({ 'Data': 'Média Velocidade Vento (m/s)', 'Valor': statistics.avgWindSpeed });
        exportData.push({ 'Data': 'Velocidade Máxima Vento (m/s)', 'Valor': statistics.maxWindSpeed });
        exportData.push({ 'Data': 'Precipitação Total (mm)', 'Valor': statistics.totalRainfall });
        exportData.push({ 'Data': 'Média Irradiação Solar (W/m²)', 'Valor': statistics.avgSolarIrradiance });
        exportData.push({ 'Data': 'Média Pressão (hPa)', 'Valor': statistics.avgPressure });
        exportData.push({ 'Data': 'Média Índice UV', 'Valor': statistics.avgUVIndex });
        exportData.push({ 'Data': 'Total de Pontos de Dados', 'Valor': statistics.dataPoints });
      }

      // Create workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `Dados_${selectedLocation.name.replace(/[^a-zA-Z0-9]/g, '_')}`);

      // Generate filename with date range
      const { startDate, endDate } = getDateRange();
      const filename = `H2maps_Estatisticas_${selectedLocation.name.replace(/[^a-zA-Z0-9]/g, '_')}_${format(startDate, 'dd-MM-yyyy')}_a_${format(endDate, 'dd-MM-yyyy')}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      setExporting(false);
    }
  };

  const toggleParameter = (paramId: string) => {
    setSelectedParameters(prev => 
      prev.includes(paramId) 
        ? prev.filter(p => p !== paramId)
        : [...prev, paramId]
    );
  };

  const getParameterStats = (paramId: string) => {
    if (!historicalData.length) return null;
    
    const values = historicalData.map(d => d[paramId as keyof HistoricalData] as number);
    const avg = parseFloat((values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1));
    const max = parseFloat(Math.max(...values).toFixed(1));
    const min = parseFloat(Math.min(...values).toFixed(1));
    
    return { avg, max, min };
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Análise Estatística</h1>
          </div>
          
          <button
            onClick={exportToExcel}
            disabled={!historicalData.length || exporting}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>{exporting ? 'Exportando...' : 'Exportar Excel'}</span>
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Filters Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros de Análise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Localização
              </label>
              <select
                value={selectedLocation?.id || ''}
                onChange={(e) => setSelectedLocation(locations.find(l => l.id === parseInt(e.target.value)) || null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Selecione uma localização</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name} ({location.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Período de Análise
              </label>
              <div className="flex space-x-2">
                {['7', '15', '30'].map(days => (
                  <button
                    key={days}
                    onClick={() => setDateRange(days as '7' | '15' | '30')}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                      dateRange === days
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {days} dias
                  </button>
                ))}
                <button
                  onClick={() => setDateRange('custom')}
                  className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                    dateRange === 'custom'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Personalizado
                </button>
              </div>
            </div>

            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Data Início
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Data Fim
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Parameters Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Parâmetros para Análise
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {parameters.map(param => (
                <button
                  key={param.id}
                  onClick={() => toggleParameter(param.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                    selectedParameters.includes(param.id)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <param.icon className="w-4 h-4" />
                  <span className="text-sm">{param.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
            <p className="text-slate-600">Carregando dados históricos...</p>
          </div>
        )}

        {/* Statistics Summary */}
        {!loading && statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Thermometer className="w-8 h-8 text-red-500" />
                <span className="text-sm text-slate-500">Temperatura</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">{statistics.avgTemperature}°C</div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Máx: {statistics.maxTemperature}°C</span>
                  <span className="text-slate-600">Mín: {statistics.minTemperature}°C</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Wind className="w-8 h-8 text-green-500" />
                <span className="text-sm text-slate-500">Vento</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">{statistics.avgWindSpeed} m/s</div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Máx: {statistics.maxWindSpeed} m/s</span>
                  <span className="text-slate-600">Média</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Droplets className="w-8 h-8 text-blue-500" />
                <span className="text-sm text-slate-500">Umidade</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">{statistics.avgHumidity}%</div>
                <div className="text-sm text-slate-600">Média do período</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Sun className="w-8 h-8 text-yellow-500" />
                <span className="text-sm text-slate-500">Solar</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">{statistics.avgSolarIrradiance} W/m²</div>
                <div className="text-sm text-slate-600">Irradiação média</div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Detailed Parameters */}
        {!loading && historicalData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {selectedParameters.map(paramId => {
              const param = parameters.find(p => p.id === paramId);
              const stats = getParameterStats(paramId);
              
              if (!param || !stats) return null;

              return (
                <motion.div
                  key={paramId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl border border-slate-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <param.icon className="w-6 h-6" style={{ color: param.color }} />
                      <h3 className="text-lg font-semibold text-slate-900">{param.name}</h3>
                    </div>
                    <span className="text-sm text-slate-500">{param.unit}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{stats.avg}</div>
                      <div className="text-xs text-slate-600">Média</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{stats.max}</div>
                      <div className="text-xs text-slate-600">Máximo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.min}</div>
                      <div className="text-xs text-slate-600">Mínimo</div>
                    </div>
                  </div>

                  {/* Mini chart visualization */}
                  <div className="h-20 bg-slate-50 rounded-lg flex items-end justify-between px-2 py-1">
                    {historicalData.slice(-20).map((item, index) => {
                      const value = item[paramId as keyof HistoricalData] as number;
                      const percentage = ((value - stats.min) / (stats.max - stats.min)) * 100;
                      return (
                        <div
                          key={index}
                          className="flex-1 mx-px rounded-t"
                          style={{
                            height: `${Math.max(5, percentage)}%`,
                            backgroundColor: param.color,
                            opacity: 0.7
                          }}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Data Table */}
        {!loading && historicalData.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Dados Detalhados</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{statistics?.dataPoints} pontos de dados</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Data</th>
                    {selectedParameters.map(paramId => {
                      const param = parameters.find(p => p.id === paramId);
                      return param ? (
                        <th key={paramId} className="text-left py-3 px-4 font-semibold text-slate-900">
                          {param.name} ({param.unit})
                        </th>
                      ) : null;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {historicalData.slice(-10).reverse().map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {format(item.date, 'dd/MM/yyyy')}
                      </td>
                      {selectedParameters.map(paramId => {
                        const param = parameters.find(p => p.id === paramId);
                        const value = item[paramId as keyof HistoricalData] as number;
                        return param ? (
                          <td key={paramId} className="py-3 px-4 text-slate-700">
                            {parseFloat(value.toFixed(1))}
                          </td>
                        ) : null;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {historicalData.length > 10 && (
              <div className="mt-4 text-center text-sm text-slate-600">
                Mostrando últimos 10 registros de {historicalData.length} totais
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !historicalData.length && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum Dado Disponível</h3>
            <p className="text-slate-600 mb-4">
              Selecione uma localização e período para visualizar as estatísticas
            </p>
            <button
              onClick={() => setSelectedLocation(locations[0])}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Selecionar São Paulo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;