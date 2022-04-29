import { useState, useEffect } from "react";

export default function Repos() {
  const getUser = async (username) => {
    try {
      const url = await fetch(`https://api.github.com/users/${username}/repos`);
      const random = await url.json();
      setBase(random);
      console.log(random);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser("YuukaDev");
  }, []);

  const [base, setBase] = useState([]);
  return (
    <>
      <h1>Repository</h1>
      <div>
        {base.map((repos, index) => (
          <h1>{repos.name}</h1>
        ))}
      </div>
    </>
  );
}
