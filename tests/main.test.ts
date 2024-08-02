import { describe, it, spyOn, expect, beforeEach } from 'bun:test'
import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the action's main function
const runMock = spyOn(main, 'run')

// Mock the GitHub Actions core library
let infoMock = spyOn(core, 'info')
let getInputMock = spyOn(core, 'getInput')
let setFailedMock = spyOn(core, 'setFailed')

describe('action', () => {
  beforeEach(() => {
    infoMock.mockReset()
    getInputMock.mockReset()
    setFailedMock.mockReset()
  })

  it('Display the info message', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(input => {
      switch (input) {
        case 'name':
          return 'Jhon Doe'
        default:
          return ''
      }
    })

    await main.run()

    expect(runMock).toHaveReturned()
    expect(infoMock).toHaveBeenNthCalledWith(1, 'Hello Jhon Doe!')
  })

  it('sets a failed status', async () => {
    await main.run()

    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenNthCalledWith(1, 'Required input "name"')
  })
})
