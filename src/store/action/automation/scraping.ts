
export async function scarppingStart() {

  await fetch('https://talenovo.com/api/automation/scrapping-start', {
    method: 'GET'
  });
}