// Enhanced Gallery JavaScript with Modern Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const gridItems = document.querySelectorAll('.grid-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMore');
    let visibleItems = 12; // Initial number of visible items
    const totalItems = gridItems.length;
    
    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            gridItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset visible items count
            visibleItems = document.querySelectorAll('.grid-item[style="display: block;"]').length;
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = Array.from(gridItems).filter(item => {
                return item.style.display === 'none' || 
                      (item.style.display === '' && !item.classList.contains('visible'));
            });
            
            // Show next 4 items (or remaining if less than 4)
            const itemsToShow = hiddenItems.slice(0, 4);
            itemsToShow.forEach(item => {
                item.style.display = 'block';
                item.classList.add('visible');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            });
            
            visibleItems += itemsToShow.length;
            
            // Hide button if all items are visible
            if (visibleItems >= totalItems) {
                loadMoreBtn.style.display = 'none';
            }
            
            // Scroll to newly loaded items
            if (itemsToShow.length > 0) {
                itemsToShow[itemsToShow.length - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    }
    
    // Initialize masonry layout
    function resizeMasonryItem(item) {
        const grid = document.querySelector('.masonry-grid');
        if (!grid) return;
        
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        const itemHeight = item.querySelector('img').getBoundingClientRect().height;
        
        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = 'span ' + rowSpan;
    }
    
    function resizeAllMasonryItems() {
        gridItems.forEach(item => {
            if (window.getComputedStyle(item).display !== 'none') {
                resizeMasonryItem(item);
            }
        });
    }
    
    // Wait for images to load
    function waitForImages() {
        const images = document.querySelectorAll('.grid-item img');
        let loadedCount = 0;
        
        images.forEach(img => {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
            }
        });
        
        function imageLoaded() {
            loadedCount++;
            if (loadedCount === images.length) {
                resizeAllMasonryItems();
            }
        }
    }
    
    // Initialize
    waitForImages();
    window.addEventListener('resize', resizeAllMasonryItems);
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Remove loader when page is loaded
    const loader = document.querySelector('.eec-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animated');
        }, 500);
    }
});