import React, { useState, useEffect } from "react";

function Form() {
  const handleNull = (a) => {
    if (a === "" || a === null) {
      return "None";
    } else {
      return `${a}`;
    }
  };
  const [base, setBase] = useState({
    name: "",
    login: "",
    bio: "",
    creation: "",
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
        name: `${handleNull(random.name, base.name)}`,
        login: `@${random.login}`,
        creation: `${random.created_at}`,
        bio: ` ${random.bio}`,
        company: ` ${handleNull(random.company, base.company)}`,
        location: ` ${handleNull(random.location, base.location)}`,
        website: ` ${random.blog}`,
        email: ` ${handleNull(random.email, base.email)}`,
        followers: `${random.followers}`,
        following: `${random.following}`,
        twitter: ` ${handleNull(random.twitter_username, base.twitter)}`,
        repos: `${random.public_repos}`,
      });
      setImg(random.avatar_url);
      console.log(random);
    } catch {
      alert("There was something wrong");
    }
  };
  useEffect(() => {
    getUser("YuukaDev");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container-fluid">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.elements.usernameInput.value;
          if (!username) {
            return alert("Please enter username");
          } else {
            return getUser(username);
          }
        }}
      >
        <div className="d-flex align-items-center justify-content-center">
          <input
            type="text"
            id="usernameInput"
            placeholder="Enter a username..."
          />
          <button type="submit">Submit</button>
        </div>
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-header">
              <img id="avatar" src={img} alt="" />
              <div className="profile-info-wrapper">
                <div className="profile-name">
                  <h2 id="name">{base.name}</h2>
                  <p id="user">{base.login}</p>
                  <p className="email">
                    <i className="fas fa-envelope"></i>
                    {base.email}
                  </p>
                </div>
                <p id="date">{base.creation}</p>
              </div>
            </div>

            <div className="profile-stats-wrapper">
              <div className="profile-stat">
                <p className="stat-title">Repos</p>
                <p id="repos" className="stat-value">
                  {base.repos}
                </p>
              </div>
              <div className="profile-stat">
                <p className="stat-title">Followers</p>
                <p id="followers" className="stat-value">
                  {base.followers}
                </p>
              </div>
              <div className="profile-stat">
                <p className="stat-title">Following</p>
                <p id="following" className="stat-value">
                  {base.following}
                </p>
              </div>
            </div>
            <div className="profile-bottom-wrapper">
              <div className="profile-info">
                <i className="fas fa-map-marker-alt"></i>
                <p id="location">{base.location}</p>
              </div>
              <div className="profile-info">
                <i className="fas fa-link"></i>
                <p id="page">{base.website}</p>
              </div>
              <div className="profile-info">
                <i className="fab fa-twitter"></i>
                <p id="twitter">{base.twitter}</p>
              </div>
              <div className="profile-info">
                <i className="fas fa-building"></i>
                <p id="company">{base.company}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
