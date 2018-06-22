import puppeteer from 'puppeteer'
import axios from 'axios'

const appUrlBase = 'http://localhost:3000'

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({})
  page = await browser.newPage()
})

import ListPage from './pages/ListPage'

describe('Bookish', () => {
  afterEach(() => {
    return axios.delete('http://localhost:8080/books?_cleanup=true').catch(err => err)
  })

  beforeEach(() => {
    const books = [
      {"name": "Refactoring", "id": 1, "description": "Refactoring"},
      {"name": "Domain-driven design", "id": 2, "description": "Domain-driven design"},
      {"name": "Building Micro-service", "id": 3, "description": "Building Micro-service"}
    ]

    return books.map(item => axios.post('http://localhost:8080/books', item, {headers: { 'Content-Type': 'application/json' }}))
  })

  test('Heading', async () => {
    await page.goto(`${appUrlBase}/`)
    
    const listPage = new ListPage(page)
    const heading = await listPage.getHeading()

    expect(heading).toEqual('Bookish');
  })

  test('Book List', async () => {
    await page.goto(`${appUrlBase}/`)
    
    const listPage = new ListPage(page)
    const books = await listPage.getBooks();
    
    expect(books.length).toEqual(3)
    expect(books[0]).toEqual('Refactoring')
    expect(books[1]).toEqual('Domain-driven design')
    expect(books[2]).toEqual('Building Micro-service')
  })

  test('Goto book detail page', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('a.view-detail')

    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a.view-detail')].map(el => el.getAttribute('href'))
    })

    await Promise.all([
      page.waitForNavigation({waitUntil: 'networkidle2'}),
      page.goto(`${appUrlBase}${links[0]}`)
    ])

    const url = await page.evaluate('location.href')
    expect(url).toEqual(`${appUrlBase}/books/1`)

    await page.waitForSelector('.description')
    const result = await page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
    expect(result).toEqual('Refactoring')
  })

  test('Write an review for a book', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('a.view-detail')

    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a.view-detail')].map(el => el.getAttribute('href'))
    })

    await Promise.all([
      page.waitForNavigation({waitUntil: 'networkidle2'}),
      page.goto(`${appUrlBase}${links[0]}`)
    ])

    const url = await page.evaluate('location.href')
    expect(url).toEqual(`${appUrlBase}/books/1`)

    await page.waitForSelector('.description')
    const result = await page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
    expect(result).toEqual('Refactoring')

    await page.waitForSelector('input[name="name"]')
    await page.type('input[name="name"]', 'Juntao Qiu', {delay: 20})

    await page.waitForSelector('textarea[name="content"]')
    await page.type('textarea[name="content"]', 'Excellent works!', {delay: 20})

    await page.waitForSelector('button[name="submit"]')
    await page.click('button[name="submit"]');

    await page.waitForSelector('.review')
    const reviews = await page.evaluate(() => {
      return [...document.querySelectorAll('.review')].map(el => el.innerText)
    })

    expect(reviews.length).toEqual(1)
    expect(reviews[0]).toEqual('Excellent works!');
  })

  test('Show books which name contains keyword', async () => {
    await page.goto(`${appUrlBase}/`)

    const listPage = new ListPage(page);
    await listPage.search('design');
    const books = await listPage.getBooks();
    
    expect(books.length).toEqual(1)
    expect(books[0]).toEqual('Domain-driven design')
  })

})

afterAll(() => {
  browser.close()
})