
export async function currencyTypeGet() {

  const res = await fetch('http://104.128.55.140:3000/api/admin/job-info/currency-type', {
    method: 'GET',
  });

  return await res.json();
}

export async function currencyTypePost(currencyType: any) {

  const res = await fetch('http://104.128.55.140:3000/api/admin/job-info/currency-type', {
    method: 'POST',
    body: JSON.stringify(currencyType)
  });

  return await res.json();
}


export async function currencyTypeDelete(currencyType: any) {

  const res = await fetch('http://104.128.55.140:3000/api/admin/job-info/currency-type', {
    method: 'DELETE',
    body: JSON.stringify(currencyType)
  });

  return await res.json();
}

export async function currencyTypePut(currencyType: any) {

  const res = await fetch('http://104.128.55.140:3000/api/admin/job-info/currency-type', {
    method: 'PUT',
    body: JSON.stringify(currencyType)
  });

  return await res.json();
}
