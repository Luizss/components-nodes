export const sendQL = (query, callback) =>
    fetch('http://localhost:8000/ql', {
        method: 'POST',
        body: JSON.stringify({
            query
        })
        //headers
    })
        .then(data => data.json())
        .then(callback);
