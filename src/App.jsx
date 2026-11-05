import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Download,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
  CircleCheck,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------
   CONTENU — modifie uniquement cet objet pour mettre à jour ton CV
------------------------------------------------------------------- */
const PROFILE = {
  firstName: 'Abdoulaye',
  lastName: 'Seck',
  initials: 'AS',
  title: 'Réceptionniste polyvalent & entrepreneur',
  photo: './photo.jpg', // fichier dans /public
  cvPdf: './cv-abdoulaye-seck.pdf',
  stats: ['4 expériences', '1 entreprise créée', 'Nice, France'],
  about: [
    "Titulaire d'une licence de l'ISM de Dakar et d'un master obtenu à l'IMI Developer au Maroc en management international, j'ai construit mon parcours au contact des clients : l'immobilier, le téléconseil, puis l'hôtellerie, où je suis aujourd'hui réceptionniste polyvalent tournant à l'Hôtel Beau Rivage, à Nice.",
    "Entrepreneur dans l'âme, j'ai fondé Mindakaru, mon entreprise de livraison à Dakar. Chaleureux et à l'aise à l'oral, j'aime fédérer une équipe et transformer une plainte en client fidèle. Ma vision : allier la rigueur du management et l'exigence du service pour bâtir des projets utiles et durables.",
  ],
  experiences: [
    {
      period: 'Actuellement · Nice',
      role: 'Réceptionniste Polyvalent Tournant',
      company: 'Hôtel Beau Rivage',
      description:
        "Accueil des clients, arrivées et départs, réservations et facturation. Rotation sur tous les postes et horaires de la réception, avec le même niveau de service du matin à la nuit.",
    },
    {
      period: 'Maroc',
      role: 'Conseiller Opérateur Mobile',
      company: 'Xceed',
      description:
        "Accompagnement des abonnés d'un opérateur mobile : diagnostic des demandes, résolution au premier contact et proposition d'offres adaptées, avec des objectifs de qualité et de satisfaction.",
    },
    {
      period: 'Dakar',
      role: 'Assistant de Direction',
      company: 'NBS Immobilier',
      description:
        "Appui direct à la direction : gestion de l'agenda, suivi des dossiers clients et des biens, coordination avec les partenaires et préparation des documents.",
    },
    {
      period: 'Dakar · Entrepreneuriat',
      role: 'Fondateur',
      company: 'Mindakaru · Livraison',
      description:
        "Création et gestion de Mindakaru, entreprise de livraison à Dakar : organisation des tournées, recrutement des livreurs, relation avec les commerçants et développement de la clientèle.",
    },
  ],
  skills: [
    { name: 'Aisance relationnelle', level: 95, source: 'Hôtel Beau Rivage' },
    { name: 'Gestion des plaintes', level: 92, source: 'Xceed · Réception' },
    { name: 'Management & leadership', level: 90, source: 'Mindakaru · NBS' },
    { name: 'Entrepreneuriat & créativité', level: 90, source: 'Mindakaru · Dakar' },
    { name: 'Prise de parole', level: 88, source: 'Conseil · Accueil' },
  ],
  qualities: [
    'Manager',
    'Leader',
    'Entrepreneur',
    'Créatif',
    'Très chaleureux',
    'Aisance relationnelle',
    'Bon orateur',
    'Gestionnaire de plaintes',
  ],
  education: [
    {
      place: 'Dakar, Sénégal',
      degree: 'Licence en Management International',
      school: 'ISM — Institut Supérieur de Management, Dakar',
    },
    {
      place: 'Maroc',
      degree: 'Master en Management International',
      school: 'IMI Developer, Maroc',
    },
  ],
  // Remplace par tes vraies coordonnées (laisse '' pour masquer une ligne)
  contact: {
    email: 'layeseckseck12@gmail.com',
    phone: '07 62 35 36 73',
    linkedin: '', // ex. 'https://www.linkedin.com/in/ton-profil'
  },
  // Formulaire "Me contacter" : colle ici ton URL Formspree (https://formspree.io/f/xxxx)
  // pour recevoir les demandes directement. Vide = ouverture de la messagerie du visiteur.
  formEndpoint: '',
  budgets: ['Moins de 500 €', '500 – 1 500 €', '1 500 – 3 000 €', '3 000 € et plus', 'À définir ensemble'],
  heroImage:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
}

const NAV_LINKS = [
  { href: '#apropos', label: 'À propos' },
  { href: '#experience', label: 'Expérience' },
  { href: '#competences', label: 'Compétences' },
  { href: '#contact', label: 'Contact' },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------
   Overlay de bruit
------------------------------------------------------------------- */
function Noise() {
  return (
    <svg className="noise" aria-hidden="true" width="100%" height="100%">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  )
}

/* ------------------------------------------------------------------
   A. NAVBAR — La Signature Flottante
------------------------------------------------------------------- */
function Navbar({ sentinelRef }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [sentinelRef])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${
          scrolled
            ? 'border-dark/10 bg-background/60 text-dark shadow-[0_10px_40px_-20px_rgba(15,15,19,0.45)] backdrop-blur-xl'
            : 'border-transparent bg-transparent text-background'
        }`}
        aria-label="Navigation principale"
      >
        <a href="#top" className="lift flex items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-xs text-primary">
            {PROFILE.initials}
          </span>
          <span className="hidden sm:inline">
            {PROFILE.firstName} {PROFILE.lastName}
          </span>
        </a>
        <ul className="hidden items-center gap-6 whitespace-nowrap text-sm font-medium md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="lift link-underline inline-block opacity-80 hover:opacity-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={PROFILE.cvPdf} download className="btn-magnetic btn-accent shrink-0 whitespace-nowrap !px-5 !py-2.5">
          <Download size={16} strokeWidth={2.2} />
          Télécharger CV
        </a>
      </nav>
    </header>
  )
}

/* ------------------------------------------------------------------
   B. HERO — La Première Impression
------------------------------------------------------------------- */
function Hero({ sentinelRef, onContact }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-item', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      })
      gsap.from('.hero-bg', { scale: 1.12, duration: 2.4, ease: 'power2.inOut' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden rounded-b-[3rem] bg-primary text-background"
    >
      <div ref={sentinelRef} className="absolute inset-x-0 top-0 h-24" aria-hidden="true" />
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${PROFILE.heroImage})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 30%, rgba(212,168,67,0.18) 0%, rgba(212,168,67,0) 70%), linear-gradient(180deg, rgba(15,15,19,0.55) 0%, rgba(15,15,19,0.82) 55%, #0F0F13 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 md:pt-36">
        <div className="hero-item mb-8 flex items-center gap-4">
          <div className="grid h-[120px] w-[120px] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-accent/80 bg-[#2a2a33] md:h-[150px] md:w-[150px]">
            {PROFILE.photo ? (
              <img src={PROFILE.photo} alt={`${PROFILE.firstName} ${PROFILE.lastName}`} className="h-full w-full object-cover" />
            ) : (
              <span className="font-serif text-4xl italic text-accent md:text-5xl">{PROFILE.initials}</span>
            )}
          </div>
          <span className="hidden rounded-full border border-background/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background/70 sm:inline-flex sm:items-center sm:gap-2">
            <span className="pulse-dot relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Ouvert aux opportunités
          </span>
        </div>

        <h1 className="font-sans font-extrabold leading-[0.88] tracking-[-0.045em]">
          <span className="hero-item block text-[clamp(3.4rem,12vw,9.5rem)]">{PROFILE.firstName}</span>
          <span className="hero-item block text-[clamp(3.4rem,12vw,9.5rem)] text-background/90">{PROFILE.lastName}</span>
        </h1>

        <p className="hero-item gold-text mt-5 max-w-2xl font-serif text-[clamp(1.5rem,3.6vw,2.6rem)] italic leading-tight">
          {PROFILE.title}
        </p>

        <ul className="hero-item mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-background/65 sm:text-sm">
          {PROFILE.stats.map((s, i) => (
            <li key={s} className="flex items-center gap-4">
              {i > 0 && <span className="hidden text-accent sm:inline" aria-hidden="true">|</span>}
              <span className={i === PROFILE.stats.length - 1 ? 'inline-flex items-center gap-1.5' : ''}>
                {i === PROFILE.stats.length - 1 && <MapPin size={13} className="text-accent" />}
                {s}
              </span>
            </li>
          ))}
        </ul>

        <div className="hero-item mt-10 flex flex-wrap gap-3">
          <a href={PROFILE.cvPdf} download className="btn-magnetic btn-accent">
            <Download size={17} strokeWidth={2.2} />
            Télécharger CV
          </a>
          <button type="button" onClick={onContact} className="btn-magnetic btn-outline">
            Me contacter
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background/45 md:flex sm:right-10">
        <span className="h-px w-10 bg-accent/60" />
        Faire défiler
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Titre de section réutilisable
------------------------------------------------------------------- */
function SectionLabel({ children, light = false }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.22em] ${light ? 'text-accent' : 'text-accent'}`}>
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------
   C. À PROPOS — Le Manifeste Personnel
------------------------------------------------------------------- */
function About() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.about-item', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.about-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="apropos" ref={ref} className="bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)] md:gap-14">
        <div className="about-item">
          <SectionLabel>01 — Manifeste</SectionLabel>
          <h2 className="mt-4 font-serif text-5xl italic leading-[1.05] text-primary md:text-7xl">À propos</h2>
        </div>
        <div className="about-line hidden w-[2px] rounded-full bg-accent md:block" aria-hidden="true" />
        <div className="flex min-w-0 flex-col gap-6 text-lg leading-[1.75] text-dark/85 md:text-xl">
          {PROFILE.about.map((p) => (
            <p key={p.slice(0, 20)} className="about-item max-w-[62ch]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   D. EXPÉRIENCE — La Timeline Vivante
------------------------------------------------------------------- */
function Experience() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: true },
      })
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const fromLeft = !isDesktop || i % 2 === 0
        const st = { trigger: item, start: 'top 80%' }
        gsap.from(item.querySelector('.exp-card'), {
          x: fromLeft ? (isDesktop ? -80 : -40) : 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: st,
        })
        gsap.fromTo(
          item.querySelector('.timeline-dot'),
          { scale: 1, boxShadow: '0 0 0 0 rgba(212,168,67,0.6)' },
          {
            scale: 1.6,
            boxShadow: '0 0 0 10px rgba(212,168,67,0)',
            duration: 0.45,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
            scrollTrigger: st,
          },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={ref} className="bg-[#ECE8DF] py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-16 max-w-2xl md:mb-24">
          <SectionLabel>02 — Parcours</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-primary md:text-6xl">
            Expérience <span className="font-serif font-normal italic text-accent">professionnelle</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-dark/70">
            De l'immobilier à l'hôtellerie, en passant par le téléconseil et la création d'entreprise : un fil
            rouge, le service au client.
          </p>
        </div>

        <ol className="timeline relative flex flex-col gap-10 md:gap-14">
          <span className="timeline-line absolute bottom-2 left-[11px] top-2 w-px bg-accent/70 md:left-1/2" aria-hidden="true" />
          {PROFILE.experiences.map((exp, i) => {
            const left = i % 2 === 0
            return (
              <li key={exp.company} className="timeline-item relative grid pl-10 md:grid-cols-2 md:gap-20 md:pl-0">
                <span
                  className="timeline-dot absolute left-[11px] top-9 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-[#ECE8DF] bg-accent md:left-1/2"
                  aria-hidden="true"
                />
                <article
                  className={`exp-card min-w-0 rounded-[2rem] border border-dark/5 bg-background p-7 md:p-9 ${
                    left ? 'md:col-start-1' : 'md:col-start-2'
                  }`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{exp.period}</p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-primary md:text-2xl">{exp.role}</h3>
                  <p className="mt-1 font-medium text-dark/55">{exp.company}</p>
                  <p className="mt-4 leading-relaxed text-dark/80">{exp.description}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   E. COMPÉTENCES — Le Tableau de Bord (Pattern 2 : Grille de Maîtrise)
------------------------------------------------------------------- */
const RADIUS = 44
const CIRC = 2 * Math.PI * RADIUS

function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const st = { trigger: ref.current.querySelector('.skills-grid'), start: 'top 78%' }
      gsap.from('.skill-card', { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15, scrollTrigger: st })
      gsap.utils.toArray('.skill-card').forEach((card, i) => {
        const level = Number(card.dataset.level)
        const ring = card.querySelector('.skill-ring')
        const counter = card.querySelector('.skill-count')
        const delay = 0.2 + i * 0.15
        gsap.from(ring, { strokeDashoffset: CIRC, duration: 1.6, ease: 'power2.inOut', delay, scrollTrigger: st })
        const obj = { v: 0 }
        gsap.to(obj, {
          v: level,
          duration: 1.6,
          ease: 'power2.inOut',
          delay,
          scrollTrigger: st,
          onUpdate: () => (counter.textContent = Math.round(obj.v)),
        })
      })
      gsap.from('.quality-tag', {
        scale: 0.6,
        opacity: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.6)',
        stagger: 0.06,
        scrollTrigger: { trigger: '.quality-tag', start: 'top 90%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="competences" ref={ref} className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionLabel>03 — Tableau de bord</SectionLabel>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-primary md:text-6xl">
              Compétences <span className="font-serif font-normal italic text-accent">clés</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-dark/55">
            Niveau de maîtrise auto-évalué · source de l'expérience indiquée sous chaque compétence
          </p>
        </div>

        <ul className="skills-grid flex flex-wrap justify-center gap-4 md:gap-5">
          {PROFILE.skills.map((s) => (
            <li
              key={s.name}
              data-level={s.level}
              className="skill-card flex w-[calc(50%-0.5rem)] flex-col items-center rounded-[2rem] bg-primary px-4 pb-6 pt-7 text-center text-background sm:px-6 lg:w-[calc(20%-1rem)]"
            >
              <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(245,243,238,0.08)" strokeWidth="5" />
                  <circle
                    className="skill-ring"
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - s.level / 100)}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-mono text-xl font-medium tabular-nums sm:text-2xl">
                    <span className="skill-count">{s.level}</span>
                    <span className="text-sm text-accent">%</span>
                  </span>
                </div>
              </div>
              <h3 className="mt-5 text-sm font-semibold sm:text-base leading-snug tracking-tight">{s.name}</h3>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-background/45">{s.source}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-dark/50">Qualités</p>
          <ul className="flex max-w-3xl flex-wrap justify-center gap-2.5">
            {PROFILE.qualities.map((q) => (
              <li
                key={q}
                className="quality-tag lift rounded-full border border-accent/50 px-4 py-2 text-sm font-medium text-primary hover:bg-accent hover:text-primary"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   F. FORMATION — Les Fondations
------------------------------------------------------------------- */
function Education() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.edu-item', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="formation" ref={ref} className="rounded-t-[3rem] bg-primary py-24 text-background md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="edu-item">
          <SectionLabel light>04 — Fondations</SectionLabel>
          <h2 className="mt-4 font-serif text-5xl italic leading-[1.05] md:text-6xl">Formation</h2>
          <p className="mt-5 max-w-xs leading-relaxed text-background/60">
            Un cursus en management international, entre le Sénégal et le Maroc.
          </p>
        </div>
        <ol className="flex min-w-0 flex-col gap-4">
          {PROFILE.education.map((e) => (
            <li
              key={e.school}
              className="edu-item flex items-start gap-5 rounded-[2rem] border border-background/10 bg-dark p-7 md:p-8"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                <GraduationCap size={20} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{e.place}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{e.degree}</h3>
                <p className="mt-1 text-background/55">{e.school}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   G. CONTACT — Le Pont
------------------------------------------------------------------- */
const GRID_COLS = { 1: 'max-w-lg', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }

function Contact({ onContact }) {
  const ref = useRef(null)
  const { email, phone, linkedin } = PROFILE.contact
  const links = [
    email && { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: 'Téléphone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    linkedin && {
      icon: Linkedin,
      label: 'LinkedIn',
      value: linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: linkedin,
      external: true,
    },
  ].filter(Boolean)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const st = { trigger: ref.current, start: 'top 75%' }
      gsap.from('.contact-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.contact-link', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15, delay: 0.2, scrollTrigger: st })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref} className="bg-accent py-24 text-primary md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="contact-title max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/70">05 — Contact</p>
          <h2 className="mt-4 font-serif text-5xl italic leading-[1.02] md:text-8xl">Travaillons ensemble.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary/75">
            Hôtellerie, relation client ou projet entrepreneurial : je suis ouvert aux échanges et aux nouvelles
            opportunités.
          </p>
        </div>

        <ul className={`mt-14 grid gap-3 ${GRID_COLS[links.length] || 'md:grid-cols-3'}`}>
          {links.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label} className="contact-link min-w-0">
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="lift group flex h-full items-center gap-4 rounded-[2rem] bg-primary/[0.07] p-5 transition-colors hover:bg-primary/[0.12]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-accent">
                  <Icon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-primary/60">{label}</span>
                  <span className="link-underline mt-0.5 block truncate font-semibold">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="contact-link mt-12 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onContact}
            className="btn-magnetic bg-primary !px-9 !py-5 text-base text-background shadow-[0_18px_40px_-18px_rgba(15,15,19,0.7)] before:bg-dark hover:text-accent"
          >
            <Send size={18} />
            Proposer une mission
          </button>
          <a href={PROFILE.cvPdf} download className="btn-magnetic border border-primary/25 !px-9 !py-5 text-base before:bg-primary/10">
            <Download size={18} />
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   H. PIED DE PAGE
------------------------------------------------------------------- */
function Footer() {
  return (
    <div className="bg-accent">
      <footer className="rounded-t-[4rem] bg-primary px-5 py-14 text-background sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {PROFILE.firstName} {PROFILE.lastName}
            </p>
            <p className="mt-1 text-sm text-background/50">
              Fait avec le <span className="font-serif italic text-accent">vibe coding</span> · {new Date().getFullYear()}
            </p>
          </div>
          <p className="inline-flex items-center gap-3 rounded-full border border-background/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-background/70">
            <span className="pulse-dot relative h-2 w-2 rounded-full bg-emerald-400" />
            En ligne
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------
   FORMULAIRE "ME CONTACTER" — Demande de mission
------------------------------------------------------------------- */
const EMPTY_FORM = { name: '', email: '', company: '', role: '', mission: '', goal: '', budget: '' }

function Field({ id, label, hint, children }) {
  return (
    <div className="form-item flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60">
        {label}
        {hint && <span className="ml-2 normal-case tracking-normal text-dark/35">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-2xl border border-dark/10 bg-white/70 px-5 py-3.5 text-[15px] text-primary placeholder:text-dark/30 transition focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/15'

function ContactModal({ open, onClose }) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | sent | mail | error

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('input')?.focus({ preventScroll: true })

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' })
      gsap.from(panelRef.current, { y: 60, scale: 0.97, opacity: 0, duration: 0.7, ease: 'power3.out' })
      gsap.from('.form-item', { y: 18, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.15 })
    })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStatus('idle')
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const subject = `Demande de mission — ${form.company || form.name}`
    const lines = [
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Entreprise : ${form.company}`,
      `Poste : ${form.role}`,
      '',
      `Mission proposée :\n${form.mission}`,
      '',
      `Objectif :\n${form.goal}`,
      '',
      `Budget : ${form.budget}`,
    ]

    if (PROFILE.formEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(PROFILE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ _subject: subject, ...form }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        setForm(EMPTY_FORM)
      } catch {
        setStatus('error')
      }
      return
    }

    window.location.href = `mailto:${PROFILE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setStatus('mail')
  }

  const done = status === 'sent' || status === 'mail'

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div ref={overlayRef} className="absolute inset-0 bg-primary/75 backdrop-blur-md" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2.5rem] bg-background shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:rounded-[2.5rem]"
      >
        <div className="relative overflow-hidden rounded-t-[2.5rem] bg-primary px-7 pb-8 pt-8 text-background sm:px-10">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(70% 90% at 100% 0%, rgba(212,168,67,0.22) 0%, rgba(212,168,67,0) 70%)' }}
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              {PROFILE.photo && (
                <img src={PROFILE.photo} alt="" className="h-14 w-14 shrink-0 rounded-full border-2 border-accent/80 object-cover" />
              )}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Demande de mission</p>
                <h2 id="contact-modal-title" className="mt-1 font-serif text-3xl italic leading-tight sm:text-4xl">
                  Parlons de votre projet
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le formulaire"
              className="lift grid h-10 w-10 shrink-0 place-items-center rounded-full border border-background/15 text-background/80 hover:border-accent hover:text-accent"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {done ? (
          <div className="flex flex-col items-center px-7 py-14 text-center sm:px-10">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
              <CircleCheck size={30} />
            </span>
            <h3 className="mt-6 font-serif text-3xl italic text-primary">Merci !</h3>
            <p className="mt-3 max-w-md leading-relaxed text-dark/70">
              {status === 'sent'
                ? 'Votre demande est bien envoyée. Je vous réponds personnellement sous 48 heures.'
                : "Votre demande est pré-remplie dans votre messagerie : il ne reste qu'à l'envoyer. Si rien ne s'est ouvert, écrivez-moi à l'adresse ci-dessous."}
            </p>
            <p className="mt-4 font-mono text-xs text-dark/50">
              Vous pouvez aussi m'écrire à <span className="select-all text-primary">{PROFILE.contact.email}</span>
            </p>
            <button type="button" onClick={onClose} className="btn-magnetic btn-accent mt-8">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-7 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="cf-name" label="Nom complet">
                <input id="cf-name" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Marie Dupont" className={inputClass} />
              </Field>
              <Field id="cf-email" label="Email">
                <input id="cf-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} placeholder="marie@entreprise.com" className={inputClass} />
              </Field>
              <Field id="cf-company" label="Entreprise">
                <input id="cf-company" required autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Nom de l'entreprise" className={inputClass} />
              </Field>
              <Field id="cf-role" label="Votre poste">
                <input id="cf-role" required autoComplete="organization-title" value={form.role} onChange={set('role')} placeholder="Directrice d'hôtel, RH…" className={inputClass} />
              </Field>
            </div>

            <Field id="cf-mission" label="La mission à me confier">
              <textarea id="cf-mission" required rows={3} value={form.mission} onChange={set('mission')} placeholder="Décrivez le poste ou la mission : missions principales, durée, lieu…" className={`${inputClass} resize-none`} />
            </Field>

            <Field id="cf-goal" label="Le but recherché">
              <textarea id="cf-goal" required rows={2} value={form.goal} onChange={set('goal')} placeholder="Quel résultat attendez-vous de cette collaboration ?" className={`${inputClass} resize-none`} />
            </Field>

            <fieldset className="form-item flex flex-col gap-3">
              <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60">Budget envisagé</legend>
              <div className="flex flex-wrap gap-2">
                {PROFILE.budgets.map((b, i) => (
                  <label key={b} className="cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      id={`cf-budget-${i}`}
                      value={b}
                      required
                      checked={form.budget === b}
                      onChange={set('budget')}
                      className="peer sr-only"
                    />
                    <span className="lift inline-block rounded-full border border-dark/15 px-4 py-2.5 text-sm font-medium text-dark/75 transition-colors hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-primary peer-focus-visible:ring-4 peer-focus-visible:ring-accent/30">
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {status === 'error' && (
              <p className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-800">
                L'envoi n'a pas abouti. Réessayez, ou écrivez-moi directement à {PROFILE.contact.email}.
              </p>
            )}

            <div className="form-item mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] leading-relaxed text-dark/45">Réponse personnelle sous 48 h.</p>
              <button type="submit" disabled={status === 'sending'} className="btn-magnetic btn-accent !py-4 disabled:opacity-60">
                <Send size={17} />
                {status === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const sentinelRef = useRef(null)
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)
  const closeContact = useCallback(() => setContactOpen(false), [])

  return (
    <>
      <Noise />
      <Navbar sentinelRef={sentinelRef} />
      <main>
        <Hero sentinelRef={sentinelRef} onContact={openContact} />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact onContact={openContact} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={closeContact} />
    </>
  )
}
