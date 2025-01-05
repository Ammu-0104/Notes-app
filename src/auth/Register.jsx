import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./Form.module.css"; 
import video from "../assets/videos/loginVideo.mp4";
import useUserStore from "../store/useUserStore";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userDetails = {
      user_name: data.name,
      user_email: data.email,
      user_id: uuidv4(),
      password: data.password,
      created: new Date().toLocaleDateString(),
    };

    setUser(userDetails); 

    navigate("/"); 
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_left}>
        <div className={styles.login_video}>
          <video src={video} autoPlay loop muted playsInline preload="auto" />
        </div>
      </div>
      <div className={styles.login_right}>
        <div className={styles.login_card}>
          <h2 className={styles.login_heading}>Notes App</h2>
          <form
            className={styles.login_form}
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Register Form"
          >
            {/* Name Field */}
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="name">
                Name:
              </label>
              <input
                className={styles.form_input}
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                aria-required="true"
                aria-label="Enter your name"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className={styles.error_message}>{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="email">
                Email:
              </label>
              <input
                className={styles.form_input}
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                aria-required="true"
                aria-label="Enter your email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className={styles.error_message}>{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="password">
                Password:
              </label>
              <input
                className={styles.form_input}
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                aria-required="true"
                aria-label="Enter your password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className={styles.error_message}>{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className={styles.submit_button}
              type="submit"
              aria-label="Submit Register Form"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;