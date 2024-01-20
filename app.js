const url = "https://api.github.com/users/";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

//fetch user details

async function fetchUser(username) {
  try {
    // console.log(username)
    const res = await fetch(url + username);

    if (res.ok) {
      const userData = await res.json();
      console.log(userData);

      document.getElementById("profile-head").innerHTML = `
    <div class="profile-pic">
          <img src="${userData.avatar_url}" class="img-thumbnail" alt="./user.png" />
          <p><a href="${userData.repos_url}" target="_blank"> Go to GitHub </a></p>
        </div>
        <div class="profile-details">
          <p class="profile-name">${userData.login}</p>
          <p class="bio">The bio is : ${userData.bio}</p>
          <p class="palce">Location : ${userData.location}</p>
          <p class="handle"><a href="http://twitter.com/${userData.twitter_username}" target="_blank"> Go to Twitter </a></p>
        </div>

    `;
    } else {
      // const error = await response.json();
      const err = await res.json();
      // console.log(error);
      alert(err);
    }
  } catch (error) {
    alert("Invalid username");
    location.reload();
  }
}

//_____________________________________________________________________________

var repoData = [];
let itemsPerPage = 10;
let currentPage = 1;

async function fetchData(username) {
  try {
    const parameter = username;

    await fetchAPI(parameter);
    console.log(repoData);

    const pages = [];
    for (let i = 0; i <= Math.ceil(repoData.length / itemsPerPage); i++) {
      pages.push(i);
    }

    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = repoData.slice(indexOfFirstPage, indexOfLastPage);

    document.getElementById("repo").innerHTML = currentItems
      .map(
        (repo) =>
          `<div class="col-6">
                    <div class="p-3">
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description}</p>
                        <div>
                            <button class="btn btn-primary mb-3">${repo.language}</button>
                        </div>
                    </div>
                </div>`
      )
      .join("");
  } catch (error) {
    // alert("invalid username");
    location.reload();
  }
}

async function fetchAPI(username) {
  try {
    const para = username;
    const prevBtn = () => {
      if ((currentPage - 1) * itemsPerPage) {
        currentPage--;
        fetchData(para);
      }
    };

    const nextBtn = () => {
      if ((currentPage * itemsPerPage) / repoData.length) {
        currentPage++;
        fetchData(para);
      }
    };

    document.getElementById("prev").addEventListener("click", prevBtn, false);
    document.getElementById("next").addEventListener("click", nextBtn, false);

    const data = await fetch(url + username + "/repos");
    const res = await data.json();
    repoData = res;
  } catch (error) {
    alert("invalid username");
  }
}

//fetch repository

// async function fetchData(username) {
//   // console.log(username)
//   const response = await fetch(url + username + "/repos");

//   if (response.ok) {
//     const data = await response.json();
//     console.log(data);

//     const length = data.length;
//     let pageCount = 10;
//     for (let i = 1; i <= pageCount; i++)
//       document.getElementById("repo").innerHTML = data[i](
//         (repo) =>
//           `<div class="col-6">
//                     <div class="p-3">
//                         <h3><a href="${repo.html_url}">${repo.name}</a></h3>
//                         <p>${repo.description}</p>
//                         <div>
//                             <button class="btn btn-primary mb-3">${repo.language}</button>
//                         </div>
//                     </div>
//                 </div>`
//       ).join("");
//   } else {
//     const error = await response.json();
//     console.log(error);
//   }
// }

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData(searchBox.value);
  fetchUser(searchBox.value);
  fetchAPI(searchBox.value);
  console.log("button clicked");
});
