export type UserSession = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
}
export default function setSession(user: UserSession) {
    const sessionData = {
        user: user,
        expires: Date.now() + 1000  * 60 * 60 * 24 * 7, // 30 Minuten gültig
    };

    localStorage.setItem("userSession", JSON.stringify(sessionData));

    document.cookie = `userSession=${JSON.stringify(sessionData)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 30 Minuten

}