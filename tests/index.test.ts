import { describe, it, spyOn, expect } from 'bun:test'
import * as main from '../src/main'

const runMock = spyOn(main, 'run')

describe('index', () => {
  it('calls run when imported', async () => {
    require('../src/index')

    expect(runMock).toHaveBeenCalled()
  })
})
