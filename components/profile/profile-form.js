import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm({ onChangePassword }) {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const old_password = oldPasswordRef.current.value;
    const new_password = newPasswordRef.current.value;
    onChangePassword({ old_password, new_password });
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
