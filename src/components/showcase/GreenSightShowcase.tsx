import { useState } from 'react';
import { Project } from '../../data/portfolioData';
import { ArrowUpRight, Github, Smartphone, Globe, CloudSun, Droplets, ArrowRight, Eye } from 'lucide-react';

interface GreenSightShowcaseProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

type LangKey = 'en' | 'yo' | 'ha' | 'ig' | 'efi';

interface LocalizedTelemetry {
  name: string;
  nativeName: string;
  soilStatus: string;
  weatherAdvice: string;
  cropTip: string;
  marketHeader: string;
  sampleCrop: string;
  samplePrice: string;
}

const LOCALIZED_DATA: Record<LangKey, LocalizedTelemetry> = {
  en: {
    name: 'English',
    nativeName: 'English (Official)',
    soilStatus: 'Soil Moisture: 28.4% (Optimal for Cassava)',
    weatherAdvice: 'Rain likely in 4 hours. Delay pesticide spraying to prevent chemical runoff.',
    cropTip: 'Optimal time for maize fertilization before the afternoon thunderstorm.',
    marketHeader: 'Regional Grain Index (Commodities)',
    sampleCrop: 'White Maize (100kg Bag)',
    samplePrice: '₦82,000 (Mile 12)',
  },
  yo: {
    name: 'Yoruba',
    nativeName: 'Yorùbá (South-West)',
    soilStatus: 'Ọrinrin Ilẹ̀: 28.4% (Dara gidigan fun Ẹ̀gẹ́)',
    weatherAdvice: 'Òjò le rọ̀ láàárín wákàtí mẹ́rin. Dúró díẹ̀ kí o tó fun ogun koríko.',
    cropTip: 'Àkókò tó dára láti tọ́jú àgbàdo ṣáájú kí òjò ọ̀sán tó bẹ̀rẹ̀.',
    marketHeader: 'Iye Ọjà Ọ̀sẹ̀ Yìí (Èkó / Bodija)',
    sampleCrop: 'Àgbàdo Funfun (Àpò 100kg)',
    samplePrice: '₦82,000 (Bodija)',
  },
  ha: {
    name: 'Hausa',
    nativeName: 'Harshen Hausa (North)',
    soilStatus: 'Danshin Ƙasa: 28.4% (Yana da kyau sosai ga Rogo)',
    weatherAdvice: 'Ana sa ran ruwan sama nan da sa\'o\'i hudu. Kada ku fesa maganin kwari yanzu.',
    cropTip: 'Lokaci mai kyau don sanya takin masara kafin hadari ya sauko.',
    marketHeader: 'Farashin Hatsi na Yanki (Kano Dawanau)',
    sampleCrop: 'Farin Masara (Buhun 100kg)',
    samplePrice: '₦79,500 (Dawanau)',
  },
  ig: {
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo (South-East)',
    soilStatus: 'Mmiri dị n\'Ala: 28.4% (Ọ dị mma nke ukwuu maka Akpụ)',
    weatherAdvice: 'Mmiri ga-ezo n\'ime awa anọ. Chere tupu ị fesaa ọgwụ ahụhụ.',
    cropTip: 'Oge kachasị mma itinye nri n\'ọka tupu nnukwu mmiri ezo.',
    marketHeader: 'Ọnụahịa Ahịa Ọka (Onitsha Main)',
    sampleCrop: 'Ọcha Ọka (Akpa 100kg)',
    samplePrice: '₦84,000 (Onitsha)',
  },
  efi: {
    name: 'Efik',
    nativeName: 'Efik / Ibibio (South-South)',
    soilStatus: 'Mmọñ ke Isọñ: 28.4% (Ọfọn eti-eti ọnọ Iwa)',
    weatherAdvice: 'Edim eyedepe ke hour ina. Kûfiat ibọk unam idaha emi.',
    cropTip: 'Ini eke ọfọnde ndinọ ibọk ibokpot mbemiso edim edidepe.',
    marketHeader: 'Urua Ndidia Ufọk (Calabar Marian)',
    sampleCrop: 'Afia Ibokpot (Ekpat 100kg)',
    samplePrice: '₦73,500 (Calabar Marian)',
  },
};

export default function GreenSightShowcase({ project, onSelectProject }: GreenSightShowcaseProps) {
  const [selectedLang, setSelectedLang] = useState<LangKey>('en');
  const [activeScreenTab, setActiveScreenTab] = useState<'advisory' | 'soil' | 'prices'>('advisory');
  const currentLocale = LOCALIZED_DATA[selectedLang];

  return (
    <div
      id="greensight-showcase-split"
      className="mb-20 sm:mb-28 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E131F] rounded-2xl overflow-hidden shadow-xs"
    >
      {/* Editorial Header Ribbon */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-blue-600 dark:text-blue-400">02 / PROJECT 02</span>
          <span className="text-slate-400">•</span>
          <span className="uppercase text-slate-600 dark:text-slate-400 font-medium">
            MOBILE TELEMETRY & 5-LANGUAGE LOCALIZATION
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">React Native • Expo Router • Open-Meteo & WeatherAPI</span>
          <a
            id="greensight-repo-link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Varied Layout: Large Image / Mobile Simulator on the LEFT, Information on the RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column (lg:col-span-5): Large Mobile Device Simulation */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-slate-50 dark:bg-[#080C14] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
          
          {/* Authentic Mobile Device Frame */}
          <div className="w-full max-w-[310px] bg-slate-900 rounded-[36px] p-3 border-4 border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-100 font-sans">
            
            {/* Top Speaker & Dynamic Island */}
            <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>

            {/* Mobile Screen Surface */}
            <div className="bg-[#0B0F17] rounded-[26px] p-4 border border-slate-800/80 text-xs">
              
              {/* Screen Top Status */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-800/80">
                <span className="font-bold text-emerald-400">GreenSight 1.0</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 font-semibold uppercase">
                  {selectedLang}
                </span>
              </div>

              {/* Weather & Soil Sensor Card */}
              <div className="my-3 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                    29°C Rain Radar
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    84% Hum.
                  </span>
                </div>
                <div className="font-mono text-[10.5px] text-blue-400 font-medium bg-slate-950 p-2 rounded-lg border border-slate-800">
                  {currentLocale.soilStatus}
                </div>
              </div>

              {/* Screen Tab Switcher */}
              <div className="grid grid-cols-3 gap-1 bg-slate-900/90 p-1 rounded-lg text-[10px] font-mono mb-3 text-center">
                <button
                  type="button"
                  onClick={() => setActiveScreenTab('advisory')}
                  className={`py-1 rounded transition-colors ${
                    activeScreenTab === 'advisory' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Advisory
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreenTab('soil')}
                  className={`py-1 rounded transition-colors ${
                    activeScreenTab === 'soil' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Soil
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreenTab('prices')}
                  className={`py-1 rounded transition-colors ${
                    activeScreenTab === 'prices' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Market
                </button>
              </div>

              {/* Screen Tab Content */}
              {activeScreenTab === 'advisory' && (
                <div className="space-y-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    // Weather Alert
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-200">
                    {currentLocale.weatherAdvice}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[10.5px] text-slate-400">
                    <strong className="text-emerald-400 font-normal">Tip: </strong>
                    {currentLocale.cropTip}
                  </div>
                </div>
              )}

              {activeScreenTab === 'soil' && (
                <div className="space-y-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 font-mono text-[10.5px]">
                  <div className="text-slate-400">Open-Meteo Soil Telemetry</div>
                  <div className="flex justify-between text-white">
                    <span>Depth: 0–7cm</span>
                    <span className="text-emerald-400 font-bold">28.4% m³/m³</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[65%]" />
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Status: Optimal range for root tuber expansion.
                  </div>
                </div>
              )}

              {activeScreenTab === 'prices' && (
                <div className="space-y-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">
                    {currentLocale.marketHeader}
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <div className="text-[11px] font-semibold text-white">{currentLocale.sampleCrop}</div>
                    <div className="font-mono text-[11px] text-emerald-400 mt-0.5">{currentLocale.samplePrice}</div>
                  </div>
                  <div className="text-[9.5px] text-slate-500 font-mono">
                    State comparisons updated daily via crowd reports
                  </div>
                </div>
              )}

              {/* Mobile Home Bar */}
              <div className="mt-4 pt-2 flex justify-center">
                <div className="w-20 h-1 bg-slate-700 rounded-full" />
              </div>

            </div>

          </div>

          <div className="mt-4 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Simulated Expo Native Viewport</span>
          </div>

        </div>

        {/* Right Column (lg:col-span-7): Information, Dialect Engine, & Project Narrative */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
              MOBILE AGRI-TECH & LOCALIZATION
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3">
              {project.title}
            </h3>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-sans">
              {project.problem}
            </p>

            {/* Architectural Points */}
            <div className="space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-0.5 font-bold">01</span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-medium">Five-Language Regional Localization:</strong>
                  <span> Built for zero dependency on English literacy; smallholder farmers switch seamlessly between English, Yoruba, Hausa, Igbo, and Efik with persistent local AsyncStorage caching.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-0.5 font-bold">02</span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-medium">Dual Telemetry Pipelines:</strong>
                  <span> WeatherAPI forecasts merged with Open-Meteo volumetric soil moisture layers (0–7cm depths) to guide planting cycles.</span>
                </div>
              </div>
            </div>

            {/* Interactive Dialect Selector Widget */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                  <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Test Live Language Switching:
                </span>
                <span className="text-[11px] text-slate-500">Updates live simulator</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                {(Object.keys(LOCALIZED_DATA) as LangKey[]).map((key) => {
                  const loc = LOCALIZED_DATA[key];
                  const isSelected = selectedLang === key;
                  return (
                    <button
                      key={key}
                      id={`lang-btn-${key}`}
                      type="button"
                      onClick={() => setSelectedLang(key)}
                      className={`px-3 py-2 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent font-semibold shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-[11px]">{loc.name}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-slate-300 dark:text-slate-700' : 'text-slate-400'}`}>
                        {loc.nativeName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Technologies List */}
            <div className="mb-6">
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="greensight-inspect-specs-btn"
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-xs"
              >
                <span>VIEW PROJECT</span>
                <Eye className="w-3.5 h-3.5" />
              </button>

              <a
                id="greensight-github-cta"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <span className="font-mono text-xs text-slate-500">
              Verified Expo Native Repo
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
