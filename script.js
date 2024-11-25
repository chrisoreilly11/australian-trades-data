document.addEventListener('DOMContentLoaded', function() {
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calculateFairPrice(lostRevenue, percentage) {
        return lostRevenue * (percentage / 100);
    }

    async function calculateLostRevenue() {
        const postalCode = document.getElementById('postalCode').value;
        const trade = document.getElementById('trade').value;
        const dataUrl = 'https://raw.githubusercontent.com/chrisoreilly11/australian-trades-data/main/australian_trades_postcodes%202.json'; // Replace with your actual URL

        try {
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data[postalCode] && data[postalCode][trade]) {
               
