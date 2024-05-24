
export async function jobAlertAutomation() {

  const res = await fetch('http://localhost:3000/api/mail/jobAlert', {
    method: 'GET'
  });

  return await res.json();
}
