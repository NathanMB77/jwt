import React, { useEffect, useState } from "react";

export const Private = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem('jwtToken');

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch('https://urban-spoon-q7vv7x4wvvxqc9xrv-3001.app.github.dev/protected', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.user_info);
        } else {
          throw new Error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error:', error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  function handleLogOut() {
    sessionStorage.setItem('jwtToken', null);
    window.location.href = "/login";
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>No user information available</div>;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.email}</h1>
      <p>Email: {userInfo.email}</p>
      {/* Add more user-specific information here */}
      <button onClick={handleLogOut} type="button" className="btn">log out</button>
    </div>
  );
};