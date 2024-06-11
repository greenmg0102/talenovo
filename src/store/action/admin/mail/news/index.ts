
export async function newsAutomation() {

  const res = await fetch('http://104.128.55.140:3000/api/mail/news', {
    method: 'GET'
  });

  return await res.json();
}
