
export async function jobAlertAutomation() {

  const res = await fetch('http://104.128.55.140:8080/api/mail/jobAlert', {
    method: 'GET'
  });

  return await res.json();
}
