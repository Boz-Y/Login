//Fichier consommation API pour le SignUp
//Récuperation des données avec POST
export function SignupUser(nom, prenom, email,login, password,telephone ) { 
    const url = 'http://192.168.100.30:8080/api/auth/signupUSER';//192.168.100.30: on utilise l'adress IP dans la connection entre peripherique 
    return fetch(url, {                                       //et base de données 
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({//on ajouter les variables utilisées
            nomUtiliS: nom,
            prenomUtilis: prenom,
            emailUtilis: email,
            usernameUtilis: login,
            pwdUtilis: password,
            telUtilis: telephone,
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