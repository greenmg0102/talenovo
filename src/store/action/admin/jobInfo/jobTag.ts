
export async function jobTagGet() {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-tag', {
    method: 'GET',
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
