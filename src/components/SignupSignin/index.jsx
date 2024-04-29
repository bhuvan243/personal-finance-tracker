import React, { useState } from "react";
import styles from "./signupSignin.module.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth/cordova";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);
    // authenticate the user, create new account usin email &b password
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User created successfully");
            setLoading(false);
            console.log("User>>>", user);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            // create a doc for the user - separate doc for the user
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Passwords do not match");
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("All fields are mamdatory");
    }
  }

  async function createDoc(user) {
    // 1st make sure to check whether a uid is present already or not
    // this is in case for user signing in with Google ID
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error(e.message);
      }
    } else {
      setLoading(false);
    //   toast.error("Doc already exists");
    }
  }
  // Login user with email and password
  function loginWithEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User logged in successfully");
          console.log("User logged in", user);
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("All fields are mamdatory");
    }
  }
  ////////////////////////////////////////////////////////////////
  // sign-in with Google Pop-up
  function googleAuth() {
    setLoading(true);
    try{
        signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        toast.success("User authenticated");
        createDoc(user);
        navigate("/dashboard");
        setLoading(false);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
        setLoading(false);
        // ...
      });
    } catch (error) {
        setLoading(false);
        toast.error(error.message);
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          {/* this is login component */}
          <div className={styles.signupWrapper}>
            <h2 className={styles.title}>
              Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
            </h2>
            <form>
              <Input
                type={"email"}
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"john.doe@gmail.com"}
              />
              <Input
                type={"password"}
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Example@123"}
              />
              <Button
                text={
                  loading ? " Loading..." : "Login Using Email and Password"
                }
                onClick={loginWithEmail}
                disabled={loading}
              />
              <p className={styles.pLogin}>OR</p>
              <Button
                onClick={googleAuth}
                text={loading ? "Loading..." : "Login Using Google"}
                isBlue={true}
              />
              <p
                className={styles.pLogin}
                onClick={() => setIsLoggedIn((prev) => !prev)}
              >
                Or Don't Have An Account? Click Here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* this is signup component */}
          <div className={styles.signupWrapper}>
            <h2 className={styles.title}>
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financely.</span>
            </h2>
            <form>
              <Input
                type={"text"}
                label={"Full Name"}
                state={name}
                setState={setName}
                placeholder={"John Doe"}
              />
              <Input
                type={"email"}
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"john.doe@gmail.com"}
              />
              <Input
                type={"password"}
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Example@123"}
              />
              <Input
                type={"password"}
                label={"Confirm Password"}
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder={"Example@123"}
              />
              <Button
                text={
                  loading ? " Loading..." : "Signup Using Email and Password"
                }
                onClick={signupWithEmail}
                disabled={loading}
              />
              <p className={styles.pLogin} onClick={loginWithEmail}>
                OR
              </p>
              <Button
                text={loading ? "Loading..." : "Signup Using Google"}
                onClick={googleAuth}
                isBlue={true}
              />
              <p
                className={styles.pLogin}
                onClick={() => setIsLoggedIn((prev) => !prev)}
              >
                Or Have An Account? Click Here
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SignupSigninComponent;
