const {fetch} = window;

export const upload = (file, endpoint) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        fetch(
            endpoint,
            {
                method: 'POST',
                body: formData,
                credentials: 'same-origin',
            }
        )
        .then(
            response => response.json()
        )
        .then(
            data => resolve(data)
        )
        .catch(
            error => reject(error)
        );
    });
};
