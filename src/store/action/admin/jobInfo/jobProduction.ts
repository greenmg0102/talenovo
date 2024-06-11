
export async function jobProductionGet() {

  const res = await fetch('http://https://talenovo.com/api/admin/job-info/job-production', {
    method: 'GET',
  });

  return await res.json();
}


export async function jobProductionPost(jobProduction: any) {

  const res = await fetch('http://https://talenovo.com/api/admin/job-info/job-production', {
    method: 'POST',
    body: JSON.stringify(jobProduction)
  });

  return await res.json();
}
