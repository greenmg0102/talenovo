
export async function jobLocationGet(data: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-location', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}


export async function jobLocationPost(jobLocation: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-location', {
    method: 'POST',
    body: JSON.stringify(jobLocation)
  });

  return await res.json();
}
