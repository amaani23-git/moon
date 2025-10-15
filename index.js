document.querySelectorAll(".image-card").forEach((card, index) => {
  const postId = index + 1;

  const likeBtn = card.querySelector(".like");
  const dislikeBtn = card.querySelector(".dislike");
  const commentBtn = card.querySelector(".comment-btn");
  const input = card.querySelector(".comment-box input");

  likeBtn.addEventListener("click", () => updatePost(postId, 'like', card));
  dislikeBtn.addEventListener("click", () => updatePost(postId, 'dislike', card));
  commentBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
      updatePost(postId, 'comment', card, text);
      input.value = '';
    }
  });
});

function updatePost(postId, action, card, comment = '') {
  const formData = new FormData();
  formData.append('action', action);
  formData.append('post_id', postId);
  if (comment) formData.append('comment', comment);

  fetch('api.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        card.querySelector(".like-count").textContent = data.post.likes;
        card.querySelector(".dislike-count").textContent = data.post.dislikes;

        // Disable button after voting
        if (action === "like") {
          card.querySelector(".like").disabled = true;
          card.querySelector(".dislike").disabled = false;
        } else if (action === "dislike") {
          card.querySelector(".dislike").disabled = true;
          card.querySelector(".like").disabled = false;
        }

        // Refresh comments
        const commentList = card.querySelector(".comment-list");
        commentList.innerHTML = '';
        data.comments.forEach(c => {
          const div = document.createElement('div');
          div.className = 'comment';
          div.textContent = c.comment_text;
          commentList.appendChild(div);
        });
      }
    });
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Move slides
  document.querySelector(".slides").style.transform = `translateX(${-currentSlide * 100}%)`;

  // Update dots
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

function changeSlide(n) {
  showSlide(currentSlide + n);
}

function setSlide(n) {
  showSlide(n);
}

// 🔥 Auto play every 3 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);