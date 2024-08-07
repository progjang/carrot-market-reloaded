"use client";

import FormInput from "./components/form-input";
import FormButton from "./components/form-button";
import { useFormState } from "react-dom";
import { logIn } from "./login/actions";


export default function Home() {
  const [state, action] = useFormState(logIn, null);
  console.log(state);
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center ">
      <div className="flex flex-col items-center my-auto">
        <div className="text-5xl mb-10">🔥</div>
        <form action={action} className="flex flex-col gap-5 mb-5">
        <FormInput name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
        <FormInput name="username" type="text" placeholder="Username" required errors={state?.fieldErrors.username} />
        <FormInput name="password" type="password" placeholder="Password" required errors={state?.fieldErrors.password} />
        <FormButton text="log in" />
        </form>
        {!state?.fieldErrors ? <div>"Welcome back!"</div>: null}
      </div>
      </div>
    </main>
  );
}
