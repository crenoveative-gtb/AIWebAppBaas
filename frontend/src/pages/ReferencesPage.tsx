import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function ReferencesPage() {
    const navigate = useNavigate();
    const [selectedReference, setSelectedReference] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <PageHeader
                title="References"
                description="แหล่งข้อมูลและแนวคิด AI สำหรับการพัฒนาโปรเจค"
                className="animate-fade-in-down"
            />

            {/* Submenu Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up delay-100">
                <button
                    onClick={() => setSelectedReference(selectedReference === 'ai-chat' ? null : 'ai-chat')}
                    className={`p-4 rounded-xl text-left transition-all ${selectedReference === 'ai-chat'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                >
                    <i className={`bi bi-chat-dots text-2xl mb-2 block ${selectedReference === 'ai-chat' ? 'text-white' : 'text-indigo-600'}`}></i>
                    <span className="text-sm font-semibold block">AI Chat</span>
                    <span className="text-xs opacity-80 block mt-0.5">Chatbot Ideas</span>
                </button>

                <button
                    onClick={() => setSelectedReference(selectedReference === 'ai-image' ? null : 'ai-image')}
                    className={`p-4 rounded-xl text-left transition-all ${selectedReference === 'ai-image'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                >
                    <i className={`bi bi-image text-2xl mb-2 block ${selectedReference === 'ai-image' ? 'text-white' : 'text-purple-600'}`}></i>
                    <span className="text-sm font-semibold block">AI Image Gen</span>
                    <span className="text-xs opacity-80 block mt-0.5">Image Tools</span>
                </button>

                <button
                    onClick={() => setSelectedReference(selectedReference === 'ai-webapp' ? null : 'ai-webapp')}
                    className={`p-4 rounded-xl text-left transition-all ${selectedReference === 'ai-webapp'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                >
                    <i className={`bi bi-globe text-2xl mb-2 block ${selectedReference === 'ai-webapp' ? 'text-white' : 'text-blue-600'}`}></i>
                    <span className="text-sm font-semibold block">AI Web App</span>
                    <span className="text-xs opacity-80 block mt-0.5">Web Projects</span>
                </button>

                <button
                    onClick={() => setSelectedReference(selectedReference === 'ai-coding' ? null : 'ai-coding')}
                    className={`p-4 rounded-xl text-left transition-all ${selectedReference === 'ai-coding'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                >
                    <i className={`bi bi-code-slash text-2xl mb-2 block ${selectedReference === 'ai-coding' ? 'text-white' : 'text-green-600'}`}></i>
                    <span className="text-sm font-semibold block">AI Coding</span>
                    <span className="text-xs opacity-80 block mt-0.5">Dev Tools</span>
                </button>
            </div>

            {/* Content Display Area */}
            {selectedReference && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fade-in delay-200">
                    {selectedReference === 'ai-chat' && (
                        <div className="prose prose-sm max-w-none">
                            <div className="space-y-4 text-gray-700">
                                <p className="text-sm leading-relaxed">
                                    ในปี 2026 ตลาด AI Chatbot กำลังเปลี่ยนผ่านจากแค่ "บอทตอบคำถาม" (Q&A Bots) ไปสู่ "Agentic Chatbots" หรือบอทที่สามารถคิด วางแผน และลงมือทำแทนมนุษย์ได้
                                </p>

                                <p className="text-sm leading-relaxed">
                                    แม้จะมี ChatGPT หรือ Gemini แต่ "ความเฉพาะทาง" และ "ความน่าเชื่อถือ" ยังเป็นช่องว่างขนาดใหญ่ (Gaps) ที่ตลาดยังขาดแคลนอยู่
                                </p>

                                <div className="grid gap-4 mt-6">
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                                        <h4 className="font-semibold text-indigo-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-heart-pulse"></i>
                                            1. AI Chatbot เฉพาะทางด้านสุขภาพ
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            <strong>สิ่งที่ขาด:</strong> แชทบอทที่เชื่อมต่อกับฐานข้อมูลการแพทย์ที่ได้รับการรับรอง และสามารถคัดกรองอาการ (Triage) เบื้องต้นตามมาตรฐานการแพทย์ไทย
                                        </p>
                                        <p className="text-sm leading-relaxed text-indigo-600">
                                            <strong>ไอเดีย:</strong> "ผู้ช่วยพยาบาล AI" สำหรับคลินิกเฉพาะทางที่ช่วยเก็บประวัติและคัดกรองคนไข้ก่อนเจอหมอจริงๆ
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                                        <h4 className="font-semibold text-blue-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-mortarboard"></i>
                                            2. AI Chatbot ด้านการศึกษาแบบ "ติวเตอร์ส่วนตัว"
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            <strong>สิ่งที่ขาด:</strong> แชทบอทที่เข้าใจสไตล์การเรียนรู้ของเด็กแต่ละคน (Adaptive Learning)
                                        </p>
                                        <p className="text-sm leading-relaxed text-blue-600">
                                            <strong>ไอเดีย:</strong> แชทบอทเตรียมสอบเข้ามหาวิทยาลัย/สอบใบเซอร์ฯ ที่เน้นการ "ซักถาม" เพื่อเช็กความเข้าใจ มากกว่าการแค่บอกคำตอบ
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                        <h4 className="font-semibold text-purple-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-building"></i>
                                            3. AI Chatbot สำหรับงาน "Knowledge Management"
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            <strong>สิ่งที่ขาด:</strong> แชทบอทที่สามารถ "คุย" กับไฟล์เอกสารภายในบริษัทที่ซับซ้อนได้ (RAG)
                                        </p>
                                        <p className="text-sm leading-relaxed text-purple-600">
                                            <strong>ไอเดีย:</strong> ระบบ "สมองขององค์กร" ที่เชื่อมต่อกับ Slack/Teams และดึงข้อมูลจาก PDF, Google Drive มาตอบได้แม่นยำ
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-rose-50 to-red-50 p-4 rounded-xl border border-rose-100">
                                        <h4 className="font-semibold text-rose-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-heart"></i>
                                            4. AI Chatbot ด้าน "ความสัมพันธ์และจิตวิทยา"
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            <strong>สิ่งที่ขาด:</strong> แชทบอทที่เป็นตัวกลางหรือที่ปรึกษา (Mediator) ช่วยแนะนำวิธีพูดหรือวิธีสื่อสารเมื่อเกิดความขัดแย้ง
                                        </p>
                                        <p className="text-sm leading-relaxed text-rose-600">
                                            <strong>ไอเดีย:</strong> "Relationship Coach AI" ที่ช่วยวิเคราะห์แชทเพื่อบอกว่าอีกฝ่ายกำลังรู้สึกอย่างไร และควรตอบกลับอย่างไร
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                        <h4 className="font-semibold text-green-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-tree"></i>
                                            5. AI Chatbot สำหรับ "ความยั่งยืนและการเกษตร"
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            <strong>สิ่งที่ขาด:</strong> แชทบอทที่คำนวณ Carbon Footprint หรือช่วยเกษตรกรวิเคราะห์โรคพืชจากภาพถ่าย
                                        </p>
                                        <p className="text-sm leading-relaxed text-green-600">
                                            <strong>ไอเดีย:</strong> "Carbon Credit Consultant AI" สำหรับ SME ไทยที่อยากส่งออกสินค้าไปยุโรปและต้องผ่านเกณฑ์ด้านสิ่งแวดล้อม
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200 mt-4">
                                    <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                                        <i className="bi bi-lightbulb"></i>
                                        สรุปหัวใจสำคัญ
                                    </h4>
                                    <p className="text-sm leading-relaxed">
                                        อย่าทำ "General Chat" (คุยได้ทุกเรื่อง) แต่ให้ทำ <strong>"Deep Domain Chat"</strong> (คุยเรื่องเดียวแต่รู้ลึกที่สุด) และเน้นที่ <strong>ความถูกต้องของข้อมูล (Accuracy)</strong> กับ <strong>ความปลอดภัยของข้อมูล (Privacy)</strong>
                                    </p>
                                </div>

                                {/* เนื้อหาเพิ่มเติม: AI Chat ในบริบทไทย/SEA 2026 */}
                                <div className="border-t-2 border-rose-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-rose-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-chat-heart"></i>
                                        AI Chat ในบริบทไทย/SEA: ช่องว่างตลาด 2026
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-700 mb-4">
                                        ในปี 2026 ตลาด AI Chat (โดยเฉพาะ conversational AI / AI companion / specialized chatbot) เติบโตแรงมาก แต่ส่วนใหญ่ยังกระจุกอยู่ที่ general-purpose หรือ enterprise customer service ส่วน niche ที่เฉพาะเจาะจง ลึก ๆ และ localized ยังขาดแคลนจริง ๆ โดยเฉพาะในบริบทไทย/เอเชียตะวันออกเฉียงใต้
                                    </p>

                                    <div className="grid gap-4">
                                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
                                            <h4 className="font-semibold text-rose-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-heart-pulse"></i>
                                                1. AI Mental Health / Emotional Support Companion แบบ localized ไทย
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                คนไทย (โดยเฉพาะวัยทำงานและ Gen Z) เครียดสูงมากจากงาน ครอบครัว สังคม แต่ AI companion ส่วนใหญ่ยังเป็นแบบ western ที่ไม่เข้าใจบริบทไทย เช่น ความกดดันจากพ่อแม่ การเมือง การงาน toxic ความอายในการขอความช่วยเหลือ
                                            </p>
                                            <p className="text-sm leading-relaxed text-rose-600">
                                                <strong>ไอเดีย:</strong> Bot ที่พูดภาษาไทยลึกซึ้ง + เข้าใจวัฒนธรรม + มี coping strategy แบบไทย ๆ (เช่น แนะนำทำบุญ คุยกับเพื่อนแบบไม่ตัดสิน) และ escalate ไปหานักจิตวิทยาจริงเมื่อเสี่ยง
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                                            <h4 className="font-semibold text-blue-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-people"></i>
                                                2. AI สำหรับ Elderly / ผู้สูงอายุไทย (Companion + Health Reminder)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                ไทยกำลังเข้าสู่สังคมสูงวัยเร็ว คนสูงอายุจำนวนมากอยู่คนเดียว ใช้สมาร์ทโฟนเพิ่มขึ้น แต่ AI companion ส่วนใหญ่ยังไม่เหมาะ (เสียงไม่ชัด ภาษาไทยไม่เป็นธรรมชาติ ไม่เข้าใจคำพูดแบบผู้ใหญ่)
                                            </p>
                                            <p className="text-sm leading-relaxed text-blue-600">
                                                <strong>ไอเดีย:</strong> Bot ที่คุยแบบลูกหลาน ช่วยเตือนกินยา นัดหมอ เล่าเรื่องเก่า ๆ ตรวจอาการเบื้องต้นจากเสียง/ข้อความ + เชื่อมญาติเมื่อผิดปกติ
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                            <h4 className="font-semibold text-purple-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-book"></i>
                                                3. AI Tutor / Learning Companion สำหรับเด็กไทย + การศึกษาท้องถิ่น
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                ไม่ใช่แค่สอนวิชาการ แต่ช่วยติวแบบไทย ๆ (คณิต ม.ปลาย O-NET TGAT/TPAT) + สอนภาษาอังกฤษ accent ไทยไม่เสีย + ให้กำลังใจเด็กไทยที่เรียนหนักเครียด หรือ bot ที่ช่วยผู้ปกครองวางแผนการเรียนลูก (ราคาไม่แพง)
                                            </p>
                                            <p className="text-sm leading-relaxed text-purple-600">
                                                <strong>โอกาส:</strong> General tutor มีเยอะ แต่ specialized สำหรับหลักสูตรไทยยังน้อย
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                                            <h4 className="font-semibold text-amber-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-gavel"></i>
                                                4. AI Legal / กฎหมาย Advisor Chat สำหรับคนทั่วไป + SME ไทย
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                ถามกฎหมายง่าย ๆ เช่น สัญญาเช่า สิทธิแรงงาน หย่า/มรดก พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล PDPA การยื่นภาษี
                                            </p>
                                            <p className="text-sm leading-relaxed text-amber-600">
                                                <strong>ไอเดีย:</strong> Bot ที่อธิบายภาษาไทยง่าย ไม่ใช้ศัพท์กฎหมายเยอะ + เตือนเมื่อควรไปหาทนายจริง ทนายแพง คนทั่วไปกลัว ถาม Google ไม่ชัวร์ → ช่องว่างใหญ่
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                            <h4 className="font-semibold text-green-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-person-badge"></i>
                                                5. AI Freelancer / Business Coach สำหรับคนไทยรายได้ไม่แน่นอน
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                คุยแบบโค้ชส่วนตัว ช่วยวางแผนงาน ราคาเสนอ ลูกค้าต่างชาติ จัดการภาษี freelance + multi-currency ให้กำลังใจตอนงานหาย (mental support เบา ๆ)
                                            </p>
                                            <p className="text-sm leading-relaxed text-green-600">
                                                <strong>โอกาส:</strong> Freelancer ไทยเยอะมาก แต่ bot แบบนี้ยังแทบไม่มี localized
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                                            <h4 className="font-semibold text-teal-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-flower2"></i>
                                                6. AI สำหรับ Agri / ชาวสวนไทย (Farmer Chat Assistant)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                ถาม-ตอบแบบ voice ภาษาไทยถิ่น (ใต้ อีสาน เหนือ) ตรวจโรคพืชจากรูป/เสียง พยากรณ์ราคา ทุเรียน มังคุด ยาง กาแฟ + แนะนำขายที่ไหนดี
                                            </p>
                                            <p className="text-sm leading-relaxed text-teal-600">
                                                <strong>โอกาส:</strong> เกษตรกรเริ่มใช้มือถือเยอะ แต่ bot ที่เข้าใจภาษาถิ่น + ข้อมูลท้องถิ่นยังขาด
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                                            <h4 className="font-semibold text-pink-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-heart"></i>
                                                7. AI Dating / Relationship Coach แบบ realistic + วัฒนธรรมไทย
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                ไม่ใช่แค่หาคู่ (แบบ AI girlfriend/boyfriend) แต่ coach จริงจัง ช่วยวิเคราะห์แชทกับคนคุย ให้คำแนะนำแบบไม่ toxic + เข้าใจ dating culture ไทย (เช่น เรื่องเงิน ครอบครัว เขินอาย)
                                            </p>
                                            <p className="text-sm leading-relaxed text-pink-600">
                                                <strong>โอกาส:</strong> ตลาด companion เติบโตแรง แต่ส่วนใหญ่ over-sexualized หรือไม่ realistic
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-100">
                                            <h4 className="font-semibold text-cyan-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-universal-access"></i>
                                                8. AI สำหรับ People with Disabilities / Accessibility Chat
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                Bot สำหรับคนตาบอด/สายตาเลือน ที่อธิบายเว็บไทย UI PDF + ช่วย navigate แอปไทยต่าง ๆ ด้วย voice หรือ bot สำหรับคนหูหนวก ที่แปลงเสียงเป็น text + ภาษามือเบื้องต้น
                                            </p>
                                            <p className="text-sm leading-relaxed text-cyan-600">
                                                <strong>โอกาส:</strong> ยังแทบไม่มีในไทย
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200 mt-6">
                                        <h4 className="font-semibold text-rose-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-rocket-takeoff"></i>
                                            สรุป ถ้าจะทำ AI Chat ที่มีโอกาสแตกต่างและชนะตลาดเร็ว (2026)
                                        </h4>
                                        <ul className="text-sm text-gray-700 space-y-2">
                                            <li className="flex gap-2">
                                                <span className="text-rose-600">✓</span>
                                                <div>เน้น <strong>ภาษาไทยลึก + บริบทวัฒนธรรมไทย</strong> เป็น moat หลัก (general bot ทำไม่ได้ดี)</div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-rose-600">✓</span>
                                                <div>เริ่มจาก <strong>web/app ที่ voice-enabled</strong> (เพราะคนไทยชอบคุย voice เยอะ)</div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-rose-600">✓</span>
                                                <div>ผสม <strong>emotional intelligence + practical advice</strong> (ไม่ใช่แค่ตอบคำถาม)</div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-rose-600">✓</span>
                                                <div>อย่าทำ <strong>general ใหญ่</strong> ทำ <strong>niche แคบแต่ pain point เจ็บจริง</strong> ก่อน</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedReference === 'ai-webapp' && (
                        <div className="prose prose-sm max-w-none">
                            <div className="space-y-4 text-gray-700">
                                <p className="text-sm leading-relaxed">
                                    ในปี 2026 ตลาด AI ก้าวข้ามจุดที่เป็นแค่ "เครื่องมือตอบคำถาม" ไปสู่การเป็น "AI Agent" ที่ทำงานแทนมนุษย์ได้แบบจบกระบวนการ (Autonomous) อย่างไรก็ตาม ยังมีช่องว่างในตลาด (Market Gaps) ที่เว็บแอปทั่วไปยังทำได้ไม่ดีพอ หรือเป็น Niche Market ที่น่าสนใจดังนี้:
                                </p>

                                <div className="grid gap-4 mt-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                                        <h4 className="font-semibold text-blue-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-file-earmark-text"></i>
                                            1. AI สำหรับงานเฉพาะทางด้านกฎหมายและภาษี (Vertical AI for Legal & Tax)
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            แม้จะมี AI แปลภาษาหรือเขียนบทความเยอะแล้ว แต่ AI ที่เข้าใจ "ตัวบทกฎหมายและระเบียบภาษีของไทย" แบบ Deep Context ยังขาดแคลน
                                        </p>
                                        <p className="text-sm leading-relaxed text-blue-600">
                                            <strong>ไอเดีย:</strong> เว็บแอปที่ช่วย SME ตรวจสอบสัญญาจ้างงานหรือสัญญาซื้อขายตามกฎหมายไทยอัตโนมัติ พร้อมประเมินความเสี่ยงและแนะนำจุดที่ควรแก้ไข
                                        </p>
                                        <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                            <strong>ทำไมถึงรุ่ง:</strong> บริษัทเล็กๆ ไม่มีงบจ้างที่ปรึกษากฎหมายตลอดเวลา แต่ความเสี่ยงทางกฎหมายมีมูลค่าสูงมาก
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                        <h4 className="font-semibold text-purple-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-share"></i>
                                            2. AI ปรับจูน Content สำหรับแต่ละแพลตฟอร์ม (Cross-Platform Contextual Re-purposing)
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            การมี AI ช่วยเขียนบทความไม่ใช่เรื่องใหม่ แต่การมี AI ที่ "เข้าใจวัฒนธรรม" ของแต่ละแพลตฟอร์ม (เช่น ปรับโทนจาก LinkedIn ไปเป็น TikTok หรือ Threads) ยังหาที่เก่งจริงๆ ยาก
                                        </p>
                                        <p className="text-sm leading-relaxed text-purple-600">
                                            <strong>ไอเดีย:</strong> ระบบที่รับ URL บทความเดียว แล้ว "แตกหน่อ" เป็นสคริปต์วิดีโอสั้น, โพสต์สรุปใน Twitter, และกราฟิกใน Instagram ที่ออกแบบมาเพื่อ Algorithm ของแต่ละแอปโดยเฉพาะ
                                        </p>
                                        <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                            <strong>ทำไมถึงรุ่ง:</strong> Content Creator และแบรนด์ล้นตลาด แต่คนทำ Content ให้เหมาะสมกับทุกช่องทาง (Multi-platform) มีไม่พอ
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/content-repurpose')}
                                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
                                        >
                                            <i className="bi bi-box-arrow-up-right"></i>
                                            เปิดหน้าเครื่องมือ Cross-Platform
                                        </button>
                                    </div>

                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                                        <h4 className="font-semibold text-emerald-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-shield-check"></i>
                                            3. AI ตรวจสอบความถูกต้องและจริยธรรม (AI Fact-Checker & Compliance)
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            ในยุคที่ AI สร้าง Fake News ได้ง่าย ตลาดจึงต้องการ "ตัวตรวจสอบ"
                                        </p>
                                        <p className="text-sm leading-relaxed text-emerald-600">
                                            <strong>ไอเดีย:</strong> เว็บแอปที่ตรวจสอบความถูกต้องของข้อมูล (Fact-checking) ในเอกสารธุรกิจหรือรายงานวิจัย รวมถึงตรวจสอบว่าเนื้อหานั้นละเมิด PDPA หรือมี Bias หรือไม่
                                        </p>
                                        <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                            <strong>ทำไมถึงรุ่ง:</strong> องค์กรใหญ่กลัวเรื่องความเชื่อมั่น (Trust) และความผิดพลาดจาก AI (Hallucination) มากขึ้นเรื่อยๆ
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
                                        <h4 className="font-semibold text-rose-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-heart-pulse"></i>
                                            4. AI สำหรับการดูแลสุขภาพจิตเชิงรุก (Proactive Mental Health Companion)
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            แอป Mental Health ส่วนใหญ่ยังเป็นแบบ Passive (รอให้เราไปพิมพ์บอก) แต่ตลาดยังขาดแอปที่ "สังเกต" พฤติกรรมได้
                                        </p>
                                        <p className="text-sm leading-relaxed text-rose-600">
                                            <strong>ไอเดีย:</strong> เชื่อมต่อกับ Calendar หรือ Wearable เพื่อดูระดับความเครียดจากตารางงานที่แน่นเกินไป แล้วทักมาแนะนำเทคนิคการหายใจหรือเตือนให้พักก่อนจะ Burnout
                                        </p>
                                        <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                            <strong>ทำไมถึงรุ่ง:</strong> ปัญหาสุขภาพจิตพุ่งสูงขึ้น และผู้คนต้องการการดูแลที่เป็นส่วนตัว (Personalized) มากกว่าแค่บอทตอบคำถามทั่วไป
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-lime-50 p-4 rounded-xl border border-green-100">
                                        <h4 className="font-semibold text-green-700 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-flower2"></i>
                                            5. AI สำหรับการเกษตรแม่นยำในระดับครัวเรือน (Micro-Precision Farming)
                                        </h4>
                                        <p className="text-sm leading-relaxed mb-2">
                                            AI ในฟาร์มใหญ่นั้นมีเยอะแล้ว แต่สำหรับ "Smart Home Garden" หรือฟาร์มคนเมืองยังขาดแคลน
                                        </p>
                                        <p className="text-sm leading-relaxed text-green-600">
                                            <strong>ไอเดีย:</strong> เว็บแอปที่วิเคราะห์ภาพถ่ายพืชผักสวนครัวเพื่อระบุโรคและแมลง พร้อมคำนวณสูตรปุ๋ย/น้ำที่เหมาะสมกับสภาพอากาศในพื้นที่นั้นๆ จริงๆ
                                        </p>
                                        <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                            <strong>ทำไมถึงรุ่ง:</strong> เทรนด์ปลูกผักกินเองและเศรษฐกิจสีเขียว (Green Economy) กำลังมาแรงในกลุ่มคนรุ่นใหม่
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200 mt-4">
                                    <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                                        <i className="bi bi-lightbulb"></i>
                                        สรุปกลยุทธ์
                                    </h4>
                                    <p className="text-sm leading-relaxed">
                                        หัวใจสำคัญในปีนี้ไม่ใช่การสร้าง <strong>"AI ที่ทำได้ทุกอย่าง" (General AI)</strong> แต่คือการสร้าง <strong>"AI ที่เก่งเรื่องเดียวแต่เก่งจริง"</strong> และสามารถ<strong>เชื่อมต่อ (Integrate)</strong> เข้ากับชีวิตประจำวันหรือซอฟต์แวร์ที่ผู้ใช้ใช้อยู่แล้วได้
                                    </p>
                                </div>

                                {/* เนื้อหาเพิ่มเติม: ช่องว่างตลาด AI ในไทยและ SEA 2025-2026 */}
                                <div className="border-t-2 border-blue-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-blue-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-geo-alt"></i>
                                        ช่องว่างตลาด AI Web App ในไทยและ SEA (2025–2026)
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-700 mb-4">
                                        ในปี 2025–2026 ตลาด AI web app ยังมีช่องว่าง (underserved / high demand แต่ supply ยังน้อย) หลายจุด โดยเฉพาะ niche ที่เฉพาะเจาะจงมาก ๆ หรือปรับให้เข้ากับบริบทท้องถิ่น/อุตสาหกรรมที่ยังไม่饱และ (โดยเฉพาะในไทยและภูมิภาค SEA ที่ AI adoption ยังไม่เท่าตะวันตก)
                                    </p>

                                    <div className="grid gap-4">
                                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                                            <h4 className="font-semibold text-indigo-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-briefcase"></i>
                                                1. AI สำหรับ SMEs ไทยโดยเฉพาะ (Niche Vertical SaaS)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ตัวอย่าง:</strong> AI ที่ช่วยจัดการบัญชี+ภาษี+ยื่นภาษีอิเล็กทรอนิกส์อัตโนมัติ (รองรับเอกสารภาษีไทย, e-Tax, RD, VAT 7%) หรือ AI ช่วยวางแผนสต็อก + พยากรณ์ยอดขาย สำหรับร้านค้าปลีก/โรงงานขนาดเล็ก–กลาง (ที่ยังใช้ Excel อยู่)
                                            </p>
                                            <p className="text-sm leading-relaxed text-indigo-600">
                                                <strong>โอกาส:</strong> ตลาดใหญ่แต่ generic tool ยังไม่ fit ดีพอ SMEs ไทยส่วนใหญ่ยังกลัว/ไม่รู้จะใช้ยังไง
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
                                            <h4 className="font-semibold text-rose-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-heart-pulse"></i>
                                                2. AI Mental Health / Wellness Companion สำหรับคนเอเชีย/คนไทย
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> เวอร์ชันที่เข้าใจวัฒนธรรม ความกดดันแบบไทย (ครอบครัว, การงาน toxic, เกณฑ์ทหาร, ความคาดหวังสังคม) มี mood tracking + แนะนำ coping แบบไม่ western เกิน + เชื่อมต่อ therapist จริงเมื่อจำเป็น
                                            </p>
                                            <p className="text-sm leading-relaxed text-rose-600">
                                                <strong>โอกาส:</strong> Demand สูงมาก (คนไทยเครียดสูง) แต่ app ที่ localized ดี ๆ ยังน้อย
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                            <h4 className="font-semibold text-green-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-currency-dollar"></i>
                                                3. AI Personal Finance Coach สำหรับ freelancer / digital nomad / รายได้ไม่แน่นอน
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>เน้น:</strong> multi-currency, ภาษี跨境, irregular income forecasting, พฤติกรรมการใช้เงิน (behavioral coaching) ในไทยมี freelancer เยอะมาก แต่ tool ส่วนใหญ่ยังไม่ครอบคลุมชีวิตจริงของคนกลุ่มนี้
                                            </p>
                                            <p className="text-sm leading-relaxed text-green-600">
                                                <strong>โอกาส:</strong> ตลาด freelancer ในไทยโตเร็ว แต่ยังไม่มี tool ที่เข้าใจรายได้ไม่ประจำ
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                                            <h4 className="font-semibold text-teal-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-flower2"></i>
                                                4. AI สำหรับการเกษตรขนาดเล็ก + ชุมชน (AgriTech niche)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> พยากรณ์ราคาพืชผล + แนะนำปลูก/ขาย + ตรวจโรคพืชจากภาพ (เฉพาะพืชไทย เช่น ทุเรียน มังคุด ยาง) เชื่อมตลาดกลางให้ชาวสวนโดยตรง ลดพ่อค้าคนกลาง
                                            </p>
                                            <p className="text-sm leading-relaxed text-teal-600">
                                                <strong>โอกาส:</strong> ไทยเป็นประเทศเกษตร แต่ AI ในส่วนนี้ยังกระจุกอยู่ big farm ไม่ค่อยลงถึงเกษตรกรรายย่อย
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                                            <h4 className="font-semibold text-purple-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-file-earmark-text"></i>
                                                5. AI Legal / Contract Assistant สำหรับ SME + freelancer ไทย
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> อ่าน+สรุปสัญญาไทย-อังกฤษ, ตรวจ clause เสี่ยง, generate สัญญาง่าย ๆ (งานรับจ้าง, NDA, พันธมิตร) รองรับกฎหมายไทย (ลิขสิทธิ์, พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล)
                                            </p>
                                            <p className="text-sm leading-relaxed text-purple-600">
                                                <strong>โอกาส:</strong> ทนายแพงมาก SME ต้องการ tool ราคาถูกแต่แม่นยำ
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                                            <h4 className="font-semibold text-orange-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-search"></i>
                                                6. AI Content + SEO Optimizer สำหรับภาษาไทย + GEO (Generative Engine Optimization)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> ไม่ใช่แค่เขียน content แต่ optimize ให้ติด AI Overview / ChatGPT Search / Perplexity ในภาษาไทย ปี 2026 คนค้นข้อมูลผ่าน AI มากกว่า Google แล้ว แต่ tool สำหรับภาษาไทยยังขาดแคลนมาก
                                            </p>
                                            <p className="text-sm leading-relaxed text-orange-600">
                                                <strong>โอกาส:</strong> SEO แบบเดิมกำลังตาย ต้องปรับตัวสู่ GEO
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-4 rounded-xl border border-cyan-100">
                                            <h4 className="font-semibold text-cyan-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-universal-access"></i>
                                                7. AI Accessibility Tool สำหรับผู้พิการ (โดยเฉพาะคนตาบอด/สายตาเลือนราง)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> อธิบายภาพในเว็บ + PDF + UI ไทยอัตโนมัติ, ช่วย navigate เว็บไทยต่าง ๆ
                                            </p>
                                            <p className="text-sm leading-relaxed text-cyan-600">
                                                <strong>โอกาส:</strong> ยังแทบไม่มี tool ที่ localized ดีพอในไทย + มีกฎหมายบังคับใช้ accessibility
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
                                            <h4 className="font-semibold text-violet-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-kanban"></i>
                                                8. AI สำหรับการวางแผนโครงการ/ธุรกิจขนาดเล็ก (AI Planner)
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> วางแผนโครงการทั้งหมด (timeline, budget, resource) จากแค่บรรยายสั้น ๆ เหมาะกับ startup ไทย / ฟรีแลนซ์ทีมเล็ก ที่ไม่มี PM เต็มตัว
                                            </p>
                                            <p className="text-sm leading-relaxed text-violet-600">
                                                <strong>โอกาส:</strong> คนไทยอยากทำธุรกิจเยอะ แต่ไม่รู้จะเริ่มวางแผนยังไง
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 mt-6">
                                        <h4 className="font-semibold text-blue-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-rocket-takeoff"></i>
                                            สรุปสั้น ๆ ถ้าจะทำเร็วและมีโอกาสชนะตลาดเร็วที่สุด (2026)
                                        </h4>
                                        <ul className="text-sm text-gray-700 space-y-2">
                                            <li className="flex gap-2">
                                                <span className="text-blue-600">✓</span>
                                                <div>เลือก niche ที่แคบแต่<strong>痛จุดมาก</strong> (pain point ชัด)</div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-blue-600">✓</span>
                                                <div>เน้น<strong>ภาษาไทย + บริบทไทย</strong> เป็นจุดต่าง (localization คือ moat ที่แข็งที่สุดตอนนี้)</div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-blue-600">✓</span>
                                                <div>เริ่มจาก <strong>web app ก่อน</strong> (deploy ง่าย iterate เร็ว) แล้วค่อยขยายไป mobile ถ้าดัง</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* เนื้อหาเพิ่มเติม: AI Web App ที่ตลาดไทยต้องการ */}
                                <div className="border-t-2 border-teal-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-teal-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-chat-square-text"></i>
                                        AI Web App ที่ตลาดไทยยังต้องการสูงแต่มีน้อยหรือขาดแคลน
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-700 mb-4">
                                        AI web app ที่ตลาดไทยยังต้องการสูงแต่มีน้อยหรือขาดแคลน มักอยู่ใน niche ที่เน้นภาษาไทย SMEs และธุรกิจท้องถิ่น จากแนวโน้มปี 2026 การนำ AI ไปใช้จริงในไทยยังต่ำ (18-24%) ทำให้มีโอกาสใหญ่ในเครื่องมือที่แก้ pain points อย่าง latency, Thai slang และ data privacy
                                    </p>

                                    <div className="grid gap-4">
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                            <h4 className="font-semibold text-green-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-chat-dots-fill"></i>
                                                1. AI LINE Chatbot Builder
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> SaaS สำหรับ SMEs สร้าง chatbot LINE OA อัตโนมัติ จัดการ order, personalize ตามพฤติกรรม โดยเข้าใจ slang ไทยและ chat commerce (ยังขาดเพราะ AI ตะวันตกไม่เก่งไทย) ผสาน AI agent ทำ autonomous actions เช่น ส่งโปรโมชั่น real-time จาก social listening
                                            </p>
                                            <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                                <strong>ตลาดต้องการเพราะ:</strong> 40% SMEs ใช้ AI แล้ว แต่ขาด tool ง่ายๆ ราคาถูกสำหรับ non-tech
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                                            <h4 className="font-semibold text-pink-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-graph-up-arrow"></i>
                                                2. Thai Social Listening Tool
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> Web app วิเคราะห์ trend จาก Twitter/X, TikTok ในภาษาไทยแบบ real-time คาดการณ์ crisis/viral ก่อนเกิด สำหรับ brand/marketing พร้อม generate content อัตโนมัติด้วย gen AI ที่ train บน data ไทย (gap ใหญ่เพราะ data Thai น้อยใน model ทั่วไป)
                                            </p>
                                            <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                                <strong>เหมาะธุรกิจไทยที่:</strong> crisis ระเบิดเร็ว; ยังมีน้อยเพราะขาด custom Thai NLP
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-4 rounded-xl border border-cyan-100">
                                            <h4 className="font-semibold text-cyan-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-phone"></i>
                                                3. On-Device AI Dashboard สำหรับ SMEs
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> Platform no-cloud สำหรับ forecasting สินค้า, supply chain ในอุตสาหกรรมท่องเที่ยว/ค้าปลีก ลด latency/privacy issue (critical ในไทย rural areas) รองรับ Thai data/input โดย local model; integrate กับ booking system อย่างร้านอาหาร
                                            </p>
                                            <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                                <strong>Demand สูงจาก:</strong> SMEs 95% ของเศรษฐกิจไทย แต่ cloud แพง/ช้า
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
                                            <h4 className="font-semibold text-violet-700 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-cash-coin"></i>
                                                4. Agentic AI สำหรับ Finance/HR
                                            </h4>
                                            <p className="text-sm leading-relaxed mb-2">
                                                <strong>ไอเดีย:</strong> Web app AI agent อัตโนมัติ invoice, payroll, compliance สำหรับ SMEs (adoption ต่ำเพราะ cost/latency) พร้อม custom Thai language รองรับ e-KYC/NDID
                                            </p>
                                            <p className="text-xs leading-relaxed text-gray-600 mt-2 italic">
                                                <strong>โอกาสเพราะ:</strong> Gartner คาด automate 15% work โดย 2028 แต่ไทยขาด infrastructure
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200 mt-6">
                                        <h4 className="font-semibold text-amber-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-lightbulb"></i>
                                            ไอเดียเหล่านี้ match ความสนใจใน chatbot SaaS และ booking system ภาษาไทย
                                        </h4>
                                        <p className="text-sm leading-relaxed text-gray-700">
                                            ลองเริ่มจาก MVP ด้วย Hugging Face API หรือ local Thai NLP models เพื่อทดสอบ product-market fit ก่อน โดยเน้นที่ <strong>pain points ที่ชัดเจน</strong> และ <strong>ภาษาไทยที่เป็นธรรมชาติ</strong> เป็นจุดแข็งหลัก
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedReference === 'ai-image' && (
                        <div className="prose prose-sm max-w-none">
                            <div className="space-y-4 text-gray-700">
                                <p className="text-sm leading-relaxed">
                                    หากคุณกำลังมองหาโมเดลสำหรับพัฒนา Web App เพื่อสร้างภาพ (Text-to-Image) ในปี 2026 มีตัวเลือกที่น่าสนใจทั้งแบบ "รันบนเครื่องตัวเอง (Self-hosted)" และแบบ "เรียกใช้ผ่าน API"
                                </p>

                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 mt-4">
                                    <h4 className="font-semibold text-indigo-800 text-sm mb-3 flex items-center gap-2">
                                        <i className="bi bi-stars"></i>
                                        1. โมเดลยอดนิยมที่ใช้ได้ฟรี (Open Weights)
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-3">โมเดลเหล่านี้คุณสามารถดาวน์โหลดมาใช้ได้ฟรี แต่ต้องมีทรัพยากรเครื่อง (GPU) ที่เพียงพอ</p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs border-collapse">
                                            <thead>
                                                <tr className="bg-white/50">
                                                    <th className="text-left p-2 border border-indigo-200">โมเดล</th>
                                                    <th className="text-left p-2 border border-indigo-200">จุดเด่น</th>
                                                    <th className="text-left p-2 border border-indigo-200">การนำไปใช้</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="p-2 border border-indigo-200 font-semibold text-indigo-700">FLUX.1 [schnell]</td>
                                                    <td className="p-2 border border-indigo-200">เร็วมาก คุณภาพสูงมาก (ระดับต้นๆ ของปี 2026)</td>
                                                    <td className="p-2 border border-indigo-200">ใช้ไลบรารี <code className="bg-white px-1 rounded">diffusers</code> ของ Python รันบน Server ตัวเอง</td>
                                                </tr>
                                                <tr className="bg-white/30">
                                                    <td className="p-2 border border-indigo-200 font-semibold text-purple-700">Stable Diffusion XL (SDXL)</td>
                                                    <td className="p-2 border border-indigo-200">มาตรฐานหลัก ปรับแต่ง (Fine-tune) ได้ง่าย</td>
                                                    <td className="p-2 border border-indigo-200">รันผ่าน Python หรือใช้ร่วมกับ ComfyUI/Automatic1111</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 border border-indigo-200 font-semibold text-blue-700">Stable Diffusion 3.5</td>
                                                    <td className="p-2 border border-indigo-200">เข้าใจ Prompt ซับซ้อนได้ดีขึ้นมาก</td>
                                                    <td className="p-2 border border-indigo-200">มีรุ่นเล็กที่กินสเปกน้อยลง เหมาะกับ Web App ขนาดกลาง</td>
                                                </tr>
                                                <tr className="bg-white/30">
                                                    <td className="p-2 border border-indigo-200 font-semibold text-pink-700">GLM-Image</td>
                                                    <td className="p-2 border border-indigo-200">เก่งเรื่องการสร้าง "ตัวอักษร" ในภาพได้แม่นยำ</td>
                                                    <td className="p-2 border border-indigo-200">เหมาะกับแอปทำโปสเตอร์หรือกราฟิกที่มีข้อความ</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 mt-4">
                                    <h4 className="font-semibold text-blue-800 text-sm mb-3 flex items-center gap-2">
                                        <i className="bi bi-gear-wide-connected"></i>
                                        2. วิธีนำมาใช้งานใน Web App
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-3">การนำโมเดลเหล่านี้มาลงใน Web App ทำได้ 2 แนวทางหลัก:</p>

                                    <div className="space-y-3">
                                        <div className="bg-white p-3 rounded-lg border border-blue-200">
                                            <p className="font-semibold text-blue-700 text-sm mb-2">✓ แบบที่ 1: ใช้ API (ง่ายที่สุด)</p>
                                            <p className="text-xs text-gray-600 mb-2">หากคุณไม่อยากตั้ง Server เอง มีบริการที่มี Free Tier ให้ทดลองใช้:</p>
                                            <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                <li><strong>Puter.js:</strong> เรียกใช้โมเดล Stable Diffusion ฟรีผ่าน JavaScript</li>
                                                <li><strong>Hugging Face Inference API:</strong> ใช้โมเดล Open Source ฟรี (มีโควต้าจำกัด)</li>
                                                <li><strong>Pollinations.ai:</strong> API ฟรีแบบ Unfiltered เรียกใช้ง่ายผ่าน URL</li>
                                            </ul>
                                        </div>

                                        <div className="bg-white p-3 rounded-lg border border-blue-200">
                                            <p className="font-semibold text-blue-700 text-sm mb-2">✓ แบบที่ 2: รันเองด้วย Python Backend (ยืดหยุ่นที่สุด)</p>
                                            <p className="text-xs text-gray-600 mb-2">เหมาะสำหรับผู้ที่ต้องการควบคุมทุกอย่าง:</p>
                                            <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                <li><strong>Backend:</strong> FastAPI/Flask + <code className="bg-gray-100 px-1 rounded">diffusers</code> (Hugging Face)</li>
                                                <li><strong>Frontend:</strong> React, Vue หรือ HTML/JS ธรรมดา</li>
                                                <li><strong>Infrastructure:</strong> Google Colab (ฟรีระดับหนึ่ง) หรือเช่า GPU จาก RunPod/Lambda Labs</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 mt-4">
                                    <h4 className="font-semibold text-green-800 text-sm mb-3 flex items-center gap-2">
                                        <i className="bi bi-code-square"></i>
                                        3. ตัวอย่าง Code เบื้องต้น (เรียกใช้ผ่าน API ฟรี)
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-2">ลองใช้ <strong>Puter.js</strong> สร้าง Web App แบบง่ายๆ แทบไม่ต้องเขียน Backend เลย:</p>

                                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                                        <div className="text-gray-400 mb-1">{'<!-- HTML -->'}</div>
                                        <pre className="font-mono">{'<script src="https://js.puter.com/v2/"></script>\n\n<script>\n  async function generateImage() {\n    const prompt = "A futuristic city with flying cars, neon lights, 4k";\n    \n    // เรียกใช้โมเดลผ่าน Puter.js ฟรี\n    const imageElement = await puter.ai.txt2img(prompt);\n    document.body.appendChild(imageElement);\n  }\n</script>'}</pre>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200 mt-4">
                                    <h4 className="font-semibold text-amber-800 text-sm mb-3 flex items-center gap-2">
                                        <i className="bi bi-exclamation-triangle"></i>
                                        ข้อควรระวัง
                                    </h4>
                                    <ul className="text-xs text-gray-700 space-y-2">
                                        <li className="flex gap-2">
                                            <span className="text-amber-600">⚠</span>
                                            <div>
                                                <strong>License:</strong> โมเดลบางตัว (เช่น FLUX.1 [dev]) อาจฟรีสำหรับการวิจัย แต่ถ้าจะทำเพื่อการค้า (Commercial) อาจต้องเสียค่าธรรมเนียมหรือเปลี่ยนไปใช้รุ่น [schnell] แทน
                                            </div>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-amber-600">⚠</span>
                                            <div>
                                                <strong>Hardware:</strong> หากจะรันเอง โมเดลสมัยนี้มักต้องการ VRAM (การ์ดจอ) อย่างน้อย 8GB - 16GB ขึ้นไปเพื่อให้ทำงานได้ลื่นไหล
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200 mt-4 text-center">
                                    <p className="text-xs text-purple-700">
                                        <i className="bi bi-chat-dots mr-1"></i>
                                        <strong>คำแนะนำ:</strong> คุณสนใจจะพัฒนาด้วยภาษาอะไรเป็นหลัก? จะได้แนะนำ Library หรือชุดคำสั่งที่ตรงกับภาษานั้นๆ ให้มากขึ้น
                                    </p>
                                </div>

                                {/* เนื้อหาเพิ่มเติม */}
                                <div className="border-t-2 border-indigo-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-info-circle"></i>
                                        ข้อมูลเพิ่มเติม: วิธีการใช้งานโมเดลและบริการต่างๆ
                                    </h3>

                                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-100 mb-4">
                                        <h4 className="font-semibold text-cyan-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-cloud-check"></i>
                                            1) โมเดล/บริการที่ใช้ฟรี (พร้อมทดลองหรือฟรีแผนเริ่มต้น)
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="bg-white/70 p-3 rounded-lg">
                                                <p className="text-xs font-semibold text-cyan-700 mb-2">✓ ข้อดี: ไม่ต้องตั้งระบบโมเดลเอง</p>
                                                <p className="text-xs font-semibold text-orange-600 mb-3">✗ ข้อจำกัด: อาจมีโควตา/ขีดจำกัดตอนใช้ฟรี</p>

                                                <p className="text-xs font-bold text-gray-700 mb-2">บริการเว็บและ API ฟรี:</p>
                                                <ul className="text-xs text-gray-700 space-y-2 ml-4">
                                                    <li className="flex gap-2">
                                                        <span className="text-cyan-600">•</span>
                                                        <div>
                                                            <strong>PixelDojo API</strong> – API สำหรับสร้างภาพ (มีแผนฟรีสำหรับทดสอบ) สมัครและใช้คีย์ API เพื่อเรียกจากเว็บแอปได้
                                                        </div>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-cyan-600">•</span>
                                                        <div>
                                                            <strong>Pollo AI</strong> – แพลตฟอร์มที่เปิดให้ทดลองโมเดลต่างๆ เช่น Imagen, Wan AI, Qwen-Image
                                                        </div>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-cyan-600">•</span>
                                                        <div>
                                                            <strong>DuckDuckGo AI Image Generator</strong> – บริการฟรีผ่านเว็บที่ใช้ได้ทันทีและดาวน์โหลดภาพได้ในระดับหนึ่ง
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100 mb-4">
                                        <h4 className="font-semibold text-violet-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-download"></i>
                                            2) โมเดล Open Source ที่ดึงมาใช้เอง
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="bg-white/70 p-3 rounded-lg">
                                                <p className="text-xs font-semibold text-violet-700 mb-2">✓ ข้อดี: ควบคุมได้เต็มที่ ใช้ได้ตามต้องการ</p>
                                                <p className="text-xs font-semibold text-orange-600 mb-3">✗ ข้อจำกัด: ต้องมีโครงสร้าง backend/เซิร์ฟเวอร์ที่รองรับ GPU</p>

                                                <ul className="text-xs text-gray-700 space-y-2 ml-4">
                                                    <li className="flex gap-2">
                                                        <span className="text-violet-600">•</span>
                                                        <div>
                                                            <strong>Stable Diffusion และรุ่นที่เกี่ยวข้อง</strong> – โมเดล diffusion แบบ open-source ที่ได้รับความนิยมสูงสุด (SD v1.5, XL)
                                                        </div>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-violet-600">•</span>
                                                        <div>
                                                            <strong>โมเดลอื่นบน Hugging Face</strong> – Qwen-Image, Z-Image, FLUX.1 และอื่นๆ ที่เปิดให้ใช้ฟรี
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100 mb-4">
                                        <h4 className="font-semibold text-teal-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-diagram-3"></i>
                                            วิธีนำมาใช้ (Implementation Methods)
                                        </h4>

                                        <div className="space-y-3">
                                            <div className="bg-white p-3 rounded-lg border border-teal-200">
                                                <p className="font-semibold text-teal-700 text-sm mb-2">(ก) รันโมเดลด้วยเซิร์ฟเวอร์ของคุณเอง</p>
                                                <ol className="text-xs text-gray-700 space-y-1 ml-5 list-decimal">
                                                    <li>ติดตั้งโมเดลและ framework (เช่น diffusers หรือ Stable Diffusion WebUI) บนเซิร์ฟเวอร์ที่มี GPU</li>
                                                    <li>ตั้ง API endpoint (เช่น Flask / FastAPI) ที่รับคำสั่ง prompt จากเว็บและคืนภาพ</li>
                                                    <li>เว็บ UI ส่งคำขอไปที่ API และโหลดภาพมาแสดง</li>
                                                </ol>

                                                <div className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                                                    <p className="text-teal-400 mb-1">Example Flow:</p>
                                                    <p className="font-mono text-[10px]">Web Frontend (JS) → ส่ง prompt → Backend API (Python + diffusers) → สร้างภาพ → ส่งกลับ URL → แสดงผล</p>
                                                </div>

                                                <p className="text-xs text-gray-600 italic mt-2">
                                                    💡 นี่เป็นวิธีที่นักพัฒนาโปรดใช้เมื่ออยากควบคุมงานเองทั้งหมด แต่ต้องมีพื้นฐานโค้ดและเซิร์ฟเวอร์ GPU
                                                </p>
                                            </div>

                                            <div className="bg-white p-3 rounded-lg border border-teal-200">
                                                <p className="font-semibold text-teal-700 text-sm mb-2">(ข) ใช้โครงสร้าง UI ฟรี</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li><strong>ComfyUI / Fooocus</strong> – โปรเจ็กต์ open-source ที่ให้ UI และ workflow สำหรับเรียกโมเดล diffusion แทนการโค้ดเอง</li>
                                                </ul>
                                                <p className="text-xs text-orange-600 mt-2">
                                                    ⚠ หมายเหตุ: ซอฟต์แวร์และโมเดลเป็น open source แต่คุณต้องเสียค่าโฮสต์เซิร์ฟเวอร์/การ์ดจอ
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-4 rounded-xl border border-sky-100 mb-4">
                                        <h4 className="font-semibold text-sky-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-cloud-upload"></i>
                                            3) ใช้บริการ Cloud / API ที่มีแผนฟรี
                                        </h4>
                                        <p className="text-xs text-gray-600 mb-2">ถ้าไม่อยากเซ็ต infrastructure เอง:</p>
                                        <ul className="text-xs text-gray-700 space-y-2 ml-4 list-disc">
                                            <li><strong>Hugging Face</strong> หรือ <strong>Replicate</strong> – มี API ให้ใช้ฟรีในระดับจำกัด</li>
                                            <li><strong>StabilityAI (DreamStudio API)</strong> – มีเครดิตฟรีบ้างในบางเดือน</li>
                                        </ul>
                                        <p className="text-xs text-gray-600 italic mt-2">
                                            💡 วิธีนี้เหมาะถ้าอยากเริ่มเร็วโดยไม่ต้องจัดการโมเดลเอง
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                                        <h4 className="font-semibold text-amber-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-lightbulb-fill"></i>
                                            คำแนะนำสำหรับแอปของคุณ
                                        </h4>
                                        <ul className="text-xs text-gray-700 space-y-3">
                                            <li className="flex gap-2">
                                                <span className="text-amber-600 font-bold">→</span>
                                                <div>
                                                    <strong className="text-amber-700">Prototype/ทดสอบ:</strong> ใช้บริการพร้อม API ฟรี เช่น PixelDojo หรือทดลองโมเดลบนเว็บแล้วผสานผลลัพธ์เข้ากับ front-end
                                                </div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-amber-600 font-bold">→</span>
                                                <div>
                                                    <strong className="text-amber-700">Production ที่ควบคุมได้:</strong> ติดตั้งโฮสต์โมเดล open-source (เช่น Stable Diffusion) บน backend ของคุณเอง แล้วเรียกผ่าน API
                                                </div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-amber-600 font-bold">→</span>
                                                <div>
                                                    <strong className="text-amber-700">จัดการทรัพยากร:</strong> โมเดล generative ต้อง GPU แรง หากรันเอง แนะนำใช้ cloud GPU เช่น AWS, GCP หรือโครงสร้างคลัสเตอร์เพื่อ scale ในอนาคต
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 text-center">
                                        <h4 className="font-semibold text-emerald-800 text-sm mb-2">📝 สรุปสั้น</h4>
                                        <ul className="text-xs text-gray-700 space-y-1.5 text-left max-w-2xl mx-auto">
                                            <li className="flex gap-2">
                                                <span className="text-emerald-600">✓</span>
                                                <span>มี <strong>บริการ/โมเดลฟรี</strong> ที่ใช้ทดลองได้ทันที สำหรับเว็บแอป (ต้องสมัคร API)</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-emerald-600">✓</span>
                                                <span>มี <strong>โมเดล open-source</strong> ที่นำมา integrate เข้ากับ backend ได้ แต่ต้องจัดการเซิร์ฟเวอร์เอง</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-emerald-600">✓</span>
                                                <span>การเลือกวิธีขึ้นกับ <strong>งบประมาณ ทรัพยากร</strong> และ <strong>เป้าหมายเชิงธุรกิจ</strong> ของเว็บแอป</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* เนื้อหาเพิ่มเติม ส่วนที่ 3 */}
                                <div className="border-t-2 border-purple-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-purple-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-stars"></i>
                                        โมเดลยอดนิยมสำหรับ Web App
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Stable Diffusion */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                                            <h4 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-1-circle-fill"></i>
                                                Stable Diffusion (Stability AI)
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คุณสมบัติ:</strong> โมเดลที่ได้รับความนิยมสูง สามารถสร้างภาพจากข้อความ (text-to-image) ได้อย่างมีคุณภาพ
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-blue-700 mb-1">การใช้งาน:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li>ใช้งานผ่าน <strong>Hugging Face</strong> (มีเวอร์ชันฟรี) เช่น Stable Diffusion 2.1</li>
                                                    <li>ใช้งานผ่าน <strong>Stability AI API</strong> (มีโควต้าใช้งานฟรี)</li>
                                                    <li>สามารถติดตั้งและรันบนเครื่องของคุณเอง (ต้องมี GPU ที่รองรับ)</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-orange-600">
                                                <strong>ข้อจำกัด:</strong> ต้องมีความรู้พื้นฐานในการติดตั้งและใช้งาน Python, Docker, หรือใช้งานผ่าน API
                                            </p>
                                        </div>

                                        {/* DALL·E Mini */}
                                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                                            <h4 className="font-semibold text-pink-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-2-circle-fill"></i>
                                                DALL·E Mini (Craiyon)
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คุณสมบัติ:</strong> โมเดลที่พัฒนาโดยผู้ใช้งานทั่วไป สามารถสร้างภาพจากข้อความได้
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-pink-700 mb-1">การใช้งาน:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li>ใช้งานผ่านเว็บไซต์ <strong>Craiyon</strong> (ฟรี)</li>
                                                    <li>มี API สำหรับนักพัฒนา (อาจมีข้อจำกัดในการใช้งาน)</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-orange-600">
                                                <strong>ข้อจำกัด:</strong> คุณภาพภาพอาจไม่สูงเท่า Stable Diffusion
                                            </p>
                                        </div>

                                        {/* Leonardo.AI */}
                                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
                                            <h4 className="font-semibold text-violet-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-3-circle-fill"></i>
                                                Leonardo.AI
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คุณสมบัติ:</strong> แพลตฟอร์มสร้างภาพด้วย AI ที่มีคุณภาพสูงและมีฟีเจอร์มากมาย
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-violet-700 mb-1">การใช้งาน:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li>ใช้งานผ่านเว็บไซต์ <strong>Leonardo.AI</strong> (มีแผนฟรี)</li>
                                                    <li>สามารถใช้งานผ่าน API (อาจมีข้อจำกัดในแผนฟรี)</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-orange-600">
                                                <strong>ข้อจำกัด:</strong> แผนฟรีมีโควต้าในการสร้างภาพต่อวัน
                                            </p>
                                        </div>

                                        {/* MidJourney */}
                                        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-4 rounded-xl border border-cyan-100">
                                            <h4 className="font-semibold text-cyan-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-4-circle-fill"></i>
                                                MidJourney
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คุณสมบัติ:</strong> โมเดลที่ได้รับความนิยมสูงในการสร้างภาพคุณภาพสูง
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-cyan-700 mb-1">การใช้งาน:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li>ใช้งานผ่าน <strong>Discord</strong> (มีแผนฟรี)</li>
                                                    <li>ไม่มี API สำหรับนักพัฒนาโดยตรง</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-orange-600">
                                                <strong>ข้อจำกัด:</strong> แผนฟรีมีโควต้าในการสร้างภาพต่อวัน
                                            </p>
                                        </div>

                                        {/* Hugging Face Diffusers */}
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                                            <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-5-circle-fill"></i>
                                                Hugging Face Diffusers
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คุณสมบัติ:</strong> ไลบรารีที่รวมโมเดลสร้างภาพหลายตัว เช่น Stable Diffusion, Kandinsky, และอื่นๆ
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-amber-700 mb-1">การใช้งาน:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li>ใช้งานผ่าน <strong>Hugging Face Hub</strong> (มีโมเดลฟรีมากมาย)</li>
                                                    <li>สามารถรันบนเครื่องของคุณเองหรือใช้งานผ่าน API</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-orange-600">
                                                <strong>ข้อจำกัด:</strong> ต้องมีความรู้พื้นฐานในการใช้งาน Python และการติดตั้งไลบรารี
                                            </p>
                                        </div>
                                    </div>

                                    {/* วิธีการนำไปใช้ใน Web App */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 mt-4">
                                        <h4 className="font-semibold text-green-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-box-arrow-in-right"></i>
                                            วิธีการนำไปใช้ใน Web App
                                        </h4>
                                        <ul className="text-xs text-gray-700 space-y-2">
                                            <li className="flex gap-2">
                                                <span className="text-green-600 font-bold">1.</span>
                                                <div>
                                                    <strong>ใช้งานผ่าน API:</strong> เชื่อมต่อกับ API ของโมเดล เช่น Stability AI API, Hugging Face API
                                                </div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-green-600 font-bold">2.</span>
                                                <div>
                                                    <strong>รันบนเซิร์ฟเวอร์ของคุณเอง:</strong> ติดตั้งโมเดลบนเซิร์ฟเวอร์ของคุณ (ต้องมี GPU ที่รองรับ)
                                                </div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-green-600 font-bold">3.</span>
                                                <div>
                                                    <strong>ใช้งานผ่านเว็บไซต์:</strong> เชื่อมต่อกับเว็บไซต์ที่มี API สำหรับนักพัฒนา เช่น Craiyon, Leonardo.AI
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* ตัวอย่างโค้ด */}
                                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-xl border border-slate-200 mt-4">
                                        <h4 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-code-slash"></i>
                                            ตัวอย่างการใช้งาน Stable Diffusion ผ่าน Python
                                        </h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                                            <div className="text-gray-400 mb-1"># Python</div>
                                            <pre className="font-mono text-[11px]">{`from diffusers import StableDiffusionPipeline
import torch

model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

prompt = "a photo of a cat"
image = pipe(prompt).images[0]
image.save("cat.png")`}</pre>
                                        </div>
                                    </div>

                                    {/* คำแนะนำ */}
                                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100 mt-4">
                                        <h4 className="font-semibold text-indigo-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-lightbulb"></i>
                                            คำแนะนำในการเลือกใช้งาน
                                        </h4>
                                        <ul className="text-xs text-gray-700 space-y-2">
                                            <li className="flex gap-2">
                                                <span className="text-indigo-600">💡</span>
                                                <div>
                                                    <strong className="text-indigo-700">ใช้งานง่าย ไม่ต้องติดตั้งอะไรมาก:</strong> ใช้ <strong>Craiyon</strong> หรือ <strong>Leonardo.AI</strong>
                                                </div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-indigo-600">💡</span>
                                                <div>
                                                    <strong className="text-indigo-700">ต้องการควบคุมและปรับแต่งมากขึ้น:</strong> ใช้ <strong>Stable Diffusion</strong> หรือ <strong>Hugging Face Diffusers</strong>
                                                </div>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-indigo-600">💡</span>
                                                <div>
                                                    <strong className="text-indigo-700">ต้องการคุณภาพสูงและยินดีจ่ายเงิน:</strong> ใช้ <strong>MidJourney</strong> หรือ <strong>Leonardo.AI</strong> (แผนจ่ายเงิน)
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* เนื้อหาเพิ่มเติม ส่วนที่ 4 */}
                                <div className="border-t-2 border-amber-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-plus-circle"></i>
                                        ทางเลือกเพิ่มเติมสำหรับ Web App
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Flux AI */}
                                        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-100">
                                            <h4 className="font-semibold text-teal-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-lightning-charge-fill"></i>
                                                Flux AI
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คืออะไร:</strong> แพลตฟอร์มที่มีโมเดล AI สร้างภาพหลายตัว รวมถึงรุ่นโอเพนซอร์สอย่าง FLUX.1 Dev ที่ Hugging Face
                                            </p>
                                            <p className="text-xs text-teal-600 mb-2">
                                                <strong>เหมาะกับ:</strong> Web App ที่ต้องการโมเดลที่หลากหลายและมีตัวเลือกสำหรับนักพัฒนา
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-teal-700 mb-1">วิธีใช้งานเบื้องต้น:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li><strong>Online:</strong> เว็บไซต์ <strong>flux-ai.io</strong> (มีเครดิตฟรีสำหรับผู้ใช้ใหม่)</li>
                                                    <li><strong>Open Source:</strong> ดาวน์โหลด <strong>FLUX.1 Dev</strong> ได้ที่ Hugging Face เพื่อพัฒนาต่อยอด</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Google Gemini / Google AI Studio */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                                            <h4 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-2">
                                                <i className="bi bi-google"></i>
                                                Google Gemini / Google AI Studio
                                            </h4>
                                            <p className="text-xs text-gray-700 mb-2">
                                                <strong>คืออะไร:</strong> แม้ Gemini ไม่ใช่โมเดลสร้างภาพโดยตรง (เน้น Text/Multimodal) แต่สามารถสร้างภาพจาก Prompt ได้ และ Google AI Studio ให้นักพัฒนาทดลองใช้ฟรี
                                            </p>
                                            <p className="text-xs text-blue-600 mb-2">
                                                <strong>เหมาะกับ:</strong> Web App ที่ต้องการใช้พลัง AI ของ Google หรือต้องการทดลองสร้าง Prompt ที่ซับซ้อน
                                            </p>
                                            <div className="bg-white/70 p-3 rounded-lg mb-2">
                                                <p className="text-xs font-semibold text-blue-700 mb-1">วิธีใช้งานเบื้องต้น:</p>
                                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                                    <li>ใช้ <strong>Google Gemini</strong> หรือ <strong>AI Studio</strong> ทดลองสร้าง Prompt และดูผลลัพธ์ฟรี</li>
                                                    <li>นำ Prompt ที่ได้ไปใช้กับโมเดลอื่น หรือรอ API เชื่อมต่อในอนาคต</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ข้อควรพิจารณาเพิ่มเติม */}
                                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100 mt-4">
                                        <h4 className="font-semibold text-orange-800 text-sm mb-3 flex items-center gap-2">
                                            <i className="bi bi-exclamation-circle-fill"></i>
                                            ข้อควรพิจารณาเพิ่มเติม (Crucial Considerations)
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="bg-white/60 p-3 rounded-lg">
                                                <p className="text-xs font-bold text-orange-700 mb-1">1. ทรัพยากร (Resources)</p>
                                                <p className="text-xs text-gray-600">
                                                    การสร้างภาพใช้ CPU/GPU/RAM สูงมาก หากรันเองต้องคำนึงถึงค่าใช้จ่าย Server/Cloud GPU
                                                </p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded-lg">
                                                <p className="text-xs font-bold text-orange-700 mb-1">2. ข้อจำกัด (Limits)</p>
                                                <p className="text-xs text-gray-600">
                                                    โมเดลฟรีมักมีจำกัดจำนวนครั้งต่อวัน หรือความเร็วในการเจนภาพ (Queue)
                                                </p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded-lg">
                                                <p className="text-xs font-bold text-orange-700 mb-1">3. คุณภาพ (Quality)</p>
                                                <p className="text-xs text-gray-600">
                                                    แต่ละโมเดลมี "สไตล์" ต่างกัน ควรทดสอบหลายๆ ตัวเพื่อหาที่เหมาะกับ UX/UI ของ Web App คุณ
                                                </p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded-lg">
                                                <p className="text-xs font-bold text-orange-700 mb-1">4. การปรับแต่ง (Fine-tuning)</p>
                                                <p className="text-xs text-gray-600">
                                                    โมเดล Open Source (เช่น Stable Diffusion/Flux) ปรับแต่งให้เจนภาพเฉพาะทางได้ดีกว่า
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* เนื้อหาเพิ่มเติม ส่วนที่ 5: ตารางเปรียบเทียบและไกด์ไลน์เชิงลึก */}
                                <div className="border-t-2 border-pink-200 mt-6 pt-6">
                                    <h3 className="text-base font-bold text-pink-900 mb-4 flex items-center gap-2">
                                        <i className="bi bi-table"></i>
                                        เปรียบเทียบโมเดลฟรี/Open Source ยอดนิยม
                                    </h3>

                                    {/* ตารางเปรียบเทียบ */}
                                    <div className="overflow-x-auto rounded-xl border border-pink-100 mb-6">
                                        <table className="min-w-full bg-white text-xs">
                                            <thead className="bg-pink-50 text-pink-900">
                                                <tr>
                                                    <th className="py-3 px-4 text-left font-semibold">โมเดล</th>
                                                    <th className="py-3 px-4 text-left font-semibold">จุดเด่น</th>
                                                    <th className="py-3 px-4 text-left font-semibold">วิธีใช้งาน</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-pink-100 text-gray-700">
                                                <tr className="hover:bg-pink-50/50">
                                                    <td className="py-3 px-4 font-medium text-pink-800">Stable Diffusion</td>
                                                    <td className="py-3 px-4">คลาสสิกที่สุด, Community ใหญ่, ปรับแต่งได้เยอะ</td>
                                                    <td className="py-3 px-4">Download, Python, A1111 WebUI</td>
                                                </tr>
                                                <tr className="hover:bg-pink-50/50">
                                                    <td className="py-3 px-4 font-medium text-pink-800">FLUX.1</td>
                                                    <td className="py-3 px-4">รุ่นใหม่, เร็วและคุณภาพสูง, ดีทั้ง Art & Realistic</td>
                                                    <td className="py-3 px-4">API, Self-host</td>
                                                </tr>
                                                <tr className="hover:bg-pink-50/50">
                                                    <td className="py-3 px-4 font-medium text-pink-800">Kandinsky 2.2</td>
                                                    <td className="py-3 px-4">เด่นงาน Abstract และ Stylized</td>
                                                    <td className="py-3 px-4">Hugging Face, REST API Code</td>
                                                </tr>
                                                <tr className="hover:bg-pink-50/50">
                                                    <td className="py-3 px-4 font-medium text-pink-800">DeepFloyd IF</td>
                                                    <td className="py-3 px-4">คมชัด รายละเอียดสูง (เน้น Text ในภาพได้ดีกว่า)</td>
                                                    <td className="py-3 px-4">Transformers, ต้องมี GPU แรง</td>
                                                </tr>
                                                <tr className="hover:bg-pink-50/50">
                                                    <td className="py-3 px-4 font-medium text-pink-800">OpenJourney</td>
                                                    <td className="py-3 px-4">จูนมาให้สไตล์คล้าย MidJourney</td>
                                                    <td className="py-3 px-4">Hugging Face (ใช้ง่าย)</td>
                                                </tr>
                                                <tr className="hover:bg-pink-50/50">
                                                    <td className="py-3 px-4 font-medium text-pink-800">Adobe Firefly</td>
                                                    <td className="py-3 px-4">ใช้งานง่าย, มี UI, ปลอดภัยเรื่อง Copyright (ฟรีบางส่วน)</td>
                                                    <td className="py-3 px-4">Web, Adobe API</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* วิธีเชื่อมต่อกับ Web App */}
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 rounded-xl shadow-lg mb-6">
                                        <h4 className="font-semibold text-lg text-yellow-400 mb-4 flex items-center gap-2">
                                            <i className="bi bi-hdd-network"></i>
                                            วิธีเชื่อมต่อกับ Web App (Integration Strategry)
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                            {/* 1. Self-host */}
                                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                                                <h5 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                                    <i className="bi bi-server"></i> 1. Self-host
                                                </h5>
                                                <ul className="text-xs space-y-2 text-gray-300 ml-1">
                                                    <li>• ติดตั้งโมเดลบน GPU Server / Cloud</li>
                                                    <li>• ใช้ <strong>FastAPI / Flask / Node.js</strong> ทำ API</li>
                                                    <li>• Frontend เรียก API เพื่อส่ง Prompt</li>
                                                </ul>
                                            </div>

                                            {/* 2. API Provider */}
                                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                                                <h5 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                                                    <i className="bi bi-cloud-arrow-up"></i> 2. API Provider
                                                </h5>
                                                <ul className="text-xs space-y-2 text-gray-300 ml-1">
                                                    <li>• <strong>Hugging Face Inference API</strong> (Free Tier)</li>
                                                    <li>• <strong>Replicate.com</strong> (Pay-as-you-go)</li>
                                                    <li>• <strong>Adobe Firefly API</strong></li>
                                                </ul>
                                            </div>

                                            {/* 3. WebUI Integration */}
                                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                                                <h5 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
                                                    <i className="bi bi-window-stack"></i> 3. WebUI
                                                </h5>
                                                <ul className="text-xs space-y-2 text-gray-300 ml-1">
                                                    <li>• <strong>Automatic1111 / ComfyUI</strong></li>
                                                    <li>• Embed UI เข้า Web App โดยตรง</li>
                                                    <li>• หรือใช้ API ของ WebUI เหล่านั้น</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    {/* ข้อควรระวัง */}
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                                        <h4 className="font-bold text-yellow-800 text-sm mb-2 flex items-center gap-2">
                                            <i className="bi bi-exclamation-triangle-fill"></i>
                                            ข้อควรระวังสำคัญ (Critical Warnings)
                                        </h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-yellow-900">
                                            <li className="flex items-start gap-2">
                                                <i className="bi bi-gpu-card mt-0.5"></i>
                                                <div>
                                                    <strong>GPU Requirement:</strong> ถ้า Self-host ต้องมี GPU แรงๆ (เช่น NVIDIA RTX 3060+) ไม่งั้นช้ามาก
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <i className="bi bi-file-earmark-text mt-0.5"></i>
                                                <div>
                                                    <strong>License:</strong> ตรวจสอบสิทธิ์การใช้งานเชิงพาณิชย์ บางโมเดลห้ามใช้ขายภาพ
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <i className="bi bi-graph-up-arrow mt-0.5"></i>
                                                <div>
                                                    <strong>Scaling:</strong> ถ้า User เยอะ ต้องทำ Queue System หรือใช้ Cloud GPU ที่ Auto-scale ได้
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }

                    {
                        selectedReference === 'ai-coding' && (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-hourglass-split text-4xl text-indigo-400"></i>
                                </div>
                                <p className="text-base font-semibold text-gray-700 mb-1">Coming Soon</p>
                                <p className="text-sm text-gray-500">เนื้อหาจะเพิ่มเติมในเร็วๆ นี้</p>
                            </div>
                        )
                    }
                </div>
            )}

            {
                !selectedReference && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mx-auto mb-4">
                            <i className="bi bi-book text-4xl text-indigo-400"></i>
                        </div>
                        <p className="text-base font-semibold text-gray-700 mb-1">เลือกหัวข้อด้านบน</p>
                        <p className="text-sm text-gray-500">คลิกที่หัวข้อที่สนใจเพื่ออ่านเนื้อหา</p>
                    </div>
                )
            }
        </div >
    );
}
