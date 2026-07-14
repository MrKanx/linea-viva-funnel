import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import FunnelView from '../views/FunnelView.vue'
import VideoView from '../views/VideoView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import BookingView from '../views/BookingView.vue'
import BookedView from '../views/BookedView.vue'
import NoSpaceView from '../views/NoSpaceView.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    ogTitle: string
    ogDescription: string
    ogUrl: string
    jsonLd?: object[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    {
      path: '/',
      alias: '/registro-vsl-tr',
      name: 'funnel',
      component: FunnelView,
      meta: {
        title: 'Línea Viva | Construir o remodelar el espacio de tus sueños',
        description:
          'Transformamos tu espacio con la metodología Línea Viva 360. Un solo equipo planifica, ejecuta y responde por tu proyecto completo.',
        canonical: 'https://lineaviva.com/',
        ogTitle: 'Línea Viva | Construir o remodelar el espacio de tus sueños',
        ogDescription:
          'Transformamos tu espacio con la metodología Línea Viva 360. Un solo equipo planifica, ejecuta y responde por tu proyecto completo.',
        ogUrl: 'https://lineaviva.com/',
      } satisfies RouteMeta,
    },
    {
      path: '/ver-video',
      name: 'video',
      component: VideoView,
      meta: {
        title: 'Mira el video | Línea Viva — Paso 1 de 2',
        description: 'Descubre cómo construir o remodelar sin estrés con la metodología Línea Viva 360.',
        canonical: 'https://lineaviva.com/ver-video',
        ogTitle: 'Mira el video | Línea Viva',
        ogDescription: 'Ve el video y agenda tu sesión con nuestro equipo.',
        ogUrl: 'https://lineaviva.com/ver-video',
      } satisfies RouteMeta,
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        title: 'Agenda tu Sesión | Línea Viva — Paso 2 de 2',
        description: 'Selecciona el día y hora para tu sesión de evaluación de proyecto.',
        canonical: 'https://lineaviva.com/agendar',
        ogTitle: 'Agenda tu Sesión | Línea Viva',
        ogDescription: 'Elige tu horario y reserva tu sesión.',
        ogUrl: 'https://lineaviva.com/agendar',
      } satisfies RouteMeta,
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: BookedView,
      meta: {
        title: 'Sesión Confirmada | Línea Viva',
        description: 'Tu sesión con Línea Viva está confirmada. Revisa tu correo.',
        canonical: 'https://lineaviva.com/cita-confirmada',
        ogTitle: 'Sesión Confirmada | Línea Viva',
        ogDescription: 'Tu sesión está reservada. Te contactaremos pronto.',
        ogUrl: 'https://lineaviva.com/cita-confirmada',
      } satisfies RouteMeta,
    },
    {
      path: '/sin-espacio',
      name: 'no-space',
      component: NoSpaceView,
      meta: {
        title: 'Sin Cupos Disponibles | Línea Viva',
        description: 'En este momento los cupos para proyectos de Línea Viva están completos.',
        canonical: 'https://lineaviva.com/sin-espacio',
        ogTitle: 'Sin Cupos Disponibles | Línea Viva',
        ogDescription: 'Los cupos para nuevos proyectos están completos. Te avisaremos cuando haya disponibilidad.',
        ogUrl: 'https://lineaviva.com/sin-espacio',
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | Línea Viva',
        description: 'Política de privacidad de Línea Viva. Información sobre el tratamiento de datos personales.',
        canonical: 'https://lineaviva.com/politicas-privacidad',
        ogTitle: 'Política de Privacidad | Línea Viva',
        ogDescription: 'Política de privacidad de Línea Viva.',
        ogUrl: 'https://lineaviva.com/politicas-privacidad',
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | Línea Viva',
        description: 'Aviso legal de Línea Viva. Términos y condiciones de uso del sitio web.',
        canonical: 'https://lineaviva.com/aviso-legal',
        ogTitle: 'Aviso Legal | Línea Viva',
        ogDescription: 'Aviso legal de Línea Viva.',
        ogUrl: 'https://lineaviva.com/aviso-legal',
      } satisfies RouteMeta,
    },
  ],
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el) }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? 'Línea Viva'
  setMeta('description', meta.description ?? '')
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? '')
  setOgMeta('og:url', meta.ogUrl ?? '')
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? '')
  setCanonical(meta.canonical ?? '')
})

// ── Router Guards ──────────────────────────────────────────────────────────────
const BOOKED_TTL_MS = 3 * 24 * 60 * 60 * 1000
const DISQ_TTL_MS   = 48 * 60 * 60 * 1000

const readTimestamp = (key: string): number | null => {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : null
}

const isFresh = (key: string, ttl: number): boolean => {
  const ts = readTimestamp(key)
  if (ts === null) return false
  if (Date.now() - ts <= ttl) return true
  localStorage.removeItem(key)
  return false
}

const PUBLIC_ROUTES = ['privacy-policy', 'legal-notice']

router.beforeEach((to, from, next) => {
  const routeName = to.name as string
  if (PUBLIC_ROUTES.includes(routeName)) return next()

  const bookedFresh = isFresh('os_booked_at', BOOKED_TTL_MS)
  const disqFresh   = isFresh('os_disq_at',   DISQ_TTL_MS)

  if (routeName === 'booked') {
    if (!bookedFresh && !import.meta.env.DEV) return next({ name: 'funnel' })
    return next()
  }

  if (bookedFresh && !import.meta.env.DEV) {
    return next({ name: 'booked' })
  }

  if (disqFresh && ['booking', 'booked'].includes(routeName) && !import.meta.env.DEV) {
    return next({ name: 'no-space' })
  }

  if (routeName === 'no-space' && !disqFresh && !import.meta.env.DEV) {
    return next({ name: 'funnel' })
  }

  next()
})

export default router
