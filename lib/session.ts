export default function setSession(user: any) {
    const sessionData = {
        user: user,
        expires: Date.now() + 1000  * 60 * 60 * 24 * 7, // 30 Minuten gültig
    };

    localStorage.setItem("userSession", JSON.stringify(sessionData));

    document.cookie = `userSession=${JSON.stringify(sessionData)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 30 Minuten

}