import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentServiceService } from '../../../../services/tournament/tournament-service.service';
import { CommonModule } from '@angular/common';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-list-tournaments',
  imports: [
    CommonModule,
    CardMainComponent,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule
  ],
  templateUrl: './list-tournaments.component.html',
  styleUrl: './list-tournaments.component.scss',
})
export class ListTournamentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'game', 'plataform', 'maxTeams', 'startDate', 'status'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tournamentService: TournamentServiceService) {}

  ngOnInit() {
    this.listAllTournaments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listAllTournaments() {
    this.tournamentService.getAllTournaments().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.items;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Erro ao buscar torneios', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
