//Fichier consommation API pour le Login
//Récuperation des données avec POST
export function Signin(loginn, password) { 
    const access_token = async () => await getAccesstoken();
    const url = 'http://192.168.100.30:8080/api/auth/signin'; //192.168.100.30: on utilise l'adress IP dans la connection entre peripherique 
    return fetch(url, {                                       //et base de données 
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer' + access_token,  //on ajoute la bib Bearer pour récuperer le code token
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //on ajouter les variables utilisées
            usernameUtilis: loginn,
            pwdUtilis: password,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
                
            } else {
                return response.status;
            }
        })
        .catch((error) => console.error(error));
}