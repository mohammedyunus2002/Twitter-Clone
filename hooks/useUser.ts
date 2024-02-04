export default async function useUser(userId: string) {
  const res = await fetch(`http://localhost:3000/api/users/${userId}`);

  if(!res) {
    throw new Error("No User")
  }

  return res.json();
}