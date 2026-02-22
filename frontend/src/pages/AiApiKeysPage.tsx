import PageHeader from '../components/PageHeader';
import ApiSettings from './ApiSettings';

type TabId = 'profile' | 'api' | 'facebook' | 'preferences';

export default function AiApiKeysPage() {
  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'bi-person-circle' },
    { id: 'api', label: 'AI API Key', icon: 'bi-key' },
    { id: 'facebook', label: 'Facebook', icon: 'bi-facebook' },
    { id: 'preferences', label: 'Preferences', icon: 'bi-sliders' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        className="animate-fade-in-down"
        title="AI API Keys"
        description="จัดการ API keys ผ่าน Supabase Edge Functions (serverless BaaS)"
      />

      <div className="flex flex-col gap-8 lg:flex-row animate-fade-in-up delay-100">
        <div className="w-full flex-shrink-0 lg:w-64">
          <div className="sticky top-[88px] overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
            <nav className="space-y-1 p-2">
              {tabs.map((tab) => {
                const active = tab.id === 'api';
                return (
                  <button
                    key={tab.id}
                    type="button"
                    disabled={!active}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'cursor-not-allowed text-gray-400'
                      }`}
                  >
                    <i className={`bi ${tab.icon} text-lg ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-300'}`}></i>
                    <span>{tab.label}</span>
                    {active && <i className="bi bi-chevron-right ml-auto text-xs text-indigo-400"></i>}
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4 text-center text-xs text-gray-400">BaaS Build</div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-6">
          <ApiSettings />
        </div>
      </div>
    </div>
  );
}
