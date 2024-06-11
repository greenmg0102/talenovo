
export async function jobCategoryGet() {

  const res = await fetch('http://https://talenovo.com/api/admin/job-info/job-category', {
    method: 'GET',
  });

  return await res.json();
}


export async function jobCategoryPost(jobCategory: any) {

  const res = await fetch('http://https://talenovo.com/api/admin/job-info/job-category', {
    method: 'POST',
    body: JSON.stringify(jobCategory)
  });

  return await res.json();
}


export async function jobCategoryDelete(jobCategory: any) {

  const res = await fetch('http://https://talenovo.com/api/admin/job-info/job-category', {
    method: 'DELETE',
    body: JSON.stringify(jobCategory)
  });

  return await res.json();
}

export async function jobCategoryPut(jobCategory: any) {

  const res = await fetch('http://https://talenovo.com/api/admin/job-info/job-category', {
    method: 'PUT',
    body: JSON.stringify(jobCategory)
  });

  return await res.json();
}
