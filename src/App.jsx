import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

/* ═══ BRAND ═══════════════════════════════════════════════════ */
const G = {
  bg:         "#FAFAF8",
  surface:    "#F5F3EF",
  surfaceHi:  "#EDE9E2",
  gold:       "#C8973A",
  goldLt:     "rgba(200,151,58,0.10)",
  goldBorder: "rgba(200,151,58,0.30)",
  border:     "rgba(0,0,0,0.08)",
  white:      "#FFFFFF",
  text:       "#1A1A1A",
  muted:      "#6B6560",
  subtle:     "#A09890",
  gray:       "#8B8580",
  ink:        "#0A0A0A",
};
const EJSID = "service_1kdzm42";
const EJSTPL = "template_1vw2wy9";
const EJSKEY = "io5BMwdmKvvfq8fKc";
const MAIN_URL = "https://project-atmue-j53ocer2e-peintureetrenovation13-2501s-projects.vercel.app/";

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
  { id:"tendance", nom:"Tendance 2025", ambiance:"Luxe éditorial · AD / Elle Déco",
    couleurs:[{nom:"Mocha Mousse",hex:"#A07862",ref:"CRO-T001"},{nom:"Truffe Chaude",hex:"#7D6455",ref:"CRO-T012"},{nom:"Parchemin",hex:"#EDE0CC",ref:"CRO-T023"},{nom:"Grès Fumé",hex:"#B0A090",ref:"CRO-T034"}],
    desc:"Inspiré de Vogue Living et AD. Mocha Mousse (Pantone 2025), terres profondes et matières naturelles.", piece:"Séjour · Chambre · Entrée" },
  { id:"zen", nom:"Wabi-Sabi & Matières", ambiance:"Minimalisme japonais · Impermanence",
    couleurs:[{nom:"Lin Cendré",hex:"#D8CFBE",ref:"CRO-Z001"},{nom:"Argile Rosée",hex:"#C4A898",ref:"CRO-Z012"},{nom:"Terre Verte",hex:"#7A8C7A",ref:"CRO-Z023"},{nom:"Charbon Doux",hex:"#5A5550",ref:"CRO-Z034"}],
    desc:"L'esthétique wabi-sabi : imperfection, matières brutes, calme profond. Tendance forte dans les intérieurs luxe 2025.", piece:"Chambre · Bureau · Salle de bain" },
  { id:"velvet", nom:"Velvet & Couture", ambiance:"Haute couture · Profondeur chromatique",
    couleurs:[{nom:"Nuit Mauve",hex:"#3D3050",ref:"CRO-V001"},{nom:"Rose Sépia",hex:"#C09880",ref:"CRO-V012"},{nom:"Lait de Nacre",hex:"#F0E8DC",ref:"CRO-V023"},{nom:"Rouille Précieux",hex:"#9A5A40",ref:"CRO-V034"}],
    desc:"Profondeur, sensualité et raffinement. Les teintes des maisons de couture et hôtels 5 étoiles.", piece:"Salon · Chambre parentale · Dressing" },
];

/* ═══ PRODUITS ════════════════════════════════════════════════ */
const PRODUITS = [
  { id:"ratissage", categorie:"preparation", icon:"🏗️", nom:"Ratissage complet — Proliss F200", marque:"Soffec · Proliss F200 — Enduit 3 en 1", tag:"Rénovation complète · Notre technique phare", couleur:"#C8973A",
    pour:"Murs & plafonds · Tous supports · Neuf & rénovation", lien:"https://www.sofec.net/fr/proliss-f200",
    points:["Passage de plusieurs couches d'enduit à la grande liseuse sur l'intégralité des murs et plafonds","Enduit Proliss : aspect tendu parfait — finition haute qualité","Très blanc, très couvrant — mat profond","Rendement 1,2 à 1,5 kg/m² · Séchage 6 à 48h","Classement au feu A2-S1, d0 — conforme DTU"],
    process:"1. Voile de révélateur (100–200 g/m²) → 2. Révision soignée des défauts → 3. Couche finale à 80 cm (1,3 kg/m²) sans lissage",
    limites:["Application mécanisée (pompe Airless)","Supports doivent être sains, secs, propres"],
    conseil:"Quand on rénove sérieusement, on ratisse tout. C'est la technique qui garantit des murs parfaitement tendus avant la mise en peinture." },
  { id:"prep_ponctu", categorie:"preparation", icon:"🔧", nom:"Préparation ponctuelle", marque:"Soffec · Enduit fibré & résiné", tag:"Support avec petits défauts", couleur:"#7A8860",
    pour:"Murs avec quelques fissures, petits trous, irrégularités · Murs neufs en plaque de plâtre déjà jointée", lien:"https://sofec.net/produit/enduit-de-rebouchage/",
    points:["Rebouchage ponctuel des fissures et petits trous","Enduit fibré pour les fissures — évite la reprise","Enduit résiné pour adhérence sur supports difficiles","Toile de rénovation si nécessaire sur zones fragilisées","Ponçage général avant mise en peinture","Sur plaque de plâtre neuve déjà jointée : impression + ponçage léger des joints avant mise en peinture"],
    process:"1. Dépoussiérage général → 2. Rebouchage fissures (enduit fibré) → 3. Ponçage général → 4. Dépoussiérage → 5. Impression Maoline\nSur BA13 neuf : 1. Vérification joints → 2. Ponçage léger → 3. Dépoussiérage → 4. Impression Maoline",
    limites:["Ne traite pas les supports très dégradés","Pour rénovation lourde : préférer le ratissage complet"],
    conseil:"Pour les murs en bon état général avec quelques défauts ponctuels. Résultat propre sans passer en ratissage complet." },
  { id:"poncage", categorie:"preparation", icon:"✦", nom:"Préparation légère", marque:"Support sain · Ponçage général", tag:"Support en bon état · Finition C", couleur:"#5878A8",
    pour:"Murs propres · Ancienne peinture adhérente · Neuf", lien:"https://www.zolpan.fr/catalogue-produits/peintures/interieur/impressions/maoline",
    points:["Ponçage général pour ouvrir et homogénéiser le support","Dépoussiérage soigné à la brosse puis aspirateur","Rebouchage ponctuel des trous et petits défauts","Lissage des angles et raccords","Séchage complet avant mise en peinture"],
    process:"1. Ponçage général → 2. Dépoussiérage → 3. Rebouchage ponctuel trous → 4. Mise en peinture",
    limites:["Uniquement pour supports en bon état","Ne traite pas les fissures importantes"],
    conseil:"La préparation Finition C : pour un support sain, un ponçage général et le rebouchage des trous suffisent." },
  { id:"maoline", categorie:"peinture", icon:"◉", nom:"Maoline", marque:"Zolpan", tag:"Impression universelle · Base obligatoire avant mise en peinture", couleur:"#C8A050",
    pour:"Murs & plafonds · Tous supports intérieurs préparés", lien:"https://www.zolpan.fr/catalogue-produits/peintures/interieur/impressions/maoline",
    points:["Impression acrylique universelle haut de gamme","Accroche parfaite sur tous supports préparés","Pénètre et consolide le support — évite les reprises","Blanc très couvrant — sèche en 2h","Base indispensable avant Maotop Mat ou Class 1 Velours","Rendement 10–12 m²/L"],
    process:"1 couche Maoline → 2 couches de finition (Maotop Mat ou Class 1 Velours)",
    limites:["Ne pas utiliser comme finition finale","Support doit être sain, propre et dépoussiéré"],
    conseil:"L'impression qu'on passe systématiquement avant chaque mise en peinture. Elle garantit l'adhérence et l'uniformité du fond." },
  { id:"maotop", categorie:"peinture", icon:"⭐", nom:"Maotop Mat", marque:"Zolpan", tag:"Notre produit phare · Finition mate", couleur:G.gold,
    pour:"Murs & plafonds intérieurs · Toutes pièces", lien:"https://www.zolpan.fr/produit/maotop-mat",
    points:["Mat lessivable classe 1 — se nettoie sans jamais lustrer","Séchage 30 min · Recouvrable dans la journée","Aspect pommelé fin d'une grande élégance","Label NF Environnement · Locaux occupés · HQE","1 200+ teintes nuancier Cromology Zolpan","Rendement 10–12 m²/L"],
    process:"Impression Maoline → 2 couches Maotop Mat",
    limites:["Uniquement murs & plafonds intérieurs","Support à préparer selon état"],
    conseil:"Notre peinture signature. Mat haut de gamme et lessivable classe 1 — le meilleur des deux mondes." },
  { id:"class1", categorie:"peinture", icon:"◆", nom:"Class 1 Velours", marque:"Tollens", tag:"Finition velours lessivable", couleur:"#7060A0",
    pour:"Murs & plafonds · Pièces sèches et humides", lien:"https://www.tollens.com/produit/class-1-velours",
    points:["Velours lessivable classe 1 — très haute résistance","Garnissante et opacifiante — finition A ou B selon support","Sans reprise — facilement retouchable","Glisse remarquable — grand confort d'application","Applicable rouleau ou airless","Adaptée pièces sèches et humides"],
    process:"Impression Maoline → 2 couches Class 1 Velours",
    limites:["Préparation du support déterminante pour le rendu","Aspect velouté nécessite un bon fond"],
    conseil:"La velours qu'on recommande pour les pièces à vivre. Douce à l'œil, résistante au quotidien." },
  { id:"ondilak", categorie:"peinture", icon:"◇", nom:"Ondilak Collection", marque:"Zolpan", tag:"Laque haute performance · Portes & menuiseries uniquement", couleur:"#8060A0",
    pour:"Portes · Menuiseries · Boiseries · Plinthes", lien:"https://www.zolpan.fr/catalogue-produits/peintures/interieur/peintures-satinees/ondilak-collection-satin",
    points:["Laque polyuréthane haut de gamme spéciale boiseries","Haut tendu, aspect lisse — profondeur des teintes","Résistance maximale aux chocs et tâches","Opacifiante dès la 1ère couche","Dépolluante — technologie anti-formaldéhyde","NF Env · Label Excell+ · Classe A+ · Classe 1 abrasion"],
    process:"Primaire si nécessaire → 2 couches Ondilak Collection",
    limites:["Réservée aux menuiseries et boiseries — pas pour les murs","Fond parfaitement préparé obligatoire"],
    conseil:"Notre laque dédiée aux portes et menuiseries. Résultat digne d'une finition de carrosserie sur vos boiseries." },
  { id:"cross", categorie:"peinture", icon:"◈", nom:"Cross Velouté", marque:"Tollens", tag:"Primaire universel multi-supports", couleur:"#6A8A50",
    pour:"Bois · Métaux · PVC · Béton · Supports difficiles", lien:"https://www.tollens.com/produit/cross",
    points:["Primaire universel 2 en 1 — impression & finition","Adhérence multi-supports sans primaire préalable","Isole les taches courantes (nicotine, suie)","Intérieur et extérieur · Pièces sèches et humides","Recouvrable par toute finition acrylique ou glycéro"],
    process:"Directement sur le support difficile → Ondilak ou autre finition",
    limites:["Ne pas utiliser sur RPE, RSE, ITE","Préférer en blanc ou teinte claire en primaire"],
    conseil:"Le primaire de confiance pour tous les supports difficiles avant la pose d'Ondilak sur les menuiseries." },
];

/* ═══ TARIFS ══════════════════════════════════════════════════ */
const TARIFS_PREP = {
  bon:     { label:"Finition C — Préparation légère : ponçage général + rebouchage des trous", min:2,  max:10  },
  moyen:   { label:"Finition B — Préparation ponctuelle : ponçage + rebouchage + ratissage partiel", min:12, max:20 },
  complet: { label:"Finition A — Ratissage complet Proliss F200 (3 en 1)", min:19, max:28 },
};
const TARIFS_PEINTURE = {
  mat:     { label:"Maotop Mat (Zolpan) — Maoline + 2 couches", min:18, max:27 },
  velours: { label:"Class 1 Velours (Tollens) — Maoline + 2 couches", min:20, max:29 },
};
const TARIF_PORTE = { min:80, max:140 };

/* ═══ HARMONIES ══════════════════════════════════════════════ */
const h2h = hex=>{let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return[h*360,s*100,l*100];};
const h2hex=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return"#"+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,"0")).join("");};

/* ═══ ROOM SVG ════════════════════════════════════════════════ */
const Room = ({ mur="#E8E2D6", plafond="#F5F2EC", sol="#C4A882", accent=null }) => {
  const ac = accent||mur;
  return (
    <div style={{position:"relative",width:"100%",paddingTop:"56%"}}>
      <svg viewBox="0 0 1000 560" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"block"}}>
        <defs>
          <linearGradient id="lwS" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#000" stopOpacity="0"/><stop offset="100%" stopColor="#000" stopOpacity="0.15"/></linearGradient>
          <linearGradient id="rwS" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#000" stopOpacity="0"/><stop offset="100%" stopColor="#000" stopOpacity="0.12"/></linearGradient>
          <linearGradient id="cS" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#000" stopOpacity="0.05"/><stop offset="100%" stopColor="#000" stopOpacity="0"/></linearGradient>
          <linearGradient id="fS" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#000" stopOpacity="0.10"/><stop offset="100%" stopColor="#000" stopOpacity="0.02"/></linearGradient>
        </defs>
        <polygon points="0,0 1000,0 1000,70 665,95 195,95 0,55" fill={plafond}/>
        <polygon points="0,0 1000,0 1000,70 665,95 195,95 0,55" fill="url(#cS)"/>
        <polygon points="195,95 665,95 665,395 195,395" fill={mur}/>
        <polygon points="0,55 195,95 195,395 0,560" fill={mur}/>
        <polygon points="0,55 195,95 195,395 0,560" fill="url(#lwS)"/>
        <polygon points="665,95 1000,70 1000,560 665,395" fill={ac}/>
        <polygon points="665,95 1000,70 1000,560 665,395" fill="url(#rwS)"/>
        <polygon points="195,395 665,395 1000,560 0,560" fill={sol}/>
        <polygon points="195,395 665,395 1000,560 0,560" fill="url(#fS)"/>
        {[0.18,0.36,0.54,0.72,0.88].map((t,i)=>{const y=395+t*165,xl=195*(1-t),xr=665+335*t;return <line key={i} x1={xl} y1={y} x2={xr} y2={y} stroke="#0000001A" strokeWidth="1"/>;}) }
        {[0.1,0.25,0.4,0.55,0.7,0.85].map((u,i)=>{const xb=195+u*470,xf=9+868*u;return <line key={i} x1={xb} y1={395} x2={xf} y2={560} stroke="#0000001A" strokeWidth="0.8"/>;}) }
        <polygon points="196,381 664,381 664,395 196,395" fill="#0000001C"/>
        <polygon points="0,548 195,382 195,395 0,560" fill="#00000018"/>
        <polygon points="665,382 1000,547 1000,560 665,395" fill="#00000015"/>
        <line x1="195" y1="95" x2="195" y2="395" stroke="#00000030" strokeWidth="3"/>
        <line x1="665" y1="95" x2="665" y2="395" stroke="#00000028" strokeWidth="3"/>
        <line x1="0" y1="55" x2="195" y2="95" stroke="#00000022" strokeWidth="2"/>
        <line x1="195" y1="95" x2="665" y2="95" stroke="#00000018" strokeWidth="2"/>
        <line x1="665" y1="95" x2="1000" y2="70" stroke="#00000022" strokeWidth="2"/>
        <polygon points="15,78 172,108 172,305 15,375" fill="#F0F8FF"/>
        <polygon points="19,82 168,111 168,301 19,371" fill="#C4E0EE"/>
        <line x1="17" y1="193" x2="170" y2="212" stroke="white" strokeWidth="5"/>
        <line x1="93" y1="83" x2="93" y2="372" stroke="white" strokeWidth="5"/>
        <polygon points="19,82 60,89 58,193 19,188" fill="#FFFFFF30"/>
        <polygon points="15,78 172,108 172,305 15,375" fill="none" stroke="white" strokeWidth="6"/>
        <polygon points="0,57 22,62 20,382 0,395" fill="#F5F0EA" opacity="0.92"/>
        <polygon points="158,109 195,97 195,308 160,305" fill="#F5F0EA" opacity="0.72"/>
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
        <polygon points="748,375 788,370 783,395 752,396" fill="#D8C8B0"/>
        <polygon points="752,378 784,373 783,390 752,390" fill="#C4B09A"/>
        <line x1="768" y1="375" x2="762" y2="310" stroke="#5A4030" strokeWidth="5"/>
        <ellipse cx="748" cy="302" rx="26" ry="17" fill="#3A6835" transform="rotate(-25,748,302)"/>
        <ellipse cx="780" cy="292" rx="23" ry="16" fill="#487840" transform="rotate(20,780,292)"/>
        <ellipse cx="754" cy="278" rx="21" ry="14" fill="#2E5830" transform="rotate(-40,754,278)"/>
        <ellipse cx="782" cy="320" rx="19" ry="13" fill="#426A3A" transform="rotate(30,782,320)"/>
        <ellipse cx="742" cy="325" rx="16" ry="11" fill="#3A6232" transform="rotate(-15,742,325)"/>
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

/* ═══ CALCULATEUR ════════════════════════════════════════════ */
function Calculateur({ T, divider, onDevis }) {
  const [f, setF] = useState({ surface:"", pieces:1, portesMenuis:"0", etat:"bon", finition:"mat", hauteur:2.5 });
  const [res, setRes] = useState(null);
  const [sendOpen, setSendOpen]     = useState(false);
  const [sendNom, setSendNom]       = useState("");
  const [sendTel, setSendTel]       = useState("");
  const [sendMsg, setSendMsg]       = useState("");
  const [sendStatus, setSendStatus] = useState("idle");
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const envoyerAxel = async () => {
    if(!sendNom.trim()) return;
    setSendStatus("sending");
    const recap = `[Estimatif Nuancier]\n\nNom : ${sendNom} | Tél : ${sendTel||"—"}\nSurface : ${res.sol} m² | Pièces : ${f.pieces} | Portes : ${res.pm}\nPréparation : ${res.prep.label}\nFinition : ${res.fin.label}\nEstimation : ${res.totalMin.toLocaleString()} – ${res.totalMax.toLocaleString()} €\nMessage : ${sendMsg||"—"}`;
    try {
      await emailjs.send(EJSID, EJSTPL, { nom:sendNom, telephone:sendTel||"—", email_client:"—", conversation:recap }, EJSKEY);
    } catch(e) { console.error(e); }
    setSendStatus("sent");
  };

  const calc = () => {
    const sol=parseFloat(f.surface)||0; if(sol<=0) return;
    const pm=parseInt(f.portesMenuis)||0;
    const racine=Math.sqrt(sol);
    const mursExt=4*racine*f.hauteur;
    const cloisons=(parseInt(f.pieces)-1)*racine*f.hauteur*2;
    const mNet=Math.round(mursExt+cloisons);
    const total=mNet+sol;
    const prep=TARIFS_PREP[f.etat], fin=TARIFS_PEINTURE[f.finition];
    const pMin=Math.round(total*prep.min), pMax=Math.round(total*prep.max);
    const fMin=Math.round(total*fin.min),  fMax=Math.round(total*fin.max);
    const mMin=pm*TARIF_PORTE.min, mMax=pm*TARIF_PORTE.max;
    setRes({sol,mNet,plafond:sol,total,prep,fin,pMin,pMax,fMin,fMax,pm,mMin,mMax,totalMin:pMin+fMin+mMin,totalMax:pMax+fMax+mMax});
  };

  const inp = {width:"100%",border:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:"9px 0",fontSize:14,fontWeight:300,background:"transparent",color:G.text,fontFamily:"Inter,sans-serif",outline:"none"};
  const sel = {...inp,cursor:"pointer",appearance:"none"};

  return (
    <div>
      <div style={{textAlign:"center",marginBottom:52}}>
        <div style={T.tag}>Votre projet</div>
        {divider}
        <h1 style={{...T.h1,fontSize:"clamp(34px,5vw,54px)"}}>Estimatif<br/><em>de votre chantier</em></h1>
        {divider}
        <p style={{...T.p,maxWidth:520,margin:"0 auto"}}>Renseignez la surface au sol et le nombre de pièces (sanitaires et couloirs inclus) — nous faisons le calcul pour vous !</p>
      </div>
      {!res ? (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,border:`1px solid ${G.goldBorder}`}} className="calcul-grid">
          <div style={{borderRight:`1px solid ${G.goldBorder}`}}>
            <div style={{padding:"24px 28px",background:G.surface,borderBottom:`1px solid ${G.goldBorder}`}}>
              <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:18}}>Votre logement</div>
              <div style={{marginBottom:22}}>
                <label style={{...T.label,display:"block",marginBottom:8}}>Surface totale au sol (m²)</label>
                <input style={inp} type="number" placeholder="ex: 65" value={f.surface} onChange={e=>set("surface",e.target.value)}/>
              </div>
              <div style={{marginBottom:18}}>
                <label style={{...T.label,display:"block",marginBottom:10}}>
                  Nombre de pièces
                  <span style={{...T.p,fontSize:10,fontWeight:300,textTransform:"none",letterSpacing:0,marginLeft:6}}>sanitaires et couloirs inclus</span>
                </label>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <motion.button whileTap={{scale:0.88}} onClick={()=>set("pieces",Math.max(1,f.pieces-1))}
                    style={{width:36,height:36,border:`1px solid ${G.goldBorder}`,background:"transparent",color:G.text,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:300}}>
                    −
                  </motion.button>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:400,color:G.gold,minWidth:28,textAlign:"center",lineHeight:1}}>
                    {f.pieces}
                  </span>
                  <motion.button whileTap={{scale:0.88}} onClick={()=>set("pieces",Math.min(20,f.pieces+1))}
                    style={{width:36,height:36,border:`1px solid ${G.goldBorder}`,background:"transparent",color:G.text,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:300}}>
                    +
                  </motion.button>
                  <span style={{...T.p,fontSize:12}}>pièce{f.pieces>1?"s":""}</span>
                </div>
              </div>
              <div style={{marginBottom:18}}>
                <label style={{...T.label,display:"block",marginBottom:10}}>
                  Hauteur sous plafond
                  <span style={{...T.p,fontSize:10,fontWeight:300,textTransform:"none",letterSpacing:0,marginLeft:6}}>m</span>
                </label>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <motion.button whileTap={{scale:0.88}} onClick={()=>set("hauteur",Math.round(Math.max(2.2,f.hauteur-0.1)*10)/10)}
                    style={{width:36,height:36,border:`1px solid ${G.goldBorder}`,background:"transparent",color:G.text,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:300}}>
                    −
                  </motion.button>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:400,color:G.gold,minWidth:52,textAlign:"center",lineHeight:1}}>
                    {f.hauteur.toFixed(2)}
                  </span>
                  <motion.button whileTap={{scale:0.88}} onClick={()=>set("hauteur",Math.round(Math.min(4.0,f.hauteur+0.1)*10)/10)}
                    style={{width:36,height:36,border:`1px solid ${G.goldBorder}`,background:"transparent",color:G.text,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:300}}>
                    +
                  </motion.button>
                  <span style={{...T.p,fontSize:12}}>m</span>
                </div>
              </div>
              <div style={{marginBottom:18}}>
                <label style={{...T.label,display:"block",marginBottom:8}}>Portes &amp; menuiseries</label>
                <input style={inp} type="number" min="0" max="20" value={f.portesMenuis} onChange={e=>set("portesMenuis",e.target.value)}/>
              </div>
            </div>
            <div style={{padding:"24px 28px",background:G.surface}}>
              <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:18}}>Qualité de préparation</div>
              {Object.entries(TARIFS_PREP).map(([k,v])=>(
                <div key={k} onClick={()=>set("etat",k)} style={{display:"flex",gap:12,padding:"12px",marginBottom:8,cursor:"pointer",border:`1px solid ${f.etat===k?G.gold:G.goldBorder}`,background:f.etat===k?G.goldLt:"transparent"}}>
                  <div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${f.etat===k?G.gold:G.muted}`,background:f.etat===k?G.gold:"transparent",flexShrink:0,marginTop:1}}/>
                  <div>
                    <div style={{...T.label,fontSize:9,marginBottom:3}}>{v.label}</div>
                    <div style={{...T.p,fontSize:10,color:G.gold}}>{v.min}–{v.max} €/m²</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{padding:"24px 28px",background:G.surface,borderBottom:`1px solid ${G.goldBorder}`}}>
              <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:18}}>Type de finition</div>
              {Object.entries(TARIFS_PEINTURE).map(([k,v])=>(
                <div key={k} onClick={()=>set("finition",k)} style={{display:"flex",gap:12,padding:"12px",marginBottom:8,cursor:"pointer",border:`1px solid ${f.finition===k?G.gold:G.goldBorder}`,background:f.finition===k?G.goldLt:"transparent"}}>
                  <div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${f.finition===k?G.gold:G.muted}`,background:f.finition===k?G.gold:"transparent",flexShrink:0,marginTop:1}}/>
                  <div>
                    <div style={{...T.label,fontSize:9,marginBottom:3}}>{v.label}</div>
                    <div style={{...T.p,fontSize:10,color:G.gold}}>{v.min}–{v.max} €/m²</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:"24px 28px",background:G.surface}}>
              <p style={{...T.p,fontSize:11,fontStyle:"italic",marginBottom:24,borderLeft:`2px solid ${G.gold}`,paddingLeft:12}}>
                Ces tarifs sont indicatifs et ne remplacent pas un devis sur mesure. Chaque chantier est unique — la visite gratuite permet d'affiner précisément.
              </p>
              <motion.button whileHover={{scale:1.03,boxShadow:`0 0 24px rgba(200,151,58,.3)`}} whileTap={{scale:0.97}}
                onClick={calc} style={{width:"100%",background:G.gold,color:G.white,border:"none",padding:"14px",fontSize:11,fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
                Calculer →
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{border:`1px solid ${G.goldBorder}`}}>
          <div style={{padding:"24px 28px",background:G.surface,borderBottom:`1px solid ${G.goldBorder}`}}>
            <div style={{...T.tag,fontSize:9,marginBottom:14}}>Surfaces calculées</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}} className="res-grid">
              {[{l:"Sol",v:`${res.sol} m²`},{l:"Murs nets",v:`${res.mNet} m²`},{l:"Plafond",v:`${res.plafond} m²`},{l:"Total à peindre",v:`${res.total} m²`}].map(s=>(
                <div key={s.l} style={{textAlign:"center",padding:"14px",border:`1px solid ${G.goldBorder}`}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:400,color:G.gold}}>{s.v}</div>
                  <div style={{...T.p,fontSize:10,marginTop:4}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"24px 28px",background:G.surface,borderBottom:`1px solid ${G.goldBorder}`}}>
            <div style={{...T.tag,fontSize:9,marginBottom:14}}>Estimation budget</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1}} className="budget-grid">
              {[{l:res.prep.label,min:res.pMin,max:res.pMax},{l:res.fin.label,min:res.fMin,max:res.fMax},...(res.pm>0?[{l:`${res.pm} porte(s)/menuiserie(s)`,min:res.mMin,max:res.mMax}]:[])].map((r,i)=>(
                <div key={i} style={{padding:"16px",background:G.surfaceHi}}>
                  <div style={{...T.p,fontSize:11,marginBottom:8}}>{r.l}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:G.gold}}>{r.min.toLocaleString()} – {r.max.toLocaleString()} €</div>
                </div>
              ))}
            </div>
            <div style={{padding:"20px",background:G.goldLt,border:`1px solid ${G.gold}`,marginTop:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{...T.tag,fontSize:9,marginBottom:4}}>Budget total estimé</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:400,color:G.gold}}>{res.totalMin.toLocaleString()} – {res.totalMax.toLocaleString()} €</div>
              </div>
              <div style={{...T.p,fontSize:11,fontStyle:"italic",maxWidth:280}}>Estimation indicative fournitures + main-d'œuvre. Devis précis après visite gratuite.</div>
              <div style={{...T.p,fontSize:10,color:G.muted,marginTop:8}}>* Prix basés sur le marché actuel — devis personnalisé sur demande</div>
            </div>
          </div>
          <AnimatePresence>
            {sendOpen && sendStatus!=="sent" && (
              <motion.div key="sendform" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
                transition={{duration:0.25}} style={{overflow:"hidden",borderTop:`1px solid ${G.goldBorder}`}}>
                <div style={{padding:"22px 28px",background:G.surfaceHi}}>
                  <div style={{...T.tag,fontSize:9,color:G.gold,marginBottom:16}}>Envoyer votre projet à Axel</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}} className="harm-inner">
                    <div>
                      <label style={{...T.label,display:"block",marginBottom:6}}>Votre prénom *</label>
                      <input style={{width:"100%",border:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:"8px 0",fontSize:13,background:"transparent",color:G.text,fontFamily:"Inter,sans-serif",outline:"none"}}
                        placeholder="ex: Marie" value={sendNom} onChange={e=>setSendNom(e.target.value)}/>
                    </div>
                    <div>
                      <label style={{...T.label,display:"block",marginBottom:6}}>Téléphone</label>
                      <input style={{width:"100%",border:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:"8px 0",fontSize:13,background:"transparent",color:G.text,fontFamily:"Inter,sans-serif",outline:"none"}}
                        placeholder="06 00 00 00 00" value={sendTel} onChange={e=>setSendTel(e.target.value)}/>
                    </div>
                  </div>
                  <div style={{marginBottom:16}}>
                    <label style={{...T.label,display:"block",marginBottom:6}}>Message (optionnel)</label>
                    <input style={{width:"100%",border:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:"8px 0",fontSize:13,background:"transparent",color:G.text,fontFamily:"Inter,sans-serif",outline:"none"}}
                      placeholder="Précisions, disponibilités…" value={sendMsg} onChange={e=>setSendMsg(e.target.value)}/>
                  </div>
                  <div style={{padding:"10px 12px",background:G.goldLt,border:`1px solid ${G.goldBorder}`,marginBottom:14}}>
                    <div style={{...T.p,fontSize:10}}>
                      Récap : <strong style={{color:G.text}}>{res.sol} m²</strong> · {f.hauteur} m · {res.prep.label.split("—")[0].trim()} · {res.fin.label.split("—")[0].trim()} · <strong style={{color:G.gold}}>{res.totalMin.toLocaleString()} – {res.totalMax.toLocaleString()} €</strong>
                    </div>
                  </div>
                  <motion.button whileHover={{scale:1.02,boxShadow:`0 0 20px rgba(200,151,58,.3)`}} whileTap={{scale:0.97}}
                    onClick={envoyerAxel} disabled={sendStatus==="sending"||!sendNom.trim()}
                    style={{...T.btn,width:"100%",background:G.gold,color:G.white,border:"none",padding:"12px",cursor:"pointer",opacity:sendStatus==="sending"||!sendNom.trim()?0.6:1,transition:"opacity .2s"}}>
                    {sendStatus==="sending"?"Envoi en cours…":"Envoyer à Axel →"}
                  </motion.button>
                </div>
              </motion.div>
            )}
            {sendStatus==="sent" && (
              <motion.div key="sendsuccess" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} transition={{duration:0.3}}
                style={{overflow:"hidden",borderTop:`1px solid ${G.goldBorder}`}}>
                <div style={{padding:"22px 28px",background:G.goldLt,textAlign:"center"}}>
                  <div style={{...T.tag,fontSize:10,marginBottom:8}}>✓ Envoyé avec succès</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:G.text,lineHeight:1.5}}>
                    Axel a bien reçu votre projet et vous contactera dans les 48h !
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1}}>
            <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
              onClick={()=>{setRes(null);setSendOpen(false);setSendStatus("idle");setSendNom("");setSendTel("");setSendMsg("");}}
              style={{background:"transparent",border:"none",borderRight:`1px solid ${G.goldBorder}`,color:G.muted,padding:"14px",fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif",letterSpacing:"1px",textTransform:"uppercase"}}>
              ← Recommencer
            </motion.button>
            <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={()=>setSendOpen(o=>!o)}
              style={{background:"transparent",border:"none",borderRight:`1px solid ${G.goldBorder}`,color:sendOpen?G.gold:G.text,padding:"14px",fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase",transition:"color .18s"}}>
              {sendOpen?"Fermer ✕":"Envoyer à Axel →"}
            </motion.button>
            <motion.button whileHover={{scale:1.02,boxShadow:`0 0 20px rgba(200,151,58,.3)`}} whileTap={{scale:0.97}} onClick={onDevis}
              style={{background:G.gold,color:G.white,border:"none",padding:"14px",fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase"}}>
              Devis gratuit →
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ CHATBOT ═════════════════════════════════════════════════ */
const HAS = (t, ...words) => words.some(w => t.includes(w));

const renderText = (text) => text.split("\n").map((line, i, arr) => (
  <React.Fragment key={i}>{line}{i < arr.length - 1 && <br/>}</React.Fragment>
));

function FloatingChat() {
  const [open, setOpen]               = useState(false);
  const [msgs, setMsgs]               = useState([]);
  const [input, setInput]             = useState("");
  const [typing, setTyping]           = useState(false);
  const [showCForm, setShowCForm]     = useState(false);
  const [pendingCTA, setPendingCTA]   = useState(false);
  const [contact, setContact]         = useState({ name:"", phone:"", email:"" });
  const [contactSent, setContactSent] = useState(false);
  const [phase, setPhase]             = useState("welcome");
  const [devisData, setDevisData]     = useState({ type:"", desc:"", ville:"" });
  const [quickBtns, setQuickBtns]     = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    setMsgs([{ from:"bot", text:"Bonjour et bienvenue chez Peinture & Rénovation ! Je suis l'assistant d'Axel. Comment puis-je vous aider aujourd'hui ?" }]);
    setQuickBtns([
      { label:"Conseils couleur",  action:"couleur" },
      { label:"Demander un devis", action:"devis" },
      { label:"Nos services",      action:"services" },
      { label:"Nous appeler",      action:"appeler" },
    ]);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing, showCForm, quickBtns]);

  const botReply = (text, opts = {}) => {
    const { cta=false, btns=null, newPhase=undefined } = opts;
    setTyping(true);
    setQuickBtns(null);
    setTimeout(() => {
      setMsgs(p => [...p, { from:"bot", text }]);
      setTyping(false);
      if (cta) setPendingCTA(true);
      if (btns) setQuickBtns(btns);
      if (newPhase !== undefined) setPhase(newPhase);
    }, 600 + Math.random() * 300);
  };

  const TYPE_BTNS = [
    { label:"Peinture int. / ext.", action:"type_peinture" },
    { label:"Rénovation",           action:"type_reno" },
    { label:"Travaux artistiques",  action:"type_art" },
    { label:"Autre",                action:"type_autre" },
  ];

  const handleQuickBtn = (action) => {
    setQuickBtns(null);
    if (action === "couleur") {
      setMsgs(p => [...p, { from:"user", text:"Conseils couleur" }]);
      botReply("Nos palettes provençales s'adaptent à chaque pièce : Blancs de Provence pour un intérieur lumineux, Ocres & Terres du Sud pour une ambiance chaleureuse, Bleus & Lavande pour apaiser une chambre, Nuits Profondes pour un salon sophistiqué. Consultez notre nuancier juste au-dessus !", { btns:[{label:"Conseils par pièce", action:"pieces"},{label:"Tendances 2025", action:"tendance"}], newPhase:"chat" });
    } else if (action === "pieces") {
      setMsgs(p => [...p, { from:"user", text:"Conseils par pièce" }]);
      botReply("Pour un salon : Ocres du Sud ou Nuits Profondes pour le caractère, Blancs de Provence pour agrandir.\nPour une chambre : Bleus & Lavande ou Wabi-Sabi pour le repos.\nPour la cuisine : Ocres ou Verts Garrigue.\nPour la salle de bain : Bleus ou tons pierre.", { newPhase:"chat" });
    } else if (action === "tendance") {
      setMsgs(p => [...p, { from:"user", text:"Tendances 2025" }]);
      botReply("En 2025, les tons Wabi-Sabi et Velvet & Couture sont très demandés — naturels, chaleureux et intemporels. Le Mocha Mousse (Pantone 2025) et les terres profondes dominent les intérieurs haut de gamme. Consultez nos palettes Tendance 2025 dans le nuancier !", { newPhase:"chat" });
    } else if (action === "devis") {
      setMsgs(p => [...p, { from:"user", text:"Demander un devis" }]);
      botReply("Avec grand plaisir ! Pour vous préparer un devis personnalisé, j'ai besoin de quelques infos. Commençons par le type de travaux :", { btns:TYPE_BTNS, newPhase:"devis_1" });
    } else if (action === "services") {
      setMsgs(p => [...p, { from:"user", text:"Nos services" }]);
      botReply(
        "Voici ce que nous réalisons :\n• Peinture intérieure & extérieure\n• Plâtrerie, enduits, ragréage\n• Revêtements sol & murs\n• Fresques murales & trompe l'œil\n• Travaux artistiques sur mesure\n\nNous faisons partie d'un groupe d'artisans coordonnant tout pour vous — de la peinture au gros œuvre.\n\nVous avez quelque chose en tête ?",
        { btns:[{ label:"Demander un devis", action:"devis" }, { label:"Estimer le coût", action:"simulateur" }], newPhase:"chat" }
      );
    } else if (action === "appeler") {
      setMsgs(p => [...p, { from:"user", text:"Nous appeler" }]);
      botReply("Bien sûr ! Axel est joignable directement au 06 16 70 57 57, du lundi au samedi. Il prend le temps d'écouter chaque projet et sera ravi d'échanger avec vous !", { newPhase:"chat" });
    } else if (action.startsWith("type_")) {
      const labels = { type_peinture:"Peinture int. / ext.", type_reno:"Rénovation", type_art:"Travaux artistiques", type_autre:"Autre" };
      const label = labels[action];
      setMsgs(p => [...p, { from:"user", text:label }]);
      setDevisData(d => ({...d, type:label}));
      botReply("Super choix ! Pour mieux cerner votre projet, pouvez-vous nous donner quelques détails ? (ex : refaire le salon, ravalement de façade, fresque dans l'entrée...)", { newPhase:"devis_2" });
    } else if (action === "simulateur") {
      setMsgs(p => [...p, { from:"user", text:"Estimer le coût" }]);
      botReply("Notre estimatif gratuit est disponible dans le premier onglet — il vous donne une fourchette personnalisée en 2 minutes !\n\nEt si vous préférez en parler directement, Axel peut vous rappeler : laissez votre nom et numéro ci-dessous, ou appelez-le au 06 16 70 57 57 !", { cta:true, newPhase:"chat" });
    } else if (action === "rappel") {
      setPendingCTA(true);
    }
  };

  const sendMsg = async () => {
    const txt = input.trim();
    if (!txt) return;
    setMsgs(p => [...p, { from:"user", text:txt }]);
    setInput("");
    const t = txt.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");

    if (phase === "devis_1") {
      setDevisData(d => ({...d, type:txt}));
      botReply("Super ! Pouvez-vous nous décrire votre projet en quelques mots ?", { newPhase:"devis_2" });
      return;
    }
    if (phase === "devis_2") {
      setDevisData(d => ({...d, desc:txt}));
      botReply("Très bien, on y est presque ! Dans quelle ville se situe le chantier ?", { newPhase:"devis_3" });
      return;
    }
    if (phase === "devis_3") {
      setDevisData(d => ({...d, ville:txt}));
      botReply(
        "Parfait, merci pour ces informations ! Pour avoir une idée du budget, notre estimatif gratuit est disponible dans le premier onglet — rapide et sans engagement !\n\nEt si vous préférez en discuter de vive voix, Axel est là. Laissez-nous vos coordonnées ou appelez le 06 16 70 57 57 !",
        { cta:true, btns:[{ label:"Me faire rappeler", action:"rappel" }], newPhase:"chat" }
      );
      return;
    }

    if (HAS(t,"couleur","blanc","teinte","nuance","palette","peindre","ton","nuanci")) {
      botReply("Nos palettes provençales s'adaptent à chaque pièce : Blancs de Provence pour lumineux, Ocres & Terres du Sud pour chaleureux, Bleus & Lavande pour apaisant, Nuits Profondes pour sophistiqué. Consultez notre nuancier juste au-dessus !", { btns:[{label:"Conseils par pièce", action:"pieces"},{label:"Tendances 2025", action:"tendance"}] });
    } else if (HAS(t,"salon","sejour","cuisine","chambre","salle de bain","bureau","entree","couloir")) {
      botReply("Pour un salon : Ocres du Sud ou Nuits Profondes, Blancs de Provence pour agrandir.\nPour une chambre : Bleus & Lavande ou Wabi-Sabi.\nPour la cuisine : Ocres ou Verts Garrigue.\nPour la salle de bain : Bleus ou tons pierre.");
    } else if (HAS(t,"tendance","2025","mode","luxe","contemporain")) {
      botReply("En 2025, les tons Wabi-Sabi et Velvet & Couture sont très demandés — naturels, chaleureux et intemporels. Le Mocha Mousse (Pantone 2025) et les terres profondes dominent les intérieurs haut de gamme. Consultez nos palettes Tendance 2025 !");
    } else if (HAS(t,"prix","budget","cout","tarif","combien","cher","estimation","simulateur")) {
      botReply(
        "Pour avoir une idée du budget, notre estimatif gratuit est dans le premier onglet — il vous donne une fourchette personnalisée en 2 minutes, sans engagement !\n\nEt si vous souhaitez qu'Axel vous rappelle, laissez-nous vos coordonnées ou appelez le 06 16 70 57 57 !",
        { cta:true }
      );
    } else if (HAS(t,"electr","macon","charpent","isolat","toiture","menuiser","terrassement")) {
      botReply("Pas de souci ! Nous faisons partie d'un groupe d'artisans qui coordonnent tout pour vous — de la peinture au gros œuvre.\n\nSouhaitez-vous qu'on vous rappelle pour en discuter ?", { cta:true });
    } else if (HAS(t,"fresque","murale","trompe","artistique","stucco","tadelakt","beton cire")) {
      botReply("Les travaux artistiques, c'est vraiment le cœur de métier d'Axel ! Fresques murales, trompe l'œil, stucco, béton ciré... chaque réalisation est unique.\n\nVous souhaitez un devis pour ce type de projet ?", { btns:[{ label:"Demander un devis", action:"devis" }] });
    } else if (HAS(t,"devis","projet","travaux","renover","renovation","peindre","peinture","placo","carrelage","parquet")) {
      botReply("Avec plaisir ! Commençons par le type de travaux qui vous intéresse :", { btns:TYPE_BTNS, newPhase:"devis_1" });
    } else if (HAS(t,"interesse","appel","rappel","contact","rdv","rendez","coordonnee","joindre")) {
      botReply("Avec plaisir ! Axel aime prendre le temps de bien comprendre chaque projet. Appelez-le directement au 06 16 70 57 57, ou laissez vos coordonnées ci-dessous et il vous rappelle sous 48h !", { cta:true });
    } else if (HAS(t,"disponible","disponibilite","delai","quand","urgent")) {
      botReply("Les plannings se remplissent vite ! Pour connaître nos disponibilités exactes, le plus simple est d'appeler Axel au 06 16 70 57 57. Vous pouvez aussi laisser vos coordonnées et il vous rappelle sous 48h !", { cta:true });
    } else if (HAS(t,"peynier","aix","gardanne","meyreuil","fuveau","trets","aubagne","marseille","zone","secteur","pays d")) {
      botReply("Nous intervenons principalement sur le Pays d'Aix-en-Provence, Marseille, Gardanne, Trets, Aubagne et le secteur de l'étang de Berre. N'hésitez pas à nous demander si votre commune est couverte !");
    } else if (HAS(t,"bonjour","bonsoir","salut","hello","coucou")) {
      botReply("Bonjour, bienvenue chez Peinture & Rénovation ! Ravi de vous accueillir. Qu'est-ce qui nous vaut le plaisir de votre visite ?", { btns:[{ label:"Conseils couleur", action:"couleur" }, { label:"Demander un devis", action:"devis" }] });
    } else if (HAS(t,"merci","super","parfait","excellent","nickel","top")) {
      botReply("Merci à vous, c'est un plaisir ! N'hésitez pas à revenir si vous avez d'autres questions — nous sommes disponibles du lundi au samedi. À bientôt !");
    } else {
      setTyping(true);
      setQuickBtns(null);
      try {
        const apiMsgs = [
          ...msgs.filter(m => m.from === "user" || m.from === "bot").map(m => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text
          })),
          { role: "user", content: txt }
        ];
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMsgs })
        });
        const data = await res.json();
        const reply = data.content?.[0]?.text ?? "Désolé, je n'ai pas pu répondre. Appelez Axel au 06 16 70 57 57 !";
        setMsgs(p => [...p, { from:"bot", text:reply }]);
      } catch {
        setMsgs(p => [...p, { from:"bot", text:"Désolé, je n'ai pas pu répondre. Appelez Axel au 06 16 70 57 57 !" }]);
      } finally {
        setTyping(false);
      }
    }
  };

  const sendContact = async () => {
    if (!contact.name.trim() || (!contact.phone.trim() && !contact.email.trim())) return;
    const summary = devisData.type
      ? `Projet : ${devisData.type}${devisData.desc ? ` — ${devisData.desc}` : ""}${devisData.ville ? ` (${devisData.ville})` : ""}\n\n`
      : "";
    const conv = msgs.map(m=>`${m.from==="user"?"Client":"Assistant"}: ${m.text}`).join("\n");
    try {
      await emailjs.send(EJSID, EJSTPL, {
        nom: contact.name,
        telephone: contact.phone || "—",
        email_client: contact.email || "—",
        conversation: summary + conv,
      }, EJSKEY);
    } catch(e) { console.error(e); }
    setContactSent(true); setShowCForm(false); setPendingCTA(false);
    setMsgs(p => [...p, { from:"bot", text:`Merci ${contact.name.split(" ")[0]} ! Vos coordonnées ont bien été reçues, Axel vous rappellera très rapidement.` }]);
  };

  return (
    <>
      {open && (
        <div className="chat-win">
          <div className="chat-head">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"#C8973A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="white"/></svg>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:"#fff",letterSpacing:".04em"}}>Assistant Peinture &amp; Rénovation</div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#4CAF50"}}/>
                  <span style={{fontSize:10,color:"rgba(255,255,255,.5)"}}>En ligne</span>
                </div>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",fontSize:18,cursor:"pointer",padding:"2px 6px",lineHeight:1}}>✕</button>
          </div>
          <div className="chat-body">
            {msgs.map((m,i) => (
              <div key={i} className={m.from==="bot"?"chat-msg-bot":"chat-msg-user"}>{renderText(m.text)}</div>
            ))}
            {typing && (
              <div className="chat-msg-bot" style={{display:"flex",gap:5,alignItems:"center",padding:"12px 14px"}}>
                {[0,.25,.5].map(d=><span key={d} style={{width:7,height:7,borderRadius:"50%",background:"#C8973A",display:"inline-block",animation:`pulse 1.1s ${d}s infinite`}}/>)}
              </div>
            )}
            {quickBtns && !typing && (
              <div className="chat-quick-btns">
                {quickBtns.map(b => (
                  <button key={b.action} className="chat-quick-btn" onClick={()=>handleQuickBtn(b.action)}>{b.label}</button>
                ))}
              </div>
            )}
            {pendingCTA && !showCForm && !contactSent && (
              <button className="chat-coords-btn" onClick={()=>{setShowCForm(true);setPendingCTA(false);}}>Laisser mes coordonnées →</button>
            )}
            {showCForm && (
              <div className="chat-cform">
                <div style={{fontSize:11,color:"#555",fontWeight:500,marginBottom:2}}>Vos coordonnées pour être rappelé(e) :</div>
                <input placeholder="Prénom et nom *" value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})}/>
                <input placeholder="Téléphone (06…) *" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})}/>
                <input placeholder="Email (optionnel)" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})}/>
                <button className="chat-cform-btn" onClick={sendContact}>Envoyer →</button>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          <div className="chat-foot">
            <input className="chat-inp" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMsg()} placeholder="Votre question…" maxLength={300}/>
            <button className="chat-send" onClick={sendMsg} disabled={!input.trim()}>→</button>
          </div>
        </div>
      )}
      <button className="chat-btn" onClick={()=>setOpen(o=>!o)} aria-label="Chat">
        {open
          ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="white"/></svg>
        }
      </button>
    </>
  );
}

/* ═══ APP ═════════════════════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Peinture & Rénovation",
      "description": "Artisan peintre à Peynier, Pays d'Aix-en-Provence. Peinture intérieure et extérieure, rénovation complète, travaux artistiques, fresques, trompe l'œil.",
      "telephone": "+33616705757",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Peynier",
        "postalCode": "13790",
        "addressRegion": "Bouches-du-Rhône",
        "addressCountry": "FR"
      },
      "areaServed": "Pays d'Aix-en-Provence",
      "founder": { "@type": "Person", "name": "Axel Sandahl" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          { "@type":"Offer", "itemOffered":{ "@type":"Service", "name":"Peinture intérieure et extérieure" } },
          { "@type":"Offer", "itemOffered":{ "@type":"Service", "name":"Rénovation complète tous corps d'état" } },
          { "@type":"Offer", "itemOffered":{ "@type":"Service", "name":"Fresques murales" } },
          { "@type":"Offer", "itemOffered":{ "@type":"Service", "name":"Trompe l'œil" } },
          { "@type":"Offer", "itemOffered":{ "@type":"Service", "name":"Plâtrerie et enduits" } }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "50",
        "bestRating": "5"
      }
    });
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch(e) {} };
  }, []);

  const [tab, setTab]         = useState("calcul");
  const [openPal, setOpenPal] = useState(null);
  const [selColor, setSelColor] = useState(null);
  const [openProd, setOpenProd] = useState(null);
  const [visu, setVisu]       = useState({mur:"#E8E2D6",plafond:"#F5F2EC",sol:"#C4A882",accent:null});
  const [sel, setSel]         = useState({couleurs:[],produit:null});
  const [modal, setModal]     = useState(false);
  const [nom, setNom]         = useState("");
  const [tel, setTel]         = useState("");
  const [piece, setPiece]     = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const toggleC = c => setSel(s=>({...s,couleurs:s.couleurs.find(x=>x.ref===c.ref)?s.couleurs.filter(x=>x.ref!==c.ref):[...s.couleurs,c]}));
  const inSel   = c => sel.couleurs.some(x=>x.ref===c.ref);
  const count   = sel.couleurs.length + (sel.produit?1:0);
  const allC    = PALETTES.flatMap(p=>p.couleurs);

  const harm = selColor ? (()=>{
    const [h,s,l]=h2h(selColor.hex);
    return {
      mono:  [h2hex(h,s,Math.min(l+22,93)), selColor.hex, h2hex(h,s,Math.max(l-18,8))],
      analog:[h2hex((h-30+360)%360,s,l), selColor.hex, h2hex((h+30)%360,s,l)],
      compl: [selColor.hex, h2hex((h+180)%360,s,l)],
      triad: [selColor.hex, h2hex((h+120)%360,s,l), h2hex((h+240)%360,s,l)],
    };
  })() : null;

  const T = {
    tag:   {fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.gold},
    h1:    {fontFamily:"'Cormorant Garamond',serif",fontWeight:300,letterSpacing:"-0.5px",color:G.text,lineHeight:1.1},
    p:     {fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:300,color:G.muted,lineHeight:1.75,letterSpacing:"0.2px"},
    label: {fontFamily:"Inter,sans-serif",fontSize:9,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:G.text},
    btn:   {fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase"},
  };
  const divider = <div style={{width:32,height:1,background:G.gold,margin:"18px auto"}}/>;
  const preps  = PRODUITS.filter(p=>p.categorie==="preparation");
  const peints = PRODUITS.filter(p=>p.categorie==="peinture");

  const sendDevis = async () => {
    if(!nom.trim()) return;
    setSending(true);
    const couleursText = sel.couleurs.length>0
      ? sel.couleurs.map(c=>`${c.nom} — ${c.ref} — ${c.hex}`).join("\n")
      : "Aucune couleur sélectionnée";
    const produitText = sel.produit
      ? `${sel.produit.nom} (${sel.produit.marque})`
      : "Aucun produit sélectionné";
    try {
      await emailjs.send(EJSID, EJSTPL, {
        nom,
        telephone: tel || "—",
        email_client: "—",
        conversation: `[Nuancier] Demande de devis\n\nPrénom : ${nom}\nTél : ${tel||"—"}\nPièce : ${piece||"—"}\n\nCouleurs :\n${couleursText}\n\nFinition : ${produitText}`,
      }, EJSKEY);
    } catch(e) { console.error(e); }
    setSending(false);
    setSent(true);
  };

  const TABS = [
    {id:"calcul",     l:<><span style={{color:G.gold,fontWeight:600}}>€</span>&nbsp;Chiffrer mon projet</>},
    {id:"palettes",   l:"Palettes"},
    {id:"harmonies",  l:"Harmonies"},
    {id:"simulateur", l:"Simulateur"},
    {id:"produits",   l:"Produits"},
  ];

  return (
    <div style={{fontFamily:"Inter,sans-serif",background:G.bg,minHeight:"100vh",color:G.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#FAFAF8;}
        input,select,button{font-family:Inter,sans-serif;}
        input{outline:none;} input:focus{border-color:${G.gold}!important;}
        select option{background:#fff;color:#1A1A1A;}
        a{text-decoration:none;}
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:${G.gold};border-radius:2px;}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(76,175,80,.5)}50%{box-shadow:0 0 0 5px rgba(76,175,80,0)}}
        .sw{transition:transform .12s,box-shadow .12s,outline .12s;cursor:pointer;}
        .sw:hover{transform:scale(1.13);box-shadow:0 4px 14px rgba(200,151,58,.3)}
        .chat-btn{position:fixed;bottom:28px;right:28px;z-index:1000;width:56px;height:56px;border-radius:50%;background:#C8973A;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(200,151,58,.45);transition:.25s;}
        .chat-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(200,151,58,.65);}
        .chat-win{position:fixed;bottom:96px;right:28px;z-index:1000;width:340px;background:#fff;border:1px solid #DEDEDE;box-shadow:0 8px 40px rgba(0,0,0,.18);display:flex;flex-direction:column;font-family:Inter,sans-serif;border-radius:2px;overflow:hidden;}
        .chat-head{background:#0A0A0A;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
        .chat-body{overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;min-height:160px;max-height:320px;}
        .chat-msg-bot{background:#F5F5F5;color:#1A1A1A;padding:10px 13px;font-size:13px;line-height:1.55;max-width:85%;border-radius:0 8px 8px 8px;word-break:break-word;}
        .chat-msg-user{background:#C8973A;color:#fff;padding:10px 13px;font-size:13px;line-height:1.55;max-width:85%;border-radius:8px 0 8px 8px;align-self:flex-end;word-break:break-word;}
        .chat-foot{padding:10px 12px;border-top:1px solid #DEDEDE;display:flex;gap:8px;flex-shrink:0;}
        .chat-inp{flex:1;border:1px solid #DEDEDE;padding:9px 12px;font-family:Inter;font-size:13px;color:#1A1A1A;outline:none;border-radius:2px;}
        .chat-inp:focus{border-color:#C8973A;}
        .chat-send{background:#C8973A;color:#fff;border:none;padding:9px 14px;cursor:pointer;font-family:Inter;font-size:14px;border-radius:2px;transition:.2s;flex-shrink:0;}
        .chat-send:hover{background:#b08432;}
        .chat-send:disabled{opacity:.4;cursor:not-allowed;}
        .chat-cform{background:#F9F6EF;border:1px solid rgba(200,151,58,.3);padding:12px;display:flex;flex-direction:column;gap:7px;}
        .chat-cform input{border:1px solid #DEDEDE;padding:8px 10px;font-family:Inter;font-size:12px;outline:none;border-radius:2px;width:100%;}
        .chat-cform input:focus{border-color:#C8973A;}
        .chat-cform-btn{background:#0A0A0A;color:#fff;border:none;padding:9px;font-family:Inter;font-size:10px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:.2s;}
        .chat-cform-btn:hover{background:#C8973A;}
        .chat-quick-btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;}
        .chat-quick-btn{background:none;border:1px solid rgba(200,151,58,.5);color:#C8973A;padding:6px 11px;font-size:11px;font-family:Inter;cursor:pointer;border-radius:2px;letter-spacing:.04em;transition:.2s;text-align:left;}
        .chat-quick-btn:hover{background:#C8973A;color:#fff;border-color:#C8973A;}
        .chat-coords-btn{background:none;border:1px solid rgba(200,151,58,.5);color:#C8973A;padding:8px 14px;font-size:11px;font-family:Inter;cursor:pointer;border-radius:2px;letter-spacing:.04em;transition:.2s;align-self:flex-start;}
        .chat-coords-btn:hover{background:#C8973A;color:#fff;}
        @media(max-width:768px){
          .header-inner{flex-wrap:wrap;gap:10px;}
          .calcul-grid{grid-template-columns:1fr!important;}
          .res-grid{grid-template-columns:1fr 1fr!important;}
          .budget-grid{grid-template-columns:1fr!important;}
          .sim-grid{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;text-align:center;}
          .palette-grid{grid-template-columns:1fr!important;}
          .prod-grid{grid-template-columns:1fr!important;}
          .harm-grid{grid-template-columns:1fr 1fr!important;}
          .harm-inner{grid-template-columns:1fr!important;}
          .chat-win{width:calc(100vw - 32px);right:16px;}
        }
        @media(max-width:480px){
          .tabs-nav{padding:0 12px!important;}
          .tabs-nav button{padding:10px 12px!important;font-size:9px!important;}
          .main-pad{padding:28px 14px 80px!important;}
          .res-grid{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>

      {/* ══ CONTACT BAR ══ */}
      <div style={{background:G.gold,padding:"9px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
        {[{icon:"📞",label:"06 16 70 57 57",href:"tel:+33616705757"},{icon:"✉️",label:"peintureetrenovation13@gmail.com",href:"mailto:peintureetrenovation13@gmail.com"},{icon:"📍",label:"Pays d'Aix-en-Provence",href:null}].map((c,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:12}}>{c.icon}</span>
            {c.href
              ? <a href={c.href} style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,color:"#fff",letterSpacing:"0.5px"}}>{c.label}</a>
              : <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#fff",letterSpacing:"0.5px"}}>{c.label}</span>}
          </div>
        ))}
      </div>

      {/* ══ HEADER ══ */}
      <header style={{background:G.ink,borderBottom:`1px solid ${G.goldBorder}`,position:"sticky",top:0,zIndex:100}}>
        <div className="header-inner" style={{maxWidth:1060,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Logo size={48}/>
            <div>
              <div style={{...T.tag,fontSize:8,marginBottom:3,color:G.gold}}>Peinture et Rénovation · Pays d'Aix</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,fontWeight:300,fontStyle:"italic",color:G.muted}}>Axel Sandahl · Artisan d'Art</div>
            </div>
          </div>
          <a href={MAIN_URL} target="_blank" rel="noreferrer"
            style={{...T.tag,fontSize:9,color:G.muted,display:"flex",alignItems:"center",gap:6,transition:"color .2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=G.gold}
            onMouseLeave={e=>e.currentTarget.style.color=G.muted}>
            ← Site principal
          </a>
          <motion.button whileHover={{borderColor:G.gold,color:G.white}} whileTap={{scale:0.96}} onClick={()=>setModal(true)}
            style={{...T.btn,background:"transparent",border:`1px solid ${G.goldBorder}`,color:G.gold,padding:"8px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            Ma sélection
            {count>0 && <span style={{background:G.gold,color:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{count}</span>}
          </motion.button>
        </div>

        {/* TABS */}
        <nav className="tabs-nav" style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",display:"flex",borderTop:`1px solid ${G.border}`,overflowX:"auto",scrollbarWidth:"none"}}>
          {TABS.map(t=>(
            <motion.button key={t.id} onClick={()=>setTab(t.id)}
              whileHover={{color:G.gold}} whileTap={{scale:0.96}}
              style={{...T.btn,background:"transparent",border:"none",borderBottom:tab===t.id?`2px solid ${G.gold}`:"2px solid transparent",color:tab===t.id?G.gold:G.muted,padding:"11px 18px",whiteSpace:"nowrap",cursor:"pointer",transition:"color .18s,border-color .18s"}}>
              {t.l}
            </motion.button>
          ))}
        </nav>
      </header>

      {/* ══ MAIN ══ */}
      <main className="main-pad" style={{maxWidth:1060,margin:"0 auto",padding:"48px 20px 96px"}}>
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            transition={{duration:0.28,ease:[0.22,1,0.36,1]}}>

            {/* ══ PALETTES ══ */}
            {tab==="palettes" && (
              <div>
                <div style={{textAlign:"center",marginBottom:48}}>
                  <div style={T.tag}>Guide couleur · Nuancier Cromology Zolpan</div>
                  {divider}
                  <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Choisissez<br/><em>votre ambiance</em></h1>
                  {divider}
                  <p style={{...T.p,maxWidth:480,margin:"0 auto 16px"}}>Des palettes issues du nuancier Cromology Zolpan, pensées pour les intérieurs provençaux.</p>
                  <a href="https://www.zolpan.fr/colorimetrie/couleurs-interieures/nuancier-couleur-cromology" target="_blank" rel="noreferrer"
                    style={{...T.tag,fontSize:9,color:G.gold,borderBottom:`1px solid ${G.goldBorder}`,paddingBottom:2}}>
                    Voir le nuancier Cromology complet →
                  </a>
                </div>
                <div className="palette-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:1,border:`1px solid ${G.goldBorder}`}}>
                  {PALETTES.map((pal,i)=>{
                    const open = openPal?.id===pal.id;
                    return (
                      <motion.div key={pal.id}
                        whileHover={!open?{borderColor:"rgba(200,151,58,.45)"}:{}}
                        onClick={()=>setOpenPal(open?null:pal)}
                        style={{background:open?G.surfaceHi:G.surface,borderRight:i%2===0?`1px solid ${G.goldBorder}`:"none",borderBottom:`1px solid ${G.goldBorder}`,cursor:"pointer",transition:"background .2s,border-color .2s"}}>
                        {/* Bande couleurs */}
                        <div style={{display:"flex",height:64}}>
                          {pal.couleurs.map(c=>(
                            <motion.div key={c.hex} style={{flex:1,background:c.hex}}
                              whileHover={{flex:1.5}} transition={{duration:0.2}}/>
                          ))}
                        </div>
                        <div style={{padding:"18px 22px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                            <div>
                              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:G.text}}>{pal.nom}</div>
                              <div style={{...T.tag,fontSize:9,marginTop:3}}>{pal.ambiance}</div>
                            </div>
                            <motion.div animate={{rotate:open?180:0}} transition={{duration:.22}} style={{color:G.gold,fontSize:16}}>▾</motion.div>
                          </div>
                          <p style={{...T.p,fontSize:12,marginBottom:5}}>{pal.desc}</p>
                          <div style={{...T.p,fontSize:11}}>📍 {pal.piece}</div>
                          <AnimatePresence>
                            {open && (
                              <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.28}}
                                style={{overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
                                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:18,paddingTop:18,borderTop:`1px solid ${G.goldBorder}`}}>
                                  {pal.couleurs.map(c=>(
                                    <motion.div key={c.ref} style={{textAlign:"center",cursor:"pointer"}}
                                      whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                                      onClick={()=>{toggleC(c);setSelColor(c);setVisu(v=>({...v,mur:c.hex}));}}>
                                      <motion.div className="sw"
                                        style={{width:54,height:54,margin:"0 auto 7px",background:c.hex,outline:inSel(c)?`2px solid ${G.gold}`:"2px solid transparent",outlineOffset:3}}
                                        whileHover={{boxShadow:`0 0 0 3px ${G.gold}55`}}/>
                                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:G.text,marginBottom:1}}>{c.nom}</div>
                                      <div style={{...T.p,fontSize:9,color:G.gold}}>{c.ref}</div>
                                      {inSel(c) && <div style={{...T.tag,fontSize:9,marginTop:3}}>✓ Sélectionné</div>}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══ HARMONIES ══ */}
            {tab==="harmonies" && (
              <div>
                <div style={{textAlign:"center",marginBottom:48}}>
                  <div style={T.tag}>Théorie des couleurs</div>
                  {divider}
                  <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Harmonies<br/><em>de couleurs</em></h1>
                  {divider}
                  <p style={{...T.p,maxWidth:460,margin:"0 auto"}}>Sélectionnez une couleur de base pour découvrir les teintes qui s'accordent parfaitement.</p>
                </div>
                <div style={{background:G.surface,border:`1px solid ${G.goldBorder}`,padding:26,marginBottom:36}}>
                  <div style={{...T.label,marginBottom:14}}>Couleur de départ</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {allC.map(c=>(
                      <motion.div key={c.ref} className="sw"
                        style={{width:34,height:34,background:c.hex,outline:selColor?.ref===c.ref?`2px solid ${G.gold}`:"2px solid transparent",outlineOffset:2}}
                        whileHover={{scale:1.18,boxShadow:`0 4px 14px rgba(200,151,58,.3)`}}
                        onClick={()=>setSelColor(c)} title={c.nom}/>
                    ))}
                  </div>
                </div>
                {selColor && harm ? (
                  <div className="harm-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:1,border:`1px solid ${G.goldBorder}`}}>
                    {[{k:"mono",l:"Monochrome",d:"Déclinaisons de la même teinte."},{k:"analog",l:"Analogues",d:"Teintes voisines, ambiance douce."},{k:"compl",l:"Complémentaires",d:"Opposées — fort contraste pour un accent."},{k:"triad",l:"Triadique",d:"Trois teintes équilibrées."}].map((h,i)=>(
                      <motion.div key={h.k} whileHover={{background:G.surfaceHi}}
                        style={{background:G.surface,borderRight:i%2===0?`1px solid ${G.goldBorder}`:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:22,transition:"background .2s"}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:400,color:G.text,marginBottom:5}}>{h.l}</div>
                        <p style={{...T.p,fontSize:11,marginBottom:16}}>{h.d}</p>
                        <div style={{display:"flex",gap:8,marginBottom:14}}>
                          {harm[h.k].map((hex,j)=>(
                            <div key={j} style={{flex:1,textAlign:"center"}}>
                              <motion.div className="sw" style={{height:46,margin:"0 auto 5px",background:hex}}
                                whileHover={{scale:1.1}}
                                onClick={()=>{setVisu(v=>({...v,mur:hex}));setTab("simulateur");}}/>
                              <div style={{fontFamily:"monospace",fontSize:9,color:G.muted}}>{hex.toUpperCase()}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{...T.tag,fontSize:9,cursor:"pointer",color:G.gold}}
                          onClick={()=>{setVisu(v=>({...v,mur:harm[h.k][0],accent:harm[h.k].length>1?harm[h.k][1]:null}));setTab("simulateur");}}>
                          Voir dans la pièce →
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div style={{textAlign:"center",padding:"60px",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,fontStyle:"italic",color:G.muted}}>
                    Sélectionnez une couleur ci-dessus
                  </div>
                )}
              </div>
            )}

            {/* ══ SIMULATEUR ══ */}
            {tab==="simulateur" && (
              <div>
                <div style={{textAlign:"center",marginBottom:40}}>
                  <div style={T.tag}>Visualisation</div>
                  {divider}
                  <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Simulateur<br/><em>de pièce</em></h1>
                  {divider}
                  <p style={{...T.p,maxWidth:460,margin:"0 auto"}}>Testez vos couleurs en temps réel. Cliquez sur une teinte pour l'appliquer sur les surfaces.</p>
                </div>
                <div className="sim-grid" style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:1,alignItems:"start",border:`1px solid ${G.goldBorder}`}}>
                  <div style={{background:G.surface,borderRight:`1px solid ${G.goldBorder}`}}>
                    <Room {...visu}/>
                    <div style={{display:"flex",flexWrap:"wrap",gap:14,padding:"14px 20px",borderTop:`1px solid ${G.goldBorder}`,background:G.surfaceHi}}>
                      {[{k:"mur",l:"Murs (fond + gauche)"},{k:"plafond",l:"Plafond"},{k:"sol",l:"Sol"},{k:"accent",l:"Mur droit (accent)"}].map(({k,l})=>(
                        <div key={k} style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{width:16,height:16,background:visu[k]||"#333",border:`1px solid ${G.goldBorder}`,flexShrink:0}}/>
                          <span style={{...T.p,fontSize:10}}>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {[{key:"mur",label:"Murs (fond + gauche)"},{key:"plafond",label:"Plafond"},{key:"sol",label:"Sol"},{key:"accent",label:"Mur droit (accent)"}].map(ctrl=>(
                      <div key={ctrl.key} style={{padding:"14px 18px",borderBottom:`1px solid ${G.border}`,background:G.surface}}>
                        <div style={{...T.label,marginBottom:10}}>{ctrl.label}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {ctrl.key==="accent" && (
                            <div className="sw" style={{width:24,height:24,background:"#222",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:G.muted,border:`1px solid ${G.border}`}}
                              onClick={()=>setVisu(v=>({...v,accent:null}))} title="Aucun">✕</div>
                          )}
                          {allC.map(c=>(
                            <motion.div key={c.ref} className="sw"
                              style={{width:24,height:24,background:c.hex,outline:visu[ctrl.key]===c.hex?`2px solid ${G.gold}`:"2px solid transparent",outlineOffset:2}}
                              whileHover={{scale:1.2}} whileTap={{scale:0.9}}
                              onClick={()=>setVisu(v=>({...v,[ctrl.key]:c.hex}))} title={c.nom}/>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ PRODUITS ══ */}
            {tab==="produits" && (
              <div>
                <div style={{textAlign:"center",marginBottom:48}}>
                  <div style={T.tag}>Gamme professionnelle</div>
                  {divider}
                  <h1 style={{...T.h1,fontSize:"clamp(32px,5vw,52px)"}}>Nos produits<br/><em>& savoir-faire</em></h1>
                  {divider}
                  <p style={{...T.p,maxWidth:520,margin:"0 auto"}}>Les préparations d'abord — c'est la base de tout chantier réussi. Puis les finitions qui subliment le résultat.</p>
                </div>
                <div style={{...T.tag,fontSize:9,marginBottom:12,color:G.muted}}>── Préparations du support</div>
                <div className="prod-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:1,border:`1px solid ${G.goldBorder}`,marginBottom:32}}>
                  {preps.map((p,i)=>{
                    const open=openProd===p.id;
                    return (
                      <motion.div key={p.id} whileHover={!open?{background:G.surfaceHi}:{}} onClick={()=>setOpenProd(open?null:p.id)}
                        style={{background:open?G.surfaceHi:G.surface,borderRight:i%2===0?`1px solid ${G.goldBorder}`:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:22,cursor:"pointer",borderLeft:`3px solid ${p.couleur}`,transition:"background .2s"}}>
                        <div style={{...T.tag,fontSize:8,color:p.couleur,marginBottom:8}}>{p.tag}</div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                          <div>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:G.text}}>{p.icon} {p.nom}</div>
                            <div style={{...T.p,fontSize:11,marginTop:2}}>{p.marque}</div>
                          </div>
                          <motion.div animate={{rotate:open?180:0}} transition={{duration:.2}} style={{...T.tag,fontSize:9,color:G.muted}}>▾</motion.div>
                        </div>
                        <div style={{...T.p,fontSize:11,marginBottom:10}}>📍 {p.pour}</div>
                        <div style={{borderLeft:`2px solid ${p.couleur}`,paddingLeft:10,fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:"italic",color:G.muted,lineHeight:1.6}}>{p.conseil}</div>
                        <AnimatePresence>
                          {open && (
                            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.25}}
                              style={{overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
                              <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${G.border}`}}>
                                <div style={{...T.label,marginBottom:10}}>Points forts</div>
                                {p.points.map((a,j)=>(
                                  <div key={j} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                                    <span style={{color:G.gold,fontSize:9,marginTop:3,flexShrink:0}}>✦</span>
                                    <span style={{...T.p,fontSize:11}}>{a}</span>
                                  </div>
                                ))}
                                {p.process && (
                                  <div style={{marginTop:14,padding:"10px 14px",background:G.bg,borderLeft:`2px solid ${p.couleur}`}}>
                                    <div style={{...T.label,fontSize:8,marginBottom:5}}>Process</div>
                                    <div style={{...T.p,fontSize:11,fontStyle:"italic"}}>{p.process}</div>
                                  </div>
                                )}
                                <a href={p.lien} target="_blank" rel="noreferrer"
                                  style={{display:"inline-block",marginTop:14,...T.tag,fontSize:8,color:p.couleur,borderBottom:`1px solid ${p.couleur}44`,paddingBottom:1}}>
                                  Voir la fiche technique →
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
                <div style={{...T.tag,fontSize:9,marginBottom:12,color:G.muted}}>── Peintures & finitions</div>
                <div className="prod-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:1,border:`1px solid ${G.goldBorder}`}}>
                  {peints.map((p,i)=>{
                    const open=openProd===p.id;
                    return (
                      <motion.div key={p.id} whileHover={!open?{background:G.surfaceHi}:{}} onClick={()=>setOpenProd(open?null:p.id)}
                        style={{background:open?G.surfaceHi:G.surface,borderRight:i%2===0?`1px solid ${G.goldBorder}`:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:22,cursor:"pointer",borderLeft:`3px solid ${p.couleur}`,transition:"background .2s"}}>
                        <div style={{...T.tag,fontSize:8,color:p.couleur,marginBottom:8}}>{p.tag}</div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                          <div>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:G.text}}>{p.icon} {p.nom}</div>
                            <div style={{...T.p,fontSize:11,marginTop:2}}>{p.marque}</div>
                          </div>
                          <motion.div animate={{rotate:open?180:0}} transition={{duration:.2}} style={{...T.tag,fontSize:9,color:G.muted}}>▾</motion.div>
                        </div>
                        <div style={{...T.p,fontSize:11,marginBottom:10}}>📍 {p.pour}</div>
                        <div style={{borderLeft:`2px solid ${p.couleur}`,paddingLeft:10,fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontStyle:"italic",color:G.muted,lineHeight:1.6}}>{p.conseil}</div>
                        <AnimatePresence>
                          {open && (
                            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.25}}
                              style={{overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
                              <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${G.border}`}}>
                                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}} className="harm-inner">
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
                                      <div style={{marginTop:10,padding:"8px 12px",background:G.bg,borderLeft:`2px solid ${p.couleur}`}}>
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
                                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                                    style={{...T.btn,flex:1,background:sel.produit?.id===p.id?p.couleur:"transparent",color:sel.produit?.id===p.id?"#fff":p.couleur,border:`1px solid ${p.couleur}`,padding:"9px",transition:"all .2s",cursor:"pointer"}}
                                    onClick={e=>{e.stopPropagation();setSel(s=>({...s,produit:s.produit?.id===p.id?null:p}));}}>
                                    {sel.produit?.id===p.id?"✓ Sélectionné":"Ajouter à ma sélection"}
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
                <div style={{textAlign:"center",padding:"28px 20px",borderTop:`1px solid ${G.goldBorder}`,marginTop:8}}>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,fontStyle:"italic",color:G.muted,lineHeight:1.7}}>
                    Et encore bien d'autres produits à découvrir selon votre projet —<br/>
                    <span style={{color:G.gold}}>n'hésitez pas à nous en parler lors de la visite.</span>
                  </p>
                </div>
              </div>
            )}

            {/* ══ ESTIMATIF ══ */}
            {tab==="calcul" && <Calculateur T={T} divider={divider} onDevis={()=>setModal(true)}/>}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* ══ FOOTER ══ */}
      <footer style={{background:"#080808",borderTop:`1px solid ${G.goldBorder}`,padding:"32px 20px"}}>
        <div className="footer-grid" style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:32,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Logo size={44}/>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,color:G.text}}>Peinture & Rénovation</div>
              <div style={{...T.p,fontSize:10,marginTop:2}}>Pays d'Aix · Artisan d'Art</div>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            {[{icon:"📞",t:"06 16 70 57 57",h:"tel:+33616705757"},{icon:"✉️",t:"peintureetrenovation13@gmail.com",h:"mailto:peintureetrenovation13@gmail.com"}].map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:12}}>{c.icon}</span>
                <a href={c.h} target="_blank" rel="noreferrer" style={{...T.p,fontSize:11}}>{c.t}</a>
              </div>
            ))}
          </div>
          <div style={{textAlign:"right"}}>
            <motion.button whileHover={{scale:1.03,boxShadow:`0 0 24px rgba(200,151,58,.3)`}} whileTap={{scale:0.97}}
              onClick={()=>setModal(true)} style={{...T.btn,background:G.gold,color:"#fff",border:"none",padding:"12px 24px",cursor:"pointer"}}>
              Demander un devis gratuit
            </motion.button>
            <div style={{...T.p,fontSize:10,marginTop:8}}>Visite et devis gratuits</div>
          </div>
        </div>
      </footer>

      {/* ══ MODAL DEVIS ══ */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
            onClick={()=>{setModal(false);setSent(false);}}>
            <motion.div initial={{scale:0.94,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.96,opacity:0,y:12}}
              transition={{duration:0.24,ease:[0.22,1,0.36,1]}}
              style={{background:"#131313",border:`1px solid ${G.goldBorder}`,padding:32,maxWidth:440,width:"100%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,.6)"}}
              onClick={e=>e.stopPropagation()}>
              {!sent ? (
                <>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><Logo size={44}/></div>
                  <div style={{...T.tag,textAlign:"center",marginBottom:5}}>Devis gratuit</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,textAlign:"center",color:G.text,marginBottom:22}}>Votre sélection</div>
                  <div style={{width:28,height:1,background:G.gold,margin:"0 auto 22px"}}/>
                  {/* Champs */}
                  {[{l:"Votre prénom *",ph:"ex: Marie",v:nom,fn:setNom},{l:"Téléphone",ph:"06 00 00 00 00",v:tel,fn:setTel},{l:"Pièce concernée",ph:"ex: Salon, façade…",v:piece,fn:setPiece}].map((fi,i)=>(
                    <div key={i} style={{marginBottom:16}}>
                      <div style={{...T.label,marginBottom:7}}>{fi.l}</div>
                      <input style={{width:"100%",border:"none",borderBottom:`1px solid ${G.goldBorder}`,padding:"9px 0",fontSize:14,fontWeight:300,background:"transparent",color:G.text,fontFamily:"Inter,sans-serif",outline:"none"}}
                        placeholder={fi.ph} value={fi.v} onChange={e=>fi.fn(e.target.value)}/>
                    </div>
                  ))}
                  {/* Couleurs */}
                  <div style={{marginBottom:16}}>
                    <div style={{...T.label,marginBottom:10}}>Couleurs choisies</div>
                    {sel.couleurs.length===0
                      ? <p style={{...T.p,fontStyle:"italic",fontSize:12}}>Aucune couleur sélectionnée</p>
                      : sel.couleurs.map(c=>(
                        <div key={c.ref} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                          <div style={{width:28,height:28,background:c.hex,flexShrink:0,border:`1px solid ${G.goldBorder}`}}/>
                          <div>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:G.text}}>{c.nom}</div>
                            <div style={{...T.p,fontSize:10,marginTop:1,color:G.gold}}>{c.ref}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {sel.produit && (
                    <div style={{marginBottom:16}}>
                      <div style={{...T.label,marginBottom:10}}>Finition choisie</div>
                      <div style={{padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:G.text}}>{sel.produit.nom}</div>
                        <div style={{...T.p,fontSize:10,marginTop:2}}>{sel.produit.marque}</div>
                      </div>
                    </div>
                  )}
                  <div style={{padding:"11px 14px",background:G.goldLt,border:`1px solid ${G.goldBorder}`,marginBottom:18}}>
                    <div style={{...T.p,fontSize:11,color:G.text}}>📞 <strong style={{color:G.gold}}>06 16 70 57 57</strong> · peintureetrenovation13@gmail.com</div>
                    <div style={{...T.p,fontSize:10,marginTop:4,fontStyle:"italic"}}>Axel vous recontactera sous 24h pour convenir d'une visite gratuite.</div>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <motion.button whileHover={{scale:1.01}} whileTap={{scale:0.97}} onClick={()=>setModal(false)}
                      style={{...T.btn,flex:1,background:"transparent",border:`1px solid ${G.border}`,color:G.muted,padding:"11px",cursor:"pointer"}}>
                      Annuler
                    </motion.button>
                    <motion.button whileHover={{scale:1.02,boxShadow:`0 0 22px rgba(200,151,58,.35)`}} whileTap={{scale:0.97}}
                      onClick={sendDevis} disabled={sending||!nom.trim()}
                      style={{...T.btn,flex:2,background:G.gold,color:"#fff",border:"none",padding:"11px",cursor:"pointer",opacity:sending||!nom.trim()?0.6:1,transition:"opacity .2s"}}>
                      {sending?"Envoi…":"Envoyer →"}
                    </motion.button>
                  </div>
                </>
              ) : (
                <div style={{textAlign:"center",padding:"16px 0"}}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><Logo size={52}/></div>
                  <div style={{...T.tag,marginBottom:8}}>Merci !</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:G.text,marginBottom:14}}>Sélection envoyée</div>
                  <div style={{width:28,height:1,background:G.gold,margin:"0 auto 16px"}}/>
                  <p style={{...T.p,marginBottom:12}}>{nom&&`Merci ${nom}. `}<em style={{fontFamily:"'Cormorant Garamond',serif",color:G.text}}>Axel Sandahl</em> vous recontactera sous 24h pour convenir d'une visite sur place.</p>
                  <p style={{...T.p,fontSize:11,marginBottom:24}}>📞 06 16 70 57 57 · peintureetrenovation13@gmail.com</p>
                  <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                    onClick={()=>{setModal(false);setSent(false);setSel({couleurs:[],produit:null});}}
                    style={{...T.btn,background:"transparent",border:`1px solid ${G.gold}`,color:G.gold,padding:"11px 28px",cursor:"pointer"}}>
                    Fermer
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ CHATBOT ══ */}
      <FloatingChat/>
    </div>
  );
}
