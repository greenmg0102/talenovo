
export async function aboutEdit(data: any) {

  const res = await fetch('http://localhost:3000/api/admin/about-edit', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function readAboutEdit() {

  const res = await fetch(`http://localhost:3000/api/admin/about-edit`, {
    method: 'GET'
  });

  return await res.json();
}