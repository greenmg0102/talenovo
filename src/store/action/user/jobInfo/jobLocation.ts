
export async function jobLocationPut(data: any) {

  const res = await fetch('http://104.128.55.140:8443/api/user/job-info/job-location', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}