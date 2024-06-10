
export async function jobTypeGet() {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-info/job-type', {
    method: 'GET',
  });

  return await res.json();
}


export async function jobTypePost(jobType: any) {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-info/job-type', {
    method: 'POST',
    body: JSON.stringify(jobType)
  });

  return await res.json();
}

export async function jobTypeDelete(data: any) {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-info/job-type', {
    method: 'DELETE',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function jobTypePut(data: any) {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-info/job-type', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}

