
export async function locationDetecting() {

  const res = await fetch('http://195.35.32.163:3000/api/service/geo', {
    method: 'GET'
  });

  return await res.json();
}

