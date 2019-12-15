# Disposable Email API Powered by Guerrillamail using TypeScript

A simple wrapper on top of Guerrillamail REST API using TypeScript, Promises, and Axios!

It should empower your team (development/QA) to cover E2E scenarios in more depth.

Check the Guerrillamail docs for more information [here](https://www.guerrillamail.com/GuerrillaMailAPI.html)

## How to install this module

```sh
npm i --save-dev disposable-guerrillamail
```

## Example

```js
import { Email } from 'disposable-guerrillamail';

(async () => {
  // Initiate a new email instance.
  const tempEmail = new Email();

  // Get a random email address and let the lib handle the token stuff for you.
  const address = await tempEmail.createEmailAccount(); // 'dbyziheu@guerrillamailblock.com'

  // You can specify a specific email to add more robustness to your tests!
  // const address = await tempEmail.createEmailAccount(`Faisal`); // 'Faisal@guerrillamailblock.com'

  // The initiated email is ready to receive messages...
  .
  .
  .

  // Check your inbox anytime.
  const emails = tempEmail.getLatestEmails(); // [emails]

  // Check details of a certain email if you know its id.
  const email = tempEmail.getEmailDetails('1'); // email

  .
  .
  .
  // Assert, manipulate and scrape the received email for whatever you need!
})();
```

### How to run locally

#### Development

```sh
git clone git@github.com:Fghurayri/disposable-guerrillamail.git
cd disposable-guerrillamail
npm i
npm run dev
```

#### Testing

```sh
npm test
```
