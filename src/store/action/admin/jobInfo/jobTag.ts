
export async function jobTagPut(data: any) {

  const res = await fetch('http://104.128.55.140:443/api/admin/job-info/job-tag', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function jobTagGet() {

  const res = await fetch('http://104.128.55.140:443/api/admin/job-info/job-tag', {
    method: 'GET',
  });

  return await res.json();
}

export async function jobTagPost(jobTag: any) {

  const res = await fetch('http://104.128.55.140:443/api/admin/job-info/job-tag', {
    method: 'POST',
    body: JSON.stringify(jobTag)
  });

  return await res.json();
}


export async function jobTagDelete(data: any) {

  const res = await fetch('http://104.128.55.140:443/api/admin/job-info/job-tag', {
    method: 'DELETE',
    body: JSON.stringify(data)
  });

  return await res.json();
}
