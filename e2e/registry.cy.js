//Faker: ferramenta de randomização de nomes para criar múltiplos usuários de maneira dinâmica
import { faker } from '@faker-js/faker'; 
describe('Registry', () => {

  //Função executada sempre antes de cada caso de teste
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  });

  //CASO DE TESTE 1: Cria registro de novo usuário e valida operação
  it('Registrar usuario dinâmicamente de maneira correta', () => {
    
    //Criação de constantes e variáveis para randomização utilizando Faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.person.zodiacSign()+faker.person.jobArea();
    const password = faker.internet.password();
    var repeatedPassword = password;

    //Chamando comandos personalizados do arquivo commands.js
    cy.typeFirstName(firstName);
    cy.typeLastName(lastName);
    cy.typeAddressStreet('Rua Seila');
    cy.typeAddressCity('Anápolis');
    cy.typeAddressState('Goiás');
    cy.typeAddressZipCode('75094720');
    cy.typePhoneNumber('900000000');
    cy.typeSsn("0123456");
    cy.typeUsername(username);
    cy.typePassword(password);
    cy.typeRepeatedPassword(repeatedPassword);
    cy.clickRegister();
 
    //Validação do registro com sucesso
    cy.get('p').contains('Your account was created successfully. You are now logged in.');
        
  });

  //CASO DE TESTE 2: Validação de registro de usuário já cadastrado anteriormente
  it('registro de usuário já cadastrado', ()=> {
    
    //Comando personalizado para gerar registro
    cy.registerUser();

    //Validação de registro de usuário já cadastrado (erro esperado)
    cy.get('span[id="customer.username.errors"]').contains('This username already exists').should('be.visible');
  });


  //CASO DE TESTE 3: Cria registro de usuário com senhas que não correspondem e valida a operação
  it('registrar usuario com senhas diferentes', ()=>{
    
    //Criação de constantes e variáveis para randomização utilizando Faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.person.zodiacSign()+faker.person.jobArea();
    const password = faker.internet.password();
    var repeatedPassword = 'teste123';

    //Chamando comandos personalizados do arquivo commands.js
    cy.typeFirstName(firstName);
    cy.typeLastName(lastName);
    cy.typeAddressStreet('Rua Seila');
    cy.typeAddressCity('Anápolis');
    cy.typeAddressState('Goiás');
    cy.typeAddressZipCode('75094720');
    cy.typePhoneNumber('900000000');
    cy.typeSsn("0123456");
    cy.typeUsername(username);
    cy.typePassword(password);
    cy.typeRepeatedPassword(repeatedPassword);
    cy.clickRegister();

    //Validação do erro esperado pelo ID
    cy.get('span[id="repeatedPassword.errors"]').contains('Passwords did not match.').should('be.visible');
  });

  //CASO DE TESTE 4: Cria registro de usuário sem username e valida operação
  it('registrar usuário sem username', ()=> {

    //Criação de constantes e variáveis para randomização utilizando Faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = faker.internet.password();
    var repeatedPassword = password;
    
    //Chamando comandos personalizados do arquivo commands.js
    cy.typeFirstName(firstName);
    cy.typeLastName(lastName);
    cy.typeAddressStreet('Rua Seila');
    cy.typeAddressCity('Anápolis');
    cy.typeAddressState('Goiás');
    cy.typeAddressZipCode('75094720');
    cy.typePhoneNumber('900000000');
    cy.typeSsn("0123456");
    cy.typePassword(password);
    cy.typeRepeatedPassword(repeatedPassword);
    cy.clickRegister();

    //Validação do erro esperado pelo ID
    cy.get('span[id="customer.username.errors"]').contains('Username is required.').should('be.visible');
  });

  //CASO DE TESTE 5: Registro e Login de novo usuário
  it.only('registro e login de usuário', ()=> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.person.zodiacSign();
    const registeredUser = username;
    const password = faker.internet.password();
    var repeatedPassword = password;

    //Chamando comandos personalizados do arquivo commands.js
    cy.typeFirstName(firstName);
    cy.typeLastName(lastName);
    cy.typeAddressStreet('Rua Seila');
    cy.typeAddressCity('Anápolis');
    cy.typeAddressState('Goiás');
    cy.typeAddressZipCode('75094720');
    cy.typePhoneNumber('900000000');
    cy.typeSsn("0123456");
    cy.typeUsername(username);
    cy.typePassword(password);
    cy.typeRepeatedPassword(repeatedPassword);
    cy.clickRegister();
 
    //Validação do registro com sucesso
    cy.get('p').contains('Your account was created successfully. You are now logged in.');
 
    //Logout da conta recém criada
    cy.get('a').contains('Log Out').click();
    
    //Login com o mesmo usuário utilizando comandos personalizados
    cy.typeRegisteredUser(registeredUser)
    cy.typeRegisteredUserPassword(repeatedPassword)
    cy.clickLogin();
    
    //Validação de login do usuário cadastrado
    cy.get('H1').contains('Accounts Overview');
    
  });


})


