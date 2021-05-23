export async function getNews() {
    let newsResponse = await fetch("https://frontappapi.dock7.66bit.ru/api/news/get?page=1&count=10");
    let news = await newsResponse.json();

    return news;
}

export async function getTheme(themeName) {
    let themeUrl = "https://frontappapi.dock7.66bit.ru/api/theme/get?name=" + themeName;
    let themeResponse = await fetch(themeUrl);
    let theme = await themeResponse.json();

    return theme;
}