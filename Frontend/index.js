// DOM Elements
const productGrid = document.getElementById('product-grid');
const resultsCount = document.getElementById('results-count');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    lucide.createIcons();
});


//GET Products from Flask API

async function fetchProducts() {
    try {
        const response = await fetch("http://127.0.0.1:5000/products");
        if (!response.ok) throw new Error('Failed to fetch');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.warn('Failed to fetch products:', error);
        renderProducts([]);
    }
}




function renderProducts(products) {
    // Update count
    if (resultsCount) {
        resultsCount.textContent = `Showing ${products.length} results`;
    }

    // Clear loading state
    if (productGrid) {
        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                    <p>No products found</p>
                </div>
            `;
            return;
        }

        products.forEach((product, index) => {
            const card = document.createElement('div');
            // Added card-entrance class and inline style for staggered delay
            card.className = 'card-entrance group flex flex-col overflow-hidden bg-white rounded-3xl product-card';
            card.style.animationDelay = `${index * 100}ms`; // Staggered animation
            
            card.innerHTML = `
                <!-- Top Half - Beige Background with Shapes -->
             <div class="relative flex h-72 w-full items-center justify-center overflow-hidden bg-[#C7DCD3] p-8 transition-colors duration-500 group-hover:bg-[#B8D3C8]">






                    <!-- Background Decorative Shapes -->
                    <div class="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full shape-circle-border floating-shape" style="animation-delay: 0s"></div>
                    <div class="absolute bottom-12 left-6 h-4 w-4 rounded-full bg-[#FF6B6B]/20 floating-shape" style="animation-delay: 0.2s"></div>
                    <div class="absolute right-16 top-16 h-3 w-3 rounded-full bg-[#4ECDC4]/20 floating-shape" style="animation-delay: 0.5s"></div>
                    <div class="absolute left-[-10%] bottom-[-10%] h-40 w-40 rounded-full bg-[#FFD166]/10 floating-shape" style="animation-delay: 0.7s"></div>
                    
                    <!-- Product Image -->
                    <div class="relative z-10 h-52 w-52 flex items-center justify-center">
                        <img 
                            src="${product.image}" 
                            alt="${product.name}"
                            class="h-full w-full object-cover rounded-xl"
                            loading="lazy"
                        />
                    </div>
                </div>

                <!-- Bottom Half - White Info Area -->
                <div class="flex flex-1 flex-col items-center p-6 text-center">
                    <!-- Category Tag -->
                    <span class="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        ${product.category || 'General'}
                    </span>

                    <!-- Product Name -->
                    <h3 class="mb-2 text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-slate-700 transition-colors">
                        ${product.name}
                    </h3>
                    
                    <!-- Description -->
                    <p class="mb-6 line-clamp-2 text-xs leading-relaxed text-slate-500 px-2 h-9">
                        ${product.description}
                    </p>

                    <!-- Color Dots -->
                    <div class="mb-6 flex justify-center gap-3 opacity-60 transition-opacity group-hover:opacity-100">
                        <div class="h-2.5 w-2.5 rounded-full bg-[#FF6B6B] ring-1 ring-transparent hover:ring-[#FF6B6B] ring-offset-2 transition-all cursor-pointer"></div>
                        <div class="h-2.5 w-2.5 rounded-full bg-[#4ECDC4] ring-1 ring-transparent hover:ring-[#4ECDC4] ring-offset-2 transition-all cursor-pointer"></div>
                        <div class="h-2.5 w-2.5 rounded-full bg-[#FFD166] ring-1 ring-transparent hover:ring-[#FFD166] ring-offset-2 transition-all cursor-pointer"></div>
                    </div>

                    <!-- Price and Button Row -->
                    <div class="mt-auto flex w-full items-center justify-between border-t border-slate-50 pt-5">
                        <div class="flex flex-col items-start">
                            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Price</span>
                            <span class="text-xl font-bold text-slate-900 font-mono tracking-tight">
                                $${product.price.toFixed(2)}
                            </span>
                        </div>
                        <button 
                            class="btn-shine h-10 rounded-full bg-slate-900 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all active:translate-y-0"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Re-initialize icons for new content
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}
