// Page Loader//
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loader").style.display = "flex";
});

//Hide loader when page has loaded//
window.addEventListener("load", () =>  {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 3000);
});

// Search Filter Dropdown //
const filterBtn = document.getElementById("filterBtn");
const filterDropdown = document.getElementById("filterDropdown");
const filterOptions = document.querySelectorAll(".filter-option");
let selectedFilter = "all";

if (filterBtn) {
    filterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle("active");
    });

    filterOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectedFilter = option.dataset.filter;
            const filterText = option.textContent;
            filterBtn.textContent = filterText + " ▼";
            
            filterOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            
            filterDropdown.classList.remove("active");
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-filters")) {
            filterDropdown.classList.remove("active");
        }
    });
}

// Highlight searched product
document.addEventListener("DOMContentLoaded", () => {
    const selectedProduct = sessionStorage.getItem("selectedProduct");
    if (selectedProduct) {
        // Find product card with matching product name
        const productCards = document.querySelectorAll(".products-card");
        productCards.forEach(card => {
            const productName = card.querySelector("h2").textContent;
            if (productName.includes(selectedProduct) || selectedProduct.includes(productName)) {
                // Highlight the card
                card.style.border = "3px solid goldenrod";
                card.style.boxShadow = "0 0 15px rgba(218, 165, 32, 0.5)";
                card.style.borderRadius = "8px";
                
                // Scroll to the card
                card.scrollIntoView({ behavior: "smooth", block: "center" });
                
                // Clear the sessionStorage
                sessionStorage.removeItem("selectedProduct");
            }
        });
    }
});

// All products from products-container only
const allProducts = [
    // Products Container - Fresh Produce
    { name: "Fresh Pumpkin", price: "R 65.00", description: "Fresh produce pumpkins for decor and recipes" },
    { name: "Bell Peppers", price: "R 35.00", description: "A Pack of 3 bell peppers" },
    { name: "Nectarine", price: "R 40.00", description: "Freshly Grown Yellow Nectarines - Pack of six" },
    
    // Products Container - Pottery
    { name: "Decorative african style mask", price: "R 1500.00", description: "Hand-carved wooden mask with geometric carvings" },
    { name: "Matte Black Glazed Egg Cup-Set of Two", price: "R 399.00", description: "Unique elegant egg cup set in matte black" },
    { name: "Carve bowl collection", price: "R 335.00", description: "Gloss glazed carve bowl in multiple hues" },
    { name: "Penguin Jug", price: "R 270.00", description: "Jug in different sizes with chic glaze choice" },
    
    // Products Container - Clothing
    { name: "Phola Kuzolunga T-Shirt", price: "R 150.00", description: "100% cotton with inspiring message" },
    { name: "Unity Sweater", price: "R 380.00", description: "Comfortable black and cream unity sweater" },
    { name: "Women's Pleated Skirt Dresses", price: "R 400.00", description: "Vintage inspired floral dress" },
    { name: "African design shirt print", price: "R 300.00", description: "Slim fit shirt from saturday collection" },
    
    // Products Container - Accessories
    { name: "Bead Bracelet", price: "R 30.00", description: "Stylish handmade bead bracelet set for women" },
    { name: "Pink Patterned Phone Case", price: "R 45.00", description: "Fashionable anti-drop phone case" }
];

// Search Functionality //
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".box-icon a");
const searchBox = document.querySelector(".box");
let suggestionBox = document.querySelector(".search-suggestions");

if (searchInput && searchBox) {
    if (!suggestionBox) {
        suggestionBox = document.createElement("div");
        suggestionBox.className = "search-suggestions";
        searchBox.appendChild(suggestionBox);
    }

    function updateSuggestions(query = "") {
        const filtered = allProducts.filter(p => {
            if (!query) return true;
            return p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        }).slice(0, 6);

        suggestionBox.innerHTML = filtered.map(product => {
            return `
                <div class="search-suggestion-item" data-name="${product.name}">
                    <strong>${product.name}</strong>
                    <span>${product.price}</span>
                </div>
            `;
        }).join("");

        if (filtered.length === 0) {
            suggestionBox.innerHTML = "<div class='search-suggestion-item'>No suggestions found</div>";
        }

        suggestionBox.classList.add("active");
    }

    function hideSuggestions() {
        suggestionBox.classList.remove("active");
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (!query) {
            alert("Please enter a search term");
            return;
        }
        
        const results = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            alert("No products found");
            return;
        }
        
        sessionStorage.setItem("selectedProduct", results[0].name);
        window.location.href = "products.html";
    }

    searchInput.addEventListener("focus", () => {
        updateSuggestions(searchInput.value.trim().toLowerCase());
    });

    searchInput.addEventListener("input", () => {
        updateSuggestions(searchInput.value.trim().toLowerCase());
    });

    searchInput.addEventListener("blur", () => {
        setTimeout(hideSuggestions, 150);
    });

    suggestionBox.addEventListener("mousedown", (event) => {
        const item = event.target.closest(".search-suggestion-item");
        if (!item) return;
        event.preventDefault();
        const name = item.dataset.name;
        if (!name) return;
        searchInput.value = name;
        performSearch();
    });

    if (searchIcon) {
        searchIcon.addEventListener("click", (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
}

// Prevent card buttons from opening the popup
const cardButtons = document.querySelectorAll(".card .button-1, .products-card .button-1");
if (cardButtons.length > 0) {
    cardButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            event.preventDefault();
            // Standalone button: add custom behavior here if needed
        });
    });
}

// Subscribe Popup when page loads //
const popupElement = document.getElementById("popup");
const closeBtn = document.getElementById("close");

if (popupElement) {
    window.addEventListener("load", function () {
        setTimeout(function () {
            popupElement.style.display = "block";
        }, 3000);
    });
}

if (closeBtn) {
    closeBtn.onclick = function () {
        popupElement.style.display = "none";
    };
}

// Card Popup //

function showCard(image, title, price, description) {

    document.getElementById("card-popup-image").src = image;

    document.getElementById("card-popup-title").innerHTML = title;

    document.getElementById("card-popup-price").innerHTML = price;

    document.getElementById("card-popup-description").innerHTML = description;

    document.getElementById("card-popup").style.display = "block";
}

function closePopup() {

    document.getElementById("card-popup").style.display = "none"; 
}

// Products Popup //


function showProductsCard(image, title, price, description) {

    document.getElementById("products-popup-image").src = image;

    document.getElementById("products-popup-title").innerHTML = title;

    document.getElementById("products-popup-price").innerHTML = price;

    document.getElementById("products-popup-description").innerHTML = description;

    document.getElementById("products-popup").style.display = "block";
}

function closeProductPopup() {

    document.getElementById("products-popup").style.display = "none"; 
}

// Message Sent//
const contactForm = document.getElementById("Form");
console.log("Contact form found:", contactForm);
if (Form) {
    Form.addEventListener("submit", function(e) {
        console.log("contactForm submitted");
        e.preventDefault();
        const form = this;
        const spinner = document.getElementById("spinner");
        const btnText = document.getElementById("btnText");
        const message = document.getElementById("message");
        const submitBtn = document.getElementById("submitBtn");

        console.log("Elements found - spinner:", spinner, "btnText:", btnText, "message:", message);

        if (spinner) spinner.style.display = "inline-block";
        if (btnText) btnText.textContent = "Sending...";
        if (submitBtn) submitBtn.disabled = true;

        setTimeout(() => {
            console.log("Animation complete, showing message");
            if (spinner) spinner.style.display = "none";
            if (btnText) btnText.textContent = "Send";
            if (submitBtn) submitBtn.disabled = false;
            if (message) message.style.display = "block";

            const action = form.getAttribute("action") || "mailto:ZanoMarket@gmail.com";
            console.log("Opening mail with:", action);
            window.location.href = action + "?subject=" + encodeURIComponent("website message") + "&body=" + encodeURIComponent("New message from your website");

            form.reset();

            setTimeout(() => {
                if (message) message.style.display = "none";
            }, 6000);
        }, 2000);
    });
} else {
    console.log("Contact Form NOT found!");
}