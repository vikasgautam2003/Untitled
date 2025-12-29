import axios from "axios"

 const PISTON_URL = "https://emkc.org/api/v2/piston/execute";


const languageMap = {
  python: { language: "python", version: "3.10" },
  java: { language: "java", version: "17" },
  cpp: { language: "cpp", version: "10.2.0" }
};


export async function executeWithPiston({ language, code, stdin=""}){
    const config = languageMap[language];

    if(!config)
    {
        throw new Error("Unsupported Language");
    }

    const payload = {
        language: config.language,
        version: config.version,
        files: [{content: code}],
        stdin

    };

    const res = await axios.post(PISTON_URL, payload, {
        timeout: 10000
    })


    return res.data;
}