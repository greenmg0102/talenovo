
export async function jobLocationGet() {

  const res = await fetch('http://localhost:3000/api/admin/job-info/job-location', {
    method: 'GET',
  });

  return await res.json();
}


export async function jobLocationPost(jobLocation: any) {

  const res = await fetch('http://localhost:3000/api/admin/job-info/job-location', {
    method: 'POST',
    body: JSON.stringify(jobLocation)
  });

  return await res.json();
}
