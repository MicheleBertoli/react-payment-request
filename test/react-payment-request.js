const assert = require('assert')
const sinon = require('sinon')
const React = require('react')
const Enzyme = require('enzyme')

const ReactPaymentRequest = require('../src')

let events

const flush = () => {
  Object.keys(events).forEach(key => {
    events[key]({ updateWith: () => {} })
  })
}

const createPaymentRequest = method => {
  events = {}

  global.window = {
    PaymentRequest: function PaymentRequest() {
      return {
        addEventListener: (event, callback) => {
          events[event] = callback
        },
        show: () => Promise[method](),
      }
    },
  }
}

describe('React Payment Request', () => {
  let props

  beforeEach(() => {
    props = {
      details: {},
      methodData: [],
      onError: sinon.spy(),
      onShippingAddressChange: sinon.spy(),
      onShippingOptionChange: sinon.spy(),
      onSuccess: sinon.spy(),
      options: {},
    }
  })

  describe('Supported', () => {
    afterEach(() => {
      delete global.window.PaymentRequest
    })

    it('fires onError', () => {
      createPaymentRequest('reject')
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      return wrapper.instance().handleClick().then(() => {
        assert(props.onError.called)
      })
    })

    it('fires onShippingAddressChange', () => {
      createPaymentRequest('reject')
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      return wrapper.instance().handleClick().then(() => {
        flush()
        assert(props.onShippingAddressChange.called)
      })
    })

    it('fires onShippingOptionChange', () => {
      createPaymentRequest('reject')
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      return wrapper.instance().handleClick().then(() => {
        flush()
        assert(props.onShippingOptionChange.called)
      })
    })

    it('fires onSuccess', () => {
      createPaymentRequest('resolve')
      const wrapper = Enzyme.shallow(<ReactPaymentRequest {...props} />)

      return wrapper.instance().handleClick().then(() => {
        assert(props.onSuccess.called)
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
