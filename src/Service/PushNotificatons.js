import { messaging } from "../firebaseConfig";
import { setUser } from "./FireStore";

//requisicao de permissao - permissao de enviar notificao ao usuario
export const requestPermision = async () => {
  try {
    //pede permissao ao usuarios
    //const ms = firebase.messaging();
    const ms = messaging;

    const permission = await Notification.requestPermission();

    try {
      // Solicite permissão para enviar notificações push
      if (permission === "granted") {
        const token = await ms.getToken();

        // Envie o token de registro para o seu servidor
        console.log("Token de registro do serviço de mensagens: ", token);
        //enviar token ao servidor
        await setUser({ gitHubUser: "gabrielmotroni-prog", token: token });

        // Ouça mensagens recebidas pelo serviço de mensagens quando tela estiver aberta
        ms.onMessage((payload) => {
          console.log("Mensagem recebida: ", payload);
          // Trate a mensagem recebida aqui
        });
      } else {
        // Permissão negada ou ignorada
        console.log("Permissão para enviar notificações push não concedida.");
      }
    } catch (error) {
      console.log(
        "Erro ao solicitar permissão para enviar notificações push: ",
        error
      );
    }

    //   // Solicite permissão para enviar notificações push
    //   await Notification.requestPermission()
    //     .then((permission) => {
    //       if (permission === "granted") {
    //         // Permissão concedida
    //         // Obtenha o token de registro do serviço de mensagens
    //         ms.getToken()
    //           .then((token) => {
    //             // Envie o token de registro para o seu servidor
    //             console.log("Token de registro do serviço de mensagens: ", token);
    //           })
    //           .catch((error) => {
    //             console.log(
    //               "Erro ao obter o token de registro do serviço de mensagens: ",
    //               error
    //             );
    //           });

    //         // Ouça mensagens recebidas pelo serviço de mensagens quando tela estiver aberta
    //         ms.onMessage((payload) => {
    //           console.log("Mensagem recebida: ", payload);
    //           // Trate a mensagem recebida aqui
    //         });
    //       } else {
    //         // Permissão negada ou ignorada
    //         console.log("Permissão para enviar notificações push não concedida.");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(
    //         "Erro ao solicitar permissão para enviar notificações push: ",
    //         error
    //       );
    //     });
    // } catch (error) {
    //   Error ao tentar obter permissao notificação;
    // }
  } catch (error) {
    console.log("Error ao tentar obter permissao notificação", error);
  }
};
