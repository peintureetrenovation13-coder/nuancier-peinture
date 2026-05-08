export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { messages } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: "Tu es l'assistant virtuel d'Axel Sandahl, artisan peintre avec 25 ans d'expérience basé à Peynier (Provence). Ce site propose un nuancier de couleurs provençales et un estimatif de travaux. Services : peinture intérieure/extérieure, plâtrerie, revêtements sol et mur, fresques, trompe l'œil, travaux artistiques. Label Métiers d'Art PACA. Pour les corps de métier qu'Axel ne fait pas, il travaille avec un collectif d'artisans qualifiés. Contact : 06 16 70 57 57.\n\nRègles importantes :\n- Si le client parle de prix, budget ou coût → dis-lui d'utiliser l'estimatif gratuit disponible sur cette page (onglet Estimatif)\n- Si le client veut être rappelé ou laisser ses coordonnées → dis-lui d'utiliser le formulaire de contact disponible sur cette page\n- Réponds en français, de façon chaleureuse et professionnelle, en moins de 80 mots.",
      messages
    })
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
