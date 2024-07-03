
export async function newsAutomation() {

  const res = await fetch('https://talenovo.com/api/mail/news', {
    method: 'GET'
  });

  return await res.json();
}
