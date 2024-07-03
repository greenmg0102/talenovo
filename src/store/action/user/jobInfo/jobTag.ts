
export async function jobTagPut(data: any) {

  const res = await fetch('https://talenovo.com/api/user/job-info/job-tag', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  return await res.json();
}
