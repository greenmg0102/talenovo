
export async function readAboutEdit(data: any) {

  const res = await fetch(`http://104.128.55.140:3000/api/user/about-edit`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}