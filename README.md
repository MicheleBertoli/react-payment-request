# React Payment Request

A [Payment Request](https://developers.google.com/web/fundamentals/primers/payment-request/) component for
[React.js](https://facebook.github.io/react/)

## Installation

### Npm

```bash
npm install react-payment-request --save
```

### Umd

```html
<script src="https://unpkg.com/react-payment-request/dist/react-payment-request.js"></script>
```

## Usage

```jsx
const details = {...}
const methodData = [...]
const options = {...}

const getOptionsforAddress = shippingAddress => {...}
const updateTotal = shippingOption => {...}

<ReactPaymentRequest
  details={details}
  methodData={methodData}
  onError={error => console.log('💩', error)}
  onShippingAddressChange={(request, resolve, reject) => {
    details.shippingOptions = getOptionsforAddress(request.shippingAddress)
    resolve(details)
  }}
  onShippingOptionChange={(request, resolve, reject) => {
    details.shippingOptions = updateTotal(request.shippingOption)
    resolve(details)
  }}
  onSuccess={result => result.complete('success')}
  options={options}
>
  <button>Pay</button>
</ReactPaymentRequest>
```

## API

Parameter               | Type   | Description
----------------------- | ------ | -----------
details                 | object | Required information about transaction.
methodData              | array  | Required payment method data.
onError                 | func   | Something bad happened.
onShippingAddressChange | func   | When user selects a shipping address.
onShippingOptionChange  | func   | When user selects a shipping option.
onSuccess               | func   | Process paymentResponse here.
options                 | object | Optional parameter for things like shipping, etc.


## Test

```bash
npm test
```
