export const COINS = [
  { id: 'BTC', name: 'Bitcoin', sym: '₿', color: '#F7931A', price: 95420 },
  { id: 'ETH', name: 'Ethereum', sym: 'Ξ', color: '#627EEA', price: 3280 },
  { id: 'SOL', name: 'Solana', sym: '◎', color: '#9945FF', price: 142 },
  { id: 'BNB', name: 'BNB', sym: 'B', color: '#F3BA2F', price: 412 },
  { id: 'USDT', name: 'Tether', sym: '$', color: '#26A17B', price: 1 },
] as const;

export const TICKERS = [
  { s: 'BTC', p: 95420, c: 2.4 },
  { s: 'ETH', p: 3280, c: 1.8 },
  { s: 'SOL', p: 142, c: 5.1 },
  { s: 'BNB', p: 412, c: -0.9 },
  { s: 'ADA', p: 0.52, c: 3.2 },
  { s: 'XRP', p: 0.61, c: -1.1 },
  { s: 'DOT', p: 8.9, c: 4.3 },
  { s: 'MATIC', p: 0.88, c: 2.7 },
  { s: 'AVAX', p: 38.2, c: -0.5 },
  { s: 'LINK', p: 14.6, c: 1.9 },
];

export const FEATURES = [
  {
    title: 'Trading ultrarrápido',
    desc: 'Ejecuta órdenes en milisegundos con nuestro motor de matching de última generación.',
    color: '#22D3EE',
    icon: 'zap',
  },
  {
    title: 'Seguridad bancaria',
    desc: 'Cold storage multifirma, 2FA y encriptación AES-256 para todos tus activos.',
    color: '#8B5CF6',
    icon: 'shield',
  },
  {
    title: 'Comisiones mínimas',
    desc: 'Solo 0.1% por transacción spot. Sin cargos ocultos ni sorpresas en tu cartera.',
    color: '#10B981',
    icon: 'percent',
  },
];

export const STATS = [
  { value: '$2.4B+', label: 'Volumen diario' },
  { value: '1.8M+', label: 'Usuarios activos' },
  { value: '200+', label: 'Criptomonedas' },
];

export const HOW_STEPS = [
  { n: '01', title: 'Crea tu cuenta', desc: 'Solo tu email y contraseña. Sin formularios interminables.' },
  { n: '02', title: 'Verifica tu identidad', desc: 'KYC automatizado. Aprobación en menos de 24 horas.' },
  { n: '03', title: 'Deposita fondos', desc: 'Vía transferencia bancaria, tarjeta o directo en cripto.' },
  { n: '04', title: 'Opera al instante', desc: 'Accede a más de 200 pares de trading inmediatamente.' },
];

export const TESTIMONIALS = [
  {
    text: '"Antares cambió completamente mi forma de invertir. La interfaz es increíblemente intuitiva y las comisiones son las más bajas que he visto."',
    name: 'Alejandro López', role: 'Trader · México', initials: 'AL', from: '#06B6D4', to: '#8B5CF6',
    stars: 5,
  },
  {
    text: '"La velocidad de ejecución es brutal. Nunca pierdo una entrada por slippage. El soporte responde en minutos, algo inusual en el sector."',
    name: 'Sofía Castro', role: 'Gestora de fondos · Argentina', initials: 'SC', from: '#10B981', to: '#06B6D4',
    stars: 5,
  },
  {
    text: '"Migré desde otra plataforma y no me arrepiento. El exchange calculator es preciso y la seguridad me da total tranquilidad para grandes posiciones."',
    name: 'Miguel Ruiz', role: 'Inversor · España', initials: 'MR', from: '#8B5CF6', to: '#EC4899',
    stars: 4,
  },
];

export const FAQS = [
  {
    q: '¿Cómo deposito fondos en Antares?',
    a: 'Puedes depositar vía transferencia bancaria (SEPA/SWIFT), tarjeta de crédito/débito o directamente en criptomonedas. El proceso tarda entre 5 minutos y 1 día hábil según el método.',
  },
  {
    q: '¿Cuáles son las comisiones exactas?',
    a: '0.1% por transacción en spot trading y 0.05% para market makers. Sin comisiones ocultas. Los retiros en cripto son gratuitos; en fiat aplica un cargo mínimo de red.',
  },
  {
    q: '¿Es seguro guardar mis fondos aquí?',
    a: 'El 95% de los activos se guardan en cold wallets multifirma. Tenemos seguro de $250,000 por cuenta, auditorías de seguridad trimestrales y certificación SOC 2 Type II.',
  },
  {
    q: '¿Tienen aplicación móvil?',
    a: 'Sí, disponible para iOS y Android con funcionalidad completa incluyendo trading, depósitos, retiros y notificaciones push en tiempo real.',
  },
  {
    q: '¿En qué países opera Antares?',
    a: 'Operamos en más de 50 países de Latinoamérica, Europa y Asia. EE.UU. no está disponible actualmente por regulaciones locales.',
  },
];

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/features', label: 'Detalles' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contact', label: 'Contacto' },
];

export const TEAM = [
  { initials: 'CR', name: 'Carlos Reyes', role: 'CEO & Co-founder', bio: 'Ex-Coinbase · 12 años en crypto', from: '#06B6D4', to: '#8B5CF6' },
  { initials: 'LM', name: 'Laura Méndez', role: 'CTO & Co-founder', bio: 'Ex-Google · PhD MIT', from: '#10B981', to: '#06B6D4' },
  { initials: 'PG', name: 'Pablo García', role: 'CFO', bio: 'Ex-Goldman Sachs · CFA', from: '#8B5CF6', to: '#EC4899' },
  { initials: 'AT', name: 'Ana Torres', role: 'Head of Design', bio: 'Ex-Stripe · Awwwards speaker', from: '#F59E0B', to: '#EF4444' },
];


export const COMPANY = {
  mision: 'Hacer el trading de criptomonedas accesible, seguro y fácil de usar para todos. Nuestra plataforma fue creada con la visión de empoderar a las personas para explorar el mundo de las monedas digitales.',
  vision: 'Un ecosistema cripto donde nuestra plataforma sirva como nexo para los entusiastas. No solo una plataforma — somos un catalizador de cambio donde todos pueden conectar, innovar y dar forma al futuro de las finanzas.',
  quienesSomos: 'Somos un equipo de expertos en blockchain y criptomonedas con años de experiencia en la industria. Nuestros diversos antecedentes en finanzas, tecnología y seguridad nos permiten ofrecer una plataforma que prioriza la seguridad, la transparencia y la innovación.',
  email: 'support@antarescapitalx.com',
  direccion: '22 Baker Street, London',
  dominio: 'https://antares-capitalx.com',
};