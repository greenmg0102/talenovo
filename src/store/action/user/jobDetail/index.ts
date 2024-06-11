
export async function jobDetail(data: any) {

  const res = await fetch('https://talenovo.com/api/user/job-detail', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}