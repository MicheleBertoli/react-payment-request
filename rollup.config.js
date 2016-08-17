/* eslint-disable import/no-extraneous-dependencies */

import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

export default {
  moduleName: 'ReactPaymentRequest',
  entry: 'src/index.js',
  dest: 'dist/react-payment-request.js',
  format: 'umd',
  plugins: [
    buble(),
    commonjs(),
    nodeResolve(),
    process.env.BUILD === 'production' ? uglify() : () => {},
  ],
  external: ['react'],
}
