
export async function jobTagGet(data: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-tag', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function jobTagPost(jobTag: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-tag', {
    method: 'POST',
    body: JSON.stringify(jobTag)
  });

  return await res.json();
}
