
export async function landingJob() {

  const res = await fetch('http://104.128.55.140:3000/api/user/landing-job', {
    method: 'GET',
  });

  console.log(res);
  

  return await res.json();
}

export async function registBookmark(data: any) {

  const res = await fetch('http://104.128.55.140:3000/api/user/job-action/bookmark', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}


export async function registApply({ data }: any) {

  const res = await fetch('http://104.128.55.140:3000/api/user/job-action/apply', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}