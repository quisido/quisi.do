import { App } from 'aws-cdk-lib';
import StripeEndpoint from './constructs/stripe-endpoint.js';

const quisido: App = new App();

// https://stripe.api.quisi.do/invoice-paid
// POST /webhooks invoice.paid
new StripeEndpoint(quisido, 'StripeEndpoint');

quisido.synth();
