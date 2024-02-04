export default async function useCurrentUser() {
    const res = await fetch("http://localhost:3000/api/current");

    if(!res) {
        throw new Error("No User Logged In");
    }
    const data = await res.json();

    return data.currentUser;
}
