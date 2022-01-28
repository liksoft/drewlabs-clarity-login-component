import { Component } from '@angular/core';
import { AuthService } from 'src/app/lib/core/auth/core';
import { RoutesMap } from 'src/app/lib/core/routes';

@Component({
  selector: 'app-adhesion-membre',
  templateUrl: './adhesion-membre.component.html',
  styleUrls: ['./adhesion-membre.component.scss']
})
export class AdhesionMembreComponent {
  public navbarRoutesMap: RoutesMap[];

  constructor(private auth: AuthService) {}

  public individuals = [
    {
      "id" : 1,
      "number" : 1,
      "opening_date" : "2018-05-15 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "id_type" : "PASSEPORT",
      "id_number" : "EB2257546",
      "id_authority" : "DGDN",
      "id_country" : "TG",
      "id_expiration" : "2025-11-12 12:45:44",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 2,
      "number" : 2,
      "opening_date" : "2018-06-04 12:45:44",
      "firstname" : 'SONATA',
      "lastname" : "PAKIONA",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22890250454",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "2002-04-10 00:00:00",
      "identification_type" : "CNI",
      "identification_number" : "345-245-0546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "",
      "common_name" : "",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "MARIE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 3,
      "number" : 3,
      "opening_date" : "2018-08-05 12:45:44",
      "firstname" : 'ANIKA',
      "lastname" : "AGBAGBE",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22898757475",
      "sex" : "F",
      "nationality" : "TG",
      "birthdate" : "1999-10-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2224546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 4,
      "number" : 4,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 5,
      "number" : 5,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 6,
      "number" : 6,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 7,
      "number" : 7,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 8,
      "number" : 8,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 9,
      "number" : 9,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 10,
      "number" : 10,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 11,
      "number" : 11,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 12,
      "number" : 12,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 13,
      "number" : 13,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
    {
      "id" : 14,
      "number" : 14,
      "opening_date" : "2022-01-10 12:45:44",
      "firstname" : 'RODRIGUE',
      "lastname" : "KOLANI",
      "business_relation" : "RÉGULIER",
      "type" : "INDIVIDUEL",
      "category" : "MEMBRE RÉGULIER",
      "phone" : "+22892146591",
      "sex" : "M",
      "nationality" : "TG",
      "birthdate" : "1988-04-10 00:00:00",
      "identification_type" : "PASSEPORT",
      "identification_number" : "EB2257546",
      "identification_authority" : "DGDN",
      "identification_country" : "TG",
      "member_status" : "ACTIF",
      "reactivation_date" : "",
      "second_lastname" : "",
      "second_firstname" : "MAGANAWE",
      "common_name" : "RODRIGO",
      "job" : "ARCHITECTE",
      "activity" : "PROFESSION LIBERALE",
      "activity_sector" : "URBANISME & CONSTRUCTION",
      "civil_state" : "CELIBATAIRE",
      "spouse_firstname" : "",
      "spouse_lastname" : "",
      "children_count" : 0,
    },
  ];
}
