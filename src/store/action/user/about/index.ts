
export async function readAboutEdit(data: any) {

  const res = await fetch(`https://talenovo.com/api/user/about-edit`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await res.json();
}