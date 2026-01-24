const BASE_URL = 'http://backend:3000';

async function http(path, { method = 'GET', body } = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || `${method} ${path} failed`)
    }
    return res.json()
}

export default http