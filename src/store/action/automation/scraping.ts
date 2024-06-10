
export async function scarppingStart() {

  await fetch('http://104.128.55.140:8443/api/automation/scrapping-start', {
    method: 'GET'
  });
}