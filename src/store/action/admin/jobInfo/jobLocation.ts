
export async function jobLocationPut(data: any) {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/job-location', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function jobLocationGet() {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/job-location', {
    method: 'GET',
  });

  return await res.json();
}

export async function jobLocationPost(jobLocation: any) {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/job-location', {
    method: 'POST',
    body: JSON.stringify(jobLocation)
  });

  return await res.json();
}


export async function jobLocationDelete(data: any) {

  const res = await fetch('http://l195.35.32.163:3000/api/admin/job-info/job-location', {
    method: 'DELETE',
    body: JSON.stringify(data)
  });

  return await res.json();
}

