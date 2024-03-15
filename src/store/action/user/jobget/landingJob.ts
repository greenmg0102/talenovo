
export async function landingJob() {

  const res = await fetch('http://195.35.32.163:3000/api/user/landing-job', {
    method: 'GET',
  });

  return await res.json();
}