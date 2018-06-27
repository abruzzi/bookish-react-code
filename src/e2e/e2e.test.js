import puppeteer from 'puppeteer'
import axios from 'axios'

import { APP_BASE_URL } from './constants'

import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'

let browser

beforeAll(async () => {
  browser = await puppeteer.launch({})
})

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
    const listPage = new ListPage(browser)
    await listPage.initialize()
    const heading = await listPage.getHeading()
    expect(heading).toEqual('Bookish');
  })

  test('Book List', async () => {
    const listPage = new ListPage(browser)
    await listPage.initialize()
    const books = await listPage.getBooks();
    
    expect(books.length).toEqual(3)
    expect(books[0]).toEqual('Refactoring')
    expect(books[1]).toEqual('Domain-driven design')
    expect(books[2]).toEqual('Building Micro-service')
  })

  test('Goto book detail page', async () => {
    const listPage = new ListPage(browser)
    await listPage.initialize()
    await listPage.gotoDetail(0)

    const detailPage = new DetailPage(listPage.getPage())
    const url = await detailPage.getUrl()
    expect(url).toEqual(`${APP_BASE_URL}/books/1`)

    const desc = await detailPage.getDescription()
    expect(desc).toEqual('Refactoring')
  })

  test('Write an review for a book', async () => {
    const listPage = new ListPage(browser)
    await listPage.initialize()
    await listPage.gotoDetail(0)

    const review = {
      name: 'Juntao Qiu',
      content: 'Excellent works!'
    }

    const detailPage = new DetailPage(listPage.getPage())
    await detailPage.addReview(review)

    const result = await detailPage.getReview(0)
    expect(result).toEqual('Excellent works!');
  })

  test('Show books which name contains keyword', async () => {
    const listPage = new ListPage(browser)
    await listPage.initialize()
    
    await listPage.search('design');
    const books = await listPage.getBooks();
    
    expect(books.length).toEqual(1)
    expect(books[0]).toEqual('Domain-driven design')
  })

})

afterAll(() => {
  browser.close()
})