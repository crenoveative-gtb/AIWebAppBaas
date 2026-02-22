import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import toast from 'react-hot-toast';
import { del, get } from '../services/api';
import { subscribeDataSync } from '../lib/dataSync';

type Conversation = {
  id: string;
  title: string;
  provider: string;
  model: string;
  created_at: string;
  updated_at: string;
  message_count: number;
};

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
};

export default function HistoryPage() {
  const [items, setItems] = useState<Conversation[]>([]);
  const [search, setSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [messageMap, setMessageMap] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeDataSync(() => {
      void loadConversations();
    }, { topics: ['conversations'] });
    return unsubscribe;
  }, []);

  useEffect(() => {
    void loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await get<{ success: boolean; data?: { conversations?: Conversation[] } }>('/api/conversations?limit=200&offset=0');
      if (response.success) {
        setItems(Array.isArray(response.data?.conversations) ? response.data!.conversations! : []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load conversation history');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    if (messageMap[conversationId]) return;
    try {
      const response = await get<{ success: boolean; data?: { messages?: Message[] } }>(`/api/conversations/${conversationId}`);
      if (response.success) {
        setMessageMap((prev) => ({
          ...prev,
          [conversationId]: Array.isArray(response.data?.messages) ? response.data!.messages! : []
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load conversation messages');
    }
  };

  const providers = useMemo(() => {
    const set = new Set(items.map((i) => i.provider));
    return ['All', ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    return items
      .filter((item) => {
        if (providerFilter !== 'All' && item.provider !== providerFilter) return false;
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.model.toLowerCase().includes(q) || item.provider.toLowerCase().includes(q);
      })
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  }, [items, providerFilter, search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this conversation?')) return;
    try {
      await del(`/api/conversations/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setMessageMap((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (expandedId === id) setExpandedId(null);
      toast.success('Conversation deleted');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete conversation');
    }
  };

  const handleDeleteAll = async () => {
    if (!items.length) return;
    if (!confirm('Delete all conversations?')) return;

    let failed = 0;
    for (const item of items) {
      try {
        await del(`/api/conversations/${item.id}`);
      } catch {
        failed += 1;
      }
    }

    if (failed === 0) {
      setItems([]);
      setMessageMap({});
      setExpandedId(null);
      toast.success('All conversations deleted');
      return;
    }

    toast.error(`Deleted with ${failed} failure(s)`);
    void loadConversations();
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => {
      const next = prev === id ? null : id;
      if (next) void loadMessages(next);
      return next;
    });
  };

  const providerColors: Record<string, string> = {
    gemini: 'bg-blue-50 text-blue-600',
    openrouter: 'bg-emerald-50 text-emerald-600',
    groq: 'bg-amber-50 text-orange-600',
    aimlapi: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conversation History"
        description="History from Supabase database"
        className="animate-fade-in-down"
        actions={
          items.length > 0 ? (
            <button onClick={handleDeleteAll} className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors">
              <i className="bi bi-trash mr-1"></i>Delete All
            </button>
          ) : undefined
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-100">
        <div className="relative flex-1">
          <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-modern pl-10 !py-2.5"
          />
        </div>
        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="input-modern !w-auto text-xs !py-2.5"
        >
          {providers.map((provider) => (
            <option key={provider} value={provider}>{provider === 'All' ? 'All Providers' : provider}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12 text-gray-500">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2"></span>
          Loading conversation history...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-clock-history text-3xl text-gray-300"></i>
          </div>
          <p className="text-sm text-gray-500 mb-1">No conversation history</p>
          <p className="text-xs text-gray-400">Start chatting in Chat Core to create history</p>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in-up delay-200">
          {filtered.map((item) => {
            const messages = messageMap[item.id] ?? [];
            const expanded = expandedId === item.id;

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-5 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${providerColors[item.provider] || 'bg-gray-50 text-gray-600'}`}>
                          {item.provider}
                        </span>
                        <span className="text-[11px] text-gray-400">{item.model}</span>
                      </div>
                      <p className="text-sm text-gray-900 line-clamp-2">{item.title}</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {new Date(item.updated_at).toLocaleString('th-TH')} · {item.message_count} messages
                      </p>
                    </div>
                    <i className={`bi bi-chevron-${expanded ? 'up' : 'down'} text-gray-400 ml-3`}></i>
                  </div>
                </div>

                {expanded && (
                  <div className="border-t border-gray-100 animate-fade-in">
                    <div className="p-5 space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar">
                      {messages.length === 0 ? (
                        <div className="text-xs text-gray-400">No messages</div>
                      ) : (
                        messages.map((message) => (
                          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${message.role === 'user' ? 'bg-indigo-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}>
                              <p className="whitespace-pre-wrap break-words">{message.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex items-center gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                      <button onClick={() => handleDelete(item.id)} className="text-xs px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                        <i className="bi bi-trash mr-1"></i>Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
