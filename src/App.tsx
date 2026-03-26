import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Baby, BookOpen, Star, ShoppingBag, Trophy, Gift, Heart,
  Moon, Sun, Clock, TrendingUp, ChevronDown, Menu, X,
  Smartphone, ArrowRight, Sparkles, Shield, Users, Zap,
  Mail, ExternalLink, Globe, MessageCircle, Lock, BookMarked,
  Magnet, Eye, Quote, Check, Play, Plus, BarChart3, Utensils
} from 'lucide-react'

/* ─── SCROLL ANIMATION HOOK ──────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── NAV ─────────────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#shop', label: 'Shop' },
    { href: '#tracker', label: 'Baby Tracker' },
    { href: '#stories', label: 'Stories' },
    { href: '#rewards', label: 'Rewards' },
    { href: '#points', label: 'Points' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal to-sage flex items-center justify-center shadow-sm">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-extrabold text-warm text-sm tracking-tight">OFST</span>
          </a>

          {/* Floating points badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-xs font-semibold text-warm">
            <Star className="w-3.5 h-3.5 text-gold" /> Earn Points Today
          </div>

          <div className="hidden md:flex items-center gap-5">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-text-light hover:text-teal transition-colors">{l.label}</a>
            ))}
            <a href="#shop" className="ml-2 px-5 py-2.5 rounded-full bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-all shadow-md hover:shadow-lg">
              Shop
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-text-light">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-blush/20 mt-2 bg-white/95 backdrop-blur-xl rounded-b-2xl">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 px-4 text-sm font-medium text-text-light hover:text-teal transition-colors">{l.label}</a>
            ))}
            <a href="#shop" onClick={() => setOpen(false)}
              className="block mt-2 mx-4 px-5 py-3 rounded-full bg-teal text-white text-sm font-semibold text-center shadow-md">
              Shop
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

/* ─── iPHONE SIMULATOR COMPONENT ─────────────────────────────── */

function PhoneScreen1() {
  return (
    <div className="w-full h-full bg-[#FFF8F0] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#1C95BE] to-[#A8C8B4] flex items-center justify-center">
            <Baby className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-bold text-[#6A6546]">OFST</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded-full bg-[#E8D8F0] flex items-center justify-center">
            <span className="text-[6px]">\uD83D\uDD14</span>
          </div>
        </div>
      </div>

      {/* Active Tracker Banner */}
      <div className="mx-3 mt-2 rounded-2xl bg-gradient-to-r from-[#1C95BE] to-[#157A9E] p-4 text-white">
        <p className="text-[8px] font-semibold uppercase tracking-widest opacity-80 mb-1">Active Tracker</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>00:00:00</span>
          <span className="text-sm font-medium opacity-90">Feeding</span>
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          <button className="flex-1 py-1.5 rounded-full bg-white text-[#1C95BE] text-[10px] font-bold text-center">Finish Session</button>
          <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
            <Play className="w-3 h-3 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-[11px] font-bold text-[#6A6546]">Quick Actions</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFD709]"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-sm border border-[#F8D7DA]/20">
            <div className="w-8 h-8 rounded-lg bg-[#1C95BE]/10 flex items-center justify-center">
              <Utensils className="w-4 h-4 text-[#1C95BE]" />
            </div>
            <span className="text-[9px] font-semibold text-[#6A6546]">Feeding</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-sm border border-[#F8D7DA]/20">
            <div className="w-8 h-8 rounded-lg bg-[#815A5B]/10 flex items-center justify-center">
              <Moon className="w-4 h-4 text-[#815A5B]" />
            </div>
            <span className="text-[9px] font-semibold text-[#6A6546]">Sleep</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-sm border border-[#F8D7DA]/20">
            <div className="w-8 h-8 rounded-lg bg-[#1C95BE]/10 flex items-center justify-center">
              <Baby className="w-4 h-4 text-[#1C95BE]" />
            </div>
            <span className="text-[9px] font-semibold text-[#6A6546]">Diaper</span>
          </div>
          <div className="bg-[#3D3B35] rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <Plus className="w-4 h-4 text-white/70" />
            </div>
            <span className="text-[9px] font-semibold text-white/80">Add Entry</span>
          </div>
        </div>
      </div>

      {/* Daily Insights */}
      <div className="px-4 mt-4 flex-1">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-[#F8D7DA]/20">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-[11px] font-bold text-[#6A6546]">Daily Insights</p>
              <p className="text-[8px] text-[#9B978E]">Last 24 hours</p>
            </div>
            <BarChart3 className="w-3.5 h-3.5 text-[#1C95BE]" />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[8px] text-[#6B6860]">Feeding Trend</span>
            <span className="text-[8px] font-semibold text-[#1C95BE]">8 sessions</span>
          </div>
          <div className="flex items-end gap-1.5 mt-2 h-10">
            {[35, 20, 80, 55, 30, 45, 25].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 2 ? '#1C95BE' : '#D4E8F0' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneScreen2() {
  return (
    <div className="w-full h-full bg-[#FFF8F0] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5 mb-3">
          <Moon className="w-4 h-4 text-[#D0B8E0]" />
          <span className="text-[11px] font-bold text-[#6A6546]">Bedtime Stories</span>
        </div>
        <p className="text-[9px] text-[#9B978E] mb-3">Tonight's story is ready for you</p>
      </div>

      {/* Featured Story */}
      <div className="mx-3 rounded-2xl bg-gradient-to-br from-[#E8D8F0] to-[#F8D7DA] p-4 relative overflow-hidden">
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/70 text-[7px] font-semibold text-[#6A6546]">0-2 yrs</div>
        <BookOpen className="w-8 h-8 text-white/50 mb-2" />
        <h3 className="text-sm font-bold text-white">The Sleepy Bunny</h3>
        <p className="text-[9px] text-white/70 mt-0.5">5 min read</p>
        <div className="mt-3 flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-full bg-white text-[#6A6546] text-[9px] font-bold">Read Now</button>
          <button className="px-3 py-1.5 rounded-full bg-white/30 text-white text-[9px] font-bold">Listen</button>
        </div>
      </div>

      {/* More Stories */}
      <div className="px-4 mt-4">
        <span className="text-[10px] font-bold text-[#6A6546] mb-2 block">More Stories</span>
        <div className="space-y-2">
          {[
            { title: 'Moonlight Adventures', time: '8 min', color: 'from-[#D4E8F0] to-[#C8DFD0]', age: '2-4 yrs' },
            { title: 'The Brave Little Star', time: '6 min', color: 'from-[#FDDCB5] to-[#FFD709]/40', age: '1-3 yrs' },
          ].map(s => (
            <div key={s.title} className={`rounded-xl bg-gradient-to-r ${s.color} p-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-[10px] font-bold text-[#6A6546]">{s.title}</p>
                  <p className="text-[8px] text-[#6B6860]">{s.time} &bull; {s.age}</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#6A6546]/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Reading Streak */}
      <div className="px-4 mt-4 flex-1">
        <div className="bg-[#E8D8F0]/30 rounded-xl p-3 border border-[#E8D8F0]/50">
          <p className="text-[10px] font-bold text-[#6A6546] mb-2">Reading Streak</p>
          <div className="flex justify-between">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold ${
                i < 4 ? 'bg-[#1C95BE] text-white' : 'bg-white text-[#9B978E] border border-[#F8D7DA]/40'
              }`}>
                {i < 4 ? <Check className="w-2.5 h-2.5" /> : d}
              </div>
            ))}
          </div>
          <p className="text-[8px] text-[#1C95BE] font-semibold mt-2 flex items-center gap-1">
            <Star className="w-2.5 h-2.5 text-[#FFD709]" /> 4-day streak! +50 bonus pts
          </p>
        </div>
      </div>
    </div>
  )
}

function PhoneScreen3() {
  return (
    <div className="w-full h-full bg-[#FFF8F0] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5 mb-1">
          <Trophy className="w-4 h-4 text-[#FFD709]" />
          <span className="text-[11px] font-bold text-[#6A6546]">Star Points</span>
        </div>
      </div>

      {/* Points Balance */}
      <div className="mx-3 rounded-2xl bg-gradient-to-r from-[#1C95BE] to-[#A8C8B4] p-4 text-white text-center">
        <p className="text-[8px] uppercase tracking-widest opacity-80 mb-1">Your Balance</p>
        <div className="flex items-center justify-center gap-1.5">
          <Star className="w-5 h-5 text-[#FFD709]" />
          <span className="text-3xl font-extrabold">1,250</span>
        </div>
        <p className="text-[9px] opacity-80 mt-1">Sprout Level &bull; 250 pts to Bloom</p>
        <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#FFD709] rounded-full" style={{ width: '62%' }} />
        </div>
      </div>

      {/* Tier Progress */}
      <div className="px-4 mt-4">
        <span className="text-[10px] font-bold text-[#6A6546] mb-2 block">Your Journey</span>
        <div className="flex justify-between items-end">
          {[
            { emoji: '\uD83C\uDF31', name: 'Seedling', active: true },
            { emoji: '\uD83C\uDF3F', name: 'Sprout', active: true },
            { emoji: '\uD83C\uDF38', name: 'Bloom', active: false },
            { emoji: '\uD83C\uDF3A', name: 'Blossom', active: false },
            { emoji: '\uD83C\uDF33', name: 'Evergreen', active: false },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-1">
              <span className={`text-base ${t.active ? '' : 'opacity-30 grayscale'}`}>{t.emoji}</span>
              <span className={`text-[7px] font-semibold ${t.active ? 'text-[#6A6546]' : 'text-[#9B978E]'}`}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="px-4 mt-4 flex-1">
        <span className="text-[10px] font-bold text-[#6A6546] mb-2 block">Redeem Rewards</span>
        <div className="space-y-2">
          {[
            { pts: 100, reward: '$5 off', available: true },
            { pts: 200, reward: '10% off', available: true },
            { pts: 500, reward: '$25 off', available: false },
          ].map(r => (
            <div key={r.pts} className="flex items-center justify-between bg-white rounded-xl p-2.5 shadow-sm border border-[#F8D7DA]/20">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${r.available ? 'bg-[#FFD709]/20' : 'bg-gray-100'}`}>
                  <Gift className={`w-3.5 h-3.5 ${r.available ? 'text-[#6A6546]' : 'text-gray-300'}`} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#6A6546]">{r.reward}</p>
                  <p className="text-[7px] text-[#9B978E]">{r.pts} pts</p>
                </div>
              </div>
              <button className={`px-2.5 py-1 rounded-full text-[8px] font-bold ${
                r.available ? 'bg-[#1C95BE] text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {r.available ? 'Redeem' : 'Locked'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneScreen4() {
  return (
    <div className="w-full h-full bg-[#FFF8F0] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5 mb-1">
          <Heart className="w-4 h-4 text-[#815A5B]" />
          <span className="text-[11px] font-bold text-[#6A6546]">Barnaby Bear</span>
        </div>
        <p className="text-[9px] text-[#9B978E]">Your parenting companion</p>
      </div>

      {/* Bear Character Area */}
      <div className="mx-3 rounded-2xl bg-gradient-to-br from-[#FDDCB5]/60 via-[#FFF8F0] to-[#C8DFD0]/40 p-5 flex flex-col items-center relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FDDCB5] to-[#F8C890] flex items-center justify-center shadow-lg mb-2">
          <span className="text-4xl">\uD83D\uDC3B</span>
        </div>
        <p className="text-[11px] font-bold text-[#6A6546]">Barnaby</p>
        <p className="text-[8px] text-[#9B978E]">Feeling happy!</p>
        {/* Mood bar */}
        <div className="w-full mt-2">
          <div className="flex justify-between text-[7px] text-[#9B978E] mb-0.5">
            <span>Happiness</span>
            <span className="text-[#1C95BE] font-semibold">85%</span>
          </div>
          <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FFD709] to-[#1C95BE] rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-4">
        <span className="text-[10px] font-bold text-[#6A6546] mb-2 block">Care Actions</span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Utensils className="w-4 h-4" />, label: 'Feed', pts: 10, color: 'bg-[#FDDCB5]/50 text-[#6A6546]' },
            { icon: <Play className="w-4 h-4" />, label: 'Play', pts: 15, color: 'bg-[#D4E8F0]/50 text-[#1C95BE]' },
            { icon: <Moon className="w-4 h-4" />, label: 'Rest', pts: 10, color: 'bg-[#E8D8F0]/50 text-[#D0B8E0]' },
          ].map(a => (
            <div key={a.label} className={`${a.color} rounded-xl p-3 flex flex-col items-center gap-1.5`}>
              {a.icon}
              <span className="text-[9px] font-bold">{a.label}</span>
              <span className="text-[7px] text-[#1C95BE] font-semibold">+{a.pts} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mt-4 flex-1">
        <span className="text-[10px] font-bold text-[#6A6546] mb-2 block">Today's Activity</span>
        <div className="space-y-1.5">
          {[
            { text: 'Fed Barnaby a snack', time: '2m ago', pts: '+10' },
            { text: 'Played fetch together', time: '15m ago', pts: '+15' },
            { text: 'Barnaby took a nap', time: '1h ago', pts: '+10' },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#F8D7DA]/15 last:border-0">
              <div>
                <p className="text-[9px] font-medium text-[#6A6546]">{a.text}</p>
                <p className="text-[7px] text-[#9B978E]">{a.time}</p>
              </div>
              <span className="text-[8px] font-bold text-[#1C95BE]">{a.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IPhoneSimulator() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const screenCount = 4

  const screens = [
    { component: <PhoneScreen1 />, label: 'Tracker', icon: <Clock className="w-3 h-3" /> },
    { component: <PhoneScreen2 />, label: 'Stories', icon: <BookOpen className="w-3 h-3" /> },
    { component: <PhoneScreen3 />, label: 'Rewards', icon: <Star className="w-3 h-3" /> },
    { component: <PhoneScreen4 />, label: 'Companion', icon: <Heart className="w-3 h-3" /> },
  ]

  // Auto-rotate screens
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setActiveScreen(prev => (prev + 1) % screenCount)
    }, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToScreen = useCallback((idx: number) => {
    setActiveScreen(idx)
    setIsAutoPlaying(false)
    // Resume auto-play after 10s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  return (
    <div className="relative group">
      {/* Ambient glow */}
      <div className="absolute -inset-8 bg-gradient-to-br from-[#1C95BE]/15 via-[#D4E8F0]/20 to-[#E8D8F0]/15 rounded-full blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

      {/* iPhone 16 Frame */}
      <motion.div
        className="relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ y: -6 }}
        style={{
          filter: 'drop-shadow(0 30px 60px rgba(28, 149, 190, 0.18)) drop-shadow(0 12px 24px rgba(0,0,0,0.08))',
        }}
      >
        {/* Outer phone body */}
        <div className="relative w-[280px] sm:w-[300px] lg:w-[320px] rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-[10px] sm:p-[11px]">
          {/* Side buttons */}
          <div className="absolute -left-[2px] top-[80px] w-[3px] h-7 bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -left-[2px] top-[120px] w-[3px] h-12 bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -left-[2px] top-[150px] w-[3px] h-12 bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -right-[2px] top-[110px] w-[3px] h-16 bg-[#2a2a2a] rounded-r-sm" />

          {/* Inner bezel */}
          <div className="rounded-[2.4rem] overflow-hidden bg-black relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[90px] h-[26px] bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#2a2a2a]" />
            </div>

            {/* Screen content area */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '9/19.2' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  className="absolute inset-0 pt-8 pb-12"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {screens[activeScreen].component}
                </motion.div>
              </AnimatePresence>

              {/* Bottom tab bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB]/60">
                <div className="flex items-center justify-around px-2 pt-1.5 pb-1">
                  {[
                    { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>, label: 'Home' },
                    { icon: <Clock className="w-4 h-4" />, label: 'Tracker', idx: 0 },
                    { icon: <BookOpen className="w-4 h-4" />, label: 'Stories', idx: 1 },
                    { icon: <Heart className="w-4 h-4" />, label: 'Buddy', idx: 3 },
                    { icon: <ShoppingBag className="w-4 h-4" />, label: 'Shop' },
                  ].map((tab, i) => {
                    const isActive = tab.idx !== undefined && tab.idx === activeScreen
                    return (
                      <button
                        key={i}
                        onClick={() => tab.idx !== undefined && goToScreen(tab.idx)}
                        className={`flex flex-col items-center gap-0.5 py-0.5 px-1 rounded-lg transition-colors ${
                          isActive ? 'text-[#1C95BE]' : 'text-[#9B978E]'
                        }`}
                      >
                        {tab.icon}
                        <span className="text-[7px] font-medium">{tab.label}</span>
                        {isActive && <div className="w-1 h-1 rounded-full bg-[#1C95BE]" />}
                      </button>
                    )
                  })}
                </div>
                {/* Home indicator */}
                <div className="flex justify-center pb-1.5">
                  <div className="w-24 h-1 bg-black/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Screen indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => goToScreen(i)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-300 ${
              i === activeScreen
                ? 'bg-[#1C95BE] text-white shadow-md scale-105'
                : 'bg-white/80 text-[#9B978E] hover:bg-white hover:text-[#6A6546]'
            }`}
          >
            {s.icon}
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── HERO (SPLIT LAYOUT) ────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background warm gradient with soft nursery feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-peach/30 to-lavender/40" />
      <div className="absolute top-10 left-[-80px] w-80 h-80 bg-blush/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-40 right-[-60px] w-72 h-72 bg-sky/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 left-1/3 w-96 h-48 bg-sage/25 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left side — text content */}
          <div className="text-center lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-teal via-teal-dark to-sage shadow-2xl mb-6">
                <Baby className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-warm leading-tight tracking-tight mb-4">
                Our First Steps<br />Together
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="font-body text-lg sm:text-xl text-text-light max-w-xl mx-auto lg:mx-0 mb-2">
                Baby Tracker &bull; Bedtime Stories &bull; Parent Leveling Up
              </p>
              <p className="font-body text-base text-text-lighter max-w-lg mx-auto lg:mx-0 mb-8">
                The parenting app that rewards you for every milestone, every story, and every loving moment.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <a href="#shop" className="px-8 py-3.5 rounded-full bg-teal text-white font-bold text-base shadow-xl hover:bg-teal-dark hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <ShoppingBag className="inline w-5 h-5 mr-2" />Shop Now
                </a>
                <a href="#tracker" className="px-8 py-3.5 rounded-full bg-white text-warm font-bold text-base border-2 border-blush-dark/30 hover:bg-cream-dark hover:scale-105 transition-all duration-300 shadow-md">
                  Download the Free App <ArrowRight className="inline w-5 h-5 ml-2" />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8 text-text-lighter text-sm font-medium">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-sage-dark" /> Safe &amp; Secure</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold" /> 4.9 Rating</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-teal" /> 10K+ Parents</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-peach-dark" /> Earn Real Rewards</span>
              </div>
            </FadeIn>
          </div>

          {/* Right side — iPhone Simulator */}
          <FadeIn delay={0.3}>
            <div className="flex justify-center lg:justify-end">
              <IPhoneSimulator />
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 animate-bounce text-center lg:text-left">
          <ChevronDown className="w-7 h-7 mx-auto lg:mx-0 text-text-lighter/60" />
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIAL CARD ───────────────────────────────────────── */

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-blush/15 hover:shadow-lg transition-shadow">
      <Quote className="w-6 h-6 text-teal/40 mb-3" />
      <p className="font-body text-sm text-text leading-relaxed mb-4 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-sage flex items-center justify-center text-white font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-heading font-bold text-sm text-warm">{name}</p>
          <p className="text-xs text-text-lighter">{role}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── SHOP ────────────────────────────────────────────────────── */

function Shop() {
  const [qty, setQty] = useState(1)

  const benefits = [
    { icon: <Lock className="w-5 h-5" />, label: 'Hidden Compartment', desc: 'Secret phone storage inside' },
    { icon: <BookMarked className="w-5 h-5" />, label: 'Realistic Book Look', desc: 'Custom OFST pastel cover design' },
    { icon: <Magnet className="w-5 h-5" />, label: 'Magnetic Closure', desc: 'Snaps shut securely every time' },
    { icon: <Eye className="w-5 h-5" />, label: 'Parent-Only Design', desc: 'Kids see a book, you get a break' },
  ]

  const comingProducts = [
    { img: '/product-coming-1.png', name: 'STEM Gear Wall Set', desc: 'Interactive wooden gears for creative play' },
    { img: '/product-coming-2.png', name: 'Rube Goldberg Board', desc: 'Hands-on physics learning for toddlers' },
    { img: '/product-coming-3.png', name: 'Engineering Play Kit', desc: 'Build, explore, and discover together' },
  ]

  return (
    <section id="shop" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peach/40 text-warm text-xs font-semibold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-3.5 h-3.5" /> OFST Shop
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-warm mb-3">
              Your Secret Sanity Hack
            </h2>
            <p className="font-body text-text-light max-w-xl mx-auto text-lg">
              Thoughtfully designed products that make parenting a little more magical. Earn points with every purchase.
            </p>
          </div>
        </FadeIn>

        {/* Main product card */}
        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto bg-cream rounded-3xl overflow-hidden shadow-xl border border-blush/20">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Product image */}
              <div className="relative bg-gradient-to-br from-lavender/40 via-sky/30 to-sage/30 p-4 sm:p-6 flex items-center justify-center min-h-[400px] md:min-h-[520px]">
                <img
                  src="/product-hideaway.png"
                  alt="OFST Parent's Quiet Reader Hideaway - Secret Phone Storage Book"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-rose text-white text-xs font-bold shadow-md">
                  SALE
                </div>
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-teal text-white text-xs font-bold shadow-md">
                  +100 pts
                </div>
              </div>

              {/* Product details */}
              <div className="p-6 sm:p-10 flex flex-col justify-center">
                <span className="text-xs font-semibold text-teal uppercase tracking-wider mb-2">Featured Product</span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-warm mb-4 leading-tight">
                  OFST Parent's Quiet Reader Hideaway
                </h3>
                <p className="text-sm font-medium text-rose mb-3">Secret Phone Storage Book</p>
                <p className="font-body text-text-light text-sm leading-relaxed mb-5">
                  Exhausted from toddler chaos but drowning in screen guilt? Our exclusive Parent's Quiet Reader Hideaway is your witty sanity hack! Disguised as a charming storybook (custom OFST pastel design with 'Our First Adventures' cover), this clever diversion safe lets you 'read' while sneaking a quick scroll or recharge. Toddlers see you modeling book love — they mimic with their own reads — while you get that much-needed 5-minute break. Perfect for millennial and Gen Z parents balancing it all.
                </p>

                <div className="flex items-center gap-3 mb-5">
                  <span className="font-heading font-extrabold text-3xl text-teal">$19.99</span>
                  <span className="text-base text-text-lighter line-through">$24.99</span>
                  <span className="px-3 py-1 rounded-full bg-rose/15 text-rose text-xs font-bold">Save 20%</span>
                </div>

                {/* Benefit icons */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {benefits.map(b => (
                    <div key={b.label} className="flex items-center gap-2 p-2 rounded-xl bg-sage/15">
                      <span className="text-teal">{b.icon}</span>
                      <span className="text-xs font-medium text-warm">{b.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border border-blush-dark/30 rounded-full overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-text-light hover:bg-cream-dark transition-colors font-semibold">−</button>
                    <span className="px-4 py-2.5 font-semibold text-warm min-w-[40px] text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-text-light hover:bg-cream-dark transition-colors font-semibold">+</button>
                  </div>
                  <a href="https://ourfirststepstogether.com/products/ofst-parents-quiet-reader-hideaway-secret-phone-storage-book"
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 px-6 py-3.5 rounded-full bg-teal text-white font-bold text-center hover:bg-teal-dark transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                    Shop Now
                  </a>
                </div>

                <a href="https://ourfirststepstogether.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-warm/20 text-warm font-medium text-sm hover:bg-cream-dark transition-colors">
                  Browse Full Store <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <p className="mt-4 text-xs text-text-lighter flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-gold" /> Earn 100 Star Points with this purchase
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Testimonials */}
        <FadeIn delay={0.2}>
          <div className="grid sm:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            <TestimonialCard
              quote="This changed my quiet time game! My toddler thinks I'm reading and grabs her own book. Genius."
              name="Sarah M."
              role="Mom of 2"
            />
            <TestimonialCard
              quote="Finally, a product that gets millennial parenting. The design is adorable and it actually works."
              name="James K."
              role="First-time Dad"
            />
            <TestimonialCard
              quote="I earned enough points from tracking and stories to get this for free. The rewards system is real!"
              name="Priya L."
              role="Mom of 1"
            />
          </div>
        </FadeIn>

        {/* Coming soon products with real images */}
        <FadeIn delay={0.3}>
          <div className="mt-14 text-center">
            <p className="text-text-lighter text-sm font-medium mb-6">More products coming soon</p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {comingProducts.map((p) => (
                <div key={p.name} className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden border-2 border-dashed border-blush-dark/20 hover:border-teal/40 transition-all duration-300 bg-cream-dark/40">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-warm mt-2">{p.name}</h4>
                  <p className="text-[10px] sm:text-xs text-text-lighter">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── BABY TRACKER ────────────────────────────────────────────── */

function BabyTracker() {
  const activities = [
    { icon: <Clock className="w-6 h-6" />, title: 'Feeding', desc: 'Track breast, bottle, and solid meals', pts: 10, color: 'bg-peach/40 text-warm' },
    { icon: <Moon className="w-6 h-6" />, title: 'Sleep', desc: 'Log naps and nighttime sleep patterns', pts: 10, color: 'bg-lavender/40 text-lavender-dark' },
    { icon: <Baby className="w-6 h-6" />, title: 'Diaper', desc: 'Quick-log diaper changes with one tap', pts: 10, color: 'bg-sky/40 text-teal' },
    { icon: <Heart className="w-6 h-6" />, title: 'Pumping', desc: 'Track pumping sessions and volume', pts: 10, color: 'bg-blush/40 text-rose' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Growth', desc: 'Record weight, height, and milestones', pts: 10, color: 'bg-sage/40 text-sage-dark' },
    { icon: <Sun className="w-6 h-6" />, title: 'Activities', desc: 'Tummy time, playtime, and outdoor fun', pts: 10, color: 'bg-gold/30 text-warm' },
  ]

  return (
    <section id="tracker" className="py-16 sm:py-24 px-4 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-peach/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky/40 text-teal text-xs font-semibold uppercase tracking-wider mb-4">
              <Baby className="w-3.5 h-3.5" /> Baby Tracker
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-warm mb-3">
              Every Moment Matters
            </h2>
            <p className="font-body text-text-light max-w-lg mx-auto text-lg">
              Track feeding, sleep, diapers, and milestones with ease. Every activity you log earns Star Points toward real rewards.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-6 border border-blush/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${a.color} mb-4`}>
                  {a.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-warm mb-1">{a.title}</h3>
                <p className="font-body text-sm text-text-light">{a.desc}</p>
                <p className="mt-3 text-xs font-semibold text-teal flex items-center gap-1">
                  <Star className="w-3 h-3" /> +{a.pts} pts per log
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-10 text-center">
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-bold text-lg shadow-lg hover:bg-teal-dark hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Smartphone className="w-5 h-5" /> Download the Free App
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── BEDTIME STORIES ─────────────────────────────────────────── */

function BedtimeStories() {
  const stories = [
    {
      title: 'The Sleepy Bunny',
      duration: '5 min',
      age: '0-2 yrs',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663361976475/mvAMgWFxjtpuS4LvLUZtDu/story-sleepy-bunny-73AgmXNGYv7L27KTr73N7R.webp',
    },
    {
      title: 'Moonlight Adventures',
      duration: '8 min',
      age: '2-4 yrs',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663361976475/mvAMgWFxjtpuS4LvLUZtDu/story-moonlight-adventures-UsUAU4zMNxgzWqbkyWLUY2.webp',
    },
    {
      title: 'The Brave Little Star',
      duration: '6 min',
      age: '1-3 yrs',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663361976475/mvAMgWFxjtpuS4LvLUZtDu/story-brave-little-star-CKRfHmhMgohQAq7LfmRb7J.webp',
    },
  ]

  return (
    <section id="stories" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-white to-cream">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lavender/40 text-lavender-dark text-xs font-semibold uppercase tracking-wider mb-4">
              <Moon className="w-3.5 h-3.5" /> Bedtime Stories
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-warm mb-3">
              A New Story Every Night
            </h2>
            <p className="font-body text-text-light max-w-lg mx-auto text-lg">
              Read or listen to a fresh bedtime story daily. Each completed story earns Star Points you can spend in the shop.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          {stories.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.12}>
              <div className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] relative group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 text-xs font-semibold text-warm backdrop-blur-sm">{s.age}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <BookOpen className="w-8 h-8 text-white/60 mb-2" />
                    <h3 className="font-heading font-bold text-white text-base">{s.title}</h3>
                    <p className="text-white/70 text-xs mt-1">{s.duration} read</p>
                  </div>
                </div>
                <p className="mt-2 text-xs font-semibold text-teal flex items-center justify-center gap-1">
                  <Star className="w-3 h-3" /> +50 pts per story
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="bg-lavender/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center border border-lavender/30">
            <Moon className="w-8 h-8 text-lavender-dark mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-warm mb-2">Daily Story Streak</h3>
            <p className="font-body text-sm text-text-light mb-4">
              Read a story every night to build your streak. 7-day streaks earn a bonus 200 Star Points!
            </p>
            <div className="flex justify-center gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < 5 ? 'bg-teal text-white shadow-md' : 'bg-white text-text-lighter border border-blush/30'}`}>
                  {i < 5 ? <Check className="w-4 h-4" /> : d}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Testimonial */}
        <FadeIn delay={0.4}>
          <div className="mt-10 max-w-md mx-auto">
            <TestimonialCard
              quote="My daughter now asks for 'story time' every night. We've had a 30-day streak and I've earned so many points!"
              name="Emily R."
              role="Mom of 3"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── REWARDS / LEVELING UP ───────────────────────────────────── */

function Rewards() {
  return (
    <section id="rewards" className="py-16 sm:py-24 px-4 bg-cream relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold/30 text-warm text-xs font-semibold uppercase tracking-wider mb-4">
              <Trophy className="w-3.5 h-3.5" /> Parent Leveling Up
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-warm mb-3">
              Your Parenting Pays Off
            </h2>
            <p className="font-body text-text-light max-w-xl mx-auto text-lg">
              Every tracker log, every bedtime story, every milestone — they all earn Star Points. Points convert to real discount codes you can use at checkout.
            </p>
          </div>
        </FadeIn>

        {/* How It Works — visual flow */}
        <FadeIn delay={0.15}>
          <div className="max-w-4xl mx-auto mb-14">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 relative">
              {/* Connection lines (desktop) */}
              <div className="hidden sm:block absolute top-14 left-[calc(33%+12px)] right-[calc(33%+12px)] h-0.5 bg-gradient-to-r from-teal/40 via-gold/40 to-rose/40" />

              {[
                { step: '1', title: 'Track & Read', desc: 'Log feeding, sleep, diapers, and read bedtime stories every day', icon: <BookOpen className="w-7 h-7" />, color: 'from-teal to-sage' },
                { step: '2', title: 'Earn Star Points', desc: 'Every action automatically earns Star Points — no extra steps needed', icon: <Star className="w-7 h-7" />, color: 'from-gold to-peach' },
                { step: '3', title: 'Get Real Discounts', desc: 'Points convert to discount codes applied automatically at checkout', icon: <Gift className="w-7 h-7" />, color: 'from-rose to-lavender-dark' },
              ].map((s, i) => (
                <FadeIn key={s.step} delay={0.2 + i * 0.15}>
                  <div className="text-center relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} shadow-lg mb-4`}>
                      <span className="text-white">{s.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-warm text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {s.step}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-warm mb-2">{s.title}</h3>
                    <p className="font-body text-sm text-text-light leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Tiers */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { name: 'Seedling', points: '0', emoji: '\uD83C\uDF31', color: 'bg-sage/30 border-sage' },
              { name: 'Sprout', points: '500', emoji: '\uD83C\uDF3F', color: 'bg-sage/50 border-sage-dark' },
              { name: 'Bloom', points: '1,500', emoji: '\uD83C\uDF38', color: 'bg-blush/40 border-blush-dark' },
              { name: 'Blossom', points: '3,000', emoji: '\uD83C\uDF3A', color: 'bg-lavender/40 border-lavender-dark' },
              { name: 'Evergreen', points: '5,000+', emoji: '\uD83C\uDF33', color: 'bg-teal/20 border-teal' },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={0.5 + i * 0.08}>
                <div className={`${t.color} border-2 rounded-2xl p-5 text-center min-w-[110px] sm:min-w-[130px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}>
                  <span className="text-3xl block mb-2">{t.emoji}</span>
                  <h4 className="font-heading font-bold text-sm text-warm">{t.name}</h4>
                  <p className="text-xs text-text-lighter mt-1">{t.points} pts</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── POINTS TABLE ────────────────────────────────────────────── */

function PointsTable() {
  const earning = [
    { action: 'Log a feeding session', pts: 10 },
    { action: 'Log a sleep session', pts: 15 },
    { action: 'Log a diaper change', pts: 5 },
    { action: 'Complete a bedtime story', pts: 50 },
    { action: '7-day story streak bonus', pts: 200 },
    { action: 'Record a milestone', pts: 25 },
    { action: 'Daily companion care', pts: 20 },
    { action: 'Purchase in OFST Shop', pts: 100 },
  ]

  const redeeming = [
    { points: 100, reward: '$5 off your next order' },
    { points: 200, reward: '10% off any item' },
    { points: 300, reward: 'Free shipping' },
    { points: 500, reward: '$25 off your order' },
    { points: 1000, reward: '25% off premium items' },
    { points: 2000, reward: 'Exclusive product access' },
  ]

  return (
    <section id="points" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal/15 text-teal text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> How Points Work
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-warm mb-3">
              Earn More, Save More
            </h2>
            <p className="font-body text-text-light max-w-lg mx-auto text-lg">
              Star Points are earned through everyday parenting activities and redeemed as automatic discount codes at checkout.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-blush/15 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal/15 flex items-center justify-center">
                  <Star className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-heading font-bold text-xl text-warm">Earning Points</h3>
              </div>
              <div className="space-y-3">
                {earning.map(e => (
                  <div key={e.action} className="flex items-center justify-between py-2.5 border-b border-blush/10 last:border-0">
                    <span className="font-body text-sm text-text">{e.action}</span>
                    <span className="font-heading font-bold text-sm text-teal flex items-center gap-1 whitespace-nowrap">
                      +{e.pts} <Star className="w-3 h-3 text-gold" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-blush/15 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-warm" />
                </div>
                <h3 className="font-heading font-bold text-xl text-warm">Redeeming Rewards</h3>
              </div>
              <div className="space-y-3">
                {redeeming.map(r => (
                  <div key={r.points} className="flex items-center justify-between py-2.5 border-b border-blush/10 last:border-0">
                    <span className="font-heading font-bold text-sm text-teal flex items-center gap-1">
                      {r.points} <Star className="w-3 h-3 text-gold" />
                    </span>
                    <span className="font-body text-sm text-text">{r.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-sm text-text-lighter bg-cream/80 inline-block px-6 py-3 rounded-full border border-blush/15">
              Points never expire. Discount codes are generated automatically and applied at checkout.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── CTA / DOWNLOAD ──────────────────────────────────────────── */

function DownloadCTA() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-gradient-to-br from-teal via-teal-dark to-sage text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative">
        <FadeIn>
          <Baby className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-5">
            Start Your Journey Today
          </h2>
          <p className="font-body text-white/80 text-lg max-w-lg mx-auto mb-10">
            Download the app, track your baby's milestones, and start earning rewards from day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="px-10 py-4 rounded-full bg-white text-teal font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <Smartphone className="inline w-5 h-5 mr-2" /> Download the Free App
            </a>
            <a href="#shop" className="px-10 py-4 rounded-full bg-white/15 text-white font-bold text-lg border border-white/25 hover:bg-white/25 hover:scale-105 transition-all duration-300">
              <ShoppingBag className="inline w-5 h-5 mr-2" /> Shop Now
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── FOOTER ──────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-12 px-4 bg-warm text-white/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Baby className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-extrabold text-white text-sm">Our First Steps Together</span>
            </div>
            <p className="text-sm leading-relaxed">
              The parenting app that rewards you for every milestone, every story, and every loving moment.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#shop" className="block text-sm hover:text-white transition-colors">Shop</a>
              <a href="#tracker" className="block text-sm hover:text-white transition-colors">Baby Tracker</a>
              <a href="#stories" className="block text-sm hover:text-white transition-colors">Bedtime Stories</a>
              <a href="#rewards" className="block text-sm hover:text-white transition-colors">Rewards</a>
              <a href="#points" className="block text-sm hover:text-white transition-colors">How Points Work</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="https://ourfirststepstogether.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <ShoppingBag className="w-4 h-4" /> OFST Store
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Globe className="w-4 h-4" /> Instagram
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" /> Facebook
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; {new Date().getFullYear()} Our First Steps Together. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── APP ─────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Shop />
      <BabyTracker />
      <BedtimeStories />
      <Rewards />
      <PointsTable />
      <DownloadCTA />
      <Footer />
    </div>
  )
}
