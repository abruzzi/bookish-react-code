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
import DetailPage from './pages/DetailPage'

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

    const detailPage = new DetailPage(page)
    const url = await detailPage.getUrl()
    expect(url).toEqual(`${appUrlBase}/books/1`)

    const desc = await detailPage.getDescription()
    expect(desc).toEqual('Refactoring')
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

    const review = {
      name: 'Juntao Qiu',
      content: 'Excellent works!'
    }

    const detailPage = new DetailPage(page)
    await detailPage.addReview(review)

    const result = await detailPage.getReview(0)
    expect(result).toEqual('Excellent works!');
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