
export async function jobDetail(data: any) {

  const res = await fetch('http://104.128.55.140:8443/api/user/job-detail', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}