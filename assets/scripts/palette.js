function getUserPalette() {
    return localStorage.getItem('palette') || 'dark'
}

function setUserPalette(palette) {
    localStorage.setItem('palette', palette)
}

function rotateUserPalette() {
    let userPalette = getUserPalette();

    return userPalette == 'light'
        ? 'dark'
        : 'light'
}

function getAppliedPalette(palette) {
    if (palette === 'light') {
        return 'light'
    }

    if (palette === 'dark') {
        return 'dark'
    }
}

function setAppliedPalette(palette) {
    document.documentElement.dataset.palette = palette
}

const userPalette = getUserPalette()
setAppliedPalette(getAppliedPalette(userPalette))
document.querySelector("#toggle-palette").addEventListener("click", () => {
    const newPalette = rotateUserPalette(getUserPalette());
    setAppliedPalette(newPalette);
    setUserPalette(newPalette)
});