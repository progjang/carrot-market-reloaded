"use server";

export async function handleForm(prevState: any, formData: FormData) {
    const errMsg = formData.get("password") === "12345" ? "" : "wrong password";
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        error: errMsg,
    };
}