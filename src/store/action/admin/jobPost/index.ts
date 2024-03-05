
export async function companyDatilPost(companyDetailInfo: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-post/company-detail', {
    method: 'POST',
    body: JSON.stringify(companyDetailInfo)
  });

  return await res.json();
}

export async function jobDatilPost(jobDetailInfo: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-post/job-detail', {
    method: 'POST',
    body: JSON.stringify(jobDetailInfo)
  });

  return await res.json();
}
