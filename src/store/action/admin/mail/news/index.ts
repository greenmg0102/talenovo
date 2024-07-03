
export async function newsAutomation() {

  const res = await fetch('http://localhost:3000/api/mail/news', {
    method: 'GET'
  });

  return await res.json();
}
