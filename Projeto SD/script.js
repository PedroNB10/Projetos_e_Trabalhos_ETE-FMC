function EnviarUbidots() {

const Http = new XMLHttpRequest();
const token = "BBFF-8kfgdNnaUqjeUlQYxSGV5wxIAUgA0y"; //Token do usuário no Ubidots
var url = "https://industrial.api.ubidots.com/api/v1.6/devices/teste-paulo-e-nogueira";//localiza em que dispositivo serão criadas as variéveis
var button_status_js = document.getElementById("button_status_js").value; //valor do botão digitado na página
var sensor_status_js = document.getElementById("sensor_status_js").value;//valor do sensor de umidade digitado na página
var dado = '{"button_status_ubts":' + button_status_js + ',' + '"sensor_status_ubdts":' + sensor_status_js + '}'; // [VARIAVEIS CRIADAS NO UBIDIDOTS PELO JS] ==> entre aspas duplas = chave, entre os '+' = valor(armazenado na variável) 
console.log(dado); //mostra a variavel dado no console 
document.getElementById("resposta_de_envio").innerHTML = ""; //Limpa o status que está na página, insere o " ", ou seja sem dados

    if(button_status_js!=""|| sensor_status_js!="")//Só envia caso estiver algum valor for digitado nos campos de entrada do botão e do sensor de umidade
    {
            Http.open("POST", url);//Para enviar usa-se o POST do HTTP
            Http.setRequestHeader("X-Auth-Token", token);//Autenticação no cabeçalho (header)
            Http.setRequestHeader("Content-Type", "application/json");//Tipo de conteúdo enviado é JSON!
            Http.send(dado) //Envia a requisição POST
            Http.onreadystatechange = function() {//Verifica o status do envio

                if(Http.readyState == XMLHttpRequest.DONE)//Está pronto para fazer a requisição, permite fazer requisição no javascript
                {
                      console.log(Http.responseText);//Mostra no console a resposta
                      var resposta_botao = Http.responseText;//variavel onde armazena o estado da requisição
                      

                    if(resposta_botao.includes("201")&&((sensor_status_js>=0&&sensor_status_js<=100)&&(button_status_js==0||button_status_js==1)))//Resposta tem o texto 201? Sim: Ubidots aceitou dado
                    {
                      document.getElementById("resposta_de_envio").innerHTML = "Enviado com sucesso!";//The innerHTML property sets or returns the HTML content (inner HTML) of an element.

                    }
                    else
                    {

                      document.getElementById("resposta_de_envio").innerHTML = "Erro ao enviar!";
                    }
              }

            }
    }

    else// Os campos de entrada estão vazios
    {
        alert("Certifique-se que você preencheu os campos dos valores desejados para envio!")//mostrao o alerta caso não tenha sido digitado valor na página
    }
}

function ReceberUbidots_aquecedor() {

const Http = new XMLHttpRequest();
const token = "BBFF-8kfgdNnaUqjeUlQYxSGV5wxIAUgA0y";//Token do usuário no Ubidots
var url1 = "https://industrial.api.ubidots.com/api/v1.6/devices/teste-paulo-e-nogueira/status_aquecedor/lv" ;
//document.getElementById("resposta_de_recepcao1").innerHTML = "";//Limpa o status que está na página
//document.getElementById("estado_aquecedor").innerHTML = "";//Limpa o status que está na página

  dado1="";
  Http.open("GET", url1);//Para receber usa-se o GET do HTTP
  Http.setRequestHeader("X-Auth-Token", token);//Autenticação no cabeçalho (header)
  Http.setRequestHeader("Content-Type", "application/json");//Tipo de conteúdo enviado é JSON!
  Http.send(dado1)  //Envia a requisição post
  Http.onreadystatechange = function() {//Verifica o status do envio
  
  	if(Http.readyState == XMLHttpRequest.DONE)//Pronto para receber informação?
  	{
    		console.log(Http.responseText);               //Mostra no console a resposta
    		var resposta_de_recepcao1 = Http.responseText;//variavel onde armazena o estado de recepção


      if(resposta_de_recepcao1==100.0||resposta_de_recepcao1>0){
        document.getElementById("estado_aquecedor").innerHTML = "Estado do aquecedor (ligado) em %: ";
        document.getElementById("resposta_de_recepcao1").innerHTML = Http.responseText;
      }

      else {
        document.getElementById("estado_aquecedor").innerHTML = "Estado do aquecedor (desligado) em %: ";
        document.getElementById("resposta_de_recepcao1").innerHTML = Http.responseText;

      }
    }
  }

}

function ReceberUbidots_led() {

const Http = new XMLHttpRequest();
const token = "BBFF-8kfgdNnaUqjeUlQYxSGV5wxIAUgA0y";    //Token do usuário no Ubidots
var url2 = "https://industrial.api.ubidots.com/api/v1.6/devices/teste-paulo-e-nogueira/status_led/lv" ;//localiza qual a variavel que será lida do ubidots
//document.getElementById("estado_led").innerHTML = "";   //Limpa o status que está na página
//document.getElementById("resposta_de_recepcao2").innerHTML = "";   //Limpa o status que está na página
  dado2="";
  Http.open("GET", url2);                             //Para enviar usa-se o POST do HTTP
  Http.setRequestHeader("X-Auth-Token", token);       //Autenticação no cabeçalho (header)
  Http.setRequestHeader("Content-Type", "application/json");  //Tipo de conteúdo enviado é JSON!
  Http.send(dado2)  //Envia a requisição post
  Http.onreadystatechange = function() {              //Verifica o status do envio
  
      if(Http.readyState == XMLHttpRequest.DONE)       //Pronto?
      {
            console.log(Http.responseText);               //Mostra no console a resposta
            var resposta_de_recepcao2 = Http.responseText;
            
            document.getElementById("estado_led").innerHTML = "Enviado com sucesso!";
            document.getElementById("resposta_de_recepcao2").innerHTML = Http.responseText;

            if(resposta_de_recepcao2==1){
            document.getElementById("estado_led").innerHTML = "Estado do Led (ligado): ";
            document.getElementById("resposta_de_recepcao2").innerHTML = Http.responseText;
            }
          else if(resposta_de_recepcao2==0) {
            document.getElementById("estado_led").innerHTML = "Estado do Led (desligado): ";
            document.getElementById("resposta_de_recepcao2").innerHTML = Http.responseText;
            }

          else{
            document.getElementById("estado_led").innerHTML = "Estado do Led (indefinido): ";
            document.getElementById("resposta_de_recepcao2").innerHTML = Http.responseText;
            }
      }
  }

}
