
export async function locationDetecting() {

  const res = await fetch('http://localhost:3000/api/service/geo', {
    method: 'GET'
  });

  return await res.json();
}

