// assets/js/blog-filters.js

function setupBlogFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.post-card');

    if (!buttons.length || !posts.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const filter = button.dataset.filter;

            buttons.forEach(btn =>
                btn.classList.remove('active')
            );

            button.classList.add('active');

            posts.forEach(post => {

                const categories =
                    post.dataset.category || '';

                if (
                    filter === 'todos' ||
                    categories.includes(filter)
                ) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }

            });

        });
    });
}

document.addEventListener(
    'DOMContentLoaded',
    setupBlogFilters
);