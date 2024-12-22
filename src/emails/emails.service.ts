import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { Injectable } from '@nestjs/common';
import { dirname } from 'path';
import { ResponseDto, ResponseHandler } from 'src/common/response.dto';
import { readHTMLFile } from 'src/common/utils';
import { lEmail } from './interfaces/email.interface';
import handlebars from 'handlebars';

@Injectable()
export class EmailsService {
    async sendEmail({ email, subject, message }: lEmail): Promise<ResponseDto> {
        try {
            const appDir = dirname(require.main.path);

            readHTMLFile(
                `${appDir}/src/emails/html/email.html`,
                async (err: any, html: any) => {
                    if (err) {
                        console.log('error reading file', err);
                        return;
                    }

                    const template = handlebars.compile(html);
                    const replacements = {
                        subject: subject,
                        message: message,
                    }

                    const htmlToSend = template(replacements);

                    const connectionString =
                        'endpoint=https://farmerztoolcommsservice.unitedstates.communication.azure.com/;accesskey=8keRIH8BsaK0RqbSEuNO9PWRFlcRljH987qWBpcpjQcMvW55NwvGJQQJ99AHACULyCpB7fcQAAAAAZCSuwZw';
                    const client = new EmailClient(connectionString);

                    const emailMessage = {
                        senderAddress:
                            'DoNotReply@ecbfcf1d-9676-45a9-9a59-84b5c339b606.azurecomm.net',
                        content: {
                            subject: subject,
                            html: htmlToSend,
                        },
                        recipients: {
                            to: [{ address: email }],
                        },
                    }

                    const poller = await client.beginSend(emailMessage);

                    const status = poller.getResult();


                    if (status != null && typeof status === 'string') {
                        if (status === KnownEmailSendStatus.Succeeded) {
                            return true;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }


                }
            )

            return ResponseHandler.handleOk('Email sent successfully')
        } catch (error) {
            console.log(error);
            return ResponseHandler.handleInternalServerError("Something went wrong while sending email");
        }
    }
}
