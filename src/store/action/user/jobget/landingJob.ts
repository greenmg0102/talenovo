
export async function landingJob(data: any) {

  const res = await fetch('http://195.35.32.163:3000/api/user/landing-job', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}