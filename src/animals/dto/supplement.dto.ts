supplement.dto.ts
export class CreateSupplementDto {
	adminId:string;
	addedBy:string;
	supplementType: string;
   purpose:string;
   source:string;
   nutritionalValue: string;
   datesAdminstered:string[];
}