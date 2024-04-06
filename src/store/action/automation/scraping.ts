
export async function scarppingStart() {
  await fetch('http://195.35.32.163:3000/api/automation/scrapping-start', {
    method: 'GET'
  });
}