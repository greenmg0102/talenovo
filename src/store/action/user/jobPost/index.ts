
export async function jobPostStatus() {

  const res = await fetch('http://104.128.55.140:8080/api/user/job-post/job-post-status', {
    method: 'GET'
  });

  return await res.json();
}

export async function companyDatilPost(companyDetailInfo: any) {

  const res = await fetch('http://104.128.55.140:8080/api/user/job-post/company-detail', {
    method: 'POST',
    body: JSON.stringify(companyDetailInfo)
  });

  return await res.json();
}

export async function jobDatilPost(jobDetailInfo: any) {

  const res = await fetch('http://104.128.55.140:8080/api/user/job-post/job-detail', {
    method: 'POST',
    body: JSON.stringify(jobDetailInfo)
  });

  return await res.json();
}

export async function changejobPostStatus(jobDetailInfo: any) {

  const res = await fetch('http://104.128.55.140:8080/api/user/job-post/job-submit', {
    method: 'POST',
    body: JSON.stringify(jobDetailInfo)
  });

  return await res.json();
}
