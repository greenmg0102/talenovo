
export async function locationDetecting() {

  const res = await fetch('http://https://talenovo.com/api/service/geo', {
    method: 'GET'
  });

  return await res.json();
}

