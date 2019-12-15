import axios from 'axios';

type emailMessage = {
  mail_from: string;
  mail_timestamp: number;
  mail_read: number;
  mail_date: string;
  reply_to: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_id: number;
  att: number;
  content_type: string;
  mail_recipient: string;
  source_id: number;
  source_mail_id: number;
  mail_body: string;
  size: number;
};

export class Email {
  static BASE_URL = `http://api.guerrillamail.com/ajax.php`;

  private emailAddress = '';
  private token = '';

  /**
   * Initializes a new random email address and returns the address back.
   * The random address can be overriden if a custom email address is provided.
   * createEmailAccount() -> 'dbyziheu@guerrillamailblock.com'
   * createEmailAccount('Faisal') -> 'Faisal@guerrillamailblock.com'
   */
  async createEmailAccount(customEmailAddress = '') {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${Email.BASE_URL}?f=get_email_address`,
      });

      const { sid_token: emailToken, email_addr: generatedEmailAddress } = data;
      this.token = emailToken;
      this.emailAddress = generatedEmailAddress;

      if (customEmailAddress) {
        const { data } = await axios({
          method: 'GET',
          url: `${Email.BASE_URL}?f=set_email_user&email_user=${customEmailAddress}&sid_token=${this.token}`,
        });

        const { email_addr: createdCustomEmailAddress } = data;
        this.emailAddress = createdCustomEmailAddress;
      }

      return this.emailAddress as string;
    } catch (error) {
      throw new Error(`Error while creating a new email account: ${error}`);
    }
  }

  /**
   * Gets a maximum of 10 emails from the specified offset.
   * Offset of 0 will fetch a list of the first 10 emails, offset of 10 will fetch a list of the next 10, and so on.
   */
  async getLatestEmails(offset = 0) {
    if (!this.token)
      throw new Error(
        'No token for this email. Maybe you need to call createEmailAccount() to create the account first?',
      );

    try {
      const { data } = await axios({
        method: 'GET',
        url: `${Email.BASE_URL}?f=get_email_list&offset=${offset}&sid_token=${this.token}`,
      });
      return data.list as [emailMessage];
    } catch (error) {
      throw new Error(`Error while refreshingInbox: ${error}`);
    }
  }

  /**
   * Gets a detailed information about a single email using the emailId.
   */
  async getEmailDetails(emailId = '') {
    if (!this.token)
      throw new Error(
        'No token for this email. Maybe you need to call createEmailAccount() to create the account first?',
      );
    if (!emailId) throw new Error('No email ID is provided.');

    try {
      const { data } = await axios({
        method: 'GET',
        url: `${Email.BASE_URL}?f=fetch_email&email_id=${emailId}&sid_token=${this.token}`,
      });
      return data as emailMessage;
    } catch (error) {
      throw new Error(`Error while getEmail: ${error}`);
    }
  }
}
