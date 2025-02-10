// export async function readFromGuardian(jsonObject) {
//     let str = jsonObject["topic"];
//     //let excludeTopicFromCloud = true;
//     let httpStrToGuardian = "https://content.guardianapis.com/search?q=" + str + "&from-date=2014-01-01&api-key=" + process.env.GUARDIAN_API_KEY;
//     const responseFromGuardian = await fetch(httpStrToGuardian);
//     let resultsFromG = await responseFromGuardian.json();
//     return resultsFromG;
// }

export async function readFromGuardian(topic) {
  try {
    const params = new URLSearchParams({
      q: topic,
      'from-date': '2014-01-01',
      'api-key': process.env.GUARDIAN_API_KEY,
    })

    const url = `https://content.guardianapis.com/search?${params}`
    const response = await fetch(url)

    if (!response.ok) {
      //return null;
      throw new Error(`Guardian API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Guardian API error:', error)
  }
}
