import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { EmailInfo } from './email-info';

interface EmailOptions {
    to: string,
    subject: string,
    html: string
}

@Injectable()
export class EmailService {
    
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EmailInfo.user, 
                pass: EmailInfo.pass 
            }
        });
    }

    async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
        const baseUrl = 'http://localhost:3000'; // todo:: config

        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
            가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
            <form action="${url}" method="POST">
              <button>가입확인</button>
            </form>
            `
        }
        return await this.transporter.sendMail(mailOptions);
    }
}
