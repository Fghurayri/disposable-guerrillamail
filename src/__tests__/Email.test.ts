import { Email } from '../index';

test(`should be able to create a new random email address`, async () => {
  const tempEmail = new Email();
  const randomEmailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  );
  const address = await tempEmail.createEmailAccount();
  expect(address).toMatch(randomEmailRegex);
});

test(`should be able to create a new custom email address`, async () => {
  const tempEmail = new Email();
  const customEmailRegex = new RegExp(
    /^Faisal@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  );
  const address = await tempEmail.createEmailAccount(`Faisal`);
  expect(address).toMatch(customEmailRegex);
});

test(`should be able to get latest inbox`, async () => {
  const tempEmail = new Email();
  await tempEmail.createEmailAccount();
  const emails = await tempEmail.getLatestEmails();
  expect(emails.length).toBeGreaterThanOrEqual(1);
});

test(`should be able to get a specific email`, async () => {
  const tempEmail = new Email();
  await tempEmail.createEmailAccount();
  const email = await tempEmail.getEmailDetails(`1`);
  expect(email.mail_id).toBe(1);
});

test(`should throw error if trying to get emails without token`, async () => {
  const tempEmail = new Email();
  expect(tempEmail.getLatestEmails()).rejects.toThrow(
    'No token for this email. Maybe you need to call createEmailAccount() to create the account first?',
  );
});

test(`should throw error if trying to get an email without token`, async () => {
  const tempEmail = new Email();
  expect(tempEmail.getEmailDetails(`1`)).rejects.toThrow(
    'No token for this email. Maybe you need to call createEmailAccount() to create the account first?',
  );
});

test(`should throw error if trying to get an email without providing an email Id`, async () => {
  const tempEmail = new Email();
  await tempEmail.createEmailAccount();
  expect(tempEmail.getEmailDetails()).rejects.toThrow('No email ID is provided.');
});
