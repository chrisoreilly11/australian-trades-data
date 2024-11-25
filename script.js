document.addEventListener('DOMContentLoaded', function() {
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                let lostRevenue = data[postalCode][trade].lost_revenue;
                lostRevenue = lostRevenue - (lostRevenue * 0.22); // Reduce the impact score by 22%
                const lostRevenueFiveYears = lostRevenue * 5;
                const formattedLostRevenue = formatNumber(lostRevenueFiveYears);

                // Suggested Market Price (competitors' average price based on fair revenue percentage)
                const fairPrice = lostRevenueFiveYears * 0.10; // Example: 10% of lost revenue
                const formattedFairPrice = formatNumber(fairPrice.toFixed(2));

                // Your Suggested Price
                const suggestedPrice = 3499; // Your middle-tier option
                const formattedSuggestedPrice = formatNumber(suggestedPrice);

                const resultText = `
                    <div class="result-header">Lost Revenue Over 5 Years: $${formattedLostRevenue}</div>
                    <ul class="result-list">
                        <li><strong>Missed Opportunities:</strong> By not having a professional website, you are potentially missing out on significant revenue over the next 5 years.</li>
                        <li><strong>Credibility:</strong> A professional website builds trust and credibility with your customers, making them more likely to choose your services.</li>
                        <li><strong>Reach More Customers:</strong> A well-designed website helps you reach a broader audience, leading to more leads and sales.</li>
                        <li><strong>Business Growth:</strong> An effective online presence supports sustainable business growth and keeps you ahead of the competition.</li>
                        <li><strong>Revenue Generation:</strong> Your website is your digital storefront. It works for you 24/7, attracting new customers and generating revenue even when you're not working.</li>
                    </ul>
                    <p>Investing in a quality website can transform your business. Don’t leave money on the table – let us help you build a professional website that drives growth and maximizes your revenue.</p>
                    <div class="pricing-section">
                        <div class="pricing-tier">
                            <h3>Market Price</h3>
                            <p><strong style="color: red;">$${formattedFairPrice}</strong></p>
                            <p><em>Based on industry averages for professional websites.</em></p>
                        </div>
                        <div class="pricing-tier recommended">
                            <h3>Our Recommended Price</h3>
                            <p><strong style="color: green;">$${formattedSuggestedPrice}</strong></p>
                            <p><em>Get the same quality website for much less!</em></p>
                        </div>
                    </div>
                    <div class="footnote">* Data based on industry average revenue impacts from ${new Date().getFullYear()}.</div>
                `;
                document.getElementById('result').innerHTML = resultText;
            } else {
                document.getElementById('result').innerText = 'Postal code or trade not found';
            }
        } catch (error) {
            console.error('Error fetching the postcode data:', error);
            document.getElementById('result').innerText = 'Error calculating lost revenue';
        }
    }

    document.getElementById('revenueForm').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateLostRevenue();
    });
});
