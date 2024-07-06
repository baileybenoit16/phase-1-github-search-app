document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const input = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value;
      searchUsers(query);
    });
  
    async function searchUsers(query) {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
      displayUsers(data.items);
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      reposList.innerHTML = ""; // Clear repos list on new search
      users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <h2>${user.login}</h2>
          <img src="${user.avatar_url}" alt="${user.login}" width="100">
          <a href="${user.html_url}" target="_blank">View Profile</a>
          <button onclick="getUserRepos('${user.login}')">View Repositories</button>
          <ul id="repos-${user.login}"></ul>
        `;
        userList.appendChild(userItem);
      });
    }
  
    window.getUserRepos = async function(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
      displayRepos(username, data);
    }
  
    function displayRepos(username, repos) {
      const reposUl = document.getElementById(`repos-${username}`);
      reposUl.innerHTML = "";
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposUl.appendChild(repoItem);
      });
    }
  });
  