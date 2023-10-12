const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
const params = {
    vs_currency: 'inr',
    per_page: 100, // Adjust the number of cryptocurrencies per page as needed
    page: 1, // Adjust the page number if you want to paginate the results
};

async function fetchCryptoData() {
    try {
        const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
        const data = await response.json();

        const cryptoTable = document.getElementById('crypto-data');

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
            `;
            cryptoTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
}

fetchCryptoData();
