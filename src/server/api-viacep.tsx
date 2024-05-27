import axios from 'axios';

async function viaCep(cep: string) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return {
        cep,
/*         publicPlace: data.logradouro,
        complement: "",
        neighborhood: "",
        locality: data.localidade,
        estado: data.uf,
        ddd: "", */
    };
}

export default viaCep;