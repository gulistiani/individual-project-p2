const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcryptjs')
const { sequelize } = require('../models');
const { queryInterface } = sequelize

beforeAll((done) => {
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => {
      const salt = bcrypt.genSaltSync(8)
      const user = {
        email: 'jupri@mail.com',
        password: bcrypt.hashSync('12345678', salt),
        firstName: 'Jupri',
        lastName: 'Supriyadi',
        mobile: '081212774747',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const users = [user]
      return queryInterface.bulkInsert('Users', users)
    })
    .then(() => done())
    .catch((err) => {
      throw err
    })
})

afterAll((done) => {
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => done())
    .catch((err) => {
      throw err
    })
})

// ------------------------------------------------------------- register/email --------------------------------------------------------
describe('POST /register/email', () => {
  it('Success register new user using valid email and password', (done) => {
    request(app)
      .post('/register/email')
      .set('Content-Type', 'application/json')
      .send({ email: 'rojali@mail.com', password: '12345678', firstName: 'Rojali', lastName: 'Kholili' })
      .then(({ body, status }) => {
        expect(status).toBe(201)
        expect(body.message).toContain('Registrasi dengan email')

        done()
      })
  })

  it('Fail register using invalid email and valid password, return error message', (done) => {
    request(app)
      .post('/register/email')
      .set('Content-Type', 'application/json')
      .send({ email: 'rojali', password: '12345678', firstName: 'Rojali', lastName: 'Kholili' })
      .then(({ body, status }) => {
        console.log('----------------------------------------------------------------------');
        console.log(body, status);
        expect(status).toBe(400)
        expect(body.error.message).toContain('Email tidak valid')

        done()
      })
  })

  it('Fail register using email that has been registered before', (done) => {
    request(app)
      .post('/register/email')
      .set('Content-Type', 'application/json')
      .send({ email: 'jupri@mail.com', password: '12345678', firstName: 'Jupri', lastName: 'Supriyadi' })
      .then(({ body, status }) => {
        console.log('----------------------------------------------------------------------');
        console.log(body, status);
        expect(status).toBe(400)
        expect(body.error.message).toContain('Email sudah terdaftar')

        done()
      })
  })
})

// ------------------------------------------------------------- register/mobile --------------------------------------------------------
describe('POST /register/mobile', () => {
  it('Success register new user using valid mobile phone and password', (done) => {
    request(app)
      .post('/register/mobile')
      .set('Content-Type', 'application/json')
      .send({ mobile: '08123456789', password: '12345678', firstName: 'Rojali', lastName: 'Kholili' })
      .then(({ body, status }) => {
        expect(status).toBe(201)
        expect(body.message).toContain('Registrasi dengan no HP')

        done()
      })
  })

  it('Fail register using invalid mobile phone and valid password, return error message', (done) => {
    request(app)
      .post('/register/mobile')
      .set('Content-Type', 'application/json')
      .send({ mobile: 'ddfdf', password: '12345678', firstName: 'Rojali', lastName: 'Kholili' })
      .then(({ body, status }) => {
        console.log('----------------------------------------------------------------------');
        console.log(body, status);
        expect(status).toBe(400)
        expect(body.error.message).toContain('No HP tidak valid')

        done()
      })
  })

  it('Fail register using mobile phone that has been registered before', (done) => {
    request(app)
      .post('/register/mobile')
      .set('Content-Type', 'application/json')
      .send({ mobile: '081212774747', password: '12345678', firstName: 'Atun', lastName: 'Suryatun' })
      .then(({ body, status }) => {
        console.log('----------------------------------------------------------------------');
        console.log(body, status);
        expect(status).toBe(400)
        expect(body.error.message).toContain('No HP sudah terdaftar')

        done()
      })
  })
})

//------------------------------------------------------------- login/email --------------------------------------------------------
describe('POST /login/email', () => {
  it('Success login using correct email and password, return access_token', (done) => {
    request(app)
      .post('/login/email')
      .set('Content-Type', 'application/json')
      .send({ email: 'jupri@mail.com', password: '12345678' })
      .then(({ body, status }) => {
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))

        done()
      })
  })

  it('Fail login using incorrect email and correct password, return error message', (done) => {
    request(app)
      .post('/login/email')
      .set('Content-Type', 'application/json')
      .send({ email: 'sdasd', password: '12345678' })
      .then(({ body, status }) => {
        expect(status).toBe(400)
        expect(body.error.message).toContain('Email not found')

        done()
      })
  })

  it('Fail login using correct email and incorrect password, return error message', (done) => {
    request(app)
      .post('/login/email')
      .set('Content-Type', 'application/json')
      .send({ email: 'jupri@mail.com', password: 'sdfsdfsdf' })
      .then(({ body, status }) => {
        expect(status).toBe(400)
        expect(body.error.message).toContain('Wrong email/password')

        done()
      })
  })
})


// ------------------------------------------------------------- login/mobile --------------------------------------------------------
describe('POST /login/mobile', () => {
  it('Success login using correct mobile and password, return access_token', (done) => {
    request(app)
      .post('/login/mobile')
      .set('Content-Type', 'application/json')
      .send({ mobile: '081212774747', password: '12345678' })
      .then(({ body, status }) => {
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))

        done()
      })
  })

  it('Fail login using incorrect mobile and correct password, return error message', (done) => {
    request(app)
      .post('/login/mobile')
      .set('Content-Type', 'application/json')
      .send({ mobile: 'sdasd', password: '12345678' })
      .then(({ body, status }) => {
        expect(status).toBe(400)
        expect(body.error.message).toContain('No Handphone not found')

        done()
      })
  })

  it('Fail login using correct mobile and incorrect password, return error message', (done) => {
    request(app)
      .post('/login/mobile')
      .set('Content-Type', 'application/json')
      .send({ mobile: '081212774747', password: 'sdfsdfsd' })
      .then(({ body, status }) => {
        expect(status).toBe(400)
        expect(body.error.message).toContain('Wrong mobile phone/password')

        done()
      })
  })
})
