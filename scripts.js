//const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain='; //breytti í https vegna same-origin policy

document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');
  program.init(domains);
});
/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {

  let _domain;

  function init(domains) {
    _domain = domains;
    _domain.addEventListener('submit',get);
  }

//=================================================================================
// Þetta tekur við leit
  function get(e){
    e.preventDefault();

    const form = document.getElementsByClassName('domains')[0].children[1];
    var input = form.children[0].value;

    showGif("loading.gif"); //kallar á fall sem er neðst í kóða

    if(input.trim().length > 0){ //sumir strengir eru rangir strengir
      fetchData(input);
    }
    else{
      write("Lén verður að vera strengur");
    }
  }

//=================================================================================
//sækir gögn
  function fetchData(search){
   
    fetch(`${API_URL}${search}`)
    .then((response) => {
      if(response.ok){return response.json();}
      throw new Error('villa við að sækja gögn');
    })
    .then((data) => {
      show(data.results);
    })
    .catch((error) => {
      displayError('villa við að sækja gögn');
    })
  }
//===============================================================================
  //tæmir hluti
  function empty(el){
    while(el.firstChild){
      el.removeChild(el.firstChild);
    }  
}

//================================================================================
//sýnir upplýsingar um lén
function show(data){ 
  const container = document.querySelector('div');

  empty(container);

  console.log(data);

  if(data.length === 0){
    write("Lén er ekki skráð");// Ef ekkert fannst
  }

  //for-lykja ef það kemur fleyri en eiit lén 
  //annars einfaldar þetta bara smá kóðann
  for(const item of data){
    const d = document;
    const dl = document.createElement('dl');

    // birtum lén
    const len = d.createElement('dt');
    len.appendChild(d.createTextNode("Lén"));
    dl.appendChild(len);
    const item__domain = d.createElement('dd');
    item__domain.appendChild(d.createTextNode(item.domain));
    dl.appendChild(item__domain);

    //birtum hvenær lén var skráð
    const skra = d.createElement('dt');
    skra.appendChild(d.createTextNode("skáð"));
    const item__skra = d.createElement('dd');
    var skra__date = new Date(item.registered);
    item__skra.appendChild(d.createTextNode(skra__date.toISOString().split('T')[0]));
    dl.appendChild(skra);
    dl.appendChild(item__skra);

    //birtum hvenær síðu var síðast breytt
    const breytt = d.createElement('dt');
    breytt.appendChild(d.createTextNode("Síðast breytt"));
    const item__breytt = d.createElement('dd');
    var breytt__date = new Date(item.lastChange);
    item__breytt.appendChild(d.createTextNode(breytt__date.toISOString().split('T')[0]));
    dl.appendChild(breytt);
    dl.appendChild(item__breytt);

    //birtum hvenær lén rennur út
    const expire = d.createElement('dt');
    expire.appendChild(d.createTextNode("Rennur út"));
    const item__exp = d.createElement('dd');
    var exp__date = new Date(item.expires);
    item__exp.appendChild(d.createTextNode(exp__date.toISOString().split('T')[0]));
    dl.appendChild(expire);
    dl.appendChild(item__exp);

    //birtum skráningaraðila
    const regName = d.createElement('dt');
    regName.appendChild(d.createTextNode("Skráningaraðili"));
    const item__regName = d.createElement('dd');
    item__regName.appendChild(d.createTextNode(item.registrantname));
    dl.appendChild(regName);
    dl.appendChild(item__regName);
   
    //birtum netfang
    const netfang = d.createElement('dt');
    netfang.appendChild(d.createTextNode("Netfang"));
    const item__email = d.createElement('dd');
    item__email.appendChild(d.createTextNode(item.email));
    dl.appendChild(netfang);
    dl.appendChild(item__email);
    
    //birtum heimilisfang
    const address = d.createElement('dt');
    address.appendChild(d.createTextNode("Heimilsfang"));
    const item__addr = d.createElement('dd');
    item__addr.appendChild(d.createTextNode(item.address));
    dl.appendChild(address);
    dl.appendChild(item__addr);

    //birtum Land
    const land = d.createElement('dt');
    land.appendChild(d.createTextNode("Land"));
    const item__land = d.createElement('dd');
    item__land.appendChild(d.createTextNode(item.country));
    dl.appendChild(land);
    dl.appendChild(item__land);
    
    container.appendChild(dl);
  }
  

}
//=================================================================================
function displayError(error) {
  const container = document.querySelector('.results');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(document.createTextNode(error));
}
//==================================================================================
//bara svona hjálparfall
function write(str){
  const container = document.querySelector('div');
  empty(container);
  container.appendChild(document.createTextNode(str));
}
//=================================================================================
//líka hjálparfall
function showGif(str){
  const container = document.querySelector('div');
  empty(container);

  const loading = document.createElement('div');
  loading.className = "loading";
  const gif = document.createElement('img');
  gif.src = str;

  loading.append(gif);
  container.appendChild(loading);
  loading.appendChild(document.createTextNode("leita að léni..."));

}
//====================================================================================

  



  return {
    init,
  };
})();



 