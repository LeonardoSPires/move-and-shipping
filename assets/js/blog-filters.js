document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('blogSearch');
    const cards = document.querySelectorAll('.blog-posts-grid .post-card');
    const noResults = document.getElementById('noResults');

    let activeFilter = 'todos';

    function normalize(value) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function applyFilters() {
        const searchTerm = normalize(searchInput ? searchInput.value : '');
        let visibleCount = 0;

        cards.forEach(card => {
            const categories = card.dataset.category || '';
            const title = card.dataset.title || '';
            const text = card.innerText || '';
            const searchable = normalize(`${title} ${text} ${categories}`);

            const matchesCategory = activeFilter === 'todos' || categories.includes(activeFilter);
            const matchesSearch = !searchTerm || searchable.includes(searchTerm);
            const shouldShow = matchesCategory && matchesSearch;

            card.style.display = shouldShow ? '' : 'none';

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount ? 'none' : 'block';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            activeFilter = button.dataset.filter || 'todos';
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
});
