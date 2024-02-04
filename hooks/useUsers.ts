export default async function useUsers() {
  const res = await fetch('http://localhost:3000/api/users');

  if(!res) {
    throw new Error("No User")
  }

  return res.json();
}