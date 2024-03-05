
export async function currencyGet() {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/currency', {
    method: 'GET',
  });

  return await res.json();
}

export async function currencyPost(currency: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/currency', {
    method: 'POST',
    body: JSON.stringify(currency)
  });

  return await res.json();
}
