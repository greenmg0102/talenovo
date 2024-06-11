
export async function scarppingStart() {

  await fetch('http://https://talenovo.com/api/automation/scrapping-start', {
    method: 'GET'
  });
}