
export async function newsAutomation() {

  const res = await fetch('http://https://talenovo.com/api/mail/news', {
    method: 'GET'
  });

  return await res.json();
}
