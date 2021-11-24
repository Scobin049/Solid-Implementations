import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailtrapProvider implements IMailProvider {
  private transporter: Mail

  constructor(){
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'de1d5af821244a',
        pass: '4a91b9d61fd9a4'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    const { to, from ,subject, body } = message
    this.transporter.sendMail({
      to: {
        name: to.name,
        address: to.email
      },
      from: {
        name: from.name,
        address: from.email
      },
      subject: subject,
      html: body
    })
  }
}