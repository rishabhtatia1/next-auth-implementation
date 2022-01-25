import { useRef, useState } from "react";
import { signIn } from "next-auth/client";
import { createUser } from "../../lib/user";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      });
      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      try {
        const data = await createUser({
          email: enteredEmail,
          password: enteredPassword
        });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
