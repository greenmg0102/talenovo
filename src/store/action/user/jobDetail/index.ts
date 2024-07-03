
export async function jobDetail(data: any) {

  const res = await fetch('http://localhost:3000/api/user/job-detail', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}