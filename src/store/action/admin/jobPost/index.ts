
export async function jobPostStatus() {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-post/job-post-status', {
    method: 'GET'
  });

  return await res.json();
}

export async function companyDatilPost(companyDetailInfo: any) {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-post/company-detail', {
    method: 'POST',
    body: JSON.stringify(companyDetailInfo)
  });

  return await res.json();
}

export async function jobDatilPost(jobDetailInfo: any) {

  const res = await fetch('http://104.128.55.140:8443/api/admin/job-post/job-detail', {
    method: 'POST',
    body: JSON.stringify(jobDetailInfo)
  });

  return await res.json();
}
