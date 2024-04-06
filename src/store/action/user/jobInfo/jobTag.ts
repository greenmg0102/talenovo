
export async function jobTagPut(data: any) {

  const res = await fetch('http://195.35.32.163:3000/api/user/job-info/job-tag', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}
