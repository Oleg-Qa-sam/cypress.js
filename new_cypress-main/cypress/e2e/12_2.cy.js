import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Требования к работе поля логин и пароль', function () {

  beforeEach('Начало теста', function () {
  cy.visit('/');
  })

  afterEach('Конец теста', function () {
    cy.get(result_page.close).should('be.visible');
  });  

// 12.2.1
it('Верный пароль и верный логин', function () {
    cy.get(main_page.email).type(data.login); //ввели верный логин
    cy.get(main_page.password).type(data.password); //ввели верный пароль
    cy.get(main_page.login_button).click();//нажать войти
    cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка текста после авторизацции
  })

  // 12.2.2
  it('Восстановление пароля', function () {
   cy.get(main_page.fogot_pass_btn).click();//нажать забыли пароль
   cy.get(recovery_password_page.email).type('german@dolnikov123.ru'); //ввели любой логин
   cy.get(recovery_password_page.send_button).click();//нажать отправить код
   cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверка текста
  })

  // 12,2,3
  it('НЕверный пароль и верный логин', function () {
   cy.get(main_page.email).type(data.login); //ввели верный логин
   cy.get(main_page.password).type('iLoveqastudio123'); //ввели неверный пароль
   cy.get(main_page.login_button).click();//нажать войти
   cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка текста после авторизацции
  })

  // 12,2,4
  it('НЕверный логин и верный пароль', function () {
   cy.get(main_page.email).type('german@dolnikov123.ru'); //ввели неверный логин
   cy.get(main_page.password).type(data.password); //ввели верный пароль
   cy.get(main_page.login_button).click();//нажать войти
   cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка текста после авторизацции
  })

  // 12,2,5
  it('Пароль без @', function () {
   cy.get(main_page.email).type('germandolnikov.ru'); //ввели логин без "@"
   cy.get(main_page.password).type(data.password); //ввели верный пароль
   cy.get(main_page.login_button).click();//нажать войти
   cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверка текста после авторизацции
  })
  
  // 12,2,6
  it('Логин с большими буквами', function () {
    cy.visit('/');
    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //ввели логин
   cy.get(main_page.password).type(data.password); //ввели верный пароль
   cy.get(main_page.login_button).click();//нажать войти
   cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка текста после авторизацции
  })
})

describe('Смена аватара', function () {
  //12.2.
    it('Смена аватара', function () {
        cy.visit('https://pokemonbattle.ru/'); //зашли на сайт
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); //ввели логин
        cy.get('#password').type('USER_PASSWORD'); //ввели верный пароль
        cy.get('.auth__button').click();//нажать войти
        cy.wait(2000);// !! не добавил, посмотрел для проверки после как сделал
        cy.get('.header__id-text_type_profile').click({ force: true });//заходим в профиль !! добавил click({ force: true })
        cy.get('[href="/shop"] > .history-info').click({ force: true });//заходим в магазин !! добавил click({ force: true }
        cy.get('.available > button').first().click({ force: true }); //посмотрел, не получалось купить рандомно 
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111111111111111'); //ввели карту
        cy.get(':nth-child(1) > .pay_base-input-v2').type('12/25'); //ввели срок деуйствия
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); //ввели cvv
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('ivan inav'); //ввели Имя фамилию владльца
        cy.get('.pay-btn').click();// нажимаем оплатить
        cy.wait(2000);// добавил ожидание, так как в реальном мире есть задержка
        cy.get('#cardnumber').type('56456');// код из смс
        cy.get('.payment__submit-button').click();// нажать для оплаты
        cy.wait(2000);// добавил ожидание, так как в реальном мире есть задержка
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // проверка текста после оплаты
        cy.get('.payment__adv').click();// нажать чтобы венуться
    })
 
})
// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
