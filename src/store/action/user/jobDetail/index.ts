
export async function jobDetail(data: any) {

  const res = await fetch('http://195.35.32.163:3000/api/user/job-detail', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}