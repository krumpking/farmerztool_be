import { PartialType } from "@nestjs/swagger";
import { CreateReminderDTO } from "./create-reminder.dto";

export class UpdateReminderDTO extends PartialType(CreateReminderDTO){}