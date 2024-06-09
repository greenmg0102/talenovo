
export async function aboutEdit(data: any) {

  const res = await fetch('http://104.128.55.140:80/api/admin/about-edit', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function readAboutEdit() {

  const res = await fetch(`http://104.128.55.140:80/api/admin/about-edit`, {
    method: 'GET'
  });

  return await res.json();
}