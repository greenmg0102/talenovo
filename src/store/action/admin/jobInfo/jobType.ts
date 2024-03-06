
export async function jobTypeGet() {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-type', {
    method: 'GET',
  });

  return await res.json();
}


export async function jobTypePost(jobType: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-info/job-type', {
    method: 'POST',
    body: JSON.stringify(jobType)
  });

  return await res.json();
}
