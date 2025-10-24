import { useState, useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  MapPin,
  Wind,
  Sun,
  Droplets,
  Zap,
  Globe,
  BarChart3,
  Shield,
  ChevronRight,
  Leaf,
  Battery,
  Search,
  Menu,
  X,
  Star,
  TrendingUp,
  Cloud,
  Thermometer,
  Eye,
  Map,
  TreePine,
  Home,
  Settings,
  Bell,
  User,
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import Statistics from "./components/Statistics";

const solarImage =
  "https://public.youware.com/users-website-assets/prod/478a89f9-ae01-4ec5-b8a1-ccce0e4c8a14/172e295f085644a5b02ccee379f4c3c3.jpg";
const windImage =
  "https://public.youware.com/users-website-assets/prod/478a89f9-ae01-4ec5-b8a1-ccce0e4c8a14/b91a0349369440c9bfd1c469d750a30a.jpg";

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">H2maps</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Recursos
              </a>
              <a
                href="#technology"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Tecnologia
              </a>
              <a
                href="#conservation"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Conservação
              </a>
              <a
                href="#benefits"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Benefícios
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Contato
              </a>
              <Link
                to="/dashboard"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Demonstração
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-100">
            <div className="px-4 py-2 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-slate-600 hover:text-emerald-600"
              >
                Recursos
              </a>
              <a
                href="#technology"
                className="block px-3 py-2 text-slate-600 hover:text-emerald-600"
              >
                Tecnologia
              </a>
              <a
                href="#conservation"
                className="block px-3 py-2 text-slate-600 hover:text-emerald-600"
              >
                Conservação
              </a>
              <a
                href="#benefits"
                className="block px-3 py-2 text-slate-600 hover:text-emerald-600"
              >
                Benefícios
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-slate-600 hover:text-emerald-600"
              >
                Contato
              </a>
              <Link
                to="/dashboard"
                className="block px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Demonstração
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                <span>Energia Renovável Inteligente</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Georreferenciamento para viabilidade de produção de
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {" "}
                  Hidrogênio Verde
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Analise a viabilidade de instalação de energia eólica e solar
                usando mapas climáticos avançados. Incluindo unidades de
                conservação da fauna e flora para desenvolvimento sustentável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Começar Análise</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <button className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors">
                  Ver Demonstração
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-emerald-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <Sun className="w-6 h-6 text-yellow-500" />
                      <span className="font-semibold text-slate-900">
                        Energia Solar
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Análise de irradiância solar e potencial fotovoltaico
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="w-6 h-6 mb-2" />
                      <p className="font-semibold">
                        Georreferenciamento Preciso
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      Dados geográficos exatos para planejamento eficiente
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <Wind className="w-6 h-6 mb-2" />
                      <p className="font-semibold">Análise Eólica</p>
                    </div>
                    <p className="text-sm font-semibold">
                      Análise do vento para máximo aproveitamento energético
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-emerald-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <BarChart3 className="w-6 h-6 text-emerald-600" />
                      <span className="font-semibold text-slate-900">
                        Dados Climáticos
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Tempo, chuvas, ventos e padrões climáticos
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Recursos Avançados de Análise
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ferramentas completas para análise georreferenciada e tomada de
              decisão inteligente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Mapeamento Preciso",
                description:
                  "Localização ideal para instalação de painéis solares e turbinas eólicas usando GIS avançado",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: <Wind className="w-8 h-8" />,
                title: "Análise Eólica",
                description:
                  "Dados de velocidade do vento, direção e padrões para máximo aproveitamento energético",
                color: "from-teal-500 to-cyan-600",
              },
              {
                icon: <Sun className="w-8 h-8" />,
                title: "Potencial Solar",
                description:
                  "Medição de irradiância solar, horas de sol e eficiência fotovoltaica por região",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: "Dados Climáticos",
                description:
                  "Análise de chuvas, umidade e condições meteorológicas para viabilidade",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: <TreePine className="w-8 h-8" />,
                title: "Unidades de Conservação",
                description:
                  "Mapeamento de áreas protegidas de fauna e flora para desenvolvimento sustentável",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Análise de Riscos",
                description:
                  "Identificação de áreas de risco e fatores ambientais críticos",
                color: "from-red-500 to-red-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Section */}
      <section
        id="conservation"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Protegendo a Biodiversidade
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Nossa plataforma integra dados de unidades de conservação para
                garantir que o desenvolvimento de energia renovável respeite e
                proteja os ecossistemas locais.
              </p>

              <div className="space-y-6">
                {[
                  "Mapeamento de áreas de proteção ambiental",
                  "Análise de impacto sobre habitats naturais",
                  "Identificação de corredores ecológicos",
                  "Monitoramento de espécies ameaçadas",
                  "Relatórios de sustentabilidade ambiental",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center">
                  <TreePine className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900">1.200+</p>
                  <p className="text-sm text-slate-600">Áreas Protegidas</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Eye className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900">350+</p>
                  <p className="text-sm text-slate-600">Espécies Monitoradas</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Map className="w-12 h-12 text-cyan-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900">85%</p>
                  <p className="text-sm text-slate-600">Precisão Mapeada</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900">100%</p>
                  <p className="text-sm text-slate-600">Conformidade Legal</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

  

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">H2maps</span>
              </div>
              <p className="text-sm text-slate-400">
                Georreferenciamento inteligente para um futuro energético
                sustentável.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Tecnologia
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Casos de Uso
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Carreiras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Segurança
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
