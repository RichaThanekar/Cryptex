const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
        const params = {
            vs_currency: 'inr',
            per_page: 20, // Display 20 coins per page
            page: 1,
        };

        const cryptoTable = document.getElementById('crypto-data');
        const prevPageButton = document.getElementById('prevPage');
        const nextPageButton = document.getElementById('nextPage');

        async function fetchCryptoData() {
            try {
                const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
                const data = await response.json();

                // Clear the previous page's data
                cryptoTable.innerHTML = '';

                data.forEach(crypto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${crypto.image}" alt="${crypto.name} Logo" width="32"></td>
                        <td>${crypto.name}</td>
                        <td>${crypto.market_cap_rank}</td>
                        <td>${crypto.current_price} BTC</td>
                        <td>${crypto.market_cap_rank}</td>
                        <td>Rs.${crypto.current_price}</td>
                        <td>${crypto.price_change_percentage_24h.toFixed(2)}%</td>

                        <td class="star-icon">
                            <button class="add-to-cart-button" data-coin-id="${crypto.id}">Add to Cart</button>
                        </td>
                    `;
                    cryptoTable.appendChild(row);
                });
                
                // Handle the click event for "Add to Cart" buttons
                document.querySelectorAll('.add-to-cart-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const coinId = button.getAttribute('data-coin-id');
                        // Redirect to the new HTML page with the selected coin
                        window.location.href = `selected_coin.html?id=${coinId}`;
                    });
                });
                
            } catch (error) {
                console.error('Error fetching cryptocurrency data:', error);
            }
        }

        // Pagination control event listeners
        prevPageButton.addEventListener('click', () => {
            if (params.page > 1) {
                params.page--;
                fetchCryptoData();
            }
        });

        nextPageButton.addEventListener('click', () => {
            params.page++;
            fetchCryptoData();
        });

        // Initial data fetch
        fetchCryptoData();
