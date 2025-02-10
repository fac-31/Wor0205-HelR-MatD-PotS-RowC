export async function readFromGuardian(topic) {
    let httpStrToGuardian = "https://content.guardianapis.com/search?q=" + topic + "&from-date=2014-01-01&api-key=" + process.env.GUARDIAN_API_KEY;
    const responseFromGuardian = await fetch(httpStrToGuardian);
    let resultsFromG = await responseFromGuardian.json();
    return resultsFromG;
}