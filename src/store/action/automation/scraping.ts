
export async function scarppingStart() {
  await fetch('http://l195.35.32.163:3000/api/automation/scrapping-start', {
    method: 'GET'
  });
}