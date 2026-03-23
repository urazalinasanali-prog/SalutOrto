import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Award, 
  Globe, 
  Stethoscope, 
  ShoppingBag,
  MessageCircle,
  FileText,
  Plane,
  Home,
  Settings,
  ShieldCheck,
  Send,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col ${className}`}>
    <div className="flex items-baseline font-bold leading-none tracking-tight">
      <span style={{ color: '#E15A5A' }} className="text-2xl">Салют</span>
      <span style={{ color: '#5EB5E0' }} className="text-2xl">Орто</span>
    </div>
    <div className="text-[9px] text-slate-500 font-medium leading-none mt-1 uppercase tracking-tighter">
      центр протезирования <br /> и ортопедии
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const webhookUrl = "https://script.google.com/macros/s/AKfycby-Jfhz2-p1KJEjOc2-6A0yhKljBi91n1YNDqVAI8xwkGG1owS07oN_NnlGGZQbtfvt3Q/exec";

    try {
      // Try calling the direct webhook first (works on static sites like GitHub Pages)
      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors for direct POST from browser
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toLocaleString("ru-RU"),
          source: window.location.hostname
        }),
      });

      // With no-cors, we can't check response.ok, but if it doesn't throw, it's usually fine
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь через WhatsApp.');
    }
  };

  const whatsappNumber = "77710148802";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const steps = [
    {
      title: "Осмотр и подбор",
      desc: "Первичная консультация и индивидуальный подбор комплектующих.",
      icon: <Stethoscope className="w-8 h-8 text-brand-accent" />
    },
    {
      title: "Гипсовый слепок",
      desc: "Изготовление точного слепка (негатив/позитив) вашей конечности.",
      icon: <Settings className="w-8 h-8 text-brand-accent" />
    },
    {
      title: "Примерочная гильза",
      desc: "Подгонка для обеспечения максимального комфорта и функциональности.",
      icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />
    },
    {
      title: "Постоянная гильза",
      desc: "Изготовление финального изделия из высокопрочных материалов.",
      icon: <CheckCircle2 className="w-8 h-8 text-brand-accent" />
    },
    {
      title: "Облицовка",
      desc: "Косметическая отделка для эстетики здоровой конечности.",
      icon: <Award className="w-8 h-8 text-brand-accent" />
    }
  ];

  const services = [
    {
      title: "Протезирование конечностей",
      desc: "Индивидуальный подход к каждому пациенту, использование передовых технологий.",
      icon: <Settings className="w-12 h-12 text-brand-accent mb-4" />
    },
    {
      title: "Орто-аптека",
      desc: "Широкий ассортимент ортопедических товаров и средств реабилитации.",
      icon: <ShoppingBag className="w-12 h-12 text-brand-accent mb-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <a 
            href="https://www.instagram.com/salut_orto.kz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo />
          </a>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-green-200"
          >
            <MessageCircle size={20} />
            Связаться в WhatsApp
          </a>
          
          <a 
            href={whatsappLink}
            className="md:hidden p-2 text-green-500"
          >
            <MessageCircle size={28} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-soft text-brand-dark text-sm font-bold mb-6">
              Работаем с 2018 года
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 text-slate-900">
              Социальное предприятие <br />
              <span className="text-brand-accent">«Салют Орто kz»</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Протезирование конечностей и высокотехнологичная реабилитация. Улучшаем качество жизни более 5 лет.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#consultation"
                className="bg-brand-accent hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-center transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
              >
                Бесплатная консультация
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/prosthetics/800/800" 
                alt="Prosthetics technology" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">350+</p>
                  <p className="text-sm text-slate-500">Довольных пациентов</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">О нашей компании</h2>
            <div className="w-20 h-1.5 bg-brand-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <Award className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-xl font-bold mb-3">Резидент «Сколково»</h3>
              <p className="text-slate-600">Разработчики инновационного бионического коленного модуля «Steplife».</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <Users className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-xl font-bold mb-3">Опыт и доверие</h3>
              <p className="text-slate-600">Помогли более 350 пациентам вернуться к полноценной жизни с 2018 года.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <Globe className="w-10 h-10 text-brand-accent mb-6" />
              <h3 className="text-xl font-bold mb-3">География</h3>
              <p className="text-slate-600">Наши центры: Уральск, Москва, Иркутск, Улан-Удэ, Уфа.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Наши услуги</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Мы предоставляем полный спектр услуг по протезированию и реабилитации.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group p-10 rounded-3xl bg-white border border-slate-100 hover:border-brand-accent transition-all hover:shadow-2xl hover:shadow-blue-50">
                {service.icon}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">{service.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-brand-dark text-white px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Этапы протезирования</h2>
            <p className="text-blue-100 opacity-80">Как мы создаем ваш идеальный протез</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {idx + 1}
                </div>
                <div className="bg-white p-3 rounded-xl w-fit mb-6">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-blue-100 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer for Out-of-towners */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-soft/30 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-16">
                <span className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4 block">Спецпредложение для иногородних</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900">Как получить протез <span className="text-green-600">БЕСПЛАТНО</span></h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-accent">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">1. Позвоните нам</h4>
                      <p className="text-slate-600">Первичная консультация по телефону для уточнения деталей.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-accent">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">2. Подготовьте документы</h4>
                      <p className="text-slate-600">ЭЦП, Удостоверение личности, ИПР (Индивидуальная программа реабилитации).</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-accent">
                      <Plane size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">3. Приезжайте в Уральск</h4>
                      <p className="text-slate-600">Мы Вас обязательно встретим.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-brand-accent p-8 md:p-16 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-8">Что мы обеспечиваем:</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-white/20 p-1 rounded-full">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-lg">Стационар в областной больнице на время изготовления.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-white/20 p-1 rounded-full">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-lg">Профессиональный медицинский осмотр.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-white/20 p-1 rounded-full">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-lg">Срок изготовления: всего 5-7 рабочих дней.</p>
                  </li>
                </ul>
                
                <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-sm opacity-90 italic">
                    * Мы помогаем с оформлением всех необходимых документов для получения государственной компенсации.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-24 px-4 bg-brand-soft/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Записаться на консультацию</h2>
              <p className="text-slate-600 text-lg">Оставьте ваши данные, и наш специалист свяжется с вами в ближайшее время.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Ваше имя</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Александр"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Ваш телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all text-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Что вас беспокоит?</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Опишите вашу ситуацию..."
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all text-lg resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-brand-accent hover:bg-brand-dark disabled:bg-slate-400 text-white px-8 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      Отправить заявку
                      <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center font-medium"
                  >
                    Спасибо! Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-1 gap-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Контакты</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex gap-4">
                  <MapPin className="text-brand-accent flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Адрес</p>
                    <p className="text-slate-600">г. Уральск, ул. Касыма Аманжолова 57/1</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-brand-accent flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Телефоны</p>
                    <p className="text-slate-600">+7 771 014 88 02</p>
                    <p className="text-slate-600">8 (705) 447-66-01</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-brand-accent flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Время работы</p>
                    <p className="text-slate-600">Пн - Пт: 09:00 - 18:00</p>
                    <p className="text-slate-600 text-sm text-orange-600 font-medium">Сб - Вс: Выходной</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4">
                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:text-brand-accent transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:text-brand-accent transition-colors">
                  <Globe size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <a 
            href="https://www.instagram.com/salut_orto.kz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo className="brightness-0 invert" />
          </a>
          
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Социальное предприятие «Салют Орто kz». Все права защищены.
          </p>
          
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp for Mobile */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 md:hidden animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
