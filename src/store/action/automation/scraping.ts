
export async function scarppingStart() {

  await fetch('http://localhost:3000/api/automation/scrapping-start', {
    method: 'GET'
  });
}