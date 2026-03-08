import React, { useState, useEffect } from 'react';
import DashboardShell from './components/DashboardShell';
import OfficialHeader from './components/OfficialHeader';
import VoiceAssistant from './components/VoiceAssistant';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import CertificatePreview from './components/CertificatePreview';
import LanguageToggle from './components/LanguageToggle';
import { useTranslations } from './hooks/useTranslations';
import { useAudio } from './hooks/useAudio';
import { recommendInternships } from './logic/recommendationEngine';
import internshipsData from './data/internships.json';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('search');
  const [profile, setProfile] = useState({
    education: '',
    skills: [],
    sector: '',
    district: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({
    score: 85,
    matchedSkills: ['React', 'JavaScript', 'CSS'],
    jobSearchKeywords: ['Frontend Developer', 'React Engineer'],
    missingSkills: [
      {
        name: 'Node.js',
        level: 'Beginner',
        timeWeeks: 4,
        hoursPerWeek: 5,
        color: '#facc15',
        readyPct: 30,
        courses: [{ title: 'Node.js for Beginners', platform: 'YouTube', hours: 10, free: true, url: '#' }],
        companies: ['TCS', 'Infosys']
      },
      {
        name: 'MongoDB',
        level: 'Intermediate',
        timeWeeks: 3,
        hoursPerWeek: 4,
        color: '#22c55e',
        readyPct: 60,
        courses: [{ title: 'MongoDB University', platform: 'MongoDB', hours: 8, free: true, url: '#' }],
        companies: ['HCL', 'Wipro']
      }
    ],
    topRoles: [
      { title: 'Fullstack Developer', match: 82, companies: ['Zoho', 'Freshworks'] },
      { title: 'Frontend Lead', match: 90, companies: ['Paytm', 'PhonePe'] }
    ]
  });
  const [weekProgress, setWeekProgress] = useState({});

  const t = useTranslations(language);
  const { speak } = useAudio(language);

  const handleFindMatches = () => {
    const results = recommendInternships(internshipsData, profile);
    setRecommendations(results);
    setShowResults(true);
    speak(t.resultsTitle);
  };

  const handleBackToForm = () => {
    setShowResults(false);
  };

  const handleVoiceCommand = () => {
    // Mock action: randomly fill profile for demo if empty
    if (!profile.education) {
      setProfile({
        education: '12th Pass',
        skills: ['Basic Computer', 'Hindi'],
        sector: 'Education',
        district: 'Patna'
      });
      speak(t.lang === 'hi' ? "मैंने आपकी जानकारी अपडेट कर दी है" : "I have updated your profile based on your voice");
    }
  };

  return (
    <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab} t={t}>
      <LanguageToggle language={language} setLanguage={setLanguage} t={t} />

      <OfficialHeader t={t} language={language} />

      <div className="relative z-10">
        {activeTab === 'search' && (
          <>
            {!showResults ? (
              <div className="animate-fade-up">
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                    {language === 'hi' ? "अपना अवसर खोजें" : "Find Your Opportunity"}
                  </h2>
                  <p className="text-slate-400 font-bold">
                    Official PM Internship recommendations based on your unique profile.
                  </p>
                </div>

                <InputForm
                  profile={profile}
                  setProfile={setProfile}
                  onFind={handleFindMatches}
                  t={t}
                  speak={speak}
                />
              </div>
            ) : (
              <div className="animate-fade-up">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                  <div>
                    <h2 className="text-3xl font-black text-white">{t.resultsTitle}</h2>
                    <p className="text-blue-400 font-bold">Top matched openings with verified stipends.</p>
                  </div>
                  <button
                    onClick={handleBackToForm}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black transition-all border border-slate-700"
                  >
                    ← {t.back}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {recommendations.map((item, index) => (
                    <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ResultCard
                        internship={item}
                        t={t}
                        speak={speak}
                      />
                    </div>
                  ))}
                </div>

                <CertificatePreview t={t} />
              </div>
            )}
          </>
        )}

        {activeTab === 'dashboard' && (
          <div className="animate-fade-up">
            <ResultsDashboard
              results={analysisResults}
              weekProgress={weekProgress}
              onProgressChange={(skill, progress) => setWeekProgress(prev => ({ ...prev, [skill]: progress }))}
            />
          </div>
        )}

        {activeTab !== 'search' && activeTab !== 'dashboard' && (
          <div className="flex flex-col items-center justify-center p-20 glass rounded-[3rem] text-center animate-fade-up">
            <span className="text-6xl mb-6">🚧</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">Section Coming Soon</h2>
            <p className="text-slate-400 mt-4 font-bold italic">Official Government Dashboard Expansion in Progress.</p>
          </div>
        )}
      </div>

      <VoiceAssistant speak={speak} onVoiceCommand={handleVoiceCommand} t={t} />
    </DashboardShell>
  );
}

export default App;
