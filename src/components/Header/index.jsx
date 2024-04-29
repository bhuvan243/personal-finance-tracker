import React, { useEffect } from 'react';
import styles from "./header.module.css";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user){
            navigate("/dashboard");
        }
    }, [user, loading])

    function handleLogout(){
        try{
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("Logged out successfully")
                navigate("/");
              }).catch((error) => {
                // An error happened.
                toast.error(error.message);
              });
        } catch(error) {
            toast.error("User logged out successfully");
        }
    }
    return (
        <div className={styles.navbar}>
            <p className={styles.headerIcon}>Financely .</p>
            {
                user && (
                    <p className={`${styles.logoutBtn} ${styles.link}`} onClick={handleLogout}>Logout</p>
                )
            }
        </div>
    );
}

export default Header;