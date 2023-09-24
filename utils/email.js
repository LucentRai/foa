const {convert} = require('html-to-text');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email{
	constructor(user, url){
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `Support <${process.env.EMAIL_FROM}>`;
	}

	newTransport(){
		if(process.env.NODE_ENV === 'production'){
			return;
		}

		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			}
		});
	}

	async send(template, subject){ // sends the actual email
		// Render HTML based on pug template
		const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`,
		{
			firstName: this.firstName,
			url: this.url,
			subject
		});

		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: convert(html)
		};

		await this.newTransport().sendMail(mailOptions);
	}

	async sendThanks(){
		this.send('thank', 'Thank you for signing up');
	}

	async sendPasswordReset(){
		this.send('passwordReset', 'Your password reset token (valid for 10 minutes)');
	}
}


module.exports = Email;