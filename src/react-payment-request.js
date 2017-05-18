const React = require('react')
const PropTypes = require('prop-types')

const createPaymentRequest = ({ methodData, details, options }) =>
  new window.PaymentRequest(methodData, details, options)

const addEventListener = (request, event, callback) => {
  request.addEventListener(event, e => {
    const promise = new Promise((resolve, reject) => callback(request, resolve, reject))
    e.updateWith(promise)
  })
}

class ReactPaymentRequest extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort()
    }
  }

  handleClick() {
    this.request = createPaymentRequest(this.props)

    addEventListener(this.request, 'shippingaddresschange', this.props.onShippingAddressChange)
    addEventListener(this.request, 'shippingoptionchange', this.props.onShippingOptionChange)

    return this.request.show()
      .then(paymentResponse => this.props.onSuccess(paymentResponse))
      .catch(err => this.props.onError(err))
  }

  render() {
    if (!window.PaymentRequest) {
      return null
    }

    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }

}

ReactPaymentRequest.propTypes = {
  children: PropTypes.any,
  details: PropTypes.object,
  methodData: PropTypes.array,
  onError: PropTypes.func,
  onShippingAddressChange: PropTypes.func,
  onShippingOptionChange: PropTypes.func,
  onSuccess: PropTypes.func,
  options: PropTypes.object,
}

module.exports = ReactPaymentRequest
