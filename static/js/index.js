// Initialize Statistics Counter
function initializeStatCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.8
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-value'));
                animateValue(target, 0, finalValue, 2000);
                target.classList.add('animate');
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = currentValue.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Service Card Features Animation
document.querySelectorAll('.service-features li').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
});

// Service Request Form Handling
const serviceForm = document.querySelector('.service-form');
if (serviceForm) {
    serviceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = serviceForm.querySelector('.submit-service-request');
        submitBtn.classList.add('loading');
        
        // Collect form data
        const formData = new FormData(serviceForm);
        const formDetails = Object.fromEntries(formData.entries());
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
            showNotification('success', 'Service request submitted successfully!');
            serviceForm.reset();
        } catch (error) {
            showNotification('error', 'Failed to submit request. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

// Custom Select Enhancement
document.querySelectorAll('.service-form select').forEach(select => {
    select.addEventListener('change', function() {
        this.style.color = this.value ? '#333' : '#666';
    });
});

// Notification System
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ripple Effect for Buttons
document.querySelectorAll('.service-cta, .submit-service-request').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeStatCounter();
});

// Original image card code
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