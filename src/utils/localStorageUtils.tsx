export const setItem = (key: string, token: string) => {
    return localStorage.setItem(key, token)
}

export const getItem = (key: string) => {
    return localStorage.getItem(key)
}

export const setItemObject = (key: string, item: object) => {
    const jsonItem = JSON.stringify(item)
    return localStorage.setItem(key, jsonItem)
}

export const getItemObject = (key: string) => {
    const jsonItem = localStorage.getItem(key)
    return jsonItem ? JSON.parse(jsonItem) : undefined
}

export const remove = (key: string) => {
    return localStorage.removeItem(key)
}
export const clear = () => {
    return localStorage.clear()
}