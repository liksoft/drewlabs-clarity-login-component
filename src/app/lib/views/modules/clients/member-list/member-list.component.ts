import { Component } from "@angular/core";
import { individuals, morals } from "../testing/members";
import { GridColumnType } from "@azlabsjs/ngx-clr-smart-grid";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"],
})
export class MemberListComponent {
  public individuals = individuals;
  public morals = morals;

  public individualColumns: GridColumnType[] = [
    {
      title: 'N° membre',
      label: 'member_id'
    },
    {
      title: 'Date Ouv.',
      label: 'created_at'
    },
    {
      title: 'Nom',
      label: 'by.lastname',
      transform: 'uppercase'
    },
    {
      title: 'Prénoms',
      label: 'by.firstname',
      transform: 'uppercase'
    },
    {
      title: 'Lien d\'affaires',
      label: 'businesslink.label'
    },
    {
      title: 'Type',
      label: 'memberType.label'
    },
    {
      title: 'Téléphone',
      label: 'by.address.phoneNumber',
    },
    {
      title: 'Sexe',
      label: 'by.sex.label'
    },
    {
      title: 'Civilité',
      label: 'by.civilstate.label'
    },
    {
      title: 'Statut',
      label: 'status'
    }
  ];
  public moralColumns: GridColumnType[] = [
    {
      title: 'N° membre',
      label: 'member_id'
    },
    {
      title: 'Régistre du commerce',
      label: ''
    },
    {
      title: 'Raison sociale',
      label: 'socialReason',
      transform: 'uppercase'
    },
    {
      title: 'Secteur activité',
      label: 'activitySector.label'
    },
    {
      title: 'Type',
      label: 'memberType.label'
    },
    {
      title: 'Téléphone',
      label: 'address.phoneNumber',
    },
    {
      title: 'Statut',
      label: 'status'
    }
  ];


  dgOnCreate(event: Event) {

  }

  dgOnRefresh(event: Event) {

  }
}
