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
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Was ist der typische Schweizer Einkaufspreis (Grosshandel/Detailhandel Multipack) für: ' + product + '? Antworte NUR mit einer Zahl in CHF, z.B. 1.50'
      }]
    })
  });
  
  const data = await response.json();
  const price = data.content[0].text.trim();
  
  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({ price })
  };
};
