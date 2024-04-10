
export async function newsAutomation() {

  const res = await fetch('http://localhost:3000/api/admin/news/automation', {
    method: 'GET'
  });

  return await res.json();
}
