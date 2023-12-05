"use client";
import { registerUser } from "@/actions/actions";

export default function Register() {
  const addUser = async (formdata: FormData) => {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const user = await registerUser(email, password);
    // console.log(user);
  };

  return (
    <form action={addUser} className="grid w-1/2 m-auto">
      <label htmlFor="">Email</label>
      <input type="text" name="email" />
      <label htmlFor="">Lösenord</label>
      <input type="password" name="password" />
      <input type="submit" value="Registrera" />
    </form>
  );
}
