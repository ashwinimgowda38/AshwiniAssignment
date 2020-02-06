import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** To store user data */
  public userData: any;
  public userMasterData: any;

  /**search value */
  public searchKeyword: '';
  public dataExist;
  constructor(private dataService: DataService) {
  }
  ngOnInit(): void {
    this.dataService.getData().subscribe(res => {
      this.userData = res.data;
      this.userMasterData = res.data;
      this.dataExist = this.userData.length > 1 ? true : false;
    });
  }

  /** To search data */
  public searchUser() {
    const data = JSON.parse(JSON.stringify(this.userMasterData));
    this.userData = data.filter(elem =>
      elem.email === this.searchKeyword
    );
    if (this.searchKeyword === '') {
      this.userData = JSON.parse(JSON.stringify(this.userMasterData));
    }
    this.dataExist = this.userData.length < 1 ? false : true;
  }
  /** on change of input value
   * To reset data if entered value is empty
   */
  public onSearchChange(e) {
    if (this.searchKeyword === '') {
      this.userData = JSON.parse(JSON.stringify(this.userMasterData));
      this.dataExist = this.userData.length < 1 ? false : true;
    }
  }
}
