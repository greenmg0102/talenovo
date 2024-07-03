
export async function sendingTicket(message: any) {

  const res = await fetch('https://talenovo.com/api/service/ticket', {
    method: 'POST',
    body: JSON.stringify(message)
  });

  return await res.json();
}

