"use client";

import FormInput from "./components/form-input";
import FormButton from "./components/form-button";
import { useFormState } from "react-dom";
import { handleForm } from "./login/actions";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center ">
      <div className="flex flex-col items-center my-auto">
        <div className="text-5xl mb-10">🔥</div>
        <form action={action} className="flex flex-col gap-5 mb-5">
        <FormInput name="email" type="email" placeholder="Email" required errors={[]} />
        <FormInput name="username" type="text" placeholder="Username" required errors={[]} />
        <FormInput name="password" type="password" placeholder="Password" required errors={[]} />
        {state?.error ? "wrong password" : null}
        <FormButton text="log in" />
        </form>
        {state?.error !== "" ? null : "welcome back!"}
      </div>

      </div>
    </main>
  );
}
