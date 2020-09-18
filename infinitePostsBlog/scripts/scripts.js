const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

//Fetch post from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  // data is a promisse must be used async
  return data;
}

//Show post in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
    <div class = "number">${post.id}</div>
    <div class = "post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class ="post-body">${post.body}</p>
    </div>
    `;

    postContainer.appendChild(postElement);
  });
}

// Show loader and fetch more posts
function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
  }, 1000);

  setTimeout(() => {
    page++;
    showPosts();
  }, 300);
}

//Filter the posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    // indexOf return -1 if there is no match
    //if there is a match in any of this, change the display
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  //if scroll hits the bottom, do
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
