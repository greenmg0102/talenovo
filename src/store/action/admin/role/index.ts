
export async function adminSearch() {

  const res = await fetch('http://104.128.55.140:80/api/admin/role-admin', {
    method: 'GET'
  });

  return await res.json();
}

export async function userSearch(body: any) {

  const res = await fetch('http://104.128.55.140:80/api/admin/role-admin', {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return await res.json();
}

export async function addAdmin(body: any) {

  const res = await fetch('http://104.128.55.140:80/api/admin/role-admin', {
    method: 'PUT',
    body: JSON.stringify(body)
  });

  return await res.json();
}

export async function deleteAdmin(body: any) {

  const res = await fetch('http://104.128.55.140:80/api/admin/role-admin', {
    method: 'DELETE',
    body: JSON.stringify(body)
  });

  return await res.json();
}

