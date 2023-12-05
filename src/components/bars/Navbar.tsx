import { getServerSession } from "next-auth";
import Logout from "../button/LogoutButton";

export default async function Navbar() {
  const session = await getServerSession();
  console.log(session);

  if (session) {
    return (
      <div className="absolute top-0 left-0 right-0 h-12 bg-red-600">
        <div className="w-5/6 m-auto left-0 right-0 h-12 text-white py-2 text-2xl font-semibold flex justify-between">
          <div>Riksbyggen</div>
          <div>
            <Logout />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="absolute top-0 left-0 right-0 h-12 bg-red-600">
        <div className="w-5/6 m-auto left-0 right-0 h-12 text-white py-2 text-2xl font-semibold flex justify-between">
          <div></div>
          <div>Logga in</div>
        </div>
      </div>
    );
  }
}
