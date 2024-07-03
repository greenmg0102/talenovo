
export async function sendingTicket(message: any) {

  const res = await fetch('http://localhost:3000/api/service/ticket', {
    method: 'POST',
    body: JSON.stringify(message)
  });

  return await res.json();
}

