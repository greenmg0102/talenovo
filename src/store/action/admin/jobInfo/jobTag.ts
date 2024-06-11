
export async function jobTagPut(data: any) {

  const res = await fetch('https://talenovo.com/api/admin/job-info/job-tag', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function jobTagGet() {

  const res = await fetch('https://talenovo.com/api/admin/job-info/job-tag', {
    method: 'GET',
  });

  return await res.json();
}

export async function jobTagPost(jobTag: any) {

  const res = await fetch('https://talenovo.com/api/admin/job-info/job-tag', {
    method: 'POST',
    body: JSON.stringify(jobTag)
  });

  return await res.json();
}


export async function jobTagDelete(data: any) {

  const res = await fetch('https://talenovo.com/api/admin/job-info/job-tag', {
    method: 'DELETE',
    body: JSON.stringify(data)
  });

  return await res.json();
}
