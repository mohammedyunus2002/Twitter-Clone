'use client'

import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

 
export default  function ExampleClientComponent() {
  const userId = "65ba9e9c44b6cd92ee1a437a";
  const { data: users } = useUsers();
  const { data: user } = useUser(userId);

  return (
    <div>
      <h1 className="text-white font-bold">Users</h1>
      {users ? (
        <ul>
          {users.map((user: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* Add more user properties as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};