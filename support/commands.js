import { faker } from '@faker-js/faker'; //importação do Faker para usar no comando registerUser()

//Comando personalizado para digitar nome no input adequado
Cypress.Commands.add('typeFirstName', (firstName)=> {
    cy.get('input[id="customer.firstName"]').type(firstName);
});

//Comando personalizado para digitar sobrenome no input adequado
Cypress.Commands.add('typeLastName', (lastName)=>{
    cy.get('input[id="customer.lastName"]').type(lastName);
});

//Comando personalizado para digitar endereço no input adequado
Cypress.Commands.add('typeAddressStreet', (addressStreet)=>{
    cy.get('input[id="customer.address.street"]').type(addressStreet);
});

//Comando personalizado para digitar cidade no input adequado
Cypress.Commands.add('typeAddressCity', (addressCity)=>{
    cy.get('input[id="customer.address.city"]').type(addressCity);
});

//Comando personalizado para digitar estado no input adequado
Cypress.Commands.add('typeAddressState', (addressState)=>{
    cy.get('input[id="customer.address.state"]').type(addressState);
});

//Comando personalizado para digitar CEP no input adequado
Cypress.Commands.add('typeAddressZipCode', (addressZipCode)=>{
    cy.get('input[id="customer.address.zipCode"]').type(addressZipCode);
});

//Comando personalizado para digitar numero de telefone no input adequado
Cypress.Commands.add('typePhoneNumber', (phoneNumber)=>{
    cy.get('input[id="customer.phoneNumber"]').type(phoneNumber);
});

//Comando personalizado para digitar SSN no input adequado
Cypress.Commands.add('typeSsn', (ssn)=>{
    cy.get('input[id="customer.ssn"]').type(ssn);
});

//Comando personalizado para digitar username no input adequado
Cypress.Commands.add('typeUsername', (username)=>{
    cy.get('input[id="customer.username"]').type(username);
});

//Comando personalizado para digitar senha no input adequado
Cypress.Commands.add('typePassword', (password)=>{
    cy.get('input[id="customer.password"]').type(password);
});

//Comando personalizado para repetir senha no input adequado
Cypress.Commands.add('typeRepeatedPassword', (repeatedPassword)=>{
    cy.get('input[id="repeatedPassword"]').type(repeatedPassword);
});

//Comando personalizado para clicar no botão de Registro
Cypress.Commands.add('clickRegister', ()=> {
    cy.get('input[value=Register]').click();
});

//Comando personalizado para fazer login com usuário já cadastrado
Cypress.Commands.add('typeRegisteredUser', (registeredUser)=>{
    cy.get('input[name="username"]').type(registeredUser);
});

//Comando personalizado para fazer login com senha de usuário já cadastrado
Cypress.Commands.add('typeRegisteredUserPassword', (repeatedPassword)=>{
    cy.get('input[name="password"]').type(repeatedPassword);
});

//Comando personalizado clicar no botão de Login
Cypress.Commands.add('clickLogin', ()=> {
    cy.get('input[wfd-id=id2]').click();
});

//Comando personalizado para gerar e validar registro de usuário já cadastrado
Cypress.Commands.add('registerUser', ()=> {
       
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.person.zodiacSign()+faker.person.jobArea();
    const registeredUser = username;
    const password = faker.internet.password();
    var repeatedPassword = password;

    cy.typeFirstName(firstName);
    cy.typeLastName(lastName);
    cy.typeAddressStreet('Rua Seila');
    cy.typeAddressCity('Anápolis');
    cy.typeAddressState('Goiás');
    cy.typeAddressZipCode('75094720');
    cy.typePhoneNumber('900000000');
    cy.typeSsn("0123456");
    cy.typeUsername(registeredUser);
    cy.typePassword(password);
    cy.typeRepeatedPassword(repeatedPassword);
    cy.clickRegister();

    //Validação do registro com sucesso
    cy.get('p').contains('Your account was created successfully. You are now logged in.');
 
    //Logout da conta recém criada
    cy.get('a').contains('Log Out').click();

    //Click no botão de Registro
    cy.get('a').contains('Register').click();

    cy.typeFirstName(firstName);
    cy.typeLastName(lastName);
    cy.typeAddressStreet('Rua Seila');
    cy.typeAddressCity('Anápolis');
    cy.typeAddressState('Goiás');
    cy.typeAddressZipCode('75094720');
    cy.typePhoneNumber('900000000');
    cy.typeSsn("0123456");
    cy.typeUsername(registeredUser);
    cy.typePassword(password);
    cy.typeRepeatedPassword(repeatedPassword);
    cy.clickRegister();    

});

