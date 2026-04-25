import { useState } from "react";




/* ═══ BRAND ═══════════════════════════════════════════════════ */
const G = {
  bg:"#FAF9F4", white:"#FFFFFF", gold:"#B8935A", goldLt:"#D4B483",
  goldDk:"#8B6A35", black:"#0C0B09", ink:"#2A2520", gray:"#6B6560",
  muted:"#9A948E", border:"#E4DDD4", light:"#F2EDE6",
};

/* ═══ LOGO ════════════════════════════════════════════════════ */
const Logo = ({ size=64 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{display:"block",flexShrink:0}}>
    <defs>
      <radialGradient id="lg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#F5F0E2"/><stop offset="100%" stopColor="#EDE5D0"/></radialGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1A3A5C"/><stop offset="40%" stopColor="#2E6B4A"/><stop offset="70%" stopColor="#8B7A2A"/><stop offset="100%" stopColor="#A0421A"/></linearGradient>
      <linearGradient id="lg3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2A5080"/><stop offset="50%" stopColor="#4A8A60"/><stop offset="100%" stopColor="#C07030"/></linearGradient>
      <linearGradient id="lg4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3A6090"/><stop offset="50%" stopColor="#60A070"/><stop offset="100%" stopColor="#D08040"/></linearGradient>
      <linearGradient id="lg5" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#D4A84A"/><stop offset="50%" stopColor="#B8935A"/><stop offset="100%" stopColor="#8B6A30"/></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="96" fill="url(#lg1)"/>
    {Array.from({length:24},(_,i)=>{const a=(i*15)*Math.PI/180;return <line key={i} x1="100" y1="100" x2={100+90*Math.cos(a)} y2={100+90*Math.sin(a)} stroke="#C8B880" strokeWidth="0.4" strokeOpacity="0.3"/>;}) }
    <circle cx="100" cy="100" r="94" fill="none" stroke="white" strokeWidth="3" opacity="0.8"/>
    <path d="M 28,108 A 72,72 0 0,1 172,108" fill="none" stroke="url(#lg4)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M 34,108 A 66,66 0 0,1 166,108" fill="none" stroke="url(#lg3)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M 40,108 A 60,60 0 0,1 160,108" fill="none" stroke="url(#lg2)" strokeWidth="5" strokeLinecap="round"/>
    <g stroke="url(#lg5)" strokeWidth="2.5" fill="none" strokeLinejoin="round">
      <polyline points="58,108 100,72 142,108"/>
      <polyline points="68,108 68,120 132,120 132,108"/>
      <rect x="90" y="108" width="20" height="12" strokeWidth="1.5"/>
      <rect x="116" y="78" width="8" height="12" strokeWidth="1.5"/>
    </g>
    <g transform="translate(100,100) rotate(-42) translate(-100,-100)">
      <rect x="118" y="38" width="7" height="58" rx="3" fill="#1A1A1A"/>
      <rect x="117" y="93" width="9" height="10" rx="1" fill="#9A9080"/>
      <rect x="118" y="94" width="3" height="8" rx="0.5" fill="#D4C8B0" opacity="0.6"/>
      <path d="M 117,103 Q 121.5,115 120,122 Q 121,128 122,130 L 121,130 Q 119,127 121,122 Q 119,115 118,103 Z" fill="#2A1A0A"/>
      <path d="M 122,103 Q 126,114 124,122 Q 125,128 123,130 L 122,130 Q 122,127 123,122 Q 125,114 121,103 Z" fill="#1A0A00"/>
      <ellipse cx="121" cy="45" rx="1.5" ry="4" fill="white" opacity="0.7" transform="rotate(10,121,45)"/>
    </g>
    <text x="100" y="150" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="15" fontWeight="600" fill="#2A2520" letterSpacing="1">PEINTURE &amp;</text>
    <text x="100" y="168" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="15" fontWeight="600" fill="#2A2520" letterSpacing="0.5">RÉNOVATION</text>
  </svg>
);

/* ═══ CONTACT BAR (affiché sur toutes les pages) ═══════════ */
const Contact = () => (
  <div style={{background:G.gold,padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:32,flexWrap:"wrap"}}>
    {[
      {icon:"📞", label:"06 16 70 57 57", href:"tel:+33616705757"},
      {icon:"✉️", label:"peintureetrenovation13@gmail.com", href:"mailto:peintureetrenovation13@gmail.com"},
      {icon:"📍", label:"Pays d'Aix-en-Provence", href:null},
    ].map((c,i)=>(
      <div key={i} style={{display:"flex",alignItems:"center",gap:7}}>
        <span style={{fontSize:13}}>{c.icon}</span>
        {c.href
          ? <a href={c.href} style={{fontFamily:"'Jost',sans-serif",fontSize:11,fontWeight:500,color:G.white,letterSpacing:"0.5px",textDecoration:"none"}}>{c.label}</a>
          : <span style={{fontFamily:"'Jost',sans-serif",fontSize:11,color:G.white,letterSpacing:"0.5px"}}>{c.label}</span>
        }
      </div>
    ))}
  </div>
);

/* ═══ PALETTES ════════════════════════════════════════════════ */
const PALETTES = [
  { id:"blancs", nom:"Blancs de Provence", ambiance:"Lumineux · Intemporel",
    couleurs:[{nom:"Blanc Calcaire",hex:"#F5F0E6",ref:"CRO-0001"},{nom:"Ivoire Doux",hex:"#EDE5D0",ref:"CRO-0012"},{nom:"Lin Naturel",hex:"#E0D2B8",ref:"CRO-0024"},{nom:"Crème Soleil",hex:"#D8C89C",ref:"CRO-0038"}],
    desc:"La base intemporelle. Agrandit et illumine sous la lumière du Midi.", piece:"Séjour · Chambre · Entrée" },
  { id:"ocres", nom:"Ocres & Terres du Sud", ambiance:"Chaleureux · Authentique",
    couleurs:[{nom:"Ocre Roussillon",hex:"#D4956A",ref:"CRO-1042"},{nom:"Terracotta",hex:"#C07850",ref:"CRO-1058"},{nom:"Argile Rose",hex:"#C8A080",ref:"CRO-1033"},{nom:"Cannelle",hex:"#A06840",ref:"CRO-1071"}],
    desc:"Les teintes emblématiques de la Provence. Chaleur et caractère.", piece:"Cuisine · Séjour · Salle à manger" },
  { id:"pierres", nom:"Grès & Pierre", ambiance:"Moderne · Élégant",
    couleurs:[{nom:"Pierre Calcaire",hex:"#D8D0C0",ref:"CRO-2011"},{nom:"Gris Garrigue",hex:"#B8B0A0",ref:"CRO-2024"},{nom:"Ardoise Claire",hex:"#909080",ref:"CRO-2038"},{nom:"Gris Anthracite",hex:"#606058",ref:"CRO-2056"}],
    desc:"Inspirés des pierres locales. Sobres et contemporains.", piece:"Bureau · Chambre · Couloir" },
  { id:"lavandes", nom:"Bleus & Lavande", ambiance:"Apaisant · Provençal",
    couleurs:[{nom:"Brume Lavande",hex:"#C8C0D8",ref:"CRO-3014"},{nom:"Bleu Ciel Midi",hex:"#A8C0D0",ref:"CRO-3022"},{nom:"Lavande Profonde",hex:"#8878A8",ref:"CRO-3036"},{nom:"Indigo Doux",hex:"#6878A0",ref:"CRO-3048"}],
    desc:"L'âme de la Provence en couleur. Reposant et poétique.", piece:"Chambre · Salle de bain · Couloir" },
  { id:"garrigue", nom:"Verts Garrigue", ambiance:"Naturel · Zen",
    couleurs:[{nom:"Romarin Pâle",hex:"#C8D0C0",ref:"CRO-4008"},{nom:"Sauge",hex:"#A0B098",ref:"CRO-4019"},{nom:"Olive",hex:"#788860",ref:"CRO-4031"},{nom:"Cyprès",hex:"#506048",ref:"CRO-4044"}],
    desc:"Les verts de la nature provençale. Tendance et connectés.", piece:"Salon · Chambre · Véranda" },
  { id:"nuits", nom:"Nuits Profondes", ambiance:"Audacieux · Luxueux",
    couleurs:[{nom:"Nuit Provençale",hex:"#2C3A4A",ref:"CRO-5062"},{nom:"Bleu Marine",hex:"#2A4060",ref:"CRO-5074"},{nom:"Vert Bouteille",hex:"#2A4030",ref:"CRO-5083"},{nom:"Anthracite Chaud",hex:"#3A3830",ref:"CRO-5091"}],
    desc:"Pour les audacieux. Un mur foncé valorise vos meubles et objets.", piece:"Salon · Chambre adulte · Bibliothèque" },
  { id:"tendance", nom:"Tendance 2025", ambiance:"Luxe éditorial · AD / Elle Déco", emoji:"✦",
    couleurs:[
      {nom:"Mocha Mousse",    hex:"#A07862", ref:"CRO-T001"},
      {nom:"Truffe Chaude",   hex:"#7D6455", ref:"CRO-T012"},
      {nom:"Parchemin",       hex:"#EDE0CC", ref:"CRO-T023"},
      {nom:"Grès Fumé",       hex:"#B0A090", ref:"CRO-T034"},
    ],
    desc:"Inspiré de Vogue Living et AD. Mocha Mousse (Pantone 2025), terres profondes et matières naturelles.", piece:"Séjour · Chambre · Entrée" },
  { id:"zen", nom:"Wabi-Sabi & Matières", ambiance:"Minimalisme japonais · Impermanence", emoji:"🍃",
    couleurs:[
      {nom:"Lin Cendré",      hex:"#D8CFBE", ref:"CRO-Z001"},
      {nom:"Argile Rosée",    hex:"#C4A898", ref:"CRO-Z012"},
      {nom:"Terre Verte",     hex:"#7A8C7A", ref:"CRO-Z023"},
      {nom:"Charbon Doux",    hex:"#5A5550", ref:"CRO-Z034"},
    ],
    desc:"L'esthétique wabi-sabi : imperfection, matières brutes, calme profond. Tendance forte dans les intérieurs luxe 2025.", piece:"Chambre · Bureau · Salle de bain" },
  { id:"velvet", nom:"Velvet & Couture", ambiance:"Haute couture · Profondeur chromatique", emoji:"♦",
    couleurs:[
      {nom:"Nuit Mauve",      hex:"#3D3050", ref:"CRO-V001"},
      {nom:"Rose Sépia",      hex:"#C09880", ref:"CRO-V012"},
      {nom:"Lait de Nacre",   hex:"#F0E8DC", ref:"CRO-V023"},
      {nom:"Rouille Précieux",hex:"#9A5A40", ref:"CRO-V034"},
    ],
    desc:"Profondeur, sensualité et raffinement. Les teintes des maisons de couture et hôtels 5 étoiles. Pour des intérieurs signature.", piece:"Salon · Chambre parentale · Dressing" },
];

/* ═══ PRODUITS (préparations PUIS peintures) ═══════════════ */
const PRODUITS = [
  /* ── PRÉPARATIONS ── */
  {
    id:"ratissage", categorie:"preparation", icon:"🏗️",
    nom:"Ratissage complet — Proliss F200", marque:"Soffec · Proliss F200 — Enduit 3 en 1",
    tag:"Rénovation complète · Notre technique phare",
    couleur:"#8B6A35",
    pour:"Murs & plafonds · Tous supports · Neuf & rénovation",
    lien:"https://www.sofec.net/fr/proliss-f200",
    points:[
      "Passage de plusieurs couches d'enduit à la grande liseuse sur l'intégralité des murs et plafonds",
      "Enduit Proliss : aspect tendu parfait — finition haute qualité",
      "Très blanc, très couvrant — mat profond",
      "Rendement 1,2 à 1,5 kg/m² · Séchage 6 à 48h",
      "Classement au feu A2-S1, d0 — conforme DTU",
    ],
    process:"1. Voile de révélateur (100–200 g/m²) → 2. Révision soignée des défauts → 3. Couche finale à 80 cm (1,3 kg/m²) sans lissage",
    limites:["Application mécanisée (pompe Airless)","Supports doivent être sains, secs, propres"],
    conseil:"Quand on rénove sérieusement, on ratisse tout. C'est la technique qui garantit des murs parfaitement tendus avant la mise en peinture.",
  },
  {
    id:"prep_ponctu", categorie:"preparation", icon:"🔧",
    nom:"Préparation ponctuelle", marque:"Soffec · Enduit fibré & résiné",
    tag:"Support avec petits défauts",
    couleur:"#7A8860",
    pour:"Murs avec quelques fissures, petits trous, irrégularités · Murs neufs en plaque de plâtre déjà jointée",
    lien:"https://sofec.net/produit/enduit-de-rebouchage/",
    points:[
      "Rebouchage ponctuel des fissures et petits trous",
      "Enduit fibré pour les fissures — évite la reprise",
      "Enduit résiné pour adhérence sur supports difficiles",
      "Toile de rénovation si nécessaire sur zones fragilisées",
      "Ponçage général avant mise en peinture",
      "Sur plaque de plâtre neuve déjà jointée : impression + ponçage léger des joints avant mise en peinture",
    ],
    process:"1. Dépoussiérage général → 2. Rebouchage fissures (enduit fibré) → 3. Ponçage général → 4. Dépoussiérage → 5. Impression Maoline\nSur BA13 neuf : 1. Vérification joints → 2. Ponçage léger → 3. Dépoussiérage → 4. Impression Maoline",
    limites:["Ne traite pas les supports très dégradés","Pour rénovation lourde : préférer le ratissage complet"],
    conseil:"Pour les murs en bon état général avec quelques défauts ponctuels. Résultat propre sans passer en ratissage complet.",
  },
  {
    id:"poncage", categorie:"preparation", icon:"✦",
    nom:"Préparation légère", marque:"Support sain · Ponçage général",
    tag:"Support en bon état · Finition C",
    couleur:"#5878A8",
    pour:"Murs propres · Ancienne peinture adhérente · Neuf",
    lien:"https://www.zolpan.fr/catalogue-produits/peintures/interieur/impressions/maoline",
    points:[
      "Ponçage général pour ouvrir et homogénéiser le support",
      "Dépoussiérage soigné à la brosse puis aspirateur",
      "Rebouchage ponctuel des trous et petits défauts",
      "Lissage des angles et raccords",
      "Séchage complet avant mise en peinture",
    ],
    process:"1. Ponçage général → 2. Dépoussiérage → 3. Rebouchage ponctuel trous → 4. Mise en peinture",
    limites:["Uniquement pour supports en bon état","Ne traite pas les fissures importantes"],
    conseil:"La préparation Finition C : pour un support sain, un ponçage général et le rebouchage des trous suffisent. La mise en peinture avec Maoline démarre ensuite.",
  },
  /* ── PEINTURES ── */
  {
    id:"maoline", categorie:"peinture", icon:"◉",
    nom:"Maoline", marque:"Zolpan",
    tag:"Impression universelle · Base obligatoire avant mise en peinture",
    couleur:"#C8A050",
    pour:"Murs & plafonds · Tous supports intérieurs préparés",
    lien:"https://www.zolpan.fr/catalogue-produits/peintures/interieur/impressions/maoline",
    points:[
      "Impression acrylique universelle haut de gamme",
      "Accroche parfaite sur tous supports préparés",
      "Pénètre et consolide le support — évite les reprises",
      "Blanc très couvrant — sèche en 2h",
      "Base indispensable avant Maotop Mat ou Class 1 Velours",
      "Rendement 10–12 m²/L",
    ],
    process:"1 couche Maoline → 2 couches de finition (Maotop Mat ou Class 1 Velours)",
    limites:["Ne pas utiliser comme finition finale","Support doit être sain, propre et dépoussiéré"],
    conseil:"L'impression qu'on passe systématiquement avant chaque mise en peinture. Elle garantit l'adhérence et l'uniformité du fond — la base de tout résultat impeccable.",
  },
  {
    id:"maotop", categorie:"peinture", icon:"⭐",
    nom:"Maotop Mat", marque:"Zolpan",
    tag:"Notre produit phare · Finition mate",
    couleur:G.gold,
    pour:"Murs & plafonds intérieurs · Toutes pièces",
    lien:"https://www.zolpan.fr/produit/maotop-mat",
    points:[
      "Mat lessivable classe 1 — se nettoie sans jamais lustrer",
      "Séchage 30 min · Recouvrable dans la journée",
      "Aspect pommelé fin d'une grande élégance",
      "Label NF Environnement · Locaux occupés · HQE",
      "1 200+ teintes nuancier Cromology Zolpan",
      "Rendement 10–12 m²/L",
    ],
    process:"Impression Maoline → 2 couches Maotop Mat",
    limites:["Uniquement murs & plafonds intérieurs","Support à préparer selon état"],
    conseil:"Notre peinture signature. Mat haut de gamme et lessivable classe 1 — le meilleur des deux mondes.",
  },
  {
    id:"class1", categorie:"peinture", icon:"◆",
    nom:"Class 1 Velours", marque:"Tollens",
    tag:"Finition velours lessivable",
    couleur:"#7060A0",
    pour:"Murs & plafonds · Pièces sèches et humides",
    lien:"https://www.tollens.com/produit/class-1-velours",
    points:[
      "Velours lessivable classe 1 — très haute résistance",
      "Garnissante et opacifiante — finition A ou B selon support",
      "Sans reprise — facilement retouchable",
      "Glisse remarquable — grand confort d'application",
      "Applicable rouleau ou airless",
      "Adaptée pièces sèches et humides",
    ],
    process:"Impression Maoline → 2 couches Class 1 Velours",
    limites:["Préparation du support déterminante pour le rendu","Aspect velouté nécessite un bon fond"],
    conseil:"La velours qu'on recommande pour les pièces à vivre. Douce à l'œil, résistante au quotidien.",
  },
  {
    id:"ondilak", categorie:"peinture", icon:"◇",
    nom:"Ondilak Collection", marque:"Zolpan",
    tag:"Laque haute performance · Portes & menuiseries uniquement",
    couleur:"#8060A0",
    pour:"Portes · Menuiseries · Boiseries · Plinthes",
    lien:"https://www.zolpan.fr/catalogue-produits/peintures/interieur/peintures-satinees/ondilak-collection-satin",
    points:[
      "Laque polyuréthane haut de gamme spéciale boiseries",
      "Haut tendu, aspect lisse — profondeur des teintes",
      "Résistance maximale aux chocs et tâches",
      "Opacifiante dès la 1ère couche",
      "Dépolluante — technologie anti-formaldéhyde",
      "NF Env · Label Excell+ · Classe A+ · Classe 1 abrasion",
      "4 finitions : mat, velours, satin, brillant",
    ],
    process:"Primaire si nécessaire → 2 couches Ondilak Collection",
    limites:["Réservée aux menuiseries et boiseries — pas pour les murs","Fond parfaitement préparé obligatoire"],
    conseil:"Notre laque dédiée aux portes et menuiseries. Résultat digne d'une finition de carrosserie sur vos boiseries.",
  },
  {
    id:"cross", categorie:"peinture", icon:"◈",
    nom:"Cross Velouté", marque:"Tollens",
    tag:"Primaire universel multi-supports",
    couleur:"#6A8A50",
    pour:"Bois · Métaux · PVC · Béton · Supports difficiles",
    lien:"https://www.tollens.com/produit/cross",
    points:[
      "Primaire universel 2 en 1 — impression & finition",
      "Adhérence multi-supports sans primaire préalable",
      "Isole les taches courantes (nicotine, suie)",
      "Intérieur et extérieur · Pièces sèches et humides",
      "Recouvrable par toute finition acrylique ou glycéro",
    ],
    process:"Directement sur le support difficile → Ondilak ou autre finition",
    limites:["Ne pas utiliser sur RPE, RSE, ITE","Préférer en blanc ou teinte claire en primaire"],
    conseil:"Le primaire de confiance pour tous les supports difficiles avant la pose d'Ondilak sur les menuiseries.",
  },
];

/* ═══ TARIFS ESTIMATIF ════════════════════════════════════════ */
const TARIFS_PREP = {
  bon:     { label:"Finition C — Préparation légère : ponçage général + rebouchage des trous", min:2,  max:10  },
  moyen:   { label:"Finition B — Préparation ponctuelle : ponçage + rebouchage + ratissage partiel", min:12, max:20 },
  complet: { label:"Finition A — Ratissage complet Proliss F200 (3 en 1)",          min:19, max:28 },
};
const TARIFS_PEINTURE = {
  mat:     { label:"Maotop Mat (Zolpan) — Maoline + 2 couches",     min:18, max:27 },
  velours: { label:"Class 1 Velours (Tollens) — Maoline + 2 couches", min:18, max:27 },
};
const TARIF_PORTE = { min:80, max:140 }; // par porte, menuiseries comprises

/* ═══ HARMONIES ══════════════════════════════════════════════ */
const h2h = hex=>{let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return[h*360,s*100,l*100];};
const h2hex=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return"#"+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,"0")).join("");};

/* ═══ ROOM — Salon SVG dessiné en perspective ════════════════ */
const Room = ({ mur="#E8E2D6", plafond="#F5F2EC", sol="#C4A882", accent=null }) => {
  const ac = accent||mur;
  return (
    <div style={{position:"relative",width:"100%",paddingTop:"56%"}}>
      <svg viewBox="0 0 1000 560" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"block"}}>
        <defs>
          <linearGradient id="lwS" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.15"/>
          </linearGradient>
          <linearGradient id="rwS" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.12"/>
          </linearGradient>
          <linearGradient id="cS" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="fS" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.10"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.02"/>
          </linearGradient>
        </defs>

        {/* ══ PLAFOND ══ */}
        <polygon points="0,0 1000,0 1000,70 665,95 195,95 0,55" fill={plafond}/>
        <polygon points="0,0 1000,0 1000,70 665,95 195,95 0,55" fill="url(#cS)"/>

        {/* ══ MUR FOND ══ */}
        <polygon points="195,95 665,95 665,395 195,395" fill={mur}/>

        {/* ══ MUR GAUCHE ══ */}
        <polygon points="0,55 195,95 195,395 0,560" fill={mur}/>
        <polygon points="0,55 195,95 195,395 0,560" fill="url(#lwS)"/>

        {/* ══ MUR DROIT / ACCENT ══ */}
        <polygon points="665,95 1000,70 1000,560 665,395" fill={ac}/>
        <polygon points="665,95 1000,70 1000,560 665,395" fill="url(#rwS)"/>

        {/* ══ SOL avec lignes parquet ══ */}
        <polygon points="195,395 665,395 1000,560 0,560" fill={sol}/>
        <polygon points="195,395 665,395 1000,560 0,560" fill="url(#fS)"/>
        {[0.18,0.36,0.54,0.72,0.88].map((t,i)=>{
          const y=395+t*165, xl=195*(1-t), xr=665+335*t;
          return <line key={i} x1={xl} y1={y} x2={xr} y2={y} stroke="#0000001A" strokeWidth="1"/>;
        })}
        {[0.1,0.25,0.4,0.55,0.7,0.85].map((u,i)=>{
          const xb=195+u*470, xf=9+868*u;
          return <line key={i} x1={xb} y1={395} x2={xf} y2={560} stroke="#0000001A" strokeWidth="0.8"/>;
        })}

        {/* ══ PLINTHES ══ */}
        <polygon points="196,381 664,381 664,395 196,395" fill="#0000001C"/>
        <polygon points="0,548 195,382 195,395 0,560" fill="#00000018"/>
        <polygon points="665,382 1000,547 1000,560 665,395" fill="#00000015"/>

        {/* ══ ARÊTES ══ */}
        <line x1="195" y1="95" x2="195" y2="395" stroke="#00000030" strokeWidth="3"/>
        <line x1="665" y1="95" x2="665" y2="395" stroke="#00000028" strokeWidth="3"/>
        <line x1="0" y1="55" x2="195" y2="95" stroke="#00000022" strokeWidth="2"/>
        <line x1="195" y1="95" x2="665" y2="95" stroke="#00000018" strokeWidth="2"/>
        <line x1="665" y1="95" x2="1000" y2="70" stroke="#00000022" strokeWidth="2"/>

        {/* ══ FENÊTRE (mur gauche) ══ */}
        <polygon points="15,78 172,108 172,305 15,375" fill="#F0F8FF"/>
        <polygon points="19,82 168,111 168,301 19,371" fill="#C4E0EE"/>
        <line x1="17" y1="193" x2="170" y2="212" stroke="white" strokeWidth="5"/>
        <line x1="93" y1="83" x2="93" y2="372" stroke="white" strokeWidth="5"/>
        <polygon points="19,82 60,89 58,193 19,188" fill="#FFFFFF30"/>
        <polygon points="15,78 172,108 172,305 15,375" fill="none" stroke="white" strokeWidth="6"/>
        <polygon points="0,57 22,62 20,382 0,395" fill="#F5F0EA" opacity="0.92"/>
        <polygon points="158,109 195,97 195,308 160,305" fill="#F5F0EA" opacity="0.72"/>
        <polygon points="168,118 195,102 195,118 188,308 170,298" fill="#FFFFFF07"/>

        {/* ══ CANAPÉ ══ */}
        <ellipse cx="415" cy="389" rx="198" ry="6" fill="#00000022"/>
        <rect x="240" y="374" width="7" height="14" fill="#786050" rx="1"/>
        <rect x="587" y="374" width="7" height="14" fill="#786050" rx="1"/>
        <polygon points="232,358 598,358 606,378 224,378" fill="#C8B898"/>
        <polygon points="237,316 593,316 598,358 232,358" fill="#D0C4A8"/>
        <polygon points="218,316 242,316 237,378 213,378" fill="#BCA888"/>
        <polygon points="593,316 618,316 613,378 588,378" fill="#BCA888"/>
        <polygon points="240,318 348,318 345,355 238,355" fill="#C8B48A" opacity="0.85"/>
        <polygon points="350,318 458,318 455,355 348,355" fill="#D4C49A" opacity="0.85"/>
        <polygon points="460,318 568,318 565,355 458,355" fill="#C8B48A" opacity="0.85"/>
        <polygon points="565,316 608,316 610,358 570,358" fill="#A8A090" opacity="0.7"/>
        <polygon points="415,308 490,308 487,318 412,318" fill="#C8784A"/>
        <polygon points="288,386 548,386 556,395 280,395" fill="#A08868"/>
        <polygon points="338,382 400,382 398,386 336,386" fill="#8A8070"/>
        <circle cx="480" cy="384" r="7" fill="#E8DDD0"/>
        <circle cx="480" cy="384" r="5" fill="#C8C0B0"/>

        {/* ══ PLANTE (mur droit) ══ */}
        <polygon points="748,375 788,370 783,395 752,396" fill="#D8C8B0"/>
        <polygon points="752,378 784,373 783,390 752,390" fill="#C4B09A"/>
        <line x1="768" y1="375" x2="762" y2="310" stroke="#5A4030" strokeWidth="5"/>
        <ellipse cx="748" cy="302" rx="26" ry="17" fill="#3A6835" transform="rotate(-25,748,302)"/>
        <ellipse cx="780" cy="292" rx="23" ry="16" fill="#487840" transform="rotate(20,780,292)"/>
        <ellipse cx="754" cy="278" rx="21" ry="14" fill="#2E5830" transform="rotate(-40,754,278)"/>
        <ellipse cx="782" cy="320" rx="19" ry="13" fill="#426A3A" transform="rotate(30,782,320)"/>
        <ellipse cx="742" cy="325" rx="16" ry="11" fill="#3A6232" transform="rotate(-15,742,325)"/>

        {/* ══ CADRES + ÉTAGÈRE (mur droit) ══ */}
        <polygon points="825,245 940,237 942,244 827,251" fill="#C0A870"/>
        <polygon points="858,230 876,229 876,244 858,245" fill="#D8C8A8"/>
        <polygon points="880,229 895,228 895,243 880,244" fill="#C8B898" opacity="0.8"/>
        <polygon points="835,145 918,139 920,218 837,222" fill="#E8E0D0" stroke="#C8A870" strokeWidth="3.5"/>
        <polygon points="840,150 914,145 915,213 841,217" fill="#E0D8C8" opacity="0.55"/>
        <polygon points="837,228 920,222 922,240 839,244" fill="#D8D0C0" stroke="#C8A870" strokeWidth="2.5"/>

      </svg>
    </div>
  );
};

/* ═══ CALCULATEUR ═════════════════════════════════════════════ */
function Calculateur({ T, divider, onDevis }) {
  const [f, setF] = useState({ surface:"", hauteur:"2.50", portesMenuis:"0", pieces:"1", etat:"bon", finition:"mat" });
  const [res, setRes] = useState(null);
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const calc = () => {
    const sol=parseFloat(f.surface)||0; if(sol<=0) return;
    const h=parseFloat(f.hauteur)||2.5;
    const pm=parseInt(f.portesMenuis)||0, pcs=parseInt(f.pieces)||1;
    // ×1.25 : correction non-carré (ratio moyen 1:1.5 des pièces réelles)
    const cote=Math.sqrt(sol/pcs), perim=Math.round(cote*4*1.25*pcs);
    const mNet=Math.round(perim*h);
    const total=mNet+sol;
    const litres=Math.ceil(total/5*1.1);
    const prep=TARIFS_PREP[f.etat], fin=TARIFS_PEINTURE[f.finition];
    const pMin=Math.round(total*prep.min), pMax=Math.round(total*prep.max);
    const fMin=Math.round(total*fin.min),  fMax=Math.round(total*fin.max);
    const mMin=pm*TARIF_PORTE.min, mMax=pm*TARIF_PORTE.max;
    setRes({sol,mNet,plafond:sol,total,litres,perim,prep,fin,pMin,pMax,fMin,fMax,mMin,mMax,pm,totalMin:pMin+fMin+mMin,totalMax:pMax+fMax+mMax});
  };

  const inp = {width:"100%",border:"none",borderBottom:`1px solid ${G.gold}`,padding:"9px 0",fontSize:14,fontWeight:300,background:"transparent",color:G.black,fontFamily:"'Jost',sans-serif",outline:"none"};
  const sel = {...inp,cursor:"pointer",appearance:"none"};

  return (
    <div className="fade">
      <div style={{textAlign:"center",marginBottom:52}}>
        <div style={T.tag}>Votre projet</div>
        {divider}
        <h1 style={{...T.h1,fontSize:"clamp(34px,5vw,54px)"}}>Estimatif<br/><em>de votre chantier</em></h1>
        {divider}
        <p style={{...T.p,maxWidth:520,margin:"0 auto"}}>Renseignez la surface au sol — les murs sont calculés sans déduction. Les menuiseries sont chiffrées séparément.</p>
      </div>

      {!res ? (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,border:`1px solid ${G.border}`}}>

          {/* Gauche — dimensions */}
          <div style={{borderRight:`1px solid ${G.border}`}}>
            <div style={{padding:"24px 28px",background:G.white,borderBottom:`1px solid ${G.border}`}}>
              <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:18}}>Dimensions de la pièce</div>
              <div style={{marginBottom:18}}>
                <label style={{...T.label,display:"block",marginBottom:8}}>Surface au sol (m²)</label>
                <input style={inp} type="number" placeholder="ex: 25" value={f.surface} onChange={e=>set("surface",e.target.value)}/>
                <div style={{...T.p,fontSize:10,marginTop:4}}>Pour plusieurs pièces, indiquez le total</div>
              </div>
              <div style={{marginBottom:18}}>
                <label style={{...T.label,display:"block",marginBottom:8}}>Hauteur sous plafond</label>
                <select style={sel} value={f.hauteur} onChange={e=>set("hauteur",e.target.value)}>
                  {["2.20","2.30","2.40","2.50","2.60","2.70","2.80","3.00","3.20","3.50"].map(v=>(
                    <option key={v} value={v}>{v} m</option>
                  ))}
                </select>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:14,marginBottom:18}}>
                {[{k:"pieces",l:"Nombre de pièces",max:8}].map(it=>(
                  <div key={it.k}>
                    <label style={{...T.label,display:"block",marginBottom:8}}>{it.l}</label>
                    <select style={sel} value={f[it.k]} onChange={e=>set(it.k,e.target.value)}>
                      {Array.from({length:it.max+1},(_,i)=><option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:4}}>
                <label style={{...T.label,display:"block",marginBottom:8}}>Portes & menuiseries à peindre <span style={{color:G.gold}}>(Ondilak)</span></label>
                <select style={sel} value={f.portesMenuis} onChange={e=>set("portesMenuis",e.target.value)}>
                  {Array.from({length:11},(_,i)=><option key={i} value={i}>{i} porte{i>1?"s":""}</option>)}
                </select>
                <div style={{...T.p,fontSize:10,marginTop:4}}>Comprend préparation (Cross) + 2 couches Ondilak Collection</div>
              </div>
            </div>

            {/* Aperçu live */}
            {f.surface && (
              <div style={{padding:"18px 28px",background:G.light}}>
                <div style={{...T.tag,fontSize:9,marginBottom:12}}>Surfaces estimées</div>
                {(()=>{
                  const s=parseFloat(f.surface)||0, h=parseFloat(f.hauteur)||2.5;
                  const p=Math.round(Math.sqrt(s/(parseInt(f.pieces)||1))*4*(parseInt(f.pieces)||1));
                  const mn=Math.round(p*1.25*h);
                  return(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {[{l:"Surface murs",v:`${mn} m²`,g:false},{l:"Plafond",v:`${s} m²`,g:false},{l:"Total à traiter",v:`${mn+s} m²`,g:true},{l:"Peinture estimée",v:`≈${Math.ceil((mn+s)/5*1.1)} L`,g:false}].map((r,i)=>(
                        <div key={i} style={{padding:"8px 12px",background:r.g?G.gold:G.white,border:`1px solid ${G.border}`}}>
                          <div style={{...T.p,fontSize:10,color:r.g?"#FFF9":G.muted}}>{r.l}</div>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:r.g?G.white:G.ink,marginTop:2}}>{r.v}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Droite — type de prestation */}
          <div>
            <div style={{padding:"24px 28px",background:G.white,borderBottom:`1px solid ${G.border}`}}>
              <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:16}}>État du support</div>
              {[
                {v:"bon",     l:"Finition C — Préparation légère",           d:"Ancienne peinture saine, pas de fissures → Ponçage général + rebouchage ponctuel des trous"},
                {v:"moyen",   l:"Finition B — Préparation ponctuelle",    d:"Fissures, trous, murs neufs BA13 déjà jointés → Ponçage général + rebouchage + ratissage partiel si besoin"},
                {v:"complet", l:"Finition A — Rénovation complète",       d:"Fissures importantes, support très dégradé → Ponçage général + ratissage complet Proliss F200 (3 en 1)"},
              ].map(opt=>(
                <div key={opt.v} onClick={()=>set("etat",opt.v)}
                  style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 14px",marginBottom:8,border:`1px solid ${f.etat===opt.v?G.gold:G.border}`,background:f.etat===opt.v?G.light:G.bg,cursor:"pointer",transition:"all .15s"}}>
                  <div style={{width:18,height:18,border:`2px solid ${f.etat===opt.v?G.gold:G.muted}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                    {f.etat===opt.v&&<div style={{width:8,height:8,borderRadius:"50%",background:G.gold}}/>}
                  </div>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:400,color:G.black,marginBottom:2}}>{opt.l}</div>
                    <div style={{...T.p,fontSize:10}}>{opt.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{padding:"24px 28px",background:G.white,borderBottom:`1px solid ${G.border}`}}>
              <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:16}}>Finition murs & plafonds</div>
              {[
                {v:"mat",    l:"Maotop Mat",       d:"Finition mate classe 1 — notre produit phare",        marque:"Zolpan"},
                {v:"velours",l:"Class 1 Velours",  d:"Finition veloutée lessivable classe 1",               marque:"Tollens"},
              ].map(opt=>(
                <div key={opt.v} onClick={()=>set("finition",opt.v)}
                  style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 14px",marginBottom:8,border:`1px solid ${f.finition===opt.v?G.gold:G.border}`,background:f.finition===opt.v?G.light:G.bg,cursor:"pointer",transition:"all .15s"}}>
                  <div style={{width:18,height:18,border:`2px solid ${f.finition===opt.v?G.gold:G.muted}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                    {f.finition===opt.v&&<div style={{width:8,height:8,borderRadius:"50%",background:G.gold}}/>}
                  </div>
                  <div>
                    <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:G.black}}>{opt.l}</div>
                      <div style={{...T.tag,fontSize:8,color:G.gold}}>{opt.marque}</div>
                    </div>
                    <div style={{...T.p,fontSize:10,marginTop:2}}>{opt.d}</div>
                  </div>
                </div>
              ))}
              <div style={{...T.p,fontSize:10,marginTop:8,padding:"8px 12px",background:G.light,borderLeft:`2px solid ${G.gold}`}}>
                Les menuiseries (portes) sont toujours réalisées avec l'<strong>Ondilak Collection Zolpan</strong> — chiffrées séparément ci-contre.
              </div>
            </div>

            <div style={{padding:"18px 28px",background:G.bg}}>
              <button onClick={calc} disabled={!f.surface}
                style={{...T.btn,width:"100%",background:f.surface?G.gold:"#ccc",color:G.white,border:"none",padding:"14px",opacity:f.surface?1:0.55,transition:"all .2s",cursor:f.surface?"pointer":"default"}}>
                Calculer mon estimatif →
              </button>
            </div>
          </div>
        </div>

      ) : (
        <div>
          {/* Surfaces */}
          <div style={{border:`1px solid ${G.border}`,marginBottom:1}}>
            <div style={{padding:"18px 28px",background:G.white,borderBottom:`1px solid ${G.border}`}}>
              <div style={{...T.tag,fontSize:9}}>Surfaces calculées</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:"italic",color:G.muted,marginTop:4}}>
                {res.sol} m² au sol · {f.hauteur} m · {f.pieces} pièce{f.pieces>1?"s":""} · {f.fenetres} fenêtre{f.fenetres>1?"s":""} · {f.portes} porte{f.portes>1?"s":(parseInt(f.portes)===0?"":"")}{parseInt(f.portesMenuis)>0?` · ${f.portesMenuis} porte${f.portesMenuis>1?"s":""} à peindre (menuiseries)`:""}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:G.border}}>
              {[
                {l:"Surface murs",    v:`${res.mNet} m²`,   s:"murs complets",         g:false},
                {l:"Plafond",         v:`${res.plafond} m²`,s:"surface au sol",        g:false},
                {l:"Total murs+plafond",v:`${res.total} m²`,s:"surface à traiter",     g:true},
                {l:"Peinture estimée",v:`≈ ${res.litres} L`,s:"+10% de marge inclus",  g:false},
              ].map((c,i)=>(
                <div key={i} style={{background:c.g?G.gold:G.white,padding:"18px 20px"}}>
                  <div style={{...T.p,fontSize:9,color:c.g?"#FFF9":G.muted,marginBottom:5}}>{c.l}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:c.g?G.white:G.black}}>{c.v}</div>
                  <div style={{...T.p,fontSize:9,color:c.g?"#FFF7":G.muted,marginTop:3}}>{c.s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Détail */}
          <div style={{border:`1px solid ${G.border}`,marginBottom:1}}>
            <div style={{padding:"16px 28px",background:G.white,borderBottom:`1px solid ${G.border}`}}>
              <div style={{...T.tag,fontSize:9}}>Détail de l'estimatif</div>
            </div>
            {/* Préparation */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",padding:"16px 28px",borderBottom:`1px solid ${G.border}`,background:G.white}}>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                  <div style={{...T.tag,fontSize:8,background:G.light,padding:"2px 8px"}}>Préparation</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:G.black}}>{res.prep.label}</div>
                </div>
                <div style={{...T.p,fontSize:10,color:G.muted}}>Tarif : {res.prep.min}–{res.prep.max} €/m² · sur {res.total} m²</div>
              </div>
              <div style={{textAlign:"right",paddingLeft:20}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:G.ink}}>{res.pMin.toLocaleString("fr-FR")} – {res.pMax.toLocaleString("fr-FR")} €</div>
                <div style={{...T.p,fontSize:9,color:G.muted}}>HT · MO + matériaux</div>
              </div>
            </div>
            {/* Finition */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",padding:"16px 28px",borderBottom:`1px solid ${G.border}`,background:G.white}}>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                  <div style={{...T.tag,fontSize:8,background:G.light,padding:"2px 8px"}}>Mise en peinture</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:G.black}}>{res.fin.label}</div>
                </div>
                <div style={{...T.p,fontSize:10,color:G.muted}}>Tarif : {res.fin.min}–{res.fin.max} €/m² · sur {res.total} m² (Maoline + 2 couches)</div>
              </div>
              <div style={{textAlign:"right",paddingLeft:20}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:G.ink}}>{res.fMin.toLocaleString("fr-FR")} – {res.fMax.toLocaleString("fr-FR")} €</div>
                <div style={{...T.p,fontSize:9,color:G.muted}}>HT · MO + matériaux</div>
              </div>
            </div>
            {/* Menuiseries */}
            {res.pm > 0 && (
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",padding:"16px 28px",borderBottom:`1px solid ${G.border}`,background:G.white}}>
                <div>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <div style={{...T.tag,fontSize:8,background:"#F0E8F8",padding:"2px 8px",color:"#7060A0"}}>Menuiseries</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:G.black}}>Ondilak Collection — {res.pm} porte{res.pm>1?"s":""}</div>
                  </div>
                  <div style={{...T.p,fontSize:10,color:G.muted}}>Primaire si nécessaire + 2 couches Ondilak Collection · {TARIF_PORTE.min}–{TARIF_PORTE.max} €/porte</div>
                </div>
                <div style={{textAlign:"right",paddingLeft:20}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:G.ink}}>{res.mMin.toLocaleString("fr-FR")} – {res.mMax.toLocaleString("fr-FR")} €</div>
                  <div style={{...T.p,fontSize:9,color:G.muted}}>HT · MO + matériaux</div>
                </div>
              </div>
            )}
            {/* TOTAL */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",padding:"20px 28px",background:G.light}}>
              <div>
                <div style={{...T.tag,fontSize:9,marginBottom:4}}>Total estimatif</div>
                <div style={{...T.p,fontSize:11}}>Préparation + mise en peinture{res.pm>0?` + ${res.pm} menuiserie${res.pm>1?"s":""}`:""}  · HT indicatif</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:G.gold}}>{res.totalMin.toLocaleString("fr-FR")} – {res.totalMax.toLocaleString("fr-FR")} €</div>
                <div style={{...T.p,fontSize:9,color:G.muted}}>HT · main d'œuvre + matériaux inclus</div>
                <div style={{...T.tag,fontSize:10,color:G.gold,marginTop:8,letterSpacing:"1px"}}>📞 06 16 70 57 57</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{border:`1px solid ${G.border}`,padding:"18px 28px",background:G.white,marginBottom:1}}>
            <div style={{borderLeft:`2px solid ${G.gold}`,paddingLeft:14}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:"italic",color:G.ink,marginBottom:5}}>Estimatif basé sur les prix du marché de la région Pays d'Aix-en-Provence — le devis définitif est établi après visite sur place.</div>
              <p style={{...T.p,fontSize:11}}>Le tarif réel dépend de l'état exact du support, de l'accessibilité et de la configuration du chantier. La visite et le devis sont <strong>gratuits et sans engagement</strong>.</p>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1}}>
            <button onClick={()=>setRes(null)} style={{...T.btn,background:"transparent",border:`1px solid ${G.border}`,color:G.gray,padding:"14px",fontSize:11,cursor:"pointer"}}>← Recommencer</button>
            <button onClick={onDevis} style={{...T.btn,background:G.gold,color:G.white,border:"none",padding:"14px",fontSize:11,cursor:"pointer"}}>Demander un devis gratuit →</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ APP ═════════════════════════════════════════════════════ */
export default function App() {
  const [tab,setTab]=useState("calcul");
  const [openPal,setOpenPal]=useState(null);
  const [selColor,setSelColor]=useState(null);
  const [openProd,setOpenProd]=useState(null);
  const [visu,setVisu]=useState({mur:"#E8E2D6",plafond:"#F5F2EC",sol:"#C4A882",accent:null});
  const [sel,setSel]=useState({couleurs:[],produit:null});
  const [modal,setModal]=useState(false);
  const [nom,setNom]=useState("");
  const [piece,setPiece]=useState("");
  const [sent,setSent]=useState(false);

  const toggleC=c=>setSel(s=>({...s,couleurs:s.couleurs.find(x=>x.ref===c.ref)?s.couleurs.filter(x=>x.ref!==c.ref):[...s.couleurs,c]}));
  const inSel=c=>sel.couleurs.some(x=>x.ref===c.ref);
  const count=sel.couleurs.length+(sel.produit?1:0);
  const allC=PALETTES.flatMap(p=>p.couleurs);

  const harm=selColor?(()=>{const [h,s,l]=h2h(selColor.hex);return{mono:[h2hex(h,s,Math.min(l+22,93)),selColor.hex,h2hex(h,s,Math.max(l-18,8))],analog:[h2hex((h-30+360)%360,s,l),selColor.hex,h2hex((h+30)%360,s,l)],compl:[selColor.hex,h2hex((h+180)%360,s,l)],triad:[selColor.hex,h2hex((h+120)%360,s,l),h2hex((h+240)%360,s,l)]};})():null;

  const T={
    tag:{fontFamily:"'Jost',sans-serif",fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.gold},
    h1:{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,letterSpacing:"-0.5px",color:G.black,lineHeight:1.1},
    p:{fontFamily:"'Jost',sans-serif",fontSize:13,fontWeight:300,color:G.gray,lineHeight:1.75,letterSpacing:"0.2px"},
    label:{fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:G.ink},
    btn:{fontFamily:"'Jost',sans-serif",fontSize:10,fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase"},
  };
  const divider=<div style={{width:32,height:1,background:G.gold,margin:"18px auto"}}/>;

  const preps=PRODUITS.filter(p=>p.categorie==="preparation");
  const peints=PRODUITS.filter(p=>p.categorie==="peinture");

  return (
    <div style={{fontFamily:"'Jost',sans-serif",background:G.bg,minHeight:"100vh",color:G.black}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .28s ease both}
        .sw{transition:transform .12s,box-shadow .12s;cursor:pointer;}
        .sw:hover{transform:scale(1.12);box-shadow:0 4px 14px #00000022}
        .card{transition:background .15s;}
        .card:hover{background:${G.white}!important;}
        button,input,select{cursor:pointer;font-family:'Jost',sans-serif;}
        input{outline:none;}
        input:focus{border-color:${G.gold}!important;}
        a{text-decoration:none;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${G.gold};border-radius:2px;}
      `}</style>

      {/* ══ CONTACT BAR ══ */}
      <Contact/>

      {/* ══ HEADER ══ */}
      <header style={{background:G.white,borderBottom:`1px solid ${G.border}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1060,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <Logo size={52}/>
            {<div>
              <div style={{...T.tag,fontSize:9,marginBottom:3}}>Peinture et Rénovation Pays d'Aix</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,fontWeight:300,fontStyle:"italic",color:G.muted}}>Axel Sandahl · Artisan d'Art</div>
            </div>}
          </div>
          <button onClick={()=>setModal(true)} style={{...T.btn,background:"transparent",border:`1px solid ${G.gold}`,color:G.gold,padding:"8px 18px",display:"flex",alignItems:"center",gap:8}}>
            Ma sélection {count>0&&<span style={{background:G.gold,color:G.white,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{count}</span>}
          </button>
        </div>
        <nav style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",display:"flex",borderTop:`1px solid ${G.border}`,overflowX:"auto"}}>
          {[{id:"calcul",l:"Estimatif"},{id:"palettes",l:"Palettes"},{id:"harmonies",l:"Harmonies"},{id:"produits",l:"Produits"},{id:"simulateur",l:"Simulateur"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{...T.btn,background:"transparent",border:"none",borderBottom:tab===t.id?`2px solid ${G.gold}`:"2px solid transparent",color:tab===t.id?G.gold:G.muted,padding:"11px 18px",whiteSpace:"nowrap",transition:"all .18s"}}>
              {t.l}
            </button>
          ))}
        </nav>
      </header>

      <main style={{maxWidth:1060,margin:"0 auto",padding:"48px 20px 96px"}}>

        {/* ══ PALETTES ══ */}
        {tab==="palettes" && (
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:48}}>
              <div style={T.tag}>Guide couleur · Nuancier Cromology Zolpan</div>
              {divider}
              <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Choisissez<br/><em>votre ambiance</em></h1>
              {divider}
              <p style={{...T.p,maxWidth:480,margin:"0 auto 16px"}}>Des palettes issues du nuancier Cromology Zolpan, pensées pour les intérieurs provençaux.</p>
              <a href="https://www.zolpan.fr/colorimetrie/couleurs-interieures/nuancier-couleur-cromology" target="_blank" rel="noreferrer"
                style={{...T.tag,fontSize:9,color:G.gold,borderBottom:`1px solid ${G.goldLt}`,paddingBottom:2}}>
                Voir le nuancier Cromology complet →
              </a>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:1,border:`1px solid ${G.border}`}}>
              {PALETTES.map((pal,i)=>{
                const open=openPal?.id===pal.id;
                return(
                  <div key={pal.id} className="card" onClick={()=>setOpenPal(open?null:pal)}
                    style={{background:open?G.white:G.bg,borderRight:i%2===0?`1px solid ${G.border}`:"none",borderBottom:`1px solid ${G.border}`,cursor:"pointer"}}>
                    <div style={{display:"flex",height:64}}>{pal.couleurs.map(c=><div key={c.hex} style={{flex:1,background:c.hex}}/>)}</div>
                    <div style={{padding:"18px 22px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                        <div>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:G.black}}>{pal.nom}</div>
                          <div style={{...T.tag,fontSize:9,marginTop:3}}>{pal.ambiance}</div>
                        </div>
                        <div style={{color:G.gold,fontSize:17,transition:"transform .22s",transform:open?"rotate(180deg)":"none"}}>▾</div>
                      </div>
                      <p style={{...T.p,fontSize:12,marginBottom:5}}>{pal.desc}</p>
                      <div style={{...T.p,fontSize:11}}>📍 {pal.piece}</div>
                      {open && (
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:18,paddingTop:18,borderTop:`1px solid ${G.border}`}} onClick={e=>e.stopPropagation()}>
                          {pal.couleurs.map(c=>(
                            <div key={c.ref} style={{textAlign:"center",cursor:"pointer"}}
                              onClick={()=>{toggleC(c);setSelColor(c);setVisu(v=>({...v,mur:c.hex}));}}>
                              <div className="sw" style={{width:54,height:54,margin:"0 auto 7px",background:c.hex,outline:inSel(c)?`2px solid ${G.gold}`:"2px solid transparent",outlineOffset:"3px"}}/>
                              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:G.black,marginBottom:1}}>{c.nom}</div>
                              <div style={{...T.p,fontSize:9,letterSpacing:"0.5px",color:G.gold}}>{c.ref}</div>
                              {inSel(c)&&<div style={{...T.tag,fontSize:9,marginTop:3}}>✓ Sélectionné</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ HARMONIES ══ */}
        {tab==="harmonies" && (
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:48}}>
              <div style={T.tag}>Théorie des couleurs</div>
              {divider}
              <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Harmonies<br/><em>de couleurs</em></h1>
              {divider}
              <p style={{...T.p,maxWidth:460,margin:"0 auto"}}>Sélectionnez une couleur de base pour découvrir les teintes qui s'accordent parfaitement.</p>
            </div>
            <div style={{background:G.white,border:`1px solid ${G.border}`,padding:26,marginBottom:36}}>
              <div style={{...T.label,marginBottom:14}}>Couleur de départ</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {allC.map(c=>(
                  <div key={c.ref} className="sw" style={{width:34,height:34,background:c.hex,outline:selColor?.ref===c.ref?`2px solid ${G.gold}`:"2px solid transparent",outlineOffset:"2px"}}
                    onClick={()=>setSelColor(c)} title={c.nom}/>
                ))}
              </div>
            </div>
            {selColor&&harm ? (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:1,border:`1px solid ${G.border}`}}>
                {[{k:"mono",l:"Monochrome",d:"Déclinaisons de la même teinte."},{k:"analog",l:"Analogues",d:"Teintes voisines, ambiance douce."},{k:"compl",l:"Complémentaires",d:"Opposées — fort contraste pour un accent."},{k:"triad",l:"Triadique",d:"Trois teintes équilibrées."}].map((h,i)=>(
                  <div key={h.k} style={{background:G.white,borderRight:i%2===0?`1px solid ${G.border}`:"none",borderBottom:`1px solid ${G.border}`,padding:22}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:400,marginBottom:5}}>{h.l}</div>
                    <p style={{...T.p,fontSize:11,marginBottom:16}}>{h.d}</p>
                    <div style={{display:"flex",gap:8,marginBottom:14}}>
                      {harm[h.k].map((hex,j)=>(
                        <div key={j} style={{flex:1,textAlign:"center"}}>
                          <div className="sw" style={{height:46,margin:"0 auto 5px",background:hex}}
                            onClick={()=>{setVisu(v=>({...v,mur:hex}));setTab("simulateur");}}/>
                          <div style={{fontFamily:"monospace",fontSize:9,color:G.muted}}>{hex.toUpperCase()}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{...T.tag,fontSize:9,cursor:"pointer"}}
                      onClick={()=>{setVisu(v=>({...v,mur:harm[h.k][0],accent:harm[h.k].length>1?harm[h.k][1]:null}));setTab("simulateur");}}>
                      Voir dans la pièce →
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <div style={{textAlign:"center",padding:"60px",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,fontStyle:"italic",color:G.muted}}>Sélectionnez une couleur ci-dessus</div>
            )}
          </div>
        )}

        {/* ══ PRODUITS ══ */}
        {tab==="produits" && (
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:48}}>
              <div style={T.tag}>Gamme professionnelle</div>
              {divider}
              <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Nos produits<br/><em>& savoir-faire</em></h1>
              {divider}
              <p style={{...T.p,maxWidth:520,margin:"0 auto"}}>Les préparations d'abord — c'est la base de tout chantier réussi. Puis les finitions qui subliment le résultat.</p>
            </div>

            {/* PRÉPARATIONS */}
            <div style={{...T.tag,fontSize:9,marginBottom:12}}>── Préparations du support</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:1,border:`1px solid ${G.border}`,marginBottom:32}}>
              {preps.map((p,i)=>{
                const open=openProd===p.id;
                return(
                  <div key={p.id} className="card" onClick={()=>setOpenProd(open?null:p.id)}
                    style={{background:open?G.white:G.bg,borderRight:i%2===0?`1px solid ${G.border}`:"none",borderBottom:`1px solid ${G.border}`,padding:22,cursor:"pointer",borderLeft:`3px solid ${p.couleur}`}}>
                    <div style={{...T.tag,fontSize:8,color:p.couleur,marginBottom:8}}>{p.tag}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:G.black}}>{p.icon} {p.nom}</div>
                        <div style={{...T.p,fontSize:11,marginTop:2}}>{p.marque}</div>
                      </div>
                      <div style={{...T.tag,fontSize:9,color:G.muted}}>{open?"▴":"▾"}</div>
                    </div>
                    <div style={{...T.p,fontSize:11,marginBottom:10}}>📍 {p.pour}</div>
                    <div style={{borderLeft:`2px solid ${p.couleur}`,paddingLeft:10,fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:"italic",color:G.gray,lineHeight:1.6}}>{p.conseil}</div>
                    {open && (
                      <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${G.border}`}} onClick={e=>e.stopPropagation()}>
                        <div style={{...T.label,marginBottom:10}}>Points forts</div>
                        {p.points.map((a,j)=>(
                          <div key={j} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                            <span style={{color:G.gold,fontSize:9,marginTop:3,flexShrink:0}}>✦</span>
                            <span style={{...T.p,fontSize:11}}>{a}</span>
                          </div>
                        ))}
                        {p.process && (
                          <div style={{marginTop:14,padding:"10px 14px",background:G.light,borderLeft:`2px solid ${p.couleur}`}}>
                            <div style={{...T.label,fontSize:8,marginBottom:5}}>Process</div>
                            <div style={{...T.p,fontSize:11,fontStyle:"italic"}}>{p.process}</div>
                          </div>
                        )}
                        <a href={p.lien} target="_blank" rel="noreferrer"
                          style={{display:"inline-block",marginTop:14,...T.tag,fontSize:8,color:p.couleur,borderBottom:`1px solid ${p.couleur}44`,paddingBottom:1}}>
                          Voir la fiche technique →
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PEINTURES */}
            <div style={{...T.tag,fontSize:9,marginBottom:12}}>── Peintures & finitions</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:1,border:`1px solid ${G.border}`}}>
              {peints.map((p,i)=>{
                const open=openProd===p.id;
                return(
                  <div key={p.id} className="card" onClick={()=>setOpenProd(open?null:p.id)}
                    style={{background:open?G.white:G.bg,borderRight:i%2===0?`1px solid ${G.border}`:"none",borderBottom:`1px solid ${G.border}`,padding:22,cursor:"pointer",borderLeft:`3px solid ${p.couleur}`}}>
                    <div style={{...T.tag,fontSize:8,color:p.couleur,marginBottom:8}}>{p.tag}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:G.black}}>{p.icon} {p.nom}</div>
                        <div style={{...T.p,fontSize:11,marginTop:2}}>{p.marque}</div>
                      </div>
                      <div style={{...T.tag,fontSize:9,color:G.muted}}>{open?"▴":"▾"}</div>
                    </div>
                    <div style={{...T.p,fontSize:11,marginBottom:10}}>📍 {p.pour}</div>
                    <div style={{borderLeft:`2px solid ${p.couleur}`,paddingLeft:10,fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:"italic",color:G.gray,lineHeight:1.6}}>{p.conseil}</div>
                    {open && (
                      <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${G.border}`}} onClick={e=>e.stopPropagation()}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                          <div>
                            <div style={{...T.label,marginBottom:8}}>Points forts</div>
                            {p.points.map((a,j)=>(
                              <div key={j} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                                <span style={{color:G.gold,fontSize:9,marginTop:3,flexShrink:0}}>✦</span>
                                <span style={{...T.p,fontSize:11}}>{a}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div style={{...T.label,marginBottom:8}}>À savoir</div>
                            {p.limites.map((a,j)=>(
                              <div key={j} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                                <span style={{color:G.muted,fontSize:10,marginTop:2,flexShrink:0}}>—</span>
                                <span style={{...T.p,fontSize:11}}>{a}</span>
                              </div>
                            ))}
                            {p.process && (
                              <div style={{marginTop:10,padding:"8px 12px",background:G.light,borderLeft:`2px solid ${p.couleur}`}}>
                                <div style={{...T.label,fontSize:8,marginBottom:4}}>Process</div>
                                <div style={{...T.p,fontSize:10,fontStyle:"italic"}}>{p.process}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{display:"flex",gap:10,alignItems:"center",marginTop:4}}>
                          <a href={p.lien} target="_blank" rel="noreferrer"
                            style={{...T.tag,fontSize:8,color:p.couleur,borderBottom:`1px solid ${p.couleur}44`,paddingBottom:1}}>
                            Fiche technique →
                          </a>
                          <button style={{...T.btn,flex:1,background:sel.produit?.id===p.id?p.couleur:"transparent",color:sel.produit?.id===p.id?G.white:p.couleur,border:`1px solid ${p.couleur}`,padding:"9px",transition:"all .2s"}}
                            onClick={()=>setSel(s=>({...s,produit:s.produit?.id===p.id?null:p}))}>
                            {sel.produit?.id===p.id?"✓ Sélectionné":"Ajouter à ma sélection"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PHRASE FINALE */}
            <div style={{textAlign:"center",padding:"28px 20px",borderTop:`1px solid ${G.border}`,marginTop:8}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,fontStyle:"italic",color:G.gray,lineHeight:1.7}}>
                Et encore bien d'autres produits à découvrir selon votre projet —<br/>
                <span style={{color:G.gold}}>n'hésitez pas à nous en parler lors de la visite.</span>
              </p>
            </div>
          </div>
        )}

        {/* ══ SIMULATEUR ══ */}
        {tab==="simulateur" && (
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={T.tag}>Visualisation</div>
              {divider}
              <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Simulateur<br/><em>de pièce</em></h1>
              {divider}
              <p style={{...T.p,maxWidth:460,margin:"0 auto"}}>Testez vos couleurs en temps réel. Cliquez sur une teinte pour l'appliquer sur les surfaces.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:1,alignItems:"start",border:`1px solid ${G.border}`}}>
              <div style={{background:G.white,borderRight:`1px solid ${G.border}`}}>
                <Room {...visu}/>
                <div style={{display:"flex",flexWrap:"wrap",gap:16,padding:"14px 20px",borderTop:`1px solid ${G.border}`,background:G.light}}>
                  {[{k:"mur",l:"Murs (fond + gauche)"},{k:"plafond",l:"Plafond"},{k:"sol",l:"Sol"},{k:"accent",l:"Mur droit (accent)"}].map(({k,l})=>(
                    <div key={k} style={{display:"flex",alignItems:"center",gap:7}}>
                      <div style={{width:16,height:16,background:visu[k]||"#eee",border:`1px solid ${G.border}`,flexShrink:0}}/>
                      <span style={{...T.p,fontSize:10}}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {[{key:"mur",label:"Murs (fond + gauche)"},{key:"plafond",label:"Plafond"},{key:"sol",label:"Sol"},{key:"accent",label:"Mur droit (accent)"}].map(ctrl=>(
                  <div key={ctrl.key} style={{padding:"14px 18px",borderBottom:`1px solid ${G.border}`,background:G.bg}}>
                    <div style={{...T.label,marginBottom:10}}>{ctrl.label}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {ctrl.key==="accent"&&<div className="sw" style={{width:24,height:24,background:G.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:G.muted}} onClick={()=>setVisu(v=>({...v,accent:null}))} title="Aucun">✕</div>}
                      {allC.map(c=>(
                        <div key={c.ref} className="sw" style={{width:24,height:24,background:c.hex,outline:visu[ctrl.key]===c.hex?`2px solid ${G.gold}`:"2px solid transparent",outlineOffset:"2px"}}
                          onClick={()=>setVisu(v=>({...v,[ctrl.key]:c.hex}))} title={c.nom}/>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ ESTIMATIF ══ */}
        {tab==="calcul" && <Calculateur T={T} divider={divider} onDevis={()=>setModal(true)}/>}

      </main>

      {/* ══ FOOTER CONTACT ══ */}
      <footer style={{background:G.ink,padding:"32px 20px"}}>
        <div style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:32,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Logo size={48}/>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,color:G.white}}>Peinture & Rénovation</div>
              <div style={{...T.p,fontSize:10,color:G.muted,marginTop:2}}>Pays d'Aix · Artisan d'Art</div>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            {[{icon:"📞",t:"06 16 70 57 57",h:"tel:+33616705757"},{icon:"✉️",t:"peintureetrenovation13@gmail.com",h:"mailto:peintureetrenovation13@gmail.com"},{icon:"🌐",t:"peintureetrenovation.com",h:"https://www.peintureetrenovation.com"}].map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:12}}>{c.icon}</span>
                <a href={c.h} target="_blank" rel="noreferrer" style={{...T.p,fontSize:11,color:G.muted}}>{c.t}</a>
              </div>
            ))}
          </div>
          <div style={{textAlign:"right"}}>
            <button onClick={()=>setModal(true)} style={{...T.btn,background:G.gold,color:G.white,border:"none",padding:"12px 24px",cursor:"pointer"}}>
              Demander un devis gratuit
            </button>
            <div style={{...T.p,fontSize:10,color:G.muted,marginTop:8}}>Visite et devis gratuits</div>
          </div>
        </div>
      </footer>

      {/* ══ MODAL ══ */}
      {modal && (
        <div style={{position:"fixed",inset:0,background:"#00000050",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setModal(false)}>
          <div style={{background:G.white,padding:34,maxWidth:420,width:"100%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 28px 80px #00000018"}} onClick={e=>e.stopPropagation()}>
            {!sent ? (
              <>
                <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><Logo size={48}/></div>
                <div style={{...T.tag,textAlign:"center",marginBottom:5}}>Devis gratuit</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,textAlign:"center",marginBottom:22}}>Votre sélection</div>
                {[{l:"Votre prénom",ph:"ex: Marie",v:nom,fn:setNom},{l:"Pièce concernée",ph:"ex: Salon, façade…",v:piece,fn:setPiece}].map((fi,i)=>(
                  <div key={i} style={{marginBottom:14}}>
                    <div style={{...T.label,marginBottom:7}}>{fi.l}</div>
                    <input style={{width:"100%",border:"none",borderBottom:`1px solid ${G.gold}`,padding:"9px 0",fontSize:14,fontWeight:300,background:"transparent",color:G.black,fontFamily:"'Jost',sans-serif",outline:"none"}} placeholder={fi.ph} value={fi.v} onChange={e=>fi.fn(e.target.value)}/>
                  </div>
                ))}
                <div style={{marginBottom:18}}>
                  <div style={{...T.label,marginBottom:10}}>Couleurs choisies</div>
                  {sel.couleurs.length===0
                    ? <p style={{...T.p,fontStyle:"italic",fontSize:12}}>Aucune couleur sélectionnée</p>
                    : sel.couleurs.map(c=>(
                      <div key={c.ref} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                        <div style={{width:30,height:30,background:c.hex,flexShrink:0,border:`1px solid ${G.border}`}}/>
                        <div>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:G.black}}>{c.nom}</div>
                          <div style={{...T.p,fontSize:10,marginTop:1,color:G.gold}}>{c.ref}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                {sel.produit && (
                  <div style={{marginBottom:18}}>
                    <div style={{...T.label,marginBottom:10}}>Finition choisie</div>
                    <div style={{padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14}}>{sel.produit.nom}</div>
                      <div style={{...T.p,fontSize:10,marginTop:2}}>{sel.produit.marque}</div>
                    </div>
                  </div>
                )}
                <div style={{padding:"12px 14px",background:G.light,marginBottom:18}}>
                  <div style={{...T.p,fontSize:11}}>📞 <strong>06 16 70 57 57</strong> · ✉️ peintureetrenovation13@gmail.com</div>
                  <div style={{...T.p,fontSize:10,marginTop:4,fontStyle:"italic"}}>Votre artisan vous recontactera sous 24h pour convenir d'une visite gratuite.</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setModal(false)} style={{...T.btn,flex:1,background:"transparent",border:`1px solid ${G.border}`,color:G.gray,padding:"11px",cursor:"pointer"}}>Annuler</button>
                  <a
                    href={`mailto:peintureetrenovation13@gmail.com?subject=Demande de devis — ${nom||"Client"}&body=Bonjour Axel,%0A%0APrénom : ${nom||""}%0APièce : ${piece||""}%0ACouleurs : ${sel.couleurs.map(x=>x.nom+" ("+x.ref+")").join(", ")||"Non sélectionnées"}%0AFinition : ${sel.produit?sel.produit.nom:"Non sélectionnée"}%0A%0ACordialement`}
                    onClick={()=>{if(count>0||nom)setSent(true);}}
                    style={{...T.btn,flex:2,background:G.gold,color:G.white,border:"none",padding:"11px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}>
                    Envoyer →
                  </a>
                </div>
              </>
            ):(
              <div style={{textAlign:"center",padding:"16px 0"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><Logo size={56}/></div>
                <div style={{...T.tag,marginBottom:8}}>Merci !</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,marginBottom:14}}>Sélection envoyée</div>
                <div style={{width:28,height:1,background:G.gold,margin:"0 auto 16px"}}/>
                <p style={{...T.p,marginBottom:12}}>{nom&&`Merci ${nom}. `}<em style={{fontFamily:"'Cormorant Garamond',serif"}}>Axel Sandahl</em> vous recontactera sous 24h pour convenir d'une visite sur place.</p>
                <p style={{...T.p,fontSize:11,marginBottom:24}}>📞 06 16 70 57 57 · peintureetrenovation13@gmail.com</p>
                <button onClick={()=>{setModal(false);setSent(false);setSel({couleurs:[],produit:null});}} style={{...T.btn,background:"transparent",border:`1px solid ${G.gold}`,color:G.gold,padding:"11px 28px",cursor:"pointer"}}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
