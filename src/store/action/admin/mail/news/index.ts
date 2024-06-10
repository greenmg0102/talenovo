
export async function newsAutomation() {

  const res = await fetch('http://104.128.55.140:443/api/mail/news', {
    method: 'GET'
  });

  return await res.json();
}
