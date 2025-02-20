export default async function handler(req, res) {
  const url = 'https://ims-na1.adobelogin.com/ims/token/v2';
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: '1c9d6a97c1034d6091e440e6c43ca7a4',
    client_secret: 'p8e-E-R-ieiUil3tYO9PWHmxV6GuDQlQ91sk',
    scope: 'openid,AdobeID,read_organizations,additional_info.projectedProductContext,session',
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token', details: error.message });
  }
}
