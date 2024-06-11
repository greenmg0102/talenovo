
export async function jobAlertAutomation() {

  const res = await fetch('http://https://talenovo.com/api/mail/jobAlert', {
    method: 'GET'
  });

  return await res.json();
}
