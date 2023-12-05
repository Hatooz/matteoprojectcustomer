"use client";
import PrimaryButton from "@/components/button/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const loginReponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!loginReponse?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className="border border-riksbyggenGray w-1/2 m-auto h-96 p-4 rounded-lg">
      <h1 className="text-xl mb-2">Logga in</h1>
      <form action={handleLogin} className="grid   ">
        <label htmlFor="">Email</label>
        <input type="text" name="email" />
        <label htmlFor="">Lösenord</label>
        <input type="password" name="password" />
        <PrimaryButton text="Logga in" />
      </form>
      <div>
        Ny maaaniska? skapa konto{" "}
        <Link href="/register" className="text-red-600">
          här
        </Link>
      </div>
    </div>
  );
}
