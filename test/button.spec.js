import React from 'react'
import chai from 'chai'
import spies from 'chai-spies'
import { jsdom } from 'jsdom'
import TestUtils from 'react-addons-test-utils'
import Button from '../Button'

chai.use(spies)

const { spy, expect } = chai

global.document = jsdom('')
global.window = document.defaultView

describe('Button', () => {
    it('render with text', () => {
        const text = 'text'
        const renderer = TestUtils.createRenderer()
        renderer.render(<Button text={text} />)
        const button = renderer.getRenderOutput()

        expect(button.type).to.equal('button')
        expect(button.props.children).to.equal(text)
    })

    it('fires onClick', () => {
        const onClick = spy()
        const tree = TestUtils.renderIntoDocument(<Button onClick={onClick} />)
        const button = TestUtils.findRenderedDOMComponentWithTag(
            tree,
            'button'
        )
        TestUtils.Simulate.click(button)
        expect(onClick).to.be.called()
    })
})