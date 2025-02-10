export async function readFromGuardian(jsonObject) {
    let str = jsonObject["topic"];
    //let excludeTopicFromCloud = true;
    let httpStrToGuardian = "https://content.guardianapis.com/search?q=" + str + "&from-date=2014-01-01&api-key=" + process.env.GUARDIAN_API_KEY;
    const responseFromGuardian = await fetch(httpStrToGuardian);
    let resultsFromG = await responseFromGuardian.json();
    return resultsFromG;
}