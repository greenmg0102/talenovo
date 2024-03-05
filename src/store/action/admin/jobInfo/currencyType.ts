
export async function currencyTypeGet() {

  const res = await fetch('http://localhost:3000/api/admin/job-info/currency-type', {
    method: 'GET',
  });

  return await res.json();
}

export async function currencyTypePost(currencyType: any) {

  const res = await fetch('http://localhost:3000/api/admin/job-info/currency-type', {
    method: 'POST',
    body: JSON.stringify(currencyType)
  });

  return await res.json();
}
