
export async function jobAlertAutomation() {

  const res = await fetch('https://talenovo.com/api/mail/jobAlert', {
    method: 'GET'
  });

  return await res.json();
}
