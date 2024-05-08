
export async function sendingTicket(message: any) {

  const res = await fetch('http://104.128.55.140:3000/api/service/ticket', {
    method: 'POST',
    body: JSON.stringify(message)
  });

  return await res.json();
}

