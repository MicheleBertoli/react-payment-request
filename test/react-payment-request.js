const assert = require('assert')
const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')

const ReactPaymentRequest = require('../src')

const createPaymentRequest = method => {
  global.window = {
    PaymentRequest: function PaymentRequest() {
      return {
        addEventListener: () => {},
        show: () => Promise[method](),
      }
    },
  }
}

describe('React Payment Request', () => {
  let props

  beforeEach(() => {
    props = {
      methodData: {},
      details: {},
      options: {},
      onSuccess: sinon.spy(),
      onError: sinon.spy(),
    }
  })

  describe('Supported', () => {
    afterEach(() => {
      delete global.window.PaymentRequest
    })

    it('fires onSuccess', () => {
      createPaymentRequest('resolve')
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      return wrapper.instance().handleClick().then(() => {
        assert(props.onSuccess.called)
      })
    })

    it('fires onError', () => {
      createPaymentRequest('reject')
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      return wrapper.instance().handleClick().then(() => {
        assert(props.onError.called)
      })
    })
  })

  describe('Not supported', () => {
    it('returns null', () => {
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      assert.equal(wrapper.type(), null)
    })
  })
})
