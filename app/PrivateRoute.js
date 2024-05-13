import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SignIn from './login/SignIn';
import Home from './page';

function PrivateRoute({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("user"));
    setUser(user)

  }, []);

  return user?.email === "adminmaster@gmail.com" ? children : <SignIn />;
  return <Home />
}

export default PrivateRoute;
