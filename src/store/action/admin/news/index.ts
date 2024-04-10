
export async function newsAutomation() {

  const res = await fetch('http://195.35.32.163:3000/api/admin/news/automation', {
    method: 'GET'
  });

  return await res.json();
}
