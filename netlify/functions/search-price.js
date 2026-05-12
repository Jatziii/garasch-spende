exports.handler = async function(event) {
  const { product } = JSON.parse(event.body);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 20,
      messages: [{
        role: 'user',
        content: 'Schweizer Einkaufspreis (Detailhandel Multipack) für: ' + product + '. Antworte NUR mit einer Zahl ohne CHF, z.B.: 1.50'
      }]
    })
  });

  const data = await response.json();
  const raw = data.content[0].text.trim();
  const match = raw.match(/\d+\.?\d*/);
  const price = match ? match[0] : '0.00';

  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({ price })
  };
};
