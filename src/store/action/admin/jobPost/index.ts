
export async function companyDatilPost(companyDetailInfo: any) {

  const res = await fetch('http://195.35.32.163:3000/api/admin/job-post/company-detail', {
    method: 'POST',
    body: JSON.stringify(companyDetailInfo)
  });

  console.log("res", res);


  // return await res.json();
}
