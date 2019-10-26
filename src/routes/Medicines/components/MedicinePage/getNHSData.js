const apiKey = "7bc7a8c323574f1ca3516a0c78221a45";

export const getMedicineByName = async (name) => {
    return await fetch(`https://api.nhs.uk/medicines/${name}`, {headers:{'subscription-key': apiKey}}).then(r => r.json());
}
