
export async function jobAlertAutomation() {

  const res = await fetch('http://104.128.55.140:3000/api/mail/jobAlert', {
    method: 'GET'
  });

  return await res.json();
}
