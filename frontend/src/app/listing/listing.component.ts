import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {PaginatedResult, Place} from "../types";
import {ResultListingService} from "../services/result-listing.service";
import 'rxjs/add/operator/switchMap';
export abstract class ListingComponent {

  currentPage: PaginatedResult<Place>;
  accumulatedResult: Place[] = [];

  constructor(private route: ActivatedRoute, private service: ResultListingService<Place>) {
    this.currentPage = {} as PaginatedResult<Place>;
    this.currentPage.results = [];
    console.log("init")
  }

  ngOnInit(): void {
    console.log("Fetching data")
    this.getItems();
  }

  private collectResult(page: PaginatedResult<Place>) {
    this.currentPage = page;
    this.accumulatedResult = this.accumulatedResult.concat(page.results);
  }

  abstract createFilter(params: Params): Object;

  getItems(): void {
    console.log("Fetching items");
    // this.route.queryParams
    //   .map(params => this.createFilter(params))
    //   .switchMap(filter => this.service.getList(filter))
    //   .map(page=>this.collectResult(page));

    const params = this.route.snapshot.queryParams;
    const filter = this.createFilter(params);
    this.service.getList(filter).subscribe(page => {
      this.collectResult(page);
    });
  }

  next(): void {
    console.log("Fetching next items");
    this.service.getNext(this.currentPage).subscribe(page => {
      this.collectResult(page);
    });
  }
}
