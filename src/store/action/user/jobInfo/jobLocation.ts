
export async function jobLocationPut(data: any) {

  const res = await fetch('http://localhost:3000/api/user/job-info/job-location', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}