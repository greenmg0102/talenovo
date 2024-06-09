
export async function jobTagPut(data: any) {

  const res = await fetch('http://104.128.55.140:8080/api/user/job-info/job-tag', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}
