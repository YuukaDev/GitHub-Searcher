import React, { useState, useEffect } from "react";

function Form() {
  const handleNull = (param1) => {
    if (param1 === "" || param1 === null) {
      return "None";
    } else {
      return `${param1}`;
    }
  };
  const [base, setBase] = useState({
    name: "",
    bio: "",
    company: "",
    location: "",
    website: "",
    email: "",
    followers: 0,
    following: 0,
    twitter: "",
    repos: 0,
  });
  const [img, setImg] = useState();
  const getUser = async (username) => {
    try {
      const url = await fetch(`https://api.github.com/users/${username}`);
      const random = await url.json();
      setBase({
        name: `Name - ${random.login}`,
        bio: ` Biography - ${random.bio}`,
        company: `Company - ${handleNull(random.company, base.company)}`,
        location: `Location - ${handleNull(random.location, base.location)}`,
        website: `Website - ${random.blog}`,
        email: `Email - ${handleNull(random.email, base.email)}`,
        followers: `Followers - ${random.followers}`,
        following: `Following - ${random.following}`,
        twitter: `Twitter - ${random.twitter_username}`,
        repos: `Repos - ${random.public_repos}`,
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
    <div className="container-fluid">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.elements.usernameInput.value;
          if (!username) {
            return alert("Please enter username");
          } else {
            getUser(username);
          }
        }}
      >
        <div className="flex">
          <input
            type="text"
            id="usernameInput"
            placeholder="Enter a username..."
          />
          <button className="btn btn-primary m-3" type="submit">
            Submit
          </button>
        </div>
        <div className="card">
          <div className="data-container">
            <img className="m-3 rounded-circle" src={img} alt="logo" />
            <p>{base.name}</p>
            <p>{base.bio}</p>
            <p>{base.company}</p>
            <p>{base.location}</p>
            <p>{base.website}</p>
            <p>{base.email}</p>
            <p>{base.repos}</p>
            <p>{base.followers}</p>
            <p>{base.following}</p>
            <p>
              <i className="fab fa-twitter"></i>
              {base.twitter}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
