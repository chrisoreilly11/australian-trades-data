async function calculateLostRevenue() {
    const postalCode = document.getElementById('postalCode').value;
    const trade = document.getElementById('trade').value;
    const dataUrl = 'https://raw.githubusercontent.com/chrisoreilly11/australian-trades-data/main/australian_trades_postcodes.json'; // Replace with your actual URL

    try {
        const response = await fetch(dataUrl);
        const data = await response.json();

        if (data[postalCode] && data[postalCode][trade]) {
            const lostRevenue = data[postalCode][trade].lost_revenue;
            document.getElementById('result').innerText = `Potential lost revenue for ${trade}: $${lostRevenue}`;
        } else {
            document.getElementById('result').innerText = 'Postal code or trade not found';
        }
    } catch (error) {
        console.error('Error fetching the postcode data:', error);
        document.getElementById('result').innerText = 'Error calculating lost revenue';
    }
}
