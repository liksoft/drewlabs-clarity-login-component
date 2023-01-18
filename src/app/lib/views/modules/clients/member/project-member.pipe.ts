import { Pipe, PipeTransform } from "@angular/core";
import { Member } from "../types";

@Pipe({
  name: "projectmembertype",
})
export class ProjectMemberPipe implements PipeTransform {
  transform(value: any, type: "individual" | "moral") {
    switch (type) {
      case "individual":
        return Member.safeParse({
          id: value.memberid,
          validatedAt: value.validatedAt,
          status: value.status,
          activity: value.activity,
          type: value.type,
          accountNumber: value.accountNumber,
          label: `${value.firstname}, ${value.lastname}`,
          businesslink: value.businesslink,
          address: value.address,
        }).data;
      case "moral":
        return Member.safeParse({
          id: value.memberid,
          validatedAt: value.validatedAt,
          status: value.status,
          activity: value.activity,
          type: value.type,
          accountNumber: value.accountNumber,
          label: value.label,
          businesslink: value.businesslink,
          address: value.address,
        }).data;
      default:
        throw new Error(`${type} is not a supported transform parameter!`);
    }
  }
}
