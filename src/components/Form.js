import React, { useState, useEffect } from "react";

function Form() {
  const a = null;
  const [base, setBase] = useState({
    name: "",
    bio: "",
    website: "",
    email: "",
    followers: 0,
    following: 0,
    twitter: "",
    repos: 0
  });
  const [img, setImg] = useState();
  const getUser = async (username) => {
    try {
      const url = await fetch(`https://api.github.com/users/${username}`);
      const random = await url.json();
      setBase({
        name: `Name - ${random.login}`,
        bio: ` Biography - ${random.bio}`,
        website: `Website - ${random.blog}`,
        email: `${a ? 10 : random.email}`,
        followers: `Followers - ${random.followers}`,
        following: `Following - ${random.following}`,
        twitter: `Twitter - ${random.twitter_username}`,
        repos: `Repos - ${random.public_repos}`
      });
      setImg(random.avatar_url);
      console.log(random);
    } catch {
      alert("There was something wrong");
    }
  };
  useEffect(() => {
    getUser("YuukaDev");
  }, []);
  return (
    <div className="container">
      <button
        onToggle={() => {
          document.body.classList.add("dark")
        }}
        className="dark-mode"
      >
        Dark Mode
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.elements.usernameInput.value;
          getUser(username);
        }}
      >
        <input
          type="text"
          id="usernameInput"
          placeholder="Enter a username..."
        />
        <button type="submit">Submit</button>
        <div className="data-container">
          <p>{base.name}</p>
          <p>{base.bio}</p>
          <p>{base.website}</p>
          <p>{base.email}</p>
          <p>{base.repos}</p>
          <p>{base.followers}</p>
          <p>{base.following}</p>
          <p>{base.twitter}</p>
          <img src={img} alt="logo" />
        </div>
      </form>
    </div>
  );
}

export default Form;
