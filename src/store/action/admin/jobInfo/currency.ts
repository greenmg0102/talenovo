
export async function currencyGet() {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/currency', {
    method: 'GET',
  });

  return await res.json();
}

export async function currencyPost(currency: any) {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/currency', {
    method: 'POST',
    body: JSON.stringify(currency)
  });

  return await res.json();
}

export async function currencyDelete(currency: any) {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/currency', {
    method: 'DELETE',
    body: JSON.stringify(currency)
  });

  return await res.json();
}

export async function currencyPut(currency: any) {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/currency', {
    method: 'PUT',
    body: JSON.stringify(currency)
  });

  return await res.json();
}
