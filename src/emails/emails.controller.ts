import { Body, Controller, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailDTO } from './dto/email.dto';
import { Public } from 'src/auth/decorators/public.decator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('EMAILS')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) { }

  @Public()
  @Post('send')
  @ApiOperation({
    summary: 'Send email',
    description: 'Send email to user',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        subject: { type: 'string', example: 'OTP verification' },
        message: { type: 'string', example: 'Your OTP is 1234' },
      }
    }
  })
  async sendEmail(@Body() emailObject: EmailDTO) {
    return this.emailsService.sendEmail(emailObject);
  }
}
