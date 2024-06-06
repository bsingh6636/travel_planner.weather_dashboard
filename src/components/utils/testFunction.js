export const autoSuggest = () => {
    const prefix = "blr"
    const requestBody = JSON.stringify({ Prefix: prefix });

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://www.easemytrip.com/api/Flight/GetAutoSuggest';
    fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Origin": "https://www.easy.com"
        },
        body: requestBody
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Handle successful response
            if (data !== "NOTOK" && data.length > 0) {
                const suggestion = data[0];
                console.log(suggestion)
                console.log(data)

            } else {
                console.error("No suggestions found.");
            }
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with the fetch operation:', error);
        });
}
