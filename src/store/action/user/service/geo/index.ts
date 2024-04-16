
export async function locationDetecting() {

  const res = await fetch('http://104.128.55.140:3000/api/service/geo', {
    method: 'GET'
  });

  return await res.json();
}

