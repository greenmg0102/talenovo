
export async function jobCategoryGet() {

  const res = await fetch('http://localhost:3000/api/admin/job-info/job-category', {
    method: 'GET',
  });

  return await res.json();
}


export async function jobCategoryPost(jobCategory: any) {

  const res = await fetch('http://localhost:3000/api/admin/job-info/job-category', {
    method: 'POST',
    body: JSON.stringify(jobCategory)
  });

  return await res.json();
}
