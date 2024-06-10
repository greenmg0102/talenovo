
export async function scarppingStart() {

  await fetch('http://104.128.55.140:443/api/automation/scrapping-start', {
    method: 'GET'
  });
}