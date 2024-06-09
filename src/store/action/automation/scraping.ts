
export async function scarppingStart() {

  await fetch('http://104.128.55.140:80/api/automation/scrapping-start', {
    method: 'GET'
  });
}